const express = require('express')

const bodyParser = require('body-parser')
const path = require('path')

const detailRoutes = require('./routes/book')
const listRoutes = require('./routes/index')
const createBook = require('./routes/create')
const { allowedNodeEnvironmentFlags } = require('process')
const router = require('./routes/book')

const app = express()

app.locals.books = [
	{
		isbn: '1', title: 'Book1', author: 'Markus Zanker',
		description: 'Lorem ipsum dolor sit amit',
	},
	{
		isbn: '2', title: 'Book2', author: 'Max Mustermann',
		description: 'The new book of Max Mustermann',
	}
];

app.use(bodyParser.urlencoded({ extended: true }))

app.use('/book', detailRoutes)
app.use('/create', createBook)
app.use('/', listRoutes)

// handle POST request from form (to add a book)
app.post('/create', (req, res, next) => {

	//extract book info from the request
	const { isbn, title, author, description } = req.body;

	//create a new book
	const newBook = {
		isbn,
		title,
		author,
		description,
	};

	//add new book to book list
	app.locals.books.push(newBook);

	//go back to home page
	res.redirect('/');

});

// handle POST request from form (to add a book)
app.post('/create', (req, res, next) => {

	//extract book info from the request
	const { isbn, title, author, description } = req.body;

	//create a new book
	const newBook = {
		isbn,
		title,
		author,
		description,
	};

	//add new book to book list
	app.locals.books.push(newBook);

	//go back to home page
	res.redirect('/');

});

app.use((req, res, next) => {
	res.status(404).sendFile(path.join(__dirname, 'views', '404.html'))
})

app.listen(3000) 