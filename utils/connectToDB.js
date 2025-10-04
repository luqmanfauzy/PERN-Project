import pg from 'pg'
import env from 'dotenv'

env.config()

const requiredEnvVars = [
    "PG_USER",
    "PG_HOST",
    "PG_DATABASE",
    "PG_PORT",
    "PG_PASSWORD"
]

requiredEnvVars.forEach((varName) => {
    if (!process.env[varName]) {
        console.log(`Error: Missing required environment variable ${varName}`)
        process.exit(1)
    }
})

const db = new pg.Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT
})

db.connect()
    .then(() => console.log("Connected to the database"))
    .catch((err) => {
        console.error("Database connection error:", err)
        process.exit(1)
    })

db.on('error', (err) => {
    console.error("Unexpected error on idle client", err)
    process.exit(1)
})

export const query = (text, params) => db.query(text, params)
