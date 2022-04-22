import {v4 as uuidv4} from 'uuid'
import {ValidatorResult} from 'jsonschema'
import fastity, {FastifyInstance} from 'fastify'
import context from './async-context'

import {IncomingMessage, Server, ServerResponse} from 'http'
import ApiError from 'src/const/error'
import {inject, singleton} from 'tsyringe'
import {ILoggerFactory, ILoggerService, LoggerFactory} from '@lib/logger'
import {bootstrap} from 'fastify-decorators'
import {resolve} from 'path'
import middie from 'middie'
import fastifyCors from 'fastify-cors'
import {fastifyHelmet} from 'fastify-helmet'
import fastifyMultipart from 'fastify-multipart'
import fastifyFormBody from 'fastify-formbody'

export type FastifyServer = FastifyInstance<Server, IncomingMessage, ServerResponse>

export interface IAppFactory {
  build(): Promise<IAppFactory>
  listen(port: string): Promise<void>
}

@singleton<IAppFactory>()
export class App implements IAppFactory {
  private readonly logger: ILoggerService
  private server: FastifyInstance

  constructor(@inject(LoggerFactory) loggerFactory: ILoggerFactory) {
    this.logger = loggerFactory.build('app')
  }

  listen(port: string): Promise<void> {
    return new Promise(resolve => {
      this.server.listen(parseInt(port), '0.0.0.0')

      this.server.addHook('onReady', () => {
        this.logger.info(`Server listening on ${port}`)
        resolve()
      })
    })
  }

  async build(): Promise<IAppFactory> {
    this.server = await fastity({
      disableRequestLogging: true,
      requestIdHeader: 'x-request-id',
      genReqId: req => {
        return (req.headers['x-request-id'] ?? uuidv4()) as string
      },
      logger: {
        serializers: {
          req: function (req) {
            return {
              requestMethod: req.method,
              requestUrl: req.url,
              remoteIp: req.socket.address,
              userAgent: req.headers['user-agent']
            }
          }
        }
      }
    })

    await this.registerAll()

    this.addUse()
    this.addHooks()
    this.loadRoutes()

    return Promise.resolve(this)
  }

  private async registerAll(): Promise<void> {
    await this.server.register(middie)
    await this.server.register(fastifyCors)
    await this.server.register(fastifyHelmet)
    await this.server.register(fastifyMultipart, {attachFieldsToBody: true})
    await this.server.register(fastifyFormBody)
  }

  private async addUse(): Promise<void> {
    this.server.use((req: any, res, next) => {
      const requestId = req.id
      const store = new Map()
      store.set('requestId', requestId)
      req.context = context

      return context.run(store, next)
    })

    // this.server.use((server: any, options, next) => {
    //   const apiKey = server.headers['x-api-key']
    //   if (server.method !== 'OPTIONS' && server.url !== '/' && server.url !== '/favicon.ico') {
    //     if (!apiKey || apiKey !== process.env.API_KEY) {
    //       throw new ApiError(401, 4004, 'API Key Invalid')
    //     }
    //   }

    //   next()
    // })
  }

  private addHooks(): void {
    this.server.addHook('onSend', async (req, reply) => {
      reply.header('x-request-id', req.id)
    })

    this.server.addHook('onError', async (req, reply, error) => {
      if (error instanceof ApiError) {
        const apiError = error as ApiError

        reply.status(apiError.status).send({
          code: apiError.code,
          message: apiError.message,
          status: apiError.status,
          instance: req.url
        })
      } else if (error instanceof ValidatorResult) {
        const errors = error.errors.map(error => {
          return `${error.property} - ${error.message}`
        })

        reply.status(400).send({
          error: {
            errors
          },
          code: 400,
          message: 'Error on validate fields'
        })
      } else if (error.validation) {
        reply.status(400).send({
          code: 400,
          message: 'Invalid parameters',
          errors: error.validation
        })
      } else {
        this.logger.error(`::app:: - ${JSON.stringify(error, Object.getOwnPropertyNames(error))}`)

        reply.status(500).send({
          code: 500,
          title: error.message
        })
      }
    })

    this.server.addHook('onResponse', (req, res, next) => {
      const httpRequest = {
        requestMethod: req.method,
        requestUrl: req.url,
        remoteIp: req.socket.address,
        userAgent: req.headers['user-agent'],
        status: res.statusCode,
        latency: (res.getResponseTime() / 1000).toFixed(9) + 's',
        responseSize: res.getHeader('Content-Length')
      }

      this.server.log.info({
        labels: {
          requestId: req.id
        },
        'logging.googleapis.com/sourceLocation': (req as any)?.context.config.url ?? req.url,
        'logging.googleapis.com/spanId': req.id,
        httpRequest
      })
      next()
    })
  }

  private async loadRoutes(): Promise<void> {
    this.server.register(bootstrap, {
      directory: resolve(__dirname, '..'),
      mask: /\.controller\.[j|t]s$/
    })

    this.server.get('/', (req, res) => {
      res.type('text/html').send(`
<html>
<style>
body {
  margin: 0;
}

div {
  width: 300px;
  height: 100px;
}

.x {
  animation: x 52s linear infinite alternate;
}

.y {
  animation: y 28s linear infinite alternate;
}

@keyframes x {
  100% {
    transform: translateX( calc(100vw - 100px) );
  }
}

@keyframes y {
  100% {
    transform: translateY( calc(100vh - 100px) );
  }
}
</style>
<body>
<div class="x">
<pre class="y">

<pre>888       888 8888888888 888      .d8888b.   .d88888b.  888b     d888 8888888888      88888888888 .d88888b.        .d88888b.  888     888 8888888b.       888888b.         d8888  .d8888b.  888    d8P  8888888888 888b    888 8888888b.  
888   o   888 888        888     d88P  Y88b d88P" "Y88b 8888b   d8888 888                 888    d88P" "Y88b      d88P" "Y88b 888     888 888   Y88b      888  "88b       d88888 d88P  Y88b 888   d8P   888        8888b   888 888  "Y88b 
888  d8b  888 888        888     888    888 888     888 88888b.d88888 888                 888    888     888      888     888 888     888 888    888      888  .88P      d88P888 888    888 888  d8P    888        88888b  888 888    888 
888 d888b 888 8888888    888     888        888     888 888Y88888P888 8888888             888    888     888      888     888 888     888 888   d88P      8888888K.     d88P 888 888        888d88K     8888888    888Y88b 888 888    888 
888d88888b888 888        888     888        888     888 888 Y888P 888 888                 888    888     888      888     888 888     888 8888888P"       888  "Y88b   d88P  888 888        8888888b    888        888 Y88b888 888    888 
88888P Y88888 888        888     888    888 888     888 888  Y8P  888 888                 888    888     888      888     888 888     888 888 T88b        888    888  d88P   888 888    888 888  Y88b   888        888  Y88888 888    888 
8888P   Y8888 888        888     Y88b  d88P Y88b. .d88P 888   "   888 888                 888    Y88b. .d88P      Y88b. .d88P Y88b. .d88P 888  T88b       888   d88P d8888888888 Y88b  d88P 888   Y88b  888        888   Y8888 888  .d88P 
888P     Y888 8888888888 88888888 "Y8888P"   "Y88888P"  888       888 8888888888          888     "Y88888P"        "Y88888P"   "Y88888P"  888   T88b      8888888P" d88P     888  "Y8888P"  888    Y88b 8888888888 888    Y888 8888888P"  
              

                                                                                                                                                                                                                                          
                                                                                                                                                                                                                                          </pre>
                                                         //**/#*                
                                                      /**//****,,(/             
                                                    ,///(***(/*,////*/*(,       
                                                   /*/*/*////,(///(//**,.       
               THIS IS OUR BACKEND DOG            ,/*,.,,*/ .  .                
                                                   /////****.,,                 
                                                  //.*/*,*// .,                 
                                             */**,*//(/      .                  
                            .,/(//*//**/////(/**(/*/(((/*,, .,                  
       ,///(///*,**,,**/****////////////((((/((((///*/((**, ,.                  
      *(//((((*****//**/((/(//*/**/(((/(((((****,*(****//,.,/,                  
     ,(*/(/**//,*,*/*//*****,************,*********(*****./((*                  
      /*/(//****,,***,***,******,,,,,,,,,,,,***(*/***..,,*((*.                  
     /*,*/*/,,,,,/***********,*************,*(//*//*..,,*,,*                    
   (((,*/(//*,    .......,.......,,,**,,,,,,,*((, , //(*..                      
   */*,(,             #&#**,...........,..,***,,,..                             
    *,                  ./.                   ,(,,                              
    **/(                                       *,,/.                            
                                                                                
                                                       
                      
</pre>
</div>
</body>
</html>
    `)
    })
  }
}
