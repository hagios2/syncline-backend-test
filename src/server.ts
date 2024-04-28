import { server } from './routes/index'
import { connection } from './config/connection';

const port = process.env.PORT

server.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
    connection()
})
