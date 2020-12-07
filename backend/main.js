  
// load the libs
const express = require('express')
const mysql = require('mysql2/promise')
const bodyParser = require('body-parser');
const cors = require('cors')

// SQL
const SQL_RSVP_ALL = 'select * from rsvps;'
const SQL_ADD_RSVP = 'insert into rsvps (name, response, vegetarian) values (?, ?, ?);'

const startApp = async (app, pool) => {
	const conn = await pool.getConnection()
	try {
		console.info('Pinging database...')
		await conn.ping()
		app.listen(PORT, () => {
			console.info(`Application started on port ${PORT} at ${new Date()}`)
		})
	} catch(e) {
		console.error('Cannot ping database', e)
	} finally {
		conn.release()
	}
}

// configure port
const PORT = parseInt(process.argv[2]) || parseInt(process.env.PORT) || 3000

// create connection pool
const pool = mysql.createPool({
	host: process.env.DB_HOST || 'localhost',
	port: parseInt(process.env.DB_PORT) || 3306,
	database: 'birthday',
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	connectionLimit: 4
})

// create an instance of the application
const app = express()


app.use (cors())
app.use (express.json())

app.get('/rsvps', async (req, resp) => {

	const conn = await pool.getConnection()
	try {
		// const [ result, _ ] = await conn.query(SQL_BOOK_LETTER, [ `${letter}%`, LIMIT, offset ])
		const [ result, _ ] = await conn.query(SQL_RSVP_ALL)

		resp.status(200)
		resp.type('application/json')
        resp.json(result)
        
	} catch(e) {
		console.error('ERROR: ', e)
		resp.status(500)
		resp.end()
	} finally {
		conn.release()
	}
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.post('/rsvp', async (req, resp) => {
    const name = req.body.name;
    const response = (req.body.response === "yes");
    const vegetarian = (req.body.vegetarian === "yes");
    resp.status(201);
    resp.format({
        html: () => { resp.send('Thank you'); },
        json: () => { resp.json({status: 'ok'});}
	})
	
	console.log(name, response, vegetarian)

	const conn = await pool.getConnection()
	try {
		// const [ result, _ ] = await conn.query(SQL_BOOK_LETTER, [ `${letter}%`, LIMIT, offset ])
		const [ result, _ ] = await conn.query(SQL_ADD_RSVP, [name, response, vegetarian])

		resp.status(200)
		// resp.type('text/html')
        
	} catch(e) {
		console.error('ERROR: ', e)
		resp.status(500)
		resp.end()
	} finally {
		conn.release()
	}


});
        
app.use(express.static ( __dirname + '/frontend'))

// start application
startApp(app, pool)