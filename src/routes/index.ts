import { Request, Response, Next } from 'restify'
import restify from 'restify'
import { Server } from 'restify' 
import dotenv from 'dotenv'
import SignupController from '../controllers/auth/signupController'
import { successResponse } from "../server_responses/response"
import Blogcontroller from '../controllers/blogcontroller'


dotenv.config()

const server: Server = restify.createServer()
server.use(restify.plugins.bodyParser());


server.get('/', (req: Request, res: Response, next: Next) => {
    return successResponse(req, res,'server is up and running', {})
})


server.post('/auth/signup', SignupController.addUser)

//Endpoints for blogs
server.get('/blogs', Blogcontroller.index)
server.post('/blogs', Blogcontroller.create)
server.put('/blogs/:id', Blogcontroller.update)
server.del('/blogs/:id', Blogcontroller.delete)

server.patch('/blogs/:id/comment', Blogcontroller.addComment)





export { server }