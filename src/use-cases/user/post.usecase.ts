import {IUseCase} from 'src/core/usecase'
import {Result} from 'src/core/result'
import {inject, singleton} from 'tsyringe'
import {IUserService, UserDTO, UserService} from 'src/services/user/user.service'
import {ErrorCode} from 'src/const/error'

export type IUserPostUseCase = IUseCase<UserDTO, bigint>

@singleton<IUserPostUseCase>()
export class UserPostUseCase implements IUserPostUseCase {
  constructor(@inject(UserService) private userService: IUserService) {}

  async exec(data: UserDTO): Promise<Result<bigint>> {
    return this.userService.create(data)
  }
}
