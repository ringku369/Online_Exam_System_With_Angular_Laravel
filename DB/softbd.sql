-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 17, 2021 at 10:27 AM
-- Server version: 10.1.36-MariaDB
-- PHP Version: 7.2.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `softbd`
--

-- --------------------------------------------------------

--
-- Table structure for table `ansheets`
--

CREATE TABLE `ansheets` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(11) NOT NULL,
  `exam_id` int(11) DEFAULT NULL,
  `question_id` int(11) DEFAULT NULL,
  `name` varchar(32) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `mark` float DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `answers`
--

CREATE TABLE `answers` (
  `id` int(10) UNSIGNED NOT NULL,
  `question_id` int(11) DEFAULT NULL,
  `option_id` int(11) DEFAULT NULL,
  `name` varchar(32) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `answers`
--

INSERT INTO `answers` (`id`, `question_id`, `option_id`, `name`, `status`, `created_at`, `updated_at`) VALUES
(5, 1, 1, NULL, 1, '2021-07-07 11:38:50', '2021-07-07 11:38:50'),
(9, 1, 2, NULL, 1, '2021-07-07 12:19:22', '2021-07-07 12:19:22'),
(10, 2, 8, NULL, 1, '2021-07-07 12:19:30', '2021-07-07 12:19:30'),
(11, 2, 6, NULL, 1, '2021-07-08 03:46:03', '2021-07-08 03:46:03'),
(12, 3, 10, NULL, 1, '2021-07-11 09:46:27', '2021-07-11 09:46:27'),
(13, 4, 20, NULL, 1, '2021-07-13 13:38:43', '2021-07-13 13:38:43'),
(14, 4, 21, NULL, 1, '2021-07-13 13:38:48', '2021-07-13 13:38:48'),
(15, 5, 26, NULL, 1, '2021-07-17 01:36:34', '2021-07-17 01:36:34');

-- --------------------------------------------------------

--
-- Table structure for table `banks`
--

CREATE TABLE `banks` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(11) NOT NULL,
  `name` varchar(32) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `banks`
--

INSERT INTO `banks` (`id`, `user_id`, `name`, `status`, `created_at`, `updated_at`) VALUES
(5, 3, 'Question Bank - 1', 1, '2021-07-07 12:17:11', '2021-07-07 12:18:26'),
(7, 3, 'Question Bank - 2', 1, '2021-07-07 12:18:43', '2021-07-07 12:18:43'),
(8, 3, 'Question Bank - 3', 1, '2021-07-13 13:48:40', '2021-07-13 13:48:40'),
(9, 3, 'Question Bank - 4', 1, '2021-07-17 01:36:49', '2021-07-17 01:36:49');

-- --------------------------------------------------------

--
-- Table structure for table `examdatas`
--

CREATE TABLE `examdatas` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `exam_id` int(11) DEFAULT NULL,
  `bank_id` int(11) DEFAULT NULL,
  `question_id` int(11) DEFAULT NULL,
  `option_id` int(11) DEFAULT NULL,
  `name` varchar(32) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `exams`
--

CREATE TABLE `exams` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `bank_id` int(11) DEFAULT NULL,
  `name` varchar(32) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `examdate` date DEFAULT NULL,
  `examtime` time DEFAULT NULL,
  `datetime` datetime DEFAULT NULL,
  `duration` int(11) NOT NULL DEFAULT '0',
  `type` enum('false','true') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'false' COMMENT '0=exam time, 1 = ques time',
  `isnegetive` enum('false','true') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'false' COMMENT '0=Inactive,1=Active',
  `status` int(11) NOT NULL DEFAULT '0',
  `isrunning` tinyint(1) DEFAULT '0',
  `iscomplete` tinyint(1) NOT NULL DEFAULT '0',
  `note` varchar(256) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `exams`
--

INSERT INTO `exams` (`id`, `user_id`, `bank_id`, `name`, `examdate`, `examtime`, `datetime`, `duration`, `type`, `isnegetive`, `status`, `isrunning`, `iscomplete`, `note`, `created_at`, `updated_at`) VALUES
(8, 3, 5, 'Exam-1', '2021-07-09', '20:33:00', '2021-07-09 20:33:00', 2, 'false', 'true', 1, 1, 1, 'Answer sheet should be submitted in define time otherwise it\'s will not be eligible', '2021-07-09 06:34:25', '2021-07-13 01:00:44'),
(9, 3, 7, 'Exam-2', '2021-07-15', '14:41:00', '2021-07-15 14:41:00', 2, 'false', 'true', 1, 0, 0, 'Answer sheet should be submitted in define time otherwise it\'s will not be eligible', '2021-07-13 13:41:32', '2021-07-13 13:43:29'),
(10, NULL, 8, 'Exam-3', '2021-07-15', '09:55:00', '2021-07-15 09:55:00', 2, 'false', 'true', 1, 0, 0, 'Answer sheet should be submitted in define time otherwise it\'s will not be eligible', '2021-07-15 08:54:40', '2021-07-17 01:37:27');

-- --------------------------------------------------------

--
-- Table structure for table `options`
--

CREATE TABLE `options` (
  `id` int(10) UNSIGNED NOT NULL,
  `question_id` int(11) DEFAULT NULL,
  `name` varchar(32) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `options`
--

INSERT INTO `options` (`id`, `question_id`, `name`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, 'Option-1', 1, '2021-07-07 10:33:49', '2021-07-07 10:33:49'),
(2, 1, 'Option-2', 1, '2021-07-07 10:36:26', '2021-07-07 10:36:26'),
(3, 1, 'Option-3', 1, '2021-07-07 10:36:42', '2021-07-07 10:36:42'),
(4, 1, 'Option-4', 1, '2021-07-07 10:36:51', '2021-07-07 10:36:51'),
(5, 2, 'Option-5', 1, '2021-07-07 10:37:04', '2021-07-07 10:37:04'),
(6, 2, 'Option-6', 1, '2021-07-07 10:37:14', '2021-07-07 10:37:26'),
(7, 2, 'Option-7', 1, '2021-07-07 10:37:59', '2021-07-07 10:37:59'),
(8, 2, 'Option-8', 1, '2021-07-07 10:38:08', '2021-07-07 10:38:08'),
(10, 3, 'Option-9', 1, '2021-07-11 08:24:42', '2021-07-11 08:26:16'),
(11, 3, 'Option-10', 1, '2021-07-11 08:24:42', '2021-07-11 08:27:00'),
(17, 3, 'Option-11', 1, '2021-07-11 08:29:39', '2021-07-11 08:29:39'),
(18, 3, 'option-12', 1, '2021-07-11 08:29:39', '2021-07-11 08:29:39'),
(19, 4, 'option-13', 1, '2021-07-13 13:38:26', '2021-07-13 13:38:26'),
(20, 4, 'option-14', 1, '2021-07-13 13:38:26', '2021-07-13 13:38:26'),
(21, 4, 'option-15', 1, '2021-07-13 13:38:26', '2021-07-13 13:38:26'),
(22, 4, 'option-16', 1, '2021-07-13 13:38:27', '2021-07-13 13:38:27'),
(23, 5, 'option-17', 1, '2021-07-17 01:36:21', '2021-07-17 01:36:21'),
(24, 5, 'option-18', 1, '2021-07-17 01:36:21', '2021-07-17 01:36:21'),
(25, 5, 'option-19', 1, '2021-07-17 01:36:21', '2021-07-17 01:36:21'),
(26, 5, 'option-20', 1, '2021-07-17 01:36:21', '2021-07-17 01:36:21');

-- --------------------------------------------------------

--
-- Table structure for table `questionbanks`
--

CREATE TABLE `questionbanks` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `question_id` int(11) DEFAULT NULL,
  `bank_id` int(11) DEFAULT NULL,
  `name` varchar(32) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `questionbanks`
--

INSERT INTO `questionbanks` (`id`, `user_id`, `question_id`, `bank_id`, `name`, `status`, `created_at`, `updated_at`) VALUES
(1, 3, 1, 5, NULL, 1, '2021-07-08 03:02:36', '2021-07-08 03:02:36'),
(2, 3, 2, 5, NULL, 1, '2021-07-08 03:02:36', '2021-07-08 03:02:36'),
(6, 3, 1, 7, NULL, 1, '2021-07-08 03:35:15', '2021-07-08 03:35:15'),
(7, 3, 2, 7, NULL, 1, '2021-07-08 03:35:15', '2021-07-08 03:35:15'),
(8, 3, 3, 5, NULL, 1, '2021-07-11 09:08:09', '2021-07-11 09:08:09'),
(9, 3, 3, 7, NULL, 1, '2021-07-13 13:40:08', '2021-07-13 13:40:08'),
(10, 3, 4, 7, NULL, 1, '2021-07-13 13:40:08', '2021-07-13 13:40:08'),
(18, 3, 1, 9, NULL, 1, '2021-07-17 02:22:35', '2021-07-17 02:22:35'),
(19, 3, 2, 9, NULL, 1, '2021-07-17 02:22:35', '2021-07-17 02:22:35'),
(20, 3, 1, 8, NULL, 1, '2021-07-17 02:24:30', '2021-07-17 02:24:30'),
(21, 3, 2, 8, NULL, 1, '2021-07-17 02:24:30', '2021-07-17 02:24:30'),
(22, 3, 3, 8, NULL, 1, '2021-07-17 02:24:30', '2021-07-17 02:24:30');

-- --------------------------------------------------------

--
-- Table structure for table `questions`
--

CREATE TABLE `questions` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(11) NOT NULL COMMENT 'teacher id',
  `name` varchar(32) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `mark` float NOT NULL DEFAULT '0',
  `nmark` float NOT NULL DEFAULT '0',
  `isnegative` tinyint(1) NOT NULL DEFAULT '0',
  `tac` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `questions`
--

INSERT INTO `questions` (`id`, `user_id`, `name`, `mark`, `nmark`, `isnegative`, `tac`, `status`, `created_at`, `updated_at`) VALUES
(1, 21, 'Question-1', 1.5, 1.5, 0, 2, 1, '2021-07-07 10:21:12', '2021-07-07 10:21:12'),
(2, 22, 'Question-2', 2.5, 2.5, 0, 2, 1, '2021-07-07 10:24:11', '2021-07-07 10:24:11'),
(3, 22, 'Question-3', 3.5, 3.5, 0, 1, 1, '2021-07-11 08:19:37', '2021-07-11 08:19:37'),
(4, 22, 'Question-4', 2.5, 2.5, 0, 2, 1, '2021-07-13 13:37:40', '2021-07-13 13:37:40'),
(5, 22, 'Question-5', 1, 1, 0, 1, 1, '2021-07-17 01:35:36', '2021-07-17 01:35:36');

-- --------------------------------------------------------

--
-- Table structure for table `settings`
--

CREATE TABLE `settings` (
  `id` int(10) UNSIGNED NOT NULL,
  `setting` varchar(256) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `currency` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `code` varchar(256) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `timezone` varchar(512) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `hotline` varchar(256) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `contact` varchar(256) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `vat` float DEFAULT NULL,
  `semail` varchar(256) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `outdhaka` float NOT NULL DEFAULT '200',
  `indhaka` float NOT NULL DEFAULT '50',
  `serviceindhaka` float NOT NULL DEFAULT '0',
  `msindhaka` float NOT NULL DEFAULT '1000',
  `favicon` varchar(256) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `logo` varchar(256) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=COMPACT;

--
-- Dumping data for table `settings`
--

INSERT INTO `settings` (`id`, `setting`, `currency`, `code`, `timezone`, `hotline`, `contact`, `vat`, `semail`, `outdhaka`, `indhaka`, `serviceindhaka`, `msindhaka`, `favicon`, `logo`, `created_at`, `updated_at`) VALUES
(1, 'Do', 'BDT', '৳', 'Asia/Dhaka', '8801911501888', '8801911501888', 5, 'nanoitworld@gmail.com', 500, 200, 0, 1000, '1532605359101700124.png', '1532605359134687171.png', '2018-05-29 18:00:00', '2018-09-12 16:43:14');

-- --------------------------------------------------------

--
-- Table structure for table `userexdatas`
--

CREATE TABLE `userexdatas` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `exam_id` int(11) DEFAULT NULL,
  `bank_id` int(11) DEFAULT NULL,
  `name` varchar(32) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `examdate` date DEFAULT NULL,
  `examtime` time DEFAULT NULL,
  `datetime` datetime DEFAULT NULL,
  `duration` int(11) NOT NULL DEFAULT '0',
  `type` enum('false','true') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'false' COMMENT '0=exam time, 1 = ques time',
  `isnegetive` enum('false','true') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'false' COMMENT '0=Inactive,1=Active',
  `status` tinyint(4) NOT NULL DEFAULT '0' COMMENT 'result status ',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `username` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '2020',
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `contact` varchar(32) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `balance` double NOT NULL DEFAULT '0',
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `level` int(11) NOT NULL DEFAULT '100' COMMENT '1000=Super Admin, 500=Admin, 400=Teacher, 100=Student',
  `role` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'User' COMMENT '1000=Super Admin, 500=Admin, 400=Teacher, 100=Student',
  `status` tinyint(4) NOT NULL DEFAULT '1',
  `active` tinyint(4) NOT NULL DEFAULT '1',
  `_lft` bigint(20) UNSIGNED NOT NULL DEFAULT '0',
  `_rgt` bigint(20) UNSIGNED NOT NULL DEFAULT '0',
  `parent_id` int(10) UNSIGNED DEFAULT NULL,
  `refer_id` bigint(20) DEFAULT NULL,
  `position` tinyint(4) NOT NULL DEFAULT '1' COMMENT '0=Head, 1=Left, 2=Right',
  `isposition` varchar(5) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'L',
  `ismatch` tinyint(4) NOT NULL DEFAULT '0',
  `gencount` int(11) NOT NULL DEFAULT '0',
  `verifycode` int(11) DEFAULT NULL,
  `district` varchar(64) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` varchar(256) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `profession` varchar(64) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `gender` varchar(32) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `bmcount` int(11) NOT NULL DEFAULT '0',
  `rank_id` int(11) NOT NULL DEFAULT '1',
  `bank_id` int(11) NOT NULL DEFAULT '1',
  `acno` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '123123',
  `type` enum('Saving','Current') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Current',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `name`, `email`, `contact`, `balance`, `email_verified_at`, `password`, `remember_token`, `level`, `role`, `status`, `active`, `_lft`, `_rgt`, `parent_id`, `refer_id`, `position`, `isposition`, `ismatch`, `gencount`, `verifycode`, `district`, `address`, `profession`, `gender`, `bmcount`, `rank_id`, `bank_id`, `acno`, `type`, `created_at`, `updated_at`) VALUES
(1, '10000', 'Vizz BD', 'ringku369@gmail.com', '01712616057', 10007.5, NULL, '$2y$10$wwpIn1INiHqGurESsMMTGOjDjzb4beQKq/tk3COT79NQLMkq80uKC', '$2y$10$RNXT6oJ74YOnD3u47gQ/jOsZHCO7QXuhd969g1AfP.sYHxfx167HW', 1000, 'Superadmin', 1, 1, 1, 198, NULL, NULL, 0, 'N', 1, 0, NULL, NULL, NULL, NULL, 'Male', 1, 7, 1, '10000', 'Current', '2021-02-21 04:26:06', '2021-04-07 05:00:14'),
(2, '15000', 'Vizz BD', 'vizzclub786@gmail.com', '01758406100', 8650, NULL, '$2y$10$wwpIn1INiHqGurESsMMTGOjDjzb4beQKq/tk3COT79NQLMkq80uKC', '$2y$10$gGAWXd7lrJyD13gv/rCTke9Lvt7nY8sPT6SnwEwkYn/JIb/.lUvK6', 500, 'Admin', 1, 1, 136, 153, 1, 1, 1, 'L', 1, 0, NULL, 'CHP', 'World', 'Business', 'Male', 8, 7, 1, '15000', 'Current', '2021-02-21 09:54:34', '2021-07-01 23:54:25'),
(3, '20000', 'Md. Sanaullah', 'linkbrt@gmail.com', '01712616057', 11210, NULL, '$2y$10$IBCE5ftxay498AJnVKA1sOE7DYbSQa1DsallCwBI.J22qkfeKYyIS', '$2y$10$ef3JkGZRlBcdXKk183yzO.JQPgrXdbJfKHJMaqGOVJW2kxK.jo9Jm', 500, 'Admin', 1, 1, 154, 197, 1, 1, 2, 'R', 0, 0, NULL, 'Rajshahi', 'Vhatapara, Rajshahi', 'Software Engineer', 'Male', 0, 7, 7, '20000', 'Current', '2021-02-21 09:54:52', '2021-07-02 09:35:39'),
(7, '20001', 'Student - 1', 'Student1@gmail.com', '01758406100', 500, NULL, '$2y$10$15A3/KhEiORGH5DuiC5WQeZy.W5d1O5U.HvMb7ic9Z1wJocIwcIFy', '$2y$10$CE7fKvgKTQKffJUgk0Ffd.TvSRuDbNuWDi3AoRcGf95OKEXUprWeG', 100, 'User', 1, 1, 169, 170, 3, NULL, 1, 'L', 0, 0, NULL, 'Rajshahi', 'Vhatapara, Rajshahi', 'Software Engineer', 'Male', 0, 1, 1, '40002', 'Current', '2021-06-30 00:36:07', '2021-07-07 09:58:18'),
(9, '20002', 'Student- 2', 'student2@gmail.com', '01712616057', 4620, NULL, '$2y$10$FlFE0SMvS4b6ofIn39YCrObhIxFu9hy7nY0OlzxlKSmN/DUgLuylC', '$2y$10$Tr3pl1iln9Ulzlc0UMjD7ue9qUg8CV0.UcljKW3xoMBkRco9NZyoK', 100, 'User', 1, 1, 173, 174, 3, NULL, 1, 'L', 0, 0, NULL, 'Rajshahi', 'Vhatapara, Rajshahi', 'Business', 'Male', 0, 2, 3, '40004', 'Current', '2021-06-30 00:45:47', '2021-07-07 09:58:34'),
(10, '20003', 'Student- 3', 'student3@gmail.com', '01712616057', 400, NULL, '$2y$10$q2x9aevRow7he21R0V0S9.nnT75z9a6XnPLyIFXr3sLeHkkyfc9Dq', '$2y$10$AZoz.ss99WrvycvN60tCceigr1lRkVCiCpBafxdBsZobtsCFXo0SO', 100, 'User', 1, 1, 175, 176, 3, NULL, 1, 'L', 0, 0, NULL, 'Rajshahi', 'Vhatapara, Rajshahi', 'Business', 'Male', 0, 3, 7, '40006', 'Current', '2021-06-30 00:48:28', '2021-07-07 09:59:01'),
(11, '20004', 'Student - 4', 'student4@gmail.com', '01712616057', 420, NULL, '$2y$10$EXLuG8aRzumFMHgFHrMQ3eSgCQPpeeoo69djuPIwTGjtf.mZtaK1S', '$2y$10$fusHqWVpGtKZiwov2nApGemfCBJI.2QzBPSB77OjpRjRK2xtOWuwG', 100, 'User', 1, 1, 177, 178, 3, NULL, 1, 'L', 0, 0, NULL, 'Rajshahi', 'Vhatapara, Rajshahi', 'Software Engineer', 'Male', 0, 3, 3, '40008', 'Current', '2021-06-30 00:49:27', '2021-07-07 09:59:14'),
(12, '20005', 'Student - 5', 'student5@gmail.com', '01712616057', 300, NULL, '$2y$10$MW8Dd8NqZ72BlT5QqEtNaOYeSsyP2lpbItVekrEWfnEIzHMrUPdqW', '$2y$10$9n6EfE4uk1POiKuK6JRdIeVRk/7h7TXGkWNtaSd.vlijrFACg839.', 100, 'User', 1, 1, 179, 180, 3, NULL, 1, 'L', 0, 0, NULL, 'Chapai', 'Gulbaj, Chapainawabgonj', 'Software Engineer', 'Male', 0, 4, 1, '40010', 'Current', '2021-06-30 00:51:23', '2021-07-07 09:59:26'),
(21, '20013', 'Teacher-1', 'teacher1@gmail.com', '01712616057', 0, NULL, '$2y$10$vf3PGOFQ9NVbxZb4sSoubeUnPtYR6anOXOmPJunITG0SevGdCsXAK', '$2y$10$umpuAbb1f5hmEZ6HEEvfNODde.lRU7ZKVJz.TF.PO7edlUvXpDhba', 400, 'Teacher', 1, 1, 191, 192, 3, NULL, 1, 'L', 0, 0, NULL, 'Rajshahi', 'Vhatapara, Rajshahi', 'Math Teacher', 'Male', 0, 1, 1, '40026', 'Current', '2021-07-07 09:43:07', '2021-07-07 09:43:07'),
(22, '20014', 'Teacher-2', 'teacher2@gmail.com', '01712616057', 0, NULL, '$2y$10$qXeGMJ0uDe00lJH4Kq0ucewgLgNONMbJjlPkPHyx6PyqaUrs7v2Se', '$2y$10$YH210mNM2BJNnfvM/KMc5.FaPKP25S7Yzekl0Yb5.sCoUZAbxP2K6', 400, 'Teacher', 1, 1, 193, 194, 3, NULL, 1, 'L', 0, 0, NULL, 'Rajshahi', 'Gulbaj, Chapainawabgonj', 'English Teacher', 'Male', 0, 1, 1, '40028', 'Current', '2021-07-07 09:46:08', '2021-07-07 09:46:08'),
(23, '20015', 'Student - 6', 'student6@gmail.com', '01712616057', 0, NULL, '$2y$10$cY348bLtEcRBRC4BXDL.9.7KUm8q0HU05uZ3YZixC2XLDMi19Hk9m', '$2y$10$QsKXreGqSRRABdCqvuQ8vOuUVXTD0GZiRBm925eTlamyxB7NvamYm', 100, 'User', 1, 1, 195, 196, 3, NULL, 1, 'L', 0, 0, NULL, 'Rajshahi', 'Vhatapara, Rajshahi', 'Student', 'Male', 0, 1, 1, '40030', 'Current', '2021-07-14 09:16:59', '2021-07-14 09:16:59');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `ansheets`
--
ALTER TABLE `ansheets`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `answers`
--
ALTER TABLE `answers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `banks`
--
ALTER TABLE `banks`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `examdatas`
--
ALTER TABLE `examdatas`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `exams`
--
ALTER TABLE `exams`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `options`
--
ALTER TABLE `options`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `questionbanks`
--
ALTER TABLE `questionbanks`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `questions`
--
ALTER TABLE `questions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `settings`
--
ALTER TABLE `settings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `userexdatas`
--
ALTER TABLE `userexdatas`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `users__lft__rgt_parent_id_index` (`_lft`,`_rgt`,`parent_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `ansheets`
--
ALTER TABLE `ansheets`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=274;

--
-- AUTO_INCREMENT for table `answers`
--
ALTER TABLE `answers`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `banks`
--
ALTER TABLE `banks`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `examdatas`
--
ALTER TABLE `examdatas`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=265;

--
-- AUTO_INCREMENT for table `exams`
--
ALTER TABLE `exams`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `options`
--
ALTER TABLE `options`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `questionbanks`
--
ALTER TABLE `questionbanks`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `questions`
--
ALTER TABLE `questions`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `settings`
--
ALTER TABLE `settings`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `userexdatas`
--
ALTER TABLE `userexdatas`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
