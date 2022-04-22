import axios, {AxiosInstance} from 'axios'
import {expect} from 'chai'
import 'mocha'
import faker from 'faker-br'

describe('User', () => {
  let client: AxiosInstance
  const phone = `559${faker.phone.phoneNumber().replace(/[^0-9.]+/g, '')}`
  const userPayload = {
    name: 'test user',
    document: faker.br.cpf(),
    phone,
    password: '12345678',
    email: faker.internet.email().toLowerCase()
  }

  before(async () => {
    client = axios.create({
      baseURL: `${process.env.API_URL as string}:${process.env.EXTERNAL_PORT}/`,
      responseType: 'json',
      headers: {
        Accept: 'application/json'
      }
    })
  })

  it('Must be get a valid user', async () => {
    const response = await client.get('users?phone=5511111111111')
    expect(response.status).to.equal(200)
  })

  it('Must be fail to get an invalid user', async () => {
    try {
      await client.get('users?phone=5511987467272')

      expect.fail()
    } catch (error) {
      const {response} = error

      expect(response.status).equal(404)
    }
  })

  it('Create user', async () => {
    const response = await client.post('users', userPayload)
    expect(response.status).to.equal(200)
  })

  it('Must be fail to check an invalid user', async () => {
    try {
      await client.get('users/check/5511987467272')

      expect.fail()
    } catch (error) {
      const {response} = error

      expect(response.status).equal(404)
    }
  })
})
