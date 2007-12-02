-- phpMyAdmin SQL Dump
-- version 2.11.2.1
-- http://www.phpmyadmin.net
--
-- Host: sql.shadowpuppet.net
-- Generation Time: Dec 01, 2007 at 05:38 PM
-- Server version: 5.0.24
-- PHP Version: 4.4.7

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";

--
-- Database: `dbjsdesk`
--

-- --------------------------------------------------------

--
-- Table structure for table `desktopConfig`
--

CREATE TABLE IF NOT EXISTS `desktopConfig` (
  `member_id` int(11) unsigned NOT NULL default '0',
  `startmenu` text,
  `quickstart` text,
  `desktopcontextmenu` text,
  PRIMARY KEY  (`member_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `desktopConfig`
--

INSERT INTO `desktopConfig` (`member_id`, `startmenu`, `quickstart`, `desktopcontextmenu`) VALUES
(0, '["docs-win","grid-win","tab-win","bogus-menu","acc-win","layout-win"]', '["docs-win","grid-win","tab-win","acc-win","layout-win"]', '["preferences-win"]');

-- --------------------------------------------------------

--
-- Table structure for table `login`
--

CREATE TABLE IF NOT EXISTS `login` (
  `member_id` int(11) unsigned NOT NULL default '0',
  `login_key` varchar(128) default NULL,
  `login_ip` varchar(16) default NULL,
  `login_date` datetime default NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `login`
--


-- --------------------------------------------------------

--
-- Table structure for table `members`
--

CREATE TABLE IF NOT EXISTS `members` (
  `member_id` int(11) unsigned NOT NULL auto_increment,
  `member_type` tinyint(1) unsigned NOT NULL default '1',
  `member_username` varchar(255) NOT NULL,
  `member_first_name` varchar(40) default NULL,
  `member_last_name` varchar(35) default NULL,
  `member_email` varchar(55) default NULL,
  `member_password` text,
  `mail_server` varchar(100) default NULL,
  `mail_server_login` varchar(25) default NULL,
  `mail_server_password` varchar(25) default NULL,
  `mail_server_port` varchar(15) default NULL,
  PRIMARY KEY  (`member_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;


-- --------------------------------------------------------

--
-- Table structure for table `member_types`
--

CREATE TABLE IF NOT EXISTS `member_types` (
  `type_id` int(2) unsigned NOT NULL auto_increment,
  `type_text` varchar(25) default NULL,
  PRIMARY KEY  (`type_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `member_types`
--

INSERT INTO `member_types` (`type_id`, `type_text`) VALUES
(1, 'user'),
(2, 'admin');