import {container} from 'tsyringe'
import {Controller, GET, POST} from 'fastify-decorators'
import {FastifyReply, FastifyRequest} from 'fastify'
import {Authorization} from 'src/decorators/authorization.decorator'
import {UserCreateBodySchema, ValidateBodySchema} from 'src/services/user/user.schema'
import {UserPostUseCase, IUserPostUseCase} from 'src/use-cases/user/post.usecase'

@Controller('/users')
export default class UserController {
  private readonly userPostUseCase: IUserPostUseCase
  constructor() {
    this.userPostUseCase = container.resolve<IUserPostUseCase>(UserPostUseCase)
  }

  @Authorization
  @GET('/validate')
  async validateHandler(req: FastifyRequest<any>, res: FastifyReply): Promise<void> {
    return res.code(204)
  }
  @Authorization
  @POST('', {schema: {body: UserCreateBodySchema}})
  async createUser(req: FastifyRequest<any>, res: FastifyReply): Promise<void> {
    const data = req.body
    if (data) {
      const result = await this.userPostUseCase.exec(data)
      if (result.isSuccess) {
        return result.send(200, res)
      }
      return result.send(400, res)
    }
  }
}
