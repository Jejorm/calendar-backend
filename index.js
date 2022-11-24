const express = require( 'express' )
const cors = require( 'cors' )
const { dbConnection } = require( './database/config' )
require( 'dotenv' ).config()

// Create express server
const app = express()

// Database
dbConnection()

// CORS
app.use( cors() )

// Public directory
app.use( express.static( 'public' ) )

// Body lecture & parse
app.use( express.json() )

// Routes
app.use( '/api/auth', require( './routes/auth' ) )
app.use( '/api/events', require( './routes/events' ) )


app.listen( process.env.PORT, () => {
    console.log( 'Servidor corriendo en puerto', process.env.PORT )
} )
