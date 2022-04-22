/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {Transaction} from 'sequelize'
import {getNamespace} from 'cls-hooked'
import {LoggerFactory} from '@lib/logger'
import db from '@lib/db'
import ApiError from 'src/const/error'

export async function scoped(func) {
  const logger = new LoggerFactory().build('SCOPED_LOGGER')
  const namespace = getNamespace('transaction-namespace')

  if (namespace.get('transaction')) {
    return func()
  }

  return await db.sequelize.transaction(
    {
      isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED
    },
    async transaction => {
      try {
        return await func({transaction})
      } catch (error) {
        logger.error(`::Error message inside scoped:: - ${error.message}`)
        logger.error(`::Error stack inside scoped:: - ${error.stack}`)
        throw new ApiError(400, 400, JSON.stringify(error))
      }
    }
  )
}
