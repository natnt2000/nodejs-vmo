import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import { config } from 'dotenv'
import authRoute from './routes/authRoute'
import userRoute from './routes/userRoute'

config()
const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


mongoose.connect(
    process.env.DB_CONNECTION,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    () => console.log('Connected to DB')
)

app.use('/', authRoute)

app.use('/api/users', userRoute)


app.listen(port, () => { console.log(`Server is running at http://localhost:${port}`) })

export default app