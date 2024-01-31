import { Dialect, Sequelize } from 'sequelize';
import config from './config.json'
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3000;
const environment = process.env.ENVIRONMENT || 'development';

console.log("LB --------------------------------------------")
console.log(environment);

const sequelizeConfig = (config as any)[environment] || config.development;

const { username, password, database, host, dialect } = sequelizeConfig;
console.log(username, password, database, host, dialect);
const sequelize = new Sequelize(database, username, password, {
    host,
    dialect: dialect as Dialect,
 });
 

export default sequelize;