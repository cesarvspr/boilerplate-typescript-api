import {Table, Column, AutoIncrement, PrimaryKey, DataType, HasMany, Default, BeforeCreate} from 'sequelize-typescript'

import BaseModel, {JsonIgnore} from '@models/base-model'
import bcrypt from 'bcrypt'

export interface IUsersAttributes {
  id?: bigint
  name: string
  phone: string
  document?: string
  password: string
  email?: string
  verified: boolean
  lastLogin?: Date
  isActive: boolean
}

@Table({
  timestamps: true
})
export default class User extends BaseModel<IUsersAttributes> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT)
  id: bigint
  @Column(DataType.STRING(150))
  name: string
  @Column(DataType.STRING(11))
  document: string
  @Column(DataType.STRING(16))
  phone: string
  @Column(DataType.STRING(100))
  @JsonIgnore()
  password: string
  @Column(DataType.STRING(40))
  email?: string
  @Default(false)
  @Column(DataType.BOOLEAN)
  verified: boolean
  @Column(DataType.DATE)
  lastLogin?: Date
  @Default(true)
  @Column(DataType.BOOLEAN)
  isActive: boolean

  @BeforeCreate
  private static async handlePassword(user: User): Promise<void> {
    // this will be called when an user instance is created or updated
    user.password = await bcrypt.hash(user.password, 10)
  }
}
