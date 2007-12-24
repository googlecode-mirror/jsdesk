

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";

--
-- Database: `dbjsdesk`
--

-- --------------------------------------------------------

--
-- Table structure for table `desktop_config`
--

CREATE TABLE IF NOT EXISTS `desktop_config` (
  `member_id` int(11) unsigned NOT NULL default '0',
  `autorun` text,
  `startmenu` text,
  `quickstart` text,
  `desktopcontextmenu` text,
  `backgroundcolor` varchar(6) default NULL,
  `wallpaper` varchar(255) default NULL,
  `wallpaperposition` varchar(6) default NULL,
  `theme` varchar(255) default NULL,
  `transparency` varchar(5) default NULL,
  PRIMARY KEY  (`member_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records
-- ----------------------------
INSERT INTO `desktop_config` VALUES ('0', '[\"docs-win\",\"grid-win\",\"tab-win\",\"bogus-menu\",\"acc-win\",\"layout-win\"]','[\"docs-win\",\"grid-win\",\"tab-win\",\"bogus-menu\",\"acc-win\",\"layout-win\"]', '[\"docs-win\",\"grid-win\",\"tab-win\",\"acc-win\",\"layout-win\"]', '[\"preferences-win\"]', 'f9f9f9', 'Beauty1', 'center', 'Vista', 'false');
INSERT INTO `desktop_config` VALUES ('3', '[\"docs-win\",\"grid-win\",\"tab-win\",\"bogus-menu\",\"acc-win\",\"layout-win\"]','[\"docs-win\",\"grid-win\",\"tab-win\",\"bogus-menu\",\"acc-win\",\"layout-win\"]', '[\"mytest-win\",\"docs-win\",\"layout-win\",\"grid-win\",\"tab-win\",\"acc-win\",\"bogus-win\",\"preferences-win\"]', '[\"preferences-win\"]', 'f9f9f9', 'Beauty1', 'center', 'Dark Gray', 'true');

-- --------------------------------------------------------

--
-- Table structure for table `desktop_login`
--

CREATE TABLE IF NOT EXISTS `desktop_login` (
  `member_id` int(11) unsigned NOT NULL default '0',
  `login_key` varchar(128) default NULL,
  `login_ip` varchar(16) default NULL,
  `login_date` datetime default NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `desktop_login`
--


-- --------------------------------------------------------

--
-- Table structure for table `desktop_members`
--

CREATE TABLE `desktop_members` (
  `member_id` int(11) unsigned NOT NULL auto_increment,
  `member_type` int(2) unsigned default NULL,
  `member_username` varchar(255) default NULL,
  `member_first_name` varchar(50) default NULL,
  `member_last_name` varchar(50) default NULL,
  `member_email` varchar(255) default NULL,
  `member_password` text default NULL,
  `mail_server` varchar(100) default NULL,
  `mail_server_login` varchar(25) default NULL,
  `mail_server_password` varchar(25) default NULL,
  `mail_server_port` varchar(15) default NULL,
  PRIMARY KEY  (`member_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

INSERT INTO `desktop_members` VALUES ('3', '3', 'demo', 'Todd', 'Murdock', 'demo@jsdesk.com', 'demo', null, null, null, null); 


-- --------------------------------------------------------

--
-- Table structure for table `desktop_member_types`
--

CREATE TABLE IF NOT EXISTS `desktop_member_types` (
  `type_id` int(2) unsigned NOT NULL auto_increment,
  `type_text` varchar(25) default NULL,
  PRIMARY KEY  (`type_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Dumping data for table `desktop_member_types`
--

INSERT INTO `desktop_member_types` VALUES ('1', 'administrator');
INSERT INTO `desktop_member_types` VALUES ('2', 'user');
INSERT INTO `desktop_member_types` VALUES ('3', 'demo');



SET FOREIGN_KEY_CHECKS=0;
-- ----------------------------
-- Table structure for desktop_themes
-- ----------------------------
CREATE TABLE `desktop_themes` (
  `id` varchar(25) NOT NULL default '',
  `thumbnail` varchar(255) default NULL,
  `path` varchar(255) default NULL,
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records
-- ----------------------------
INSERT INTO `desktop_themes` VALUES ('Black', 'resources/themes/xtheme-black/xtheme-black.png', 'resources/themes/xtheme-black/css/xtheme-black.css');
INSERT INTO `desktop_themes` VALUES ('Dark Gray', 'resources/themes/xtheme-darkgray/xtheme-darkgray.png', 'resources/themes/xtheme-darkgray/css/xtheme-darkgray.css');
INSERT INTO `desktop_themes` VALUES ('Olive', 'resources/themes/xtheme-olive/xtheme-olive.png', 'resources/themes/xtheme-olive/css/xtheme-olive.css');
INSERT INTO `desktop_themes` VALUES ('Purple', 'resources/themes/xtheme-purple/xtheme-purple.png', 'resources/themes/xtheme-purple/css/xtheme-purple.css');
INSERT INTO `desktop_themes` VALUES ('Slate', 'resources/themes/xtheme-slate/xtheme-slate.png', 'resources/themes/xtheme-slate/css/xtheme-slate.css');
INSERT INTO `desktop_themes` VALUES ('Vista', 'resources/themes/xtheme-vista/xtheme-vista.png', 'resources/themes/xtheme-vista/css/xtheme-vista.css');
INSERT INTO `desktop_themes` VALUES ('Vista-black', 'resources/themes/xtheme-vista-black/xtheme-vista.png', 'resources/themes/xtheme-vista-black/vista-black.css');
INSERT INTO `desktop_themes` VALUES ('Vista-clear', 'resources/themes/xtheme-vista-clear/xtheme-vista.png', 'resources/themes/xtheme-vista-clear/vista-clear.css');
INSERT INTO `desktop_themes` VALUES ('Windows-blue', 'resources/themes/xtheme-windows-blue/xtheme-vista.png', 'resources/themes/xtheme-windows-blue/windows-blue.css');



SET FOREIGN_KEY_CHECKS=0;
-- ----------------------------
-- Table structure for desktop_wallpapers
-- ----------------------------
CREATE TABLE `desktop_wallpapers` (
  `id` varchar(25) NOT NULL default '',
  `thumbnail` varchar(255) default NULL,
  `path` varchar(255) default NULL,
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records
-- ----------------------------
INSERT INTO `desktop_wallpapers` VALUES ('qWikiOffice', 'resources/wallpapers/thumbnails/qwikioffice.jpg', 'resources/wallpapers/qwikioffice.jpg');
INSERT INTO `desktop_wallpapers` VALUES ('Colorado Farm', 'resources/wallpapers/thumbnails/colorado-farm.jpg', 'resources/wallpapers/colorado-farm.jpg');
INSERT INTO `desktop_wallpapers` VALUES ('Beauty1', 'resources/wallpapers/thumbnails/beauty1.jpg', 'resources/wallpapers/beauty1.jpg');
INSERT INTO `desktop_wallpapers` VALUES ('Beauty2', 'resources/wallpapers/thumbnails/beauty2.jpg', 'resources/wallpapers/beauty2.jpg');
INSERT INTO `desktop_wallpapers` VALUES ('Beauty3', 'resources/wallpapers/thumbnails/beauty3.jpg', 'resources/wallpapers/beauty3.jpg');
INSERT INTO `desktop_wallpapers` VALUES ('Beauty4', 'resources/wallpapers/thumbnails/beauty4.jpg', 'resources/wallpapers/beauty4.jpg');
INSERT INTO `desktop_wallpapers` VALUES ('Beauty5', 'resources/wallpapers/thumbnails/beauty5.jpg', 'resources/wallpapers/beauty5.jpg');
INSERT INTO `desktop_wallpapers` VALUES ('Beauty6', 'resources/wallpapers/thumbnails/beauty6.jpg', 'resources/wallpapers/beauty6.jpg');
INSERT INTO `desktop_wallpapers` VALUES ('Beauty7', 'resources/wallpapers/thumbnails/beauty7.jpg', 'resources/wallpapers/beauty7.jpg');
INSERT INTO `desktop_wallpapers` VALUES ('Beauty8', 'resources/wallpapers/thumbnails/beauty8.jpg', 'resources/wallpapers/beauty8.jpg');
INSERT INTO `desktop_wallpapers` VALUES ('Beauty9', 'resources/wallpapers/thumbnails/beauty9.jpg', 'resources/wallpapers/beauty9.jpg');
