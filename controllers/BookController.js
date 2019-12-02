
const getBooks = (req, res, next) => {
	console.info(req.query);
	if (req.query && req.query.term) {
		res.locals.pool.query("Select id, book_name, image_url, description, isbn_no, (select count(*) from favourites where user_id = ? and book_id = books.id) as isFavourite from books where book_name like ? or isbn_no like ?",
			[req.session.userId, "%"+req.query.term+"%", "%"+req.query.term+"%"], function (error, results, fields) {
				if (error) {
					console.info(error)
					res.render("partials/books", { books : [] });
				} else {
					res.render("partials/books", { books : results, editInfo: true });
				}
			});
	} else {
		res.render("partials/books", { books : [] });
	}
};

const addBooksPage = (req, res, next) => {
	res.render("addBook");
};

const addBook = (req, res, next) => {
	if (req.body && req.body.bookName) {

		res.locals.pool.query("insert into books(book_name, isbn_no, image_url, description, created_by) values(?, ?, ?, ?, ?)",
			[req.body.bookName, req.body.isbnNo, req.body.imageUrl, req.body.description, req.session.userId], function (error, results, fields) {
				if (error) {
					res.send({ success : false });
				} else {
					res.send({ success : true });
				}
			});
	} else {
		res.send({ success : true });
	}
};

const markFavourite = (req, res, next) => {

	if(req.params && req.params.id) {

		res.locals.pool.query("insert into favourites(book_id, user_id) values(?, ?)",
			[req.params.id, req.session.userId], function (error, results, fields) {
				if (error) {
					res.send({ success : false });
				} else {
					res.send({ success : true });
				}
			});
	} else {
		res.send({ success : true });
	}
};

const markUnFavourite = (req, res, next) => {

	if(req.params && req.params.id) {

		res.locals.pool.query("delete from favourites where book_id =? and user_id = ?",
			[req.params.id, req.session.userId], function (error, results, fields) {
				if (error) {
					res.send({ success : false });
				} else {
					res.send({ success : true });
				}
			});
	} else {
		res.send({ success : true });
	}
};

module.exports = () => {
	return {
		getBooks : getBooks,
		addBooksPage : addBooksPage,
		addBook : addBook,
		markFavourite : markFavourite,
		markUnFavourite : markUnFavourite
	} 
};