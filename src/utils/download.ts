import fs, {PathLike} from 'fs'
import https from 'https'
import {LoggerFactory} from '@lib/logger'

export async function downloadFile(dest: PathLike, url: string): Promise<Buffer> {
  const builder = new LoggerFactory()
  const logger = builder.build('DownloadFile')
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(dest)) {
      logger.info(`downloadFile - Start { dest: ${dest}, from: ${url} }`)
      const file = fs.createWriteStream(dest)

      https
        .get(url, response => {
          response.pipe(file)

          file.on('finish', () => {
            file.close()
            logger.info(`::downloadFile - Finish { dest: ${dest}, from: ${url} }`)

            resolve(readFile(dest))
          })
        })
        .on('error', error => {
          logger.error(`::downloadFile - Error { dest: ${dest}, from: ${url} }`)
          logger.error(String(error))

          fs.unlinkSync(dest)
          reject(error)
        })
    } else {
      resolve(readFile(dest))
    }
  })
}

function readFile(file): Buffer {
  return fs.readFileSync(file)
}
