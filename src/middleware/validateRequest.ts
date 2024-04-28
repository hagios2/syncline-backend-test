
import { AnySchema } from 'yup'
import { Request, Response, Next } from 'restify'
import { errorResponse } from '../server_responses/response'

const validateRequestBody = (schema: AnySchema) => async (req: Request, res: Response, next: Next) => {
  try {
    await schema.validate({
      body: req.body
    })

    return next()
  } catch (error: any) {
    // log.error(error)
    return errorResponse(req, res, next, error.message, 422)
  }
}

const validateRequestQuery = (schema: AnySchema) => async (req: Request, res: Response, next: Next) => {
  try {
    await schema.validate({
      query: req.query
    })

    return next()
  } catch (error) {
    return errorResponse(req, res, next, error)
  }
}

export { validateRequestBody, validateRequestQuery }
