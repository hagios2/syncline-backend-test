import { object, string } from 'yup'

const userRequestSchema = object({
  body: object({
    name: string().required('Name is required'),
    password: string().required('Password is required'),
    email: string().required('Email is required').email('Must be a valid email'),
    departmentId: string()
  })
})

export { userRequestSchema }