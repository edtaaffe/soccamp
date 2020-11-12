-- phpMyAdmin SQL Dump
-- version 4.8.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 09, 2019 at 12:15 PM
-- Server version: 10.1.34-MariaDB
-- PHP Version: 7.2.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `test`
--

-- --------------------------------------------------------

--
-- Table structure for table `activities`
--

CREATE TABLE `activities` (
  `activity_id` bigint(20) NOT NULL,
  `app` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `template` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `member_id` bigint(20) NOT NULL,
  `created` varchar(30) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `activity`
--

CREATE TABLE `activity` (
  `activity_id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `net_id` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `body` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `network_name` varchar(30) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `network_id` bigint(20) NOT NULL,
  `created` varchar(30) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `followed` tinyint(1) NOT NULL,
  `view` tinyint(1) NOT NULL,
  `dlt` varchar(250) DEFAULT NULL,
  `autocomment` text
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `activity_meta`
--

CREATE TABLE `activity_meta` (
  `meta_id` bigint(20) NOT NULL,
  `activity_id` bigint(20) NOT NULL,
  `type` varchar(20) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `net_id` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `author_id` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `author_name` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `body` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `parent` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `network_id` bigint(20) NOT NULL,
  `created` varchar(30) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `view` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `bots`
--

CREATE TABLE `bots` (
  `bot_id` bigint(20) NOT NULL,
  `user_id` int(11) NOT NULL,
  `type` varchar(20) NOT NULL,
  `rule1` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `rule2` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `rule3` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `rule4` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `rule5` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `rule6` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `rule7` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `campaigns`
--

CREATE TABLE `campaigns` (
  `campaign_id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `type` varchar(20) NOT NULL,
  `name` varchar(250) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `description` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `created` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `campaigns_meta`
--

CREATE TABLE `campaigns_meta` (
  `meta_id` bigint(20) NOT NULL,
  `campaign_id` bigint(20) NOT NULL,
  `meta_name` varchar(30) NOT NULL,
  `meta_val1` varchar(250) NOT NULL,
  `meta_val2` varchar(250) NOT NULL,
  `meta_val3` varchar(250) NOT NULL,
  `meta_val4` varchar(250) NOT NULL,
  `meta_val5` varchar(250) NOT NULL,
  `meta_val6` varchar(250) NOT NULL,
  `meta_val7` varchar(250) NOT NULL,
  `meta_val8` varchar(250) DEFAULT NULL,
  `meta_val9` varchar(250) DEFAULT NULL,
  `meta_val10` varchar(250) DEFAULT NULL,
  `meta_val11` varchar(250) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `ci_sessions`
--

CREATE TABLE `ci_sessions` (
  `id` varchar(40) NOT NULL,
  `ip_address` varchar(45) NOT NULL,
  `timestamp` int(10) UNSIGNED NOT NULL DEFAULT '0',
  `data` blob NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `classifications`
--

CREATE TABLE `classifications` (
  `classification_id` bigint(20) NOT NULL,
  `slug` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `type` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `parent` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `classifications_meta`
--

CREATE TABLE `classifications_meta` (
  `meta_id` bigint(20) NOT NULL,
  `classification_id` bigint(20) NOT NULL,
  `meta_slug` text COLLATE utf8_unicode_ci NOT NULL,
  `meta_name` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `meta_value` text COLLATE utf8_unicode_ci NOT NULL,
  `meta_extra` text COLLATE utf8_unicode_ci NOT NULL,
  `language` varchar(30) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `comment_id` bigint(20) NOT NULL,
  `comment` varchar(300) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `created` datetime NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `contents`
--

CREATE TABLE `contents` (
  `content_id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `contents_category` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `contents_component` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `contents_theme` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `contents_template` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `contents_slug` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `status` tinyint(1) NOT NULL,
  `created` varchar(30) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `contents_classifications`
--

CREATE TABLE `contents_classifications` (
  `classification_id` bigint(20) NOT NULL,
  `content_id` bigint(20) NOT NULL,
  `classification_slug` text COLLATE utf8_unicode_ci NOT NULL,
  `classification_value` text COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `contents_meta`
--

CREATE TABLE `contents_meta` (
  `meta_id` bigint(20) NOT NULL,
  `content_id` bigint(20) NOT NULL,
  `meta_slug` text COLLATE utf8_unicode_ci NOT NULL,
  `meta_name` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `meta_value` text COLLATE utf8_unicode_ci NOT NULL,
  `meta_extra` text COLLATE utf8_unicode_ci NOT NULL,
  `language` varchar(30) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `coupons`
--

CREATE TABLE `coupons` (
  `coupon_id` bigint(20) NOT NULL,
  `code` varchar(20) NOT NULL,
  `value` varchar(3) NOT NULL,
  `type` tinyint(1) NOT NULL,
  `count` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `dictionary`
--

CREATE TABLE `dictionary` (
  `dict_id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `name` varchar(250) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `body` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `invoices`
--

CREATE TABLE `invoices` (
  `invoice_id` bigint(20) NOT NULL,
  `transaction_id` varchar(250) NOT NULL,
  `plan_id` int(6) NOT NULL,
  `invoice_date` datetime NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `invoice_title` text NOT NULL,
  `invoice_text` text NOT NULL,
  `amount` varchar(250) NOT NULL,
  `currency` varchar(20) NOT NULL,
  `taxes` varchar(20) NOT NULL,
  `total` varchar(20) NOT NULL,
  `from_period` datetime NOT NULL,
  `to_period` datetime NOT NULL,
  `gateway` varchar(250) NOT NULL,
  `status` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `lists`
--

CREATE TABLE `lists` (
  `list_id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `type` varchar(20) NOT NULL,
  `name` varchar(250) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `description` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `created` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `lists_meta`
--

CREATE TABLE `lists_meta` (
  `meta_id` bigint(20) NOT NULL,
  `list_id` bigint(20) NOT NULL,
  `user_id` int(11) NOT NULL,
  `body` varchar(250) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `ip` varchar(250) DEFAULT NULL,
  `country` varchar(250) DEFAULT NULL,
  `city` varchar(250) DEFAULT NULL,
  `active` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `media`
--

CREATE TABLE `media` (
  `media_id` bigint(20) NOT NULL,
  `user_id` int(11) NOT NULL,
  `body` text NOT NULL,
  `cover` text,
  `size` varchar(20) DEFAULT NULL,
  `type` varchar(10) NOT NULL,
  `created` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `networks`
--

CREATE TABLE `networks` (
  `network_id` int(3) NOT NULL,
  `network_name` varchar(30) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `net_id` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `user_id` int(11) NOT NULL,
  `user_name` varchar(30) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `user_avatar` varchar(250) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `date` datetime NOT NULL,
  `expires` varchar(30) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `token` text,
  `secret` text,
  `completed` tinyint(1) NOT NULL,
  `api_key` varchar(250) DEFAULT NULL,
  `api_secret` varchar(250) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `notification_id` bigint(20) NOT NULL,
  `notification_title` varchar(250) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `notification_name` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `notification_body` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `sent_time` varchar(30) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `template` tinyint(1) NOT NULL,
  `template_name` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `notifications_stats`
--

CREATE TABLE `notifications_stats` (
  `stat_id` bigint(20) NOT NULL,
  `notification_id` bigint(20) NOT NULL,
  `user_id` int(11) NOT NULL,
  `status` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `options`
--

CREATE TABLE `options` (
  `option_id` bigint(20) NOT NULL,
  `option_key` varchar(250) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `option_value` varchar(250) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

CREATE TABLE `payments` (
  `id` bigint(20) NOT NULL,
  `user_id` int(11) NOT NULL,
  `txn_id` varchar(250) DEFAULT NULL,
  `payment_amount` decimal(7,2) NOT NULL,
  `payment_status` varchar(25) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `plan_id` varchar(25) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `created` datetime NOT NULL,
  `source` varchar(20) DEFAULT NULL,
  `recurring` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `plans`
--

CREATE TABLE `plans` (
  `plan_id` int(6) NOT NULL,
  `plan_name` varchar(250) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `plan_price` varchar(20) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `currency_sign` char(3) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `currency_code` char(3) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `network_accounts` varchar(20) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `rss_feeds` varchar(20) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `publish_accounts` varchar(20) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `publish_posts` varchar(20) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `sent_emails` varchar(20) DEFAULT NULL,
  `storage` varchar(250) DEFAULT NULL,
  `features` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `teams` tinyint(1) DEFAULT NULL,
  `header` varchar(250) DEFAULT NULL,
  `period` bigint(10) NOT NULL,
  `visible` tinyint(1) DEFAULT NULL,
  `popular` tinyint(1) DEFAULT NULL,
  `featured` tinyint(1) DEFAULT NULL,
  `trial` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `plans`
--

INSERT INTO `plans` (`plan_id`, `plan_name`, `plan_price`, `currency_sign`, `currency_code`, `network_accounts`, `rss_feeds`, `publish_accounts`, `publish_posts`, `sent_emails`, `storage`, `features`, `teams`, `header`, `period`, `visible`, `popular`, `featured`, `trial`) VALUES
(1, 'Free Plan', '0.00', '$', 'USD', '10', '1', '1', '20', NULL, '1048576', '1 Social Profiles\n1 Feed Rss\nReal-time Analytics\nMessage Scheduling\n', 0, '', 365, 0, 0, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `plans_meta`
--

CREATE TABLE `plans_meta` (
  `meta_id` int(6) NOT NULL,
  `plan_id` int(6) NOT NULL,
  `meta_name` text COLLATE utf8_unicode_ci NOT NULL,
  `meta_value` text COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `post_id` bigint(20) NOT NULL,
  `user_id` int(11) NOT NULL,
  `body` varbinary(4000) DEFAULT NULL,
  `title` varchar(250) COLLATE utf8_unicode_ci DEFAULT NULL,
  `url` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `img` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `video` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `category` text COLLATE utf8_unicode_ci NOT NULL,
  `sent_time` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `resend` bigint(20) DEFAULT NULL,
  `ip_address` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `status` tinyint(1) NOT NULL,
  `view` tinyint(1) NOT NULL,
  `fb_boost_id` bigint(20) DEFAULT NULL,
  `parent` bigint(20) DEFAULT NULL,
  `dlt` varchar(250) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `posts_meta`
--

CREATE TABLE `posts_meta` (
  `meta_id` bigint(20) NOT NULL,
  `post_id` bigint(20) NOT NULL,
  `network_id` bigint(20) NOT NULL,
  `network_name` varchar(30) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `sent_time` varchar(30) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `status` tinyint(1) NOT NULL,
  `network_status` text,
  `published_id` text
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `referrals`
--

CREATE TABLE `referrals` (
  `referrer_id` bigint(20) NOT NULL,
  `referrer` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `plan_id` bigint(20) NOT NULL,
  `earned` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `paid` tinyint(1) NOT NULL,
  `created` varchar(30) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `resend`
--

CREATE TABLE `resend` (
  `resend_id` bigint(20) NOT NULL,
  `user_id` int(11) NOT NULL,
  `time` varchar(30) NOT NULL,
  `created` varchar(30) NOT NULL,
  `updated` varchar(30) NOT NULL,
  `active` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `resend_meta`
--

CREATE TABLE `resend_meta` (
  `meta_id` bigint(20) NOT NULL,
  `resend_id` bigint(20) NOT NULL,
  `rule1` varchar(30) NOT NULL,
  `rule2` varchar(30) NOT NULL,
  `rule3` varchar(30) NOT NULL,
  `rule4` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `resend_rules`
--

CREATE TABLE `resend_rules` (
  `rule_id` bigint(20) NOT NULL,
  `resend_id` bigint(20) NOT NULL,
  `meta_id` bigint(20) NOT NULL,
  `status` tinyint(1) NOT NULL,
  `totime` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `rss`
--

CREATE TABLE `rss` (
  `rss_id` bigint(20) NOT NULL,
  `user_id` int(11) NOT NULL,
  `rss_name` varchar(250) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `rss_description` varchar(250) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `rss_url` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `publish_description` tinyint(1) NOT NULL,
  `publish_url` tinyint(1) NOT NULL,
  `group_id` tinyint(1) DEFAULT NULL,
  `remove_url` tinyint(1) DEFAULT NULL,
  `keep_html` tinyint(1) DEFAULT NULL,
  `include` text,
  `exclude` text,
  `networks` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `enabled` tinyint(1) NOT NULL,
  `completed` tinyint(1) NOT NULL,
  `added` datetime NOT NULL,
  `pub` tinyint(1) NOT NULL,
  `refferal` varchar(250) DEFAULT NULL,
  `period` varchar(10) DEFAULT NULL,
  `updated` varchar(30) DEFAULT NULL,
  `type` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `rss_accounts`
--

CREATE TABLE `rss_accounts` (
  `account_id` bigint(20) NOT NULL,
  `network_id` bigint(20) NOT NULL,
  `rss_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `rss_posts`
--

CREATE TABLE `rss_posts` (
  `post_id` bigint(20) NOT NULL,
  `rss_id` bigint(20) NOT NULL,
  `user_id` int(11) NOT NULL,
  `status` tinyint(1) DEFAULT NULL,
  `networks` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `title` varchar(250) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `content` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `url` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `img` text,
  `published` varchar(30) DEFAULT NULL,
  `scheduled` varchar(30) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `network_status` text
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `rss_posts_meta`
--

CREATE TABLE `rss_posts_meta` (
  `meta_id` bigint(20) NOT NULL,
  `post_id` bigint(20) NOT NULL,
  `network_id` bigint(20) NOT NULL,
  `network_name` varchar(30) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `sent_time` varchar(30) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `status` tinyint(1) NOT NULL,
  `network_status` text,
  `published_id` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `scheduled`
--

CREATE TABLE `scheduled` (
  `scheduled_id` bigint(20) NOT NULL,
  `user_id` int(11) NOT NULL,
  `type` varchar(20) NOT NULL,
  `campaign_id` bigint(20) NOT NULL,
  `list_id` bigint(20) NOT NULL,
  `template_id` bigint(20) NOT NULL,
  `con` tinyint(1) NOT NULL,
  `template` bigint(20) NOT NULL,
  `send_at` varchar(30) NOT NULL,
  `resend` bigint(20) DEFAULT NULL,
  `a` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `scheduled_stats`
--

CREATE TABLE `scheduled_stats` (
  `stat_id` bigint(20) NOT NULL,
  `sched_id` bigint(20) NOT NULL,
  `campaign_id` bigint(20) NOT NULL,
  `list_id` bigint(20) NOT NULL,
  `template_id` bigint(20) NOT NULL,
  `body` varchar(250) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `unsubscribed` tinyint(1) NOT NULL,
  `readed` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `subscriptions`
--

CREATE TABLE `subscriptions` (
  `subscription_id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `net_id` text COLLATE utf8_unicode_ci NOT NULL,
  `amount` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `currency` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `period` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `gateway` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `status` tinyint(1) NOT NULL,
  `last_update` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `created` varchar(30) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `subscriptions`
--

INSERT INTO `subscriptions` (`subscription_id`, `user_id`, `net_id`, `amount`, `currency`, `period`, `gateway`, `status`, `last_update`, `created`) VALUES
(2, 106, 'sub_GK0T4fDNQqONhK', '', '', '', 'stripe', 1, '2019-12-08', '1575798843'),
(3, 108, 'sub_GK0aPrD4P6NBYz', '', '', '', 'stripe', 1, '2019-12-08', '1575799255'),
(4, 109, 'sub_GK16di2CA8tUBC', '', '', '', 'stripe', 1, '2019-12-08', '1575801166'),
(5, 110, 'sub_GK2ACvqZc62wos', '', '', '', 'stripe', 1, '2019-12-08', '1575805143'),
(6, 112, 'sub_GK4yLTf0BY9UMQ', '', '', '', 'stripe', 1, '2019-12-08', '1575815592'),
(7, 115, 'sub_GK6iquMbnbqTGF', '', '', '', 'stripe', 1, '2019-12-08', '1575822075'),
(8, 116, 'sub_GK6xZajg3xFFYH', '', '', '', 'stripe', 1, '2019-12-08', '1575822923'),
(11, 118, 'sub_GKM7xNBxeWzIL4', '', '', '', 'stripe', 1, '2019-12-09', '1575879340');

-- --------------------------------------------------------

--
-- Table structure for table `teams`
--

CREATE TABLE `teams` (
  `member_id` bigint(20) NOT NULL,
  `user_id` int(11) NOT NULL,
  `member_username` varchar(30) NOT NULL,
  `member_password` varchar(250) NOT NULL,
  `member_email` varchar(250) DEFAULT NULL,
  `role_id` bigint(20) DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL,
  `about_member` text,
  `date_joined` datetime NOT NULL,
  `last_access` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `teams_roles`
--

CREATE TABLE `teams_roles` (
  `role_id` bigint(20) NOT NULL,
  `user_id` int(11) NOT NULL,
  `role` varchar(250) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `teams_roles_permission`
--

CREATE TABLE `teams_roles_permission` (
  `permission_id` bigint(20) NOT NULL,
  `role_id` int(20) NOT NULL,
  `permission` varchar(250) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `templates`
--

CREATE TABLE `templates` (
  `template_id` bigint(20) NOT NULL,
  `user_id` int(11) NOT NULL,
  `campaign_id` bigint(20) NOT NULL,
  `type` varchar(20) NOT NULL,
  `title` varchar(250) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `body` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `created` varchar(30) NOT NULL,
  `resend` bigint(20) DEFAULT NULL,
  `list_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tickets`
--

CREATE TABLE `tickets` (
  `ticket_id` bigint(20) NOT NULL,
  `user_id` int(11) NOT NULL,
  `subject` varchar(250) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `body` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `attachment` varchar(250) NOT NULL,
  `status` tinyint(1) NOT NULL,
  `important` tinyint(1) DEFAULT NULL,
  `created` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tickets_meta`
--

CREATE TABLE `tickets_meta` (
  `meta_id` bigint(20) NOT NULL,
  `ticket_id` bigint(20) NOT NULL,
  `user_id` int(11) NOT NULL,
  `body` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `attachment` varchar(250) NOT NULL,
  `created` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

CREATE TABLE `transactions` (
  `transaction_id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `net_id` text COLLATE utf8_unicode_ci NOT NULL,
  `amount` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `currency` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `gateway` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `status` tinyint(1) NOT NULL,
  `created` varchar(30) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `transactions_fields`
--

CREATE TABLE `transactions_fields` (
  `field_id` bigint(20) NOT NULL,
  `transaction_id` bigint(20) NOT NULL,
  `field_name` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `field_value` text COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `transactions_options`
--

CREATE TABLE `transactions_options` (
  `option_id` bigint(20) NOT NULL,
  `transaction_id` bigint(20) NOT NULL,
  `option_name` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `option_value` text COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `urls`
--

CREATE TABLE `urls` (
  `url_id` bigint(20) NOT NULL,
  `original_url` text CHARACTER SET utf8 NOT NULL,
  `created` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `urls_stats`
--

CREATE TABLE `urls_stats` (
  `stats_id` bigint(20) NOT NULL,
  `url_id` bigint(20) NOT NULL,
  `network_name` varchar(30) CHARACTER SET utf8 NOT NULL,
  `color` varchar(30) CHARACTER SET utf8 NOT NULL,
  `ip_address` varchar(30) CHARACTER SET utf8 NOT NULL,
  `created` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `username` varchar(30) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(254) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `last_name` varchar(30) DEFAULT NULL,
  `first_name` varchar(30) DEFAULT NULL,
  `password` varchar(254) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `role` tinyint(1) NOT NULL,
  `status` tinyint(1) NOT NULL,
  `date_joined` datetime NOT NULL,
  `last_access` datetime DEFAULT NULL,
  `ip_address` varchar(30) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `reset_code` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `activate` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `username`, `email`, `password`, `role`, `status`, `date_joined`, `last_access`, `ip_address`, `reset_code`, `activate`) VALUES
(104, 'administrator', 'admin@example.com', '$2a$08$CwRg961g2QCS1kBjA0NgAOs8Dg31QzOP6mNxF.OdrCd5BqAmtLyOe', 1, 1, '2016-08-11 10:37:16', '2016-10-10 15:41:16', '', ' ', ''),
(118, 'testuser', 'user@email.com', '$2a$08$fcmlgRj56zPvpYvAc3v9Ze8Tp4xX7cKmoSJZOhEqTIjvZmFtdfu/O', 0, 1, '2016-10-10 12:37:03', '2016-10-10 15:41:36', '', ' ', '');

-- --------------------------------------------------------

--
-- Table structure for table `users_meta`
--

CREATE TABLE `users_meta` (
  `meta_id` bigint(20) NOT NULL,
  `user_id` int(11) NOT NULL,
  `meta_name` text COLLATE utf8_unicode_ci NOT NULL,
  `meta_value` text
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `activities`
--
ALTER TABLE `activities`
  ADD PRIMARY KEY (`activity_id`);

--
-- Indexes for table `activity`
--
ALTER TABLE `activity`
  ADD PRIMARY KEY (`activity_id`);

--
-- Indexes for table `activity_meta`
--
ALTER TABLE `activity_meta`
  ADD PRIMARY KEY (`meta_id`);

--
-- Indexes for table `bots`
--
ALTER TABLE `bots`
  ADD PRIMARY KEY (`bot_id`);

--
-- Indexes for table `campaigns`
--
ALTER TABLE `campaigns`
  ADD PRIMARY KEY (`campaign_id`);

--
-- Indexes for table `campaigns_meta`
--
ALTER TABLE `campaigns_meta`
  ADD PRIMARY KEY (`meta_id`);

--
-- Indexes for table `classifications`
--
ALTER TABLE `classifications`
  ADD PRIMARY KEY (`classification_id`);

--
-- Indexes for table `classifications_meta`
--
ALTER TABLE `classifications_meta`
  ADD PRIMARY KEY (`meta_id`);

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`comment_id`);

--
-- Indexes for table `contents`
--
ALTER TABLE `contents`
  ADD PRIMARY KEY (`content_id`);

--
-- Indexes for table `contents_classifications`
--
ALTER TABLE `contents_classifications`
  ADD PRIMARY KEY (`classification_id`);

--
-- Indexes for table `contents_meta`
--
ALTER TABLE `contents_meta`
  ADD PRIMARY KEY (`meta_id`);

--
-- Indexes for table `coupons`
--
ALTER TABLE `coupons`
  ADD PRIMARY KEY (`coupon_id`);

--
-- Indexes for table `dictionary`
--
ALTER TABLE `dictionary`
  ADD PRIMARY KEY (`dict_id`);

--
-- Indexes for table `invoices`
--
ALTER TABLE `invoices`
  ADD PRIMARY KEY (`invoice_id`);

--
-- Indexes for table `lists`
--
ALTER TABLE `lists`
  ADD PRIMARY KEY (`list_id`);

--
-- Indexes for table `lists_meta`
--
ALTER TABLE `lists_meta`
  ADD PRIMARY KEY (`meta_id`);

--
-- Indexes for table `media`
--
ALTER TABLE `media`
  ADD PRIMARY KEY (`media_id`);

--
-- Indexes for table `networks`
--
ALTER TABLE `networks`
  ADD PRIMARY KEY (`network_id`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`notification_id`);

--
-- Indexes for table `notifications_stats`
--
ALTER TABLE `notifications_stats`
  ADD PRIMARY KEY (`stat_id`);

--
-- Indexes for table `options`
--
ALTER TABLE `options`
  ADD PRIMARY KEY (`option_id`);

--
-- Indexes for table `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `plans`
--
ALTER TABLE `plans`
  ADD PRIMARY KEY (`plan_id`);

--
-- Indexes for table `plans_meta`
--
ALTER TABLE `plans_meta`
  ADD PRIMARY KEY (`meta_id`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`post_id`);

--
-- Indexes for table `posts_meta`
--
ALTER TABLE `posts_meta`
  ADD PRIMARY KEY (`meta_id`);

--
-- Indexes for table `referrals`
--
ALTER TABLE `referrals`
  ADD PRIMARY KEY (`referrer_id`);

--
-- Indexes for table `resend`
--
ALTER TABLE `resend`
  ADD PRIMARY KEY (`resend_id`);

--
-- Indexes for table `resend_meta`
--
ALTER TABLE `resend_meta`
  ADD PRIMARY KEY (`meta_id`);

--
-- Indexes for table `resend_rules`
--
ALTER TABLE `resend_rules`
  ADD PRIMARY KEY (`rule_id`);

--
-- Indexes for table `rss`
--
ALTER TABLE `rss`
  ADD PRIMARY KEY (`rss_id`);

--
-- Indexes for table `rss_accounts`
--
ALTER TABLE `rss_accounts`
  ADD PRIMARY KEY (`account_id`);

--
-- Indexes for table `rss_posts`
--
ALTER TABLE `rss_posts`
  ADD PRIMARY KEY (`post_id`);

--
-- Indexes for table `rss_posts_meta`
--
ALTER TABLE `rss_posts_meta`
  ADD PRIMARY KEY (`meta_id`);

--
-- Indexes for table `scheduled`
--
ALTER TABLE `scheduled`
  ADD PRIMARY KEY (`scheduled_id`);

--
-- Indexes for table `scheduled_stats`
--
ALTER TABLE `scheduled_stats`
  ADD PRIMARY KEY (`stat_id`);

--
-- Indexes for table `subscriptions`
--
ALTER TABLE `subscriptions`
  ADD PRIMARY KEY (`subscription_id`);

--
-- Indexes for table `teams`
--
ALTER TABLE `teams`
  ADD PRIMARY KEY (`member_id`);

--
-- Indexes for table `teams_roles`
--
ALTER TABLE `teams_roles`
  ADD PRIMARY KEY (`role_id`);

--
-- Indexes for table `teams_roles_permission`
--
ALTER TABLE `teams_roles_permission`
  ADD PRIMARY KEY (`permission_id`);

--
-- Indexes for table `templates`
--
ALTER TABLE `templates`
  ADD PRIMARY KEY (`template_id`);

--
-- Indexes for table `tickets`
--
ALTER TABLE `tickets`
  ADD PRIMARY KEY (`ticket_id`);

--
-- Indexes for table `tickets_meta`
--
ALTER TABLE `tickets_meta`
  ADD PRIMARY KEY (`meta_id`);

--
-- Indexes for table `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`transaction_id`);

--
-- Indexes for table `transactions_fields`
--
ALTER TABLE `transactions_fields`
  ADD PRIMARY KEY (`field_id`);

--
-- Indexes for table `transactions_options`
--
ALTER TABLE `transactions_options`
  ADD PRIMARY KEY (`option_id`);

--
-- Indexes for table `urls`
--
ALTER TABLE `urls`
  ADD PRIMARY KEY (`url_id`);

--
-- Indexes for table `urls_stats`
--
ALTER TABLE `urls_stats`
  ADD PRIMARY KEY (`stats_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `users_meta`
--
ALTER TABLE `users_meta`
  ADD PRIMARY KEY (`meta_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `activities`
--
ALTER TABLE `activities`
  MODIFY `activity_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `activity`
--
ALTER TABLE `activity`
  MODIFY `activity_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `activity_meta`
--
ALTER TABLE `activity_meta`
  MODIFY `meta_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `bots`
--
ALTER TABLE `bots`
  MODIFY `bot_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `campaigns`
--
ALTER TABLE `campaigns`
  MODIFY `campaign_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `campaigns_meta`
--
ALTER TABLE `campaigns_meta`
  MODIFY `meta_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `classifications`
--
ALTER TABLE `classifications`
  MODIFY `classification_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `classifications_meta`
--
ALTER TABLE `classifications_meta`
  MODIFY `meta_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `comment_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `contents`
--
ALTER TABLE `contents`
  MODIFY `content_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `contents_classifications`
--
ALTER TABLE `contents_classifications`
  MODIFY `classification_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `contents_meta`
--
ALTER TABLE `contents_meta`
  MODIFY `meta_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `coupons`
--
ALTER TABLE `coupons`
  MODIFY `coupon_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `dictionary`
--
ALTER TABLE `dictionary`
  MODIFY `dict_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `invoices`
--
ALTER TABLE `invoices`
  MODIFY `invoice_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `lists`
--
ALTER TABLE `lists`
  MODIFY `list_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `lists_meta`
--
ALTER TABLE `lists_meta`
  MODIFY `meta_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `media`
--
ALTER TABLE `media`
  MODIFY `media_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `networks`
--
ALTER TABLE `networks`
  MODIFY `network_id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `notification_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2001;

--
-- AUTO_INCREMENT for table `notifications_stats`
--
ALTER TABLE `notifications_stats`
  MODIFY `stat_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `options`
--
ALTER TABLE `options`
  MODIFY `option_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `payments`
--
ALTER TABLE `payments`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `plans`
--
ALTER TABLE `plans`
  MODIFY `plan_id` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `plans_meta`
--
ALTER TABLE `plans_meta`
  MODIFY `meta_id` int(6) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `post_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `posts_meta`
--
ALTER TABLE `posts_meta`
  MODIFY `meta_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `referrals`
--
ALTER TABLE `referrals`
  MODIFY `referrer_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `resend`
--
ALTER TABLE `resend`
  MODIFY `resend_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `resend_meta`
--
ALTER TABLE `resend_meta`
  MODIFY `meta_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `resend_rules`
--
ALTER TABLE `resend_rules`
  MODIFY `rule_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `rss`
--
ALTER TABLE `rss`
  MODIFY `rss_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `rss_accounts`
--
ALTER TABLE `rss_accounts`
  MODIFY `account_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `rss_posts`
--
ALTER TABLE `rss_posts`
  MODIFY `post_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `rss_posts_meta`
--
ALTER TABLE `rss_posts_meta`
  MODIFY `meta_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `scheduled`
--
ALTER TABLE `scheduled`
  MODIFY `scheduled_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `scheduled_stats`
--
ALTER TABLE `scheduled_stats`
  MODIFY `stat_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `subscriptions`
--
ALTER TABLE `subscriptions`
  MODIFY `subscription_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `teams`
--
ALTER TABLE `teams`
  MODIFY `member_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `teams_roles`
--
ALTER TABLE `teams_roles`
  MODIFY `role_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `teams_roles_permission`
--
ALTER TABLE `teams_roles_permission`
  MODIFY `permission_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `templates`
--
ALTER TABLE `templates`
  MODIFY `template_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tickets`
--
ALTER TABLE `tickets`
  MODIFY `ticket_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tickets_meta`
--
ALTER TABLE `tickets_meta`
  MODIFY `meta_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `transactions`
--
ALTER TABLE `transactions`
  MODIFY `transaction_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=257;

--
-- AUTO_INCREMENT for table `transactions_fields`
--
ALTER TABLE `transactions_fields`
  MODIFY `field_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `transactions_options`
--
ALTER TABLE `transactions_options`
  MODIFY `option_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `urls`
--
ALTER TABLE `urls`
  MODIFY `url_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `urls_stats`
--
ALTER TABLE `urls_stats`
  MODIFY `stats_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=119;

--
-- AUTO_INCREMENT for table `users_meta`
--
ALTER TABLE `users_meta`
  MODIFY `meta_id` bigint(20) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
