import {Type} from '@sinclair/typebox'

export const UserCreateBodySchema = Type.Object({
  name: Type.String({
    minLength: 3,
    maxLength: 150
  }),
  phone: Type.String({
    minLength: 13,
    maxLength: 16
  }),
  password: Type.String({
    minLength: 6,
    maxLength: 40
  }),
  email: Type.Optional(
    Type.String({
      minLength: 0,
      maxLength: 150
    })
  )
})

export const ValidateBodySchema = Type.Object({
  cnpj: Type.Optional(
    Type.String({
      minLength: 11,
      maxLength: 16
    })
  )
})
