
const processLogin = (req, res, next) => {

	delete req.session.user;
	if (req.body && req.body.status == "connected") {

		res.locals.pool.query("Select * from users where user_id = ?",
			[req.body.authResponse.userID], function (error, results, fields) {
				if (error) {
					console.info(error)
					res.send({ success : false });
				} else if (results.length > 0) {
					req.session.userId = results[0].id;
					res.locals.pool.query("UPDATE users set login_response = ? where user_id = ?",
						[JSON.stringify(req.body), req.body.authResponse.userID], function (error, results, fields) {
							if (error) {
								console.info(error);
								res.send({ success : false });
							} else {
								req.session.user = req.body.authResponse;
								res.send({ success : true });
							}
						});
				} else {
					res.locals.pool.query("INSERT INTO users(user_id, login_response, user_name) values(?,?, ?)",
						[req.body.authResponse.userID, JSON.stringify(req.body), req.body.info.name], function (error, results, fields) {
							if (error)
								res.send({ success : false });
							else {
								req.session.userId = results.insertId;
								req.session.user = req.body.authResponse;
								res.send({ success : true });
							}
						});
				}
			});
	} else {
		res.send({ success : false });
	}
}

module.exports = () => {
	return {
		processLogin : processLogin
	} 
};