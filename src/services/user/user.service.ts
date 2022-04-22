import {singleton, inject} from 'tsyringe'
import {ILoggerFactory, ILoggerService, LoggerFactory} from '@lib/logger'
import {IUserRepository, UserRepository} from 'src/repos/user.repos'
import {Result} from 'src/core/result'
import {ErrorCode} from 'src/const/error'

export interface UserDTO {
  id?: bigint
  name: string
  phone: string
  document: string
  totpKey?: string
  email?: string | null
  verified?: boolean
  lastLogin?: Date
  isActive: boolean
}

export interface IUserService {
  findByPhone(phone: string): Promise<Result<UserDTO | null>>
  create(request: UserDTO): Promise<Result<bigint>>
}

@singleton<IUserService>()
export class UserService implements IUserService {
  private readonly logger: ILoggerService

  constructor(
    @inject(LoggerFactory) loggerFactory: ILoggerFactory,
    @inject(UserRepository) private userRepository: IUserRepository
  ) {
    this.logger = loggerFactory.build('UserService')
  }

  async findByPhone(phone: string): Promise<Result<UserDTO | null>> {
    const user = await this.userRepository.findByPhone(phone)

    if (!user) {
      return Result.fail(ErrorCode.NOT_FOUND_USER_ERROR)
    }

    return Result.ok({
      id: user.id,
      name: user.name,
      phone: user.phone,
      document: user.document,
      password: user.password,
      email: user.email,
      verified: user.verified,
      lastLogin: user.lastLogin,
      isActive: user.isActive
    })
  }

  async create(request: UserDTO): Promise<Result<bigint>> {
    let user = await this.userRepository.findOne({
      where: {
        phone: request.phone
      }
    })

    if (user) {
      return Result.fail(ErrorCode.DUPLICATED_USER_ERROR)
    }

    if (request.email) {
      request.email = request.email.trim()
    }

    user = await this.userRepository.create(request)

    return Result.ok(user.id)
  }
}
