var express = require('express');
var router = express.Router();
var middleware = require("../middlewares")();
var authController = require("../controllers/AuthController")();
var bookController = require("../controllers/BookController")();
var userController = require("../controllers/UserController")();

/* GET home page. */

router.get('/login',
  function(req, res){
    res.render('login');
  });

router.post('/login', authController.processLogin);

router.use(middleware.checkUser);

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("/book", bookController.getBooks);

router.post("/book", bookController.addBook);

router.get("/books/add", bookController.addBooksPage);

router.get("/users/search", userController.userSearchPage);

router.get("/user", userController.getUsers);

router.get("/user/:id", userController.getUserInfo);

router.get("/user/books", userController.getFavBooks);

router.put("/book/:id/favourite", bookController.markFavourite);

router.delete("/book/:id/favourite", bookController.markUnFavourite);

module.exports = router;
