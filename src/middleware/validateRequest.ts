
import { AnySchema } from 'yup'
import { Request, Response, Next } from 'restify'
import { errorResponse } from '../server_responses/response'

const validateRequestBody = (schema: AnySchema) => async (req: Request, res: Response) => {
  try {
    await schema.validate({
      body: req.body
    })

  } catch (error: any) {
    errorResponse(req, res, error.message, 422)
  }
}

const validateRequestQuery = (schema: AnySchema) => async (req: Request, res: Response) => {
  try {
    await schema.validate({
      query: req.query
    })
    
  } catch (error) {
    errorResponse(req, res, error)
  }
}

export { validateRequestBody, validateRequestQuery }
