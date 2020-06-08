-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jun 07, 2020 at 04:05 PM
-- Server version: 8.0.17
-- PHP Version: 7.3.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `myplaygroup-db`
--

-- --------------------------------------------------------

--
-- Table structure for table `mpg_activities`
--

CREATE TABLE `mpg_activities` (
  `id` int(11) NOT NULL,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `idSchool` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `mpg_activities`
--

INSERT INTO `mpg_activities` (`id`, `name`, `idSchool`) VALUES
(1, 'Dibujo de animalitos', 1),
(3, 'Visita de perrito mascota', 1),
(6, 'Actividad 1 superadmin', 0);

-- --------------------------------------------------------

--
-- Table structure for table `mpg_courses`
--

CREATE TABLE `mpg_courses` (
  `id` int(11) NOT NULL,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `active` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `mpg_courses`
--

INSERT INTO `mpg_courses` (`id`, `name`, `active`) VALUES
(1, '2019-2020', 0),
(2, '2020-2021', 1);

-- --------------------------------------------------------

--
-- Table structure for table `mpg_coursesschools`
--

CREATE TABLE `mpg_coursesschools` (
  `idCourse` int(11) NOT NULL,
  `idSchool` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `mpg_coursesschools`
--

INSERT INTO `mpg_coursesschools` (`idCourse`, `idSchool`) VALUES
(2, 1),
(2, 10);

-- --------------------------------------------------------

--
-- Table structure for table `mpg_dishes`
--

CREATE TABLE `mpg_dishes` (
  `id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `idSchool` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `mpg_dishes`
--

INSERT INTO `mpg_dishes` (`id`, `name`, `idSchool`) VALUES
(44, 'Albondigas', 1),
(45, 'Queso fresco sin lactosa', 1),
(46, 'Queso fresco', 1),
(47, 'Yogur', 1),
(49, 'Yogur sin lactosa', 1),
(50, 'Galletas', 1),
(51, 'Lasagna', 1),
(52, 'Macarrones con tomate', 1),
(53, 'Cereales con leche', 1),
(54, 'Patatas con bacon', 1),
(58, 'Pizza', 1),
(59, 'Crema de calabacín con quesito', 1),
(60, 'Merluza a la plancha', 1),
(61, 'Natilla de vainilla', 1),
(62, 'Plátano', 1);

-- --------------------------------------------------------

--
-- Table structure for table `mpg_dishesintolerances`
--

CREATE TABLE `mpg_dishesintolerances` (
  `idDish` int(11) NOT NULL,
  `idIntolerance` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `mpg_dishesintolerances`
--

INSERT INTO `mpg_dishesintolerances` (`idDish`, `idIntolerance`) VALUES
(51, 2),
(54, 1),
(54, 5),
(53, 2),
(50, 3),
(46, 2),
(47, 3),
(47, 2),
(44, 5),
(58, 5),
(58, 1),
(58, 3),
(61, 2),
(59, 3),
(59, 2);

-- --------------------------------------------------------

--
-- Table structure for table `mpg_enrollments`
--

CREATE TABLE `mpg_enrollments` (
  `id` int(11) NOT NULL,
  `idStudent` int(11) NOT NULL,
  `idCourse` int(11) NOT NULL,
  `idSchool` int(11) NOT NULL,
  `fee` varchar(10) NOT NULL,
  `namePicture` varchar(100) NOT NULL,
  `idGroup` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `mpg_enrollments`
--

INSERT INTO `mpg_enrollments` (`id`, `idStudent`, `idCourse`, `idSchool`, `fee`, `namePicture`, `idGroup`) VALUES
(29, 3, 2, 1, '180', 'boy.png', 6),
(31, 33, 2, 1, '150', 'boy.png', 10),
(32, 8, 2, 1, '180', 'boy.png', 10),
(35, 34, 2, 1, '180', 'girl.png', 11),
(36, 11, 2, 10, '100', 'boy.png', 12);

-- --------------------------------------------------------

--
-- Table structure for table `mpg_groups`
--

CREATE TABLE `mpg_groups` (
  `id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `idSchool` int(11) NOT NULL,
  `idTutor` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `mpg_groups`
--

INSERT INTO `mpg_groups` (`id`, `name`, `idSchool`, `idTutor`) VALUES
(1, 'Grupo A San Juan', 2, 7),
(4, 'Grupo A Jerez Norte', 10, 5),
(5, 'Grupo B San Juan', 2, 7),
(6, 'Grupo A Camas', 1, 8),
(7, 'Grupo A Simba', 9, 1),
(9, 'Grupo B Jerez Norte', 10, 5),
(10, 'Grupo B Camas', 1, 11),
(11, 'Grupo C Camas', 1, 6),
(12, 'Grupo A Superadmin', 10, 10);

-- --------------------------------------------------------

--
-- Table structure for table `mpg_homeworks`
--

CREATE TABLE `mpg_homeworks` (
  `id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `idSchool` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `mpg_homeworks`
--

INSERT INTO `mpg_homeworks` (`id`, `name`, `idSchool`) VALUES
(1, 'Colorear la lámina 1', 1),
(4, 'Colorear la lámina 2', 1);

-- --------------------------------------------------------

--
-- Table structure for table `mpg_intolerances`
--

CREATE TABLE `mpg_intolerances` (
  `id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `idSchool` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `mpg_intolerances`
--

INSERT INTO `mpg_intolerances` (`id`, `name`, `idSchool`) VALUES
(1, 'Cerdo', 1),
(2, 'Lactosa', 1),
(3, 'Gluten', 1),
(4, 'Frutos secoss', 1),
(5, 'Carne', 1),
(7, 'Huevo', 9),
(8, 'Marisco', 1),
(9, 'Intolerance superadmin 1', 10),
(10, 'Intolerance superadmin 2', 10);

-- --------------------------------------------------------

--
-- Table structure for table `mpg_kindergartens`
--

CREATE TABLE `mpg_kindergartens` (
  `id` int(11) NOT NULL,
  `CIF` varchar(20) NOT NULL,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `mpg_kindergartens`
--

INSERT INTO `mpg_kindergartens` (`id`, `CIF`, `name`) VALUES
(1, 'K54659832L', 'Mickey Mouse'),
(3, 'J87542165H', 'Patrulla Canina'),
(6, '1231', 'Guarderia Superadmin'),
(9, '12321', 'safdsafdsafsa');

-- --------------------------------------------------------

--
-- Table structure for table `mpg_menuassignments`
--

CREATE TABLE `mpg_menuassignments` (
  `dateMenu` varchar(10) NOT NULL,
  `idGroup` int(11) NOT NULL,
  `idStudent` int(11) NOT NULL,
  `idBreakfast` int(11) NOT NULL,
  `idStarter` int(11) NOT NULL,
  `idMain` int(11) NOT NULL,
  `idDessert` int(11) NOT NULL,
  `idSnack` int(11) NOT NULL,
  `idSchool` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `mpg_menuassignments`
--

INSERT INTO `mpg_menuassignments` (`dateMenu`, `idGroup`, `idStudent`, `idBreakfast`, `idStarter`, `idMain`, `idDessert`, `idSnack`, `idSchool`) VALUES
('20/5/2020', 10, 33, 50, 44, 54, 47, 44, 1),
('20/5/2020', 10, 8, 50, 44, 54, 47, 44, 1),
('20/5/2020', 6, 3, 50, 44, 54, 47, 44, 1),
('21/5/2020', 10, 33, 62, 59, 60, 61, 59, 1),
('21/5/2020', 10, 8, 62, 59, 60, 61, 59, 1),
('21/5/2020', 6, 3, 62, 59, 60, 61, 59, 1),
('21/5/2020', 6, 34, 62, 59, 60, 61, 59, 1),
('27/5/2020', 6, 3, 50, 44, 54, 47, 44, 1);

-- --------------------------------------------------------

--
-- Table structure for table `mpg_menudishes`
--

CREATE TABLE `mpg_menudishes` (
  `idMenu` int(11) NOT NULL,
  `idDish` int(11) NOT NULL,
  `idType` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `mpg_menudishes`
--

INSERT INTO `mpg_menudishes` (`idMenu`, `idDish`, `idType`) VALUES
(96, 50, 1),
(96, 51, 2),
(96, 58, 3),
(96, 49, 4),
(96, 51, 5),
(98, 50, 1),
(98, 44, 2),
(98, 54, 3),
(98, 47, 4),
(98, 44, 5),
(99, 62, 1),
(99, 59, 2),
(99, 60, 3),
(99, 61, 4),
(99, 59, 5),
(100, 44, 1),
(100, 53, 2),
(100, 54, 3),
(100, 45, 4),
(100, 53, 5);

-- --------------------------------------------------------

--
-- Table structure for table `mpg_menus`
--

CREATE TABLE `mpg_menus` (
  `id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `idSchool` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `mpg_menus`
--

INSERT INTO `mpg_menus` (`id`, `name`, `idSchool`) VALUES
(96, 'Menu Italiano sin lactosa', 1),
(98, 'Menu carne con lactosa', 1),
(99, 'Menú de pescado', 1),
(100, 'Menu superadmin', 2);

-- --------------------------------------------------------

--
-- Table structure for table `mpg_parents`
--

CREATE TABLE `mpg_parents` (
  `id` int(11) NOT NULL,
  `dni` varchar(30) CHARACTER SET latin1 COLLATE latin1_german1_ci NOT NULL,
  `name` varchar(50) CHARACTER SET latin1 COLLATE latin1_german1_ci NOT NULL,
  `surname` varchar(50) CHARACTER SET latin1 COLLATE latin1_german1_ci NOT NULL,
  `type` int(11) NOT NULL,
  `idUser` int(11) NOT NULL,
  `idSchool` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `mpg_parents`
--

INSERT INTO `mpg_parents` (`id`, `dni`, `name`, `surname`, `type`, `idUser`, `idSchool`) VALUES
(1, '32063768C', 'Jose Antonio', 'Adriano Munoz', 1, 468, 1),
(2, 'X5676101T', 'Aicha', 'Rami Messaoudi', 2, 0, 1),
(4, 'X5676102R', 'Khawla', 'Rami Messaoudi', 2, 0, 9),
(6, '32063768C', 'Superadmin', 'Adriano', 1, 462, 0),
(8, '32548754L', 'Mohammed', 'Ahmadi', 1, 481, 1);

-- --------------------------------------------------------

--
-- Table structure for table `mpg_psychologists`
--

CREATE TABLE `mpg_psychologists` (
  `id` int(11) NOT NULL,
  `dni` varchar(30) CHARACTER SET latin1 COLLATE latin1_german1_ci NOT NULL,
  `name` varchar(50) CHARACTER SET latin1 COLLATE latin1_german1_ci NOT NULL,
  `surname` varchar(50) CHARACTER SET latin1 COLLATE latin1_german1_ci NOT NULL,
  `idUser` int(11) NOT NULL,
  `idSchool` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `mpg_psychologists`
--

INSERT INTO `mpg_psychologists` (`id`, `dni`, `name`, `surname`, `idUser`, `idSchool`) VALUES
(1, '32654512A', 'Agustín María', 'Ruiseco Mayordomo', 0, 6),
(4, '54218745U', 'María Teresa', 'Aguado Caminero', 483, 1),
(5, '21549865J', 'Psicologo', 'Superadmin', 0, 10);

-- --------------------------------------------------------

--
-- Table structure for table `mpg_schools`
--

CREATE TABLE `mpg_schools` (
  `id` int(11) NOT NULL,
  `idKindergarten` int(11) NOT NULL,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `address` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `mpg_schools`
--

INSERT INTO `mpg_schools` (`id`, `idKindergarten`, `name`, `address`) VALUES
(1, 1, 'Guarderia de Camas', 'asdasdsadadsa'),
(2, 3, 'Guarderia de San Juan de Aznalfarache', 'ASDSADSADSADASDASDA'),
(9, 3, 'Guarderia de Villaverde', 'Calle sin numero'),
(10, 6, 'Centro Superadmin', 'asda');

-- --------------------------------------------------------

--
-- Table structure for table `mpg_staffs`
--

CREATE TABLE `mpg_staffs` (
  `id` int(11) NOT NULL,
  `dni` varchar(30) CHARACTER SET latin1 COLLATE latin1_german1_ci NOT NULL,
  `name` varchar(50) CHARACTER SET latin1 COLLATE latin1_german1_ci NOT NULL,
  `surname` varchar(50) CHARACTER SET latin1 COLLATE latin1_german1_ci NOT NULL,
  `idUser` int(11) NOT NULL,
  `idSchool` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `mpg_staffs`
--

INSERT INTO `mpg_staffs` (`id`, `dni`, `name`, `surname`, `idUser`, `idSchool`) VALUES
(1, '32215419B', 'Juan Miguel', 'Pérez Salgado', 0, 6),
(3, '32541487Q', 'Juan José', 'López Mendilibar', 0, 1),
(5, '21548752K', 'Personal', 'Superadmin', 0, 10);

-- --------------------------------------------------------

--
-- Table structure for table `mpg_students`
--

CREATE TABLE `mpg_students` (
  `id` int(11) NOT NULL,
  `dni` varchar(30) CHARACTER SET latin1 COLLATE latin1_german1_ci NOT NULL,
  `name` varchar(50) CHARACTER SET latin1 COLLATE latin1_german1_ci NOT NULL,
  `surname` varchar(50) CHARACTER SET latin1 COLLATE latin1_german1_ci NOT NULL,
  `idResponsable1` int(11) NOT NULL,
  `idResponsable2` int(11) NOT NULL,
  `idSchool` int(11) NOT NULL,
  `dateBirth` varchar(10) NOT NULL,
  `genre` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `mpg_students`
--

INSERT INTO `mpg_students` (`id`, `dni`, `name`, `surname`, `idResponsable1`, `idResponsable2`, `idSchool`, `dateBirth`, `genre`) VALUES
(3, '32546598U', 'Nidhal', 'Adriano Rami', 1, 2, 1, '4/10/2017', 1),
(8, '32548754L', 'Samuel', 'Adriano Rami', 1, 2, 1, '2/2/2019', 1),
(9, '32542198L', 'Ilyan', 'Rami Messaoudi', 4, 4, 9, '', 1),
(11, '32658754P', 'Yahya', 'Superadmin', 6, 6, 10, '19/2/2018', 1),
(12, '325421659J', 'Abdullah', 'Superadmin', 6, 6, 10, '19/2/2019', 1),
(13, '54872154O', 'Abdurahman', 'Rami Messaoudi', 4, 2, 9, '', 1),
(33, '32542162M', 'Muslim', 'Ahmadi', 8, 8, 1, '4/2/2017', 1),
(34, '54218767U', 'Amira', 'Adriano Rami', 1, 2, 1, '2/4/2020', 2),
(35, '32541287L', 'Martín', 'Adriano Rami', 1, 2, 1, '1/3/2018', 1);

-- --------------------------------------------------------

--
-- Table structure for table `mpg_studentsdailyregister`
--

CREATE TABLE `mpg_studentsdailyregister` (
  `idStudent` int(11) NOT NULL,
  `depositions` int(11) NOT NULL,
  `meals` int(11) NOT NULL,
  `nap` int(11) NOT NULL,
  `remarks` varchar(300) NOT NULL,
  `dateRegister` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `mpg_studentsdailyregister`
--

INSERT INTO `mpg_studentsdailyregister` (`idStudent`, `depositions`, `meals`, `nap`, `remarks`, `dateRegister`) VALUES
(3, 2, 1, 2, 'asda', '19/5/2020'),
(8, 5, 2, 2, 'Se ha portado regular', '20/5/2020'),
(3, 3, 1, 1, 'Se ha portado muy bien', '20/5/2020'),
(3, 4, 2, 1, 'se esta portando muy mal', '21/5/2020'),
(34, 1, 1, 1, '', '21/5/2020'),
(3, 3, 2, 2, 'Buen comportamiento', '27/5/2020');

-- --------------------------------------------------------

--
-- Table structure for table `mpg_studentsintolerances`
--

CREATE TABLE `mpg_studentsintolerances` (
  `idStudent` int(11) NOT NULL,
  `idIntolerance` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `mpg_studentsintolerances`
--

INSERT INTO `mpg_studentsintolerances` (`idStudent`, `idIntolerance`) VALUES
(19, 1),
(32, 4),
(13, 5),
(13, 1),
(3, 5),
(3, 1),
(3, 2),
(33, 5),
(33, 1),
(8, 5),
(8, 1),
(8, 4),
(34, 5),
(34, 1),
(11, 9),
(12, 9),
(12, 10),
(35, 1),
(35, 2);

-- --------------------------------------------------------

--
-- Table structure for table `mpg_teachers`
--

CREATE TABLE `mpg_teachers` (
  `id` int(11) NOT NULL,
  `dni` varchar(30) CHARACTER SET latin1 COLLATE latin1_german1_ci NOT NULL,
  `name` varchar(50) CHARACTER SET latin1 COLLATE latin1_german1_ci NOT NULL,
  `surname` varchar(50) CHARACTER SET latin1 COLLATE latin1_german1_ci NOT NULL,
  `idSchool` int(11) NOT NULL,
  `idUser` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `mpg_teachers`
--

INSERT INTO `mpg_teachers` (`id`, `dni`, `name`, `surname`, `idSchool`, `idUser`) VALUES
(1, '32549865K', 'Teresa - Simba', 'Gómez López', 9, 0),
(5, '32659854J', 'María del Carmen - Jerez Norte', 'Aguilar Aguado', 10, 0),
(6, '32124598S', 'María Dolores', 'Martínez Guadalajara', 1, 0),
(7, '32548754A', 'Paula - San Juan', 'Ramírez Córdoba', 2, 0),
(8, '32549865U', 'Juana', 'Hidalgo Ruiz', 1, 480),
(10, '32542198L', 'Tutor', 'Superadmin', 10, 0),
(11, '54872152', 'Martina', 'González', 1, 479);

-- --------------------------------------------------------

--
-- Table structure for table `mpg_users`
--

CREATE TABLE `mpg_users` (
  `id` int(11) NOT NULL,
  `username` varchar(100) CHARACTER SET latin1 COLLATE latin1_german1_ci NOT NULL,
  `password` varchar(20) CHARACTER SET latin1 COLLATE latin1_german1_ci NOT NULL,
  `idType` int(11) NOT NULL,
  `activated` int(11) NOT NULL,
  `lastConnection` date NOT NULL,
  `favouriteLang` int(11) NOT NULL,
  `idSchool` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_german1_ci;

--
-- Dumping data for table `mpg_users`
--

INSERT INTO `mpg_users` (`id`, `username`, `password`, `idType`, `activated`, `lastConnection`, `favouriteLang`, `idSchool`) VALUES
(462, 'adriano.joseantonio@gmail.com', '1234', 1, 1, '0000-00-00', 2, 10),
(463, 'admin@guarderiadecamas.com', '1234', 2, 1, '0000-00-00', 2, 1),
(464, 'admin@guarderiasanjuan.com', '1234', 2, 1, '0000-00-00', 2, 2),
(465, 'admin@guarderiasimba.com', '1234', 2, 1, '0000-00-00', 2, 9),
(468, 'yusuf@padre.com', '1234', 5, 1, '0000-00-00', 2, 1),
(469, 'aicha@madre.com', '1234', 5, 1, '0000-00-00', 2, 1),
(470, 'demo@myplaygroup.com', '1234', 99, 1, '0000-00-00', 2, 0),
(479, 'martina@guarderiadecamas.com', 'YK itb5m6', 3, 1, '0000-00-00', 2, 1),
(480, 'juana@guarderiadecamas.com', '4xVx 8tFF', 3, 1, '0000-00-00', 2, 1),
(481, 'ahmadi@movistar.es', 'D9$MYmbPG', 5, 1, '0000-00-00', 2, 1),
(483, 'teresa@guarderiadecamas.com', 'T7x$Qu?$n', 4, 1, '0000-00-00', 2, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `mpg_activities`
--
ALTER TABLE `mpg_activities`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `mpg_courses`
--
ALTER TABLE `mpg_courses`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `mpg_dishes`
--
ALTER TABLE `mpg_dishes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `mpg_enrollments`
--
ALTER TABLE `mpg_enrollments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `mpg_groups`
--
ALTER TABLE `mpg_groups`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `mpg_homeworks`
--
ALTER TABLE `mpg_homeworks`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `mpg_intolerances`
--
ALTER TABLE `mpg_intolerances`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `mpg_kindergartens`
--
ALTER TABLE `mpg_kindergartens`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `mpg_menus`
--
ALTER TABLE `mpg_menus`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `mpg_parents`
--
ALTER TABLE `mpg_parents`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `mpg_psychologists`
--
ALTER TABLE `mpg_psychologists`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `mpg_schools`
--
ALTER TABLE `mpg_schools`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `mpg_staffs`
--
ALTER TABLE `mpg_staffs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `mpg_students`
--
ALTER TABLE `mpg_students`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `mpg_teachers`
--
ALTER TABLE `mpg_teachers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `mpg_users`
--
ALTER TABLE `mpg_users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `mpg_activities`
--
ALTER TABLE `mpg_activities`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `mpg_courses`
--
ALTER TABLE `mpg_courses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=66;

--
-- AUTO_INCREMENT for table `mpg_dishes`
--
ALTER TABLE `mpg_dishes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=67;

--
-- AUTO_INCREMENT for table `mpg_enrollments`
--
ALTER TABLE `mpg_enrollments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `mpg_groups`
--
ALTER TABLE `mpg_groups`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `mpg_homeworks`
--
ALTER TABLE `mpg_homeworks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `mpg_intolerances`
--
ALTER TABLE `mpg_intolerances`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `mpg_kindergartens`
--
ALTER TABLE `mpg_kindergartens`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `mpg_menus`
--
ALTER TABLE `mpg_menus`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=101;

--
-- AUTO_INCREMENT for table `mpg_parents`
--
ALTER TABLE `mpg_parents`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `mpg_psychologists`
--
ALTER TABLE `mpg_psychologists`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `mpg_schools`
--
ALTER TABLE `mpg_schools`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `mpg_staffs`
--
ALTER TABLE `mpg_staffs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `mpg_students`
--
ALTER TABLE `mpg_students`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `mpg_teachers`
--
ALTER TABLE `mpg_teachers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `mpg_users`
--
ALTER TABLE `mpg_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=484;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
