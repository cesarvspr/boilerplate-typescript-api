import {singleton} from 'tsyringe'
import User from 'src/models/users.model'
import {BaseRepository, IBaseRepository} from './base.repos'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IUserRepository extends IBaseRepository<User> {
  findByPhone(phone: string): Promise<User>
}

@singleton<UserRepository>()
export class UserRepository extends BaseRepository<User> implements IUserRepository {
  constructor() {
    super(User)
  }

  findByPhone(phone: string): Promise<User> {
    return this.findOne({where: {phone}})
  }
}
