import { Sequelize } from 'sequelize-typescript';

const sequelize = new Sequelize({
  dialect: 'mssql',
  host: '',
  username: '',
  password: '',
  database: '',
  models: [__dirname + '/models'],
});

export default sequelize;
