import {Request, Response, Next} from 'restify'

const errorResponse = (req: Request, res: Response, error : any, code: number = 400) => {

    res.send(res.status(code), {error})
}

const successResponse = (req: Request, res: Response, message = "OK", data: Object = {}, code: number = 200) => {

    res.send(res.status(200), {message, data})
}

export { errorResponse, successResponse }
