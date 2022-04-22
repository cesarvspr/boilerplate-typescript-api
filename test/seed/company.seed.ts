import {QueryTypes} from 'sequelize'
import {Sequelize} from 'sequelize-typescript'
import faker from 'faker-br'

const sequelize = new Sequelize({
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  host: process.env.DOCKER_CONTAINER ? process.env.DB_HOST : process.env.DB_HOST_TEST,
  dialect: process.env.DB_DIALECT,
  logging: false
} as any)
