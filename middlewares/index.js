

const checkUser = (req, res, next) => {
	console.info("coming here");
	if (req.session.userId) {
		next();
	} else {
		res.redirect("/login");
	}
};

module.exports = () => {
	return {
		checkUser : checkUser
	} 
};