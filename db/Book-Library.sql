-- phpMyAdmin SQL Dump
-- version 4.8.0.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Sep 06, 2019 at 06:45 PM
-- Server version: 5.7.27-0ubuntu0.16.04.1
-- PHP Version: 7.0.33-11+ubuntu16.04.1+deb.sury.org+1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `books`
--

-- --------------------------------------------------------

--
-- Table structure for table `books`
--

CREATE TABLE `books` (
  `id` bigint(20) NOT NULL,
  `book_name` varchar(200) NOT NULL,
  `isbn_no` varchar(200) NOT NULL,
  `image_url` varchar(2000) DEFAULT NULL,
  `description` mediumtext,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created_by` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `books`
--

INSERT INTO `books` (`id`, `book_name`, `isbn_no`, `image_url`, `description`, `created_at`, `updated_at`, `created_by`) VALUES
(1, 'hello', '1234', 'https://www.macleans.ca/wp-content/uploads/2017/05/MAC05_BOOK_INFLATION_POST01.jpg', 'iusshjshjsh', '2019-09-06 13:09:21', '2019-09-06 13:09:21', NULL),
(2, 'hell', 'ieiei', 'https://www.macleans.ca/wp-content/uploads/2017/05/MAC05_BOOK_INFLATION_POST01.jpg', 'yeyeyheheh', '2019-09-06 15:17:27', '2019-09-06 15:17:27', NULL),
(4, 'apopaop', '6382899', 'https://www.macleans.ca/wp-content/uploads/2017/05/MAC05_BOOK_INFLATION_POST01.jpg', 'pipoiodj', '2019-09-06 15:23:26', '2019-09-06 15:23:26', 4);

-- --------------------------------------------------------

--
-- Table structure for table `favourites`
--

CREATE TABLE `favourites` (
  `id` bigint(20) NOT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  `book_id` bigint(20) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) NOT NULL,
  `user_id` varchar(100) NOT NULL,
  `login_response` mediumtext NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `user_name` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `user_id`, `login_response`, `created_at`, `updated_at`, `user_name`) VALUES
(4, '1423967367742585', '{\"authResponse\":{\"accessToken\":\"EAAL3JJSSXsgBACV9JzXMUH6ajWURwSx6B8TzrnNiOaH6SdsEJVHT2y3ohx2evjP94Azlc67gWV7f5iKDZBZCoardiMdfZAkOAiUfEWdrdJh4r5GhPwt6mZAHSITDjMaxOdyCqJzzD9VV97qqAjsCjtJ6IC5363NENlMWLA4ZBKVs4dxZCvzkyPBHlSdJYYr8u5vSYsklJ9TAZDZD\",\"userID\":\"1423967367742585\",\"expiresIn\":5551,\"signedRequest\":\"E1R0N5pba1gEZ_EPyBguxsurDT0bgkYLYD5MLfIRsWs.eyJ1c2VyX2lkIjoiMTQyMzk2NzM2Nzc0MjU4NSIsImNvZGUiOiJBUUJ5ck8wRnVka3dkNHdoMkdVbllnem9QMkxERE5yVVpVd3B1SmhhOWJiQUNjaWk1ZDlickFydFFBS0cxQjNOQmo2ZFY4dTZaaUFBS3d2QW5Za0kzWFgxVlVqdUZHVk40QnM5VVJNRENtQWVOemRfOVdENUpLMG95U1lkRXZwa2c0em82YmtBTUxIOG1YLXdLQUVDZWNBN0xHWXZHUGM5YzdNSE1rTlAxUjJ6ZkRpSDF3eEt5RFFMLUdUQl9hWTU5WlhHWk54MWp6WjBxLTJ3RzJqNm1TNVpjX1llNUVkbkdKLVJwTzBhTmZ6NG1zSTRxTXZpVnd5TExESFlEQ0R5a3A5X2NSUjc3eXl6bTNCRm9QRXRJZGZCR1BJLWE2VTJPbFZobU0yVVNZbHJ5eVFrNkhYZEJEVFlmanZrTndKVUhOdWJvb3JyM1EzWXVhdXRBVmdDUVRZMiIsImFsZ29yaXRobSI6IkhNQUMtU0hBMjU2IiwiaXNzdWVkX2F0IjoxNTY3NzY5MjQ5fQ\",\"data_access_expiration_time\":1575545249},\"status\":\"connected\",\"info\":{\"name\":\"Karthi\",\"id\":\"1423967367742585\"}}', '2019-09-06 15:21:54', '2019-09-06 17:05:27', 'karthi');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `books`
--
ALTER TABLE `books`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_books_created_by` (`created_by`);

--
-- Indexes for table `favourites`
--
ALTER TABLE `favourites`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_favourites_book_id` (`book_id`),
  ADD KEY `fk_favourites_user_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_id` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `books`
--
ALTER TABLE `books`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `favourites`
--
ALTER TABLE `favourites`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `books`
--
ALTER TABLE `books`
  ADD CONSTRAINT `fk_books_created_by` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`);

--
-- Constraints for table `favourites`
--
ALTER TABLE `favourites`
  ADD CONSTRAINT `favourites_ibfk_1` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`),
  ADD CONSTRAINT `favourites_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;