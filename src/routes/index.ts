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
import { blogRequestSchema, categoryRequestSchema, } from '../schemas/blogRequestSchema'
import Pusher from "pusher"

dotenv.config()

const server: Server = restify.createServer()
server.use(restify.plugins.bodyParser());

const APPID = process.env.PUSHER_APP_ID as string
const PUSHER_KEY =  process.env.PUSHER_KEY as string
const PUSHER_SECRET =  process.env.PUSHER_SECRET as string
const PUSHER_CLUSTER = process.env.PUSHER_CLUSTER as string
const PUSHER_TLS = process.env.PUSHER_TLS as string

const pusher = new Pusher({
  appId: APPID,
  key: PUSHER_KEY,
  secret: PUSHER_SECRET,
  cluster: PUSHER_CLUSTER,
  useTLS: Boolean(PUSHER_TLS)
});


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
server.post('/auth/logout', authController.logout)


//----------------- Endpoint fot Category-----------
server.get('/category', CategoryController.index)
server.post('/category', validateRequestBody(categoryRequestSchema), CategoryController.create)


//--------------------Endpoints for blogs---------------
server.get('/blogs', Blogcontroller.index)
server.post('/blogs', validateRequestBody(blogRequestSchema), verifyToken, Blogcontroller.create)
server.put('/blogs/:id', verifyToken, Blogcontroller.update)
server.del('/blogs/:id', verifyToken, Blogcontroller.delete)
server.post('/blogs/:id/comment', verifyToken, Blogcontroller.addComment)
server.get('/blogs/:id/comment', Blogcontroller.getBlogComment)
server.post('/blogs/:id/like', verifyToken, Blogcontroller.addBlogLike)

export { server, pusher}