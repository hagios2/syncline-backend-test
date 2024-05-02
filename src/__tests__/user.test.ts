import supertest from 'supertest'
import { server as app } from '../routes/index'
import { testDbConnect, testDbClose, testDbClear } from '../config/test_db'

beforeAll(async () => await testDbConnect())
beforeEach(async () => await testDbClear())
afterAll(async () => await testDbClose())

describe('User', () => {
  describe('POST /auth/signup', () => {
    it('should respond with 201 status', async () => {
      const user = {
        username: 'Mamphey',
        email: 'hagioswilson@gmail.com',
        password: '123456789',
      }

      const response = await supertest(app).post('/auth/signup').send(user)

      expect(response.statusCode).toBe(201)
    }, 1000000)

    it('should expect response body _id to be defined', async () => {
      const user = {
        name: 'Mamphey',
        email: 'hagioswilson@gmail.com',
        password: '123456789',
      }

      const response = await supertest(app).post('/auth/signup').send(user)

      expect(response.body.data.user._id).toBeDefined()
    }, 10000)

    it('should expect response body name to be equal to user.name', async () => {
      const user = {
        name: 'Mamphey',
        email: 'hagioswilson@gmail.com',
        password: '123456789',
      }

      const response = await supertest(app).post('/auth/signup').send(user)

      expect(response.body.data.user).toBeDefined()
    })

    it('should respond with status 422 if name is not provided', async () => {
      const response = await supertest(app).post('/auth/signup').send({})

      expect(response.statusCode).toBe(422)
    })
  })
})