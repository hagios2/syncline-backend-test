import { object, string } from 'yup'

const userRequestSchema = object({
  body: object({
    username: string().required('Username is required'),
    password: string().required('Password is required'),
    email: string().required('Email is required').email('Must be a valid email'),
  })
})

export { userRequestSchema }