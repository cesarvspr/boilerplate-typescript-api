import 'reflect-metadata'

import {App, IAppFactory} from '@lib/app'
import {exec} from 'child_process'
import {DataBase} from '@lib/db'
import {container} from 'tsyringe'
import {Sequelize} from 'sequelize'
import mongoose from 'mongoose'
import {LoggerService} from '@lib/logger'

// const mongoUri = process.env.MONGO_URI as string
const logger = new LoggerService('db')
function runMigrations(): Promise<void> {
  return new Promise(resolve => {
    const migrate = exec('npm run migration', {env: process.env})

    migrate.stdout?.pipe(process.stdout)
    migrate.stderr?.pipe(process.stderr)

    migrate.on('close', resolve)
  })
}

function runSeeds(): Promise<void> {
  return new Promise(resolve => {
    const seed = exec('npm run seed', {env: process.env})

    seed.stdout?.pipe(process.stdout)
    seed.stderr?.pipe(process.stderr)

    seed.on('close', resolve)
  })
}

async function startServer(): Promise<void> {
  // await runMigrations()
  // await runSeeds()
  logger.info('--------Starting server-------')
  // mongoose.connect(mongoUri)
  // mongoose.connection.on('error', console.error.bind(console, 'connection error:'))
  // mongoose.connection.once('open', () => {
  //   logger.info('MongoDB connected')
  // })
  new DataBase().connect(async (db: Sequelize) => {
    const appInstance = container.resolve<IAppFactory>(App)
    let port

    if (process.env.PORT) {
      port = process.env.PORT
    } else {
      port = process.env.APP_PORT ?? '3000'
    }

    const serverInstance = await appInstance.build()
    await serverInstance.listen(port)

    process
      .on('SIGINT', () => {
        db.close()
        process.exit(0)
      })
      .on('SIGTERM', () => {
        db.close()
        process.exit(0)
      })
      .on('uncaughtException', err => {
        console.error(err.stack)
        process.exit(1)
      })
      .on('unhandledRejection', (reason, promise) => {
        console.error(reason, `Unhandled rejection at Promise: ${promise}`)
      })
  })
}

startServer()
