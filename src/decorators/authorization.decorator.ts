import {container} from 'tsyringe'
import context from '@lib/async-context'
import {FastifyReply, FastifyRequest} from 'fastify'

export function Authorization(target: any, propertyKey: string, descriptor: PropertyDescriptor): void {
  console.log('Authorization decorator')
  const originalMethod = descriptor.value
  descriptor.value = async function (...args: any[]): Promise<void> {
    const [req, res] = args
    req as FastifyRequest
    res as FastifyReply
    const headerToken = req.headers.authorization

    if (!headerToken) {
      console.log('no header token') // TODO throw error
    }
    return originalMethod.apply(this, args)
  }
}
