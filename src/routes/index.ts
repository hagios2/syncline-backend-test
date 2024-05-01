import  restify, { Request, Response, Next, Server } from 'restify'
import dotenv from 'dotenv'
import { successResponse } from "../server_responses/response"
import Blogcontroller from '../controllers/blogcontroller'
import authController from '../controllers/auth/authController'
import CategoryController from '../controllers/categoryController'
import { verifyToken } from '../middleware/verifyAuthToken'
import corsMiddleware from 'restify-cors-middleware'
import { validateRequestBody } from '../middleware/validateRequest'
import { userRequestSchema } from '../schemas/userRequestSchema'
import { blogRequestSchema, categoryRequestSchema } from '../schemas/blogRequestSchema'

dotenv.config()

const server: Server = restify.createServer()
server.use(restify.plugins.bodyParser());


const cors = corsMiddleware({
  preflightMaxAge: 5, 
  origins: ['*'], 
  allowHeaders: ['Authorization'], 
  exposeHeaders: ['API-Token-Expiry']
});

server.pre(cors.preflight);
server.use(cors.actual);


server.get('/', (req: Request, res: Response, next: Next) => {
    return successResponse(req, res,'server is up and running', {})
})


//-------------Endpoint for auth -----------------------
server.post('/auth/signup', validateRequestBody(userRequestSchema), authController.addUser)
server.post('/auth/login', authController.login)


//----------------- Endpoint fot Category-----------
server.get('/category', CategoryController.index)
server.post('/category', validateRequestBody(categoryRequestSchema), verifyToken, CategoryController.create)


//--------------------Endpoints for blogs---------------
server.get('/blogs', Blogcontroller.index)
server.post('/blogs', validateRequestBody(blogRequestSchema), verifyToken, Blogcontroller.create)
server.put('/blogs/:id', verifyToken, Blogcontroller.update)
server.del('/blogs/:id', verifyToken, Blogcontroller.delete)
server.post('/blogs/:id/comment', verifyToken, Blogcontroller.addComment)
server.post('/blogs/:id/like', verifyToken, Blogcontroller.addBlogLike)


export { server }