import Sequelize from 'sequelize';
import config from '../../server/config';

// uncomment this and configure connection to your local db, firts goes db name, username, password. In you db create table posts with id, title, content, createdAt, updatedAt 
// const sequelize = new Sequelize('sequelize', 'root', '', {
//   host: 'localhost',
//   dialect: 'mysql',
//   operatorsAliases: false,
// });

const sequelize = new Sequelize(config.databaseUrl, {
  define: {
    freezeTableName: true,
  },
});

export default sequelize;
