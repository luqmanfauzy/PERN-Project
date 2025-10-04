import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import employeeRoute from './routes/employeeRoutes.js'

dotenv.config()

const app = express()
const PORT = 3000

const corsOptions = {
    origin: '*'
}

app.use(cors(corsOptions))
app.use(bodyParser.json())

app.use('/api/employee', employeeRoute)

// Handle 404 errors
app.use(function(req, res, next) {
    const error = new Error('Not Found')
    error.statusCode = 404
    next(error)
})

// Global error handling middleware
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500
    const message = err.message || 'Internal Server Error'
    res.status(statusCode).json({ error: message })
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})