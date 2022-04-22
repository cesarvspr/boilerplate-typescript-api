import redis, {RedisClient} from 'redis'
import {singleton} from 'tsyringe'

export interface IRedisCli {
  set(key: string, value: string, ttl?: number): Promise<void>
  get(key: string): Promise<any>
  delete(key: string): Promise<any>
  get instance(): RedisClient
}

@singleton<IRedisCli>()
export class RedisCli implements IRedisCli {
  private readonly client: RedisClient

  constructor() {
    this.client = redis.createClient({
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT as unknown as number,
      auth_pass: process.env.REDIS_PASSWORD
    })
  }

  set(key: string, value: string, ttl?: number): Promise<void> {
    return new Promise((resolve, reject) => {
      const cb = err => {
        if (err) {
          reject(err)
        } else {
          resolve()
        }
      }

      if (ttl) {
        this.client.set(key, value, 'PX', ttl as number, cb)
      } else {
        this.client.set(key, value, cb)
      }
    })
  }

  get(key: string): Promise<string | null> {
    return new Promise((resolve, reject) => {
      const cb = (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(data)
        }
      }

      this.client.get(key, cb)
    })
  }

  delete(key: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const cb = (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(data)
        }
      }

      this.client.del(key, cb)
    })
  }

  get instance(): RedisClient {
    return this.client
  }
}
