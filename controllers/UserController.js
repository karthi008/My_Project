
const userSearchPage = (req, res, next) => {

	res.render("searchUser");
};

const getUsers = (req, res, next) => {

	if (req.query && req.query.term) {
		res.locals.pool.query("Select id, user_name as userName,(select count(*) from favourites where favourites.user_id = users.id) as bookCount from users where user_name like ?",
			["%"+req.query.term+"%"], function (error, results, fields) {
				if (error) {
					console.info(error)
					res.send({ success : false });
				} else {
					res.render("partials/users", { users : results, editInfo: true });
				}
			});
	} else {
		res.send({ success : false });
	}
};

const getUserInfo = (req, res, next) => {

	if (req.params && req.params.id) {
		res.locals.pool.query("Select id, user_name as userName from users where id = ?",
			[req.params.id], function (error, users, fields) {
				if (error) {
					console.info(error)
					res.send({ success : false });
				} else {
					res.locals.pool.query("Select id, book_name, isbn_no, image_url, description from books where created_by = ?",
						[req.params.id], function (error, books, fields) {
							if (error) {
								console.info(error)
								res.send({ success : false });
							} else {
								res.render("user", { users : users, books : books, editInfo: false });
							}
						});
				}
			});
	} else {
		res.redirect("/");
	}
};

const getFavBooks = (req, res, next) => {
	res.locals.pool.query("Select books.id, book_name, isbn_no, image_url, description, 1 as isFavourite from books inner join favourites on favourites.book_id = books.id where favourites.user_id = ?",
		[req.session.userId], function (error, books, fields) {
			if (error) {
				console.info(error)
				res.send({ success : false });
			} else {
				res.render("favBooks", { books : books, editInfo: true });
			}
		});
};

module.exports = () => {
	return {
		userSearchPage : userSearchPage,
		getUsers : getUsers,
		getUserInfo : getUserInfo,
		getFavBooks : getFavBooks
	} 
};