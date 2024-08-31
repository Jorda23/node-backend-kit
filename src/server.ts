import "reflect-metadata";
import * as dotenv from "dotenv";
import morgan from "morgan";
import { createExpressServer, useContainer, getMetadataArgsStorage } from "routing-controllers";
import { PhotoController, TodoController, UserController } from "./controllers";
import iocContainer from "./inversify.config";
import { ApiAccessCheck, ErrorHandler } from "./middlewares";
import createAuthorizationChecker from "./utils/auth/createAuthorizationChecker";
import sequelize from './sequelize';
import { routingControllersToSpec } from "routing-controllers-openapi";
import { writeFileSync } from "fs";

dotenv.config();

const PORT = process.env.PORT || 3001;

useContainer(iocContainer);

const app = createExpressServer({
  controllers: [TodoController, PhotoController, UserController],
  middlewares: [ApiAccessCheck, ErrorHandler],
  authorizationChecker: createAuthorizationChecker(iocContainer),
  defaultErrorHandler: false
});

app.use(morgan("dev"));

generateSwaggerSpec(); // Generate Swagger spec after the server is running

sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error.message);
  });

// Generate Swagger spec
function generateSwaggerSpec() {
  const spec = routingControllersToSpec(getMetadataArgsStorage(), {}, {
    controllers: [TodoController, PhotoController, UserController],
  });

  writeFileSync("swagger-spec.json", JSON.stringify(spec, null, 2));
  console.log("Swagger spec generated at swagger-spec.json");
}

// Serve Swagger UI
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('../swagger-spec.json'); // Load the generated Swagger spec

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;
