import {Request, Response, Next} from 'restify'

const errorResponse = (req: Request, res: Response, error : any, code=500) => {

    return res.send(res.status(200), JSON.stringify({error: error}))
}

const successResponse = (req: Request, res: Response, message = "OK", data: Object = {}, code: number = 200) => {

    res.send(res.status(200), {message, data})
}

export { errorResponse, successResponse }
