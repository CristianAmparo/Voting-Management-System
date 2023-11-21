-- phpMyAdmin SQL Dump
-- version 5.3.0-dev+20220811.d237752642
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 21, 2023 at 09:20 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mern`
--

-- --------------------------------------------------------

--
-- Table structure for table `election_settings`
--

CREATE TABLE `election_settings` (
  `id` int(11) NOT NULL,
  `start_date` datetime NOT NULL,
  `end_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `election_settings`
--

INSERT INTO `election_settings` (`id`, `start_date`, `end_date`) VALUES
(1, '2023-11-19 16:12:00', '2023-11-21 14:47:00');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_candidates`
--

CREATE TABLE `tbl_candidates` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `position` varchar(100) NOT NULL,
  `image` varchar(100) NOT NULL,
  `platform` varchar(255) NOT NULL,
  `credentials` varchar(255) NOT NULL,
  `partylist` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_candidates`
--

INSERT INTO `tbl_candidates` (`id`, `name`, `position`, `image`, `platform`, `credentials`, `partylist`) VALUES
(30, 'Steven Spedido', 'President', 'image_1700532244867.jpg', 'Monthly allowance worth 3,000 pesos\r\nFree Printing Service', 'SHS Graduate Valedictorian\r\n 5 months of leadership training', 'Rest In Peace Partylist'),
(31, 'Adrian Carranza', 'Vice_President', 'image_1700532333403.jpg', 'Free Training of Art Related \r\nFree Printing Service', 'SHS Graduate Valedictorian\r\n 8 months of leadership training', 'Rest In Peace Partylist'),
(32, 'Winsie Grace Rebaya', 'Secretary', 'image_1700532487226.jpg', 'Free Printing Service', 'SHS Graduate Salutatorian\r\nMonths of leadership training', 'Rest In Peace Partylist'),
(33, 'Emmanuel Sabalboro', 'Treasurer', 'image_1700532609366.jpg', 'Basketball monthly training  \r\nCanva Design monthly training ', 'SHS Graduate Salutatorian\r\n6 Months of leadership training', 'Rest In Peace Partylist'),
(34, 'Rachel Mae Unawa', 'Auditor', 'image_1700532697391.jpg', 'Free Seminar for Small Business\r\nFree Printing Services', 'SHS Graduate with Honors\r\n6 Months of leadership training', 'Rest In Peace Partylist'),
(35, 'Lady Lee Marges', 'Peace_Officer', 'image_1700532753835.jpg', 'Free Printing Service', 'SHS Graduate with Honors\r\n5 Months of leadership training', 'Rest In Peace Partylist'),
(36, 'Jannete Aquino', 'Peace_Officer', 'image_1700532821537.jpg', 'Monthly allowance worth 3,000\r\nFree Printing Service\r\n', 'SHS Graduate with Honors\r\n5 Months of leadership training', 'Rest In Peace Partylist'),
(37, 'Senior Agila', 'President', 'image_1700532992991.jpg', 'Educational Assistance Program \r\nFree Printing Services\r\nFree School Supplies', 'Academic Excellence Awardee \r\nDean\'s Lister (2021 - current)\r\nIskolar ng Bayan (2017-2021)', 'Socorro Group Partylist'),
(38, 'Vice Ganda', 'Vice_President', 'image_1700533065317.jpg', 'Enforcement of GAD Program\r\nFree Printing Services', 'SK Kagawad (2020-2023)\r\nSSG President (2017-2021)', 'Socorro Group Partylist'),
(39, 'Anne Curtis', 'Secretary', 'image_1700533102094.jpg', 'Annual Tiger Talk\r\nFree Printing Services', 'SHS Valedictorian (2015)\r\nPresident\'s Lister', 'Socorro Group Partylist'),
(40, 'Vhong Navarro', 'Treasurer', 'image_1700533164904.jpg', 'Tech Workshops\r\nFree Printing Services', 'SC Treasurer (2018-2021)\r\nExcellence Awardee (2019-2021)', 'Socorro Group Partylist'),
(41, 'Jhong Hilario', 'Auditor', 'image_1700533214607.jpg', 'Free Printing Services', 'SSG Auditor (2018-2021)\r\nConsistent Honor Student ', 'Socorro Group Partylist'),
(42, 'Jugs Hugueta', 'Peace_Officer', 'image_1700533258750.jpg', 'Free School Supplies', ' Academic Excellence Awardee', 'Socorro Group Partylist'),
(43, 'Teddy Corpuz', 'Peace_Officer', 'image_1700533291353.jpg', 'Free School Supplies', 'Academic Excellence Awardee', 'Socorro Group Partylist'),
(44, 'Fredie Marquez', 'President', 'image_1700533367543.jpg', 'Free Breakfast (coffee and bread)\r\nFree to use Internet Laboratory\r\nFree Printing', 'Dean\'s Lister (2020- current)\r\nIsko ni Mayor (2022-current)\r\nSK Chairman (2023)', 'Juanderfull Partylist'),
(45, 'Sara Dumalit', 'Vice_President', 'image_1700533419276.jpg', 'Installing of Cctv at hallways\r\nSeminars for graduating students', 'Dean\'s Lister (2022-current)\r\nAcademic Awardee (2023)', 'Juanderfull Partylist'),
(46, 'Salve Mae Pilit', 'Secretary', 'image_1700533467545.jpg', 'Mental Health Day\r\nSupport students with Disability ', 'SHS Gold Academic Awardee\r\nDean\'s Lister (2022- current)', 'Juanderfull Partylist'),
(47, 'Maria Magda', 'Treasurer', 'image_1700533509775.jpg', 'Educational Assistance \r\nAffordable Membership', 'SHS Academic Awardee\r\nDean\'s Lister (2020-current)', 'Juanderfull Partylist'),
(48, 'Mario Dalibhasa', 'Auditor', 'image_1700533566334.jpg', 'Free meals everyday\r\nProgramming Contest', 'Dean\'s Lister (current)\r\nSK Kagawad', 'Juanderfull Partylist'),
(49, 'Chako Lagui', 'Peace_Officer', 'image_1700533606543.jpg', 'Healing for EveryJuan\r\nSeminars for safety and self defense', 'Dean\'s Lister (current)\r\nTaekwondo (Black Belt)', 'Juanderfull Partylist'),
(50, 'Lae Bogu', 'Peace_Officer', 'image_1700533644166.jpg', 'Mental Health Awareness \r\nNo to Bully Program', 'Dean\'s Lister (2021-current)', 'Juanderfull Partylist');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_users`
--

CREATE TABLE `tbl_users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `image` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_users`
--

INSERT INTO `tbl_users` (`id`, `name`, `username`, `password`, `image`) VALUES
(4, 'sample4', 'sample4@gmail.com', '$2a$10$0S00MvWg22dgCyhbH20rBON/rimQjYhoQ8R0F6vWqDPaZf1hkHx0C', ''),
(5, 'sample1', 'sample1@gmail.com', '$2a$10$sMSOyCui/Wn9NuVA3d9VL.JrRrqCUEb5xEPmR6Y9sCy6Tkiql89Zy', ''),
(6, 'sample3', 'sample3@gmail.com', '$2a$10$10SFGoi53/nBxynlYseQfO/KZu9SC33GlPAlN69TOoucikd8uFZy6', ''),
(7, 'sample2', 'sample2@gmail.com', '$2a$10$7u7T03IMkkiHRtUeZq63m.hh2TcF6E6nbsiiZl9VooJcPBSngqLw2', ''),
(8, 'sample10', 'sample10@gmail.com', '$2a$10$HcoAgyVylFim4n5Z4NV7guGQ3nNutcTwELT8wQbqCMUUYD0QnGnFy', ''),
(9, 'sample11', 'sample11@gmail.com', '$2a$10$gLss8z1uj/HmTgoXUrETOeAw65egIH/aCKggxyarwnF9goLLMd8mK', ''),
(11, 'samplehaha20', 'sample20@gmail.com', '$2a$10$FZVApK6WpyHZU60Qn2E0BuMZj8a4IDGqKDwYh/yLE2zcpGXvBaKzq', ''),
(12, 'samp lehaha21', 'sample21@gmail.com', '$2a$10$2KPU8k6tyCLcmF2lXzKY9u1.ZTLd3NY9.ndMD1Cc2ny83wLsfAeGC', ''),
(13, 'Magelan Puti', 'sample15@gmail.com', '$2a$10$EnrO6mdQAS3/TbLOXD7Sre8DQC322KNlXXH5RTBGMXRlvtSWHgwcK', ''),
(14, 'sample voters', 'voter1@gmail.com', '$2a$10$e4fNLMAlezYVYvwERvc0XuNjcuIjB2eBq9Pit3TiXASwZeUx0AppK', 'image_1700448801403.jpeg'),
(15, 'sample voter2', 'voter2@gmail.com', '$2a$10$Njh0nG2hIZea/jReICYw0uF/4ZNDzxRTF8UL7JsFvjYyGpQOt.sVe', 'image_1700449137960.jpg'),
(16, 'asdasd asdasda', 'voter3@gmail.com', '$2a$10$kEn8zloL8Hoc/p3meQNXYum87GRuHiuRC5QnHyuOrTQyzvFzslVJG', 'image_1700449254837.jpg'),
(17, 'sdasda sdasd', 'voter4a@gmail.com', '$2a$10$Rnb.I1VGN.SF.tTMfRJJAeoJ6gCyk3NymNDiZ4DMLffVODAJtaKe2', 'image_1700449307825.jpg'),
(18, 'Voting System Admin', 'admin@gmail.com', '$2a$10$FtpyXs/e95K8wCcdI0PA3uvvvAVPQpv9eB6/1/5lA.X.gT96L9A.2', 'image_1700449950142.png'),
(19, 'asdasd asdasdasdasd', 'voters30@gmail.com', '$2a$10$k.JpWTvYw4S3mC.UYEw5IuI3Ow3Ip2Xtqc9Kkl1rqWISspQFiAHWe', 'image_1700460159983.png');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_vote`
--

CREATE TABLE `tbl_vote` (
  `id` int(11) NOT NULL,
  `user_id` int(100) NOT NULL,
  `President` varchar(100) NOT NULL,
  `Vice_President` varchar(100) NOT NULL,
  `Secretary` varchar(100) NOT NULL,
  `Treasurer` varchar(100) NOT NULL,
  `Auditor` varchar(100) NOT NULL,
  `Peace_Officer` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_vote`
--

INSERT INTO `tbl_vote` (`id`, `user_id`, `President`, `Vice_President`, `Secretary`, `Treasurer`, `Auditor`, `Peace_Officer`) VALUES
(11, 18, 'Fredie Marquez', 'Vice Ganda', 'Salve Mae Pilit', 'abstainTreasurer', 'Mario Dalibhasa', 'Teddy Corpuz'),
(12, 18, 'Senior Agila', 'Sara Dumalit', 'Salve Mae Pilit', 'Emmanuel Sabalboro', 'Rachel Mae Unawa', 'Chako Lagui'),
(13, 18, 'Senior Agila', 'Vice Ganda', 'Salve Mae Pilit', 'Emmanuel Sabalboro', 'Jhong Hilario', 'Jugs Hugueta'),
(14, 18, 'Steven Spedido', 'Adrian Carranza', 'Winsie Grace Rebaya', 'Maria Magda', 'Rachel Mae Unawa', 'Teddy Corpuz');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `election_settings`
--
ALTER TABLE `election_settings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_candidates`
--
ALTER TABLE `tbl_candidates`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_users`
--
ALTER TABLE `tbl_users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_vote`
--
ALTER TABLE `tbl_vote`
  ADD PRIMARY KEY (`id`,`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `election_settings`
--
ALTER TABLE `election_settings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tbl_candidates`
--
ALTER TABLE `tbl_candidates`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;

--
-- AUTO_INCREMENT for table `tbl_users`
--
ALTER TABLE `tbl_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `tbl_vote`
--
ALTER TABLE `tbl_vote`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
