const express = require('express')
const router = express.Router()

const fs = require('fs')
const path = require('path')

router.get('/', (req, res, next) => {
	fs.readFile(path.join(__dirname, '..', 'views', 'index.html'), 'utf8', (err, page) => {
		if (err) {
			console.error(err);
			return;
		}

		let table_html = ''
		req.app.locals.books.forEach(
			el => table_html = table_html +
				'<tr>' +
				'<td>' + el['isbn'] + '</td>' +
				'<td>' + el['title'] + '</td>' +
				'<td>' + el['author'] + '</td>' +
				'<td><a href="/book?isbn=' + el['isbn'] + '">Detail</a></td>' +
				'<td><button class="deleteButton" id="' + el['isbn'] + '">Delete</button></td>' +
				'</tr>'
		);
		page = page.replace('{%table%}', table_html)

		res.setHeader('Content-Type', 'text/html')
		res.write(page)
		res.end();
	});
});

router.delete('/delete/:isbn', (req, res, next) => {
	const isbnToDelete = req.params.isbn;
	const index = req.app.locals.books.findIndex(book => book.isbn === isbnToDelete);

	if (index !== -1) {
		req.app.locals.books.splice(index, 1);
		res.sendStatus(200);
	} else {
		res.sendStatus(404);
	}
});

module.exports = router; 
