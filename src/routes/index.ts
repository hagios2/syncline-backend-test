import { Request, Response, Next } from 'restify'
import restify from 'restify'
import { Server } from 'restify' 
import dotenv from 'dotenv'
import { successResponse } from "../server_responses/response"
import Blogcontroller from '../controllers/blogcontroller'
import authController from '../controllers/auth/authController'
import CategoryController from '../controllers/categoryController'
// import rjwt from 'restify-jwt-community'

dotenv.config()

const server: Server = restify.createServer()
server.use(restify.plugins.bodyParser());


server.get('/', (req: Request, res: Response, next: Next) => {
    return successResponse(req, res,'server is up and running', {})
})

//-------------Endpoint for auth -----------------------
server.post('/auth/signup', authController.addUser)
server.post('/auth/login', authController.login)

//----------------- Endpoint fot Category-----------
server.get('/category', CategoryController.index)
server.post('/category', CategoryController.create)

//--------------------Endpoints for blogs---------------
server.get('/blogs', Blogcontroller.index)
server.post('/blogs', Blogcontroller.create)
server.put('/blogs/:id', Blogcontroller.update)
server.del('/blogs/:id', Blogcontroller.delete)
server.patch('/blogs/:id/comment', Blogcontroller.addComment)



export { server }