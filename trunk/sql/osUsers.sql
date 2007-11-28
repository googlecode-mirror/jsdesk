CREATE TABLE IF NOT EXISTS `osUsers` (
  `userID` mediumint(8) unsigned NOT NULL auto_increment,
  `userName` varchar(255) NOT NULL,
  `fullName` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `passWord` varchar(255) NOT NULL,
  `dateCreated` timestamp NOT NULL default CURRENT_TIMESTAMP,
  `dateLastActive` mediumint(11) NOT NULL,
  `avatar` varchar(255) NOT NULL,
  `classes` varchar(10) NOT NULL,
  `active` tinyint(1) NOT NULL default '1',
  PRIMARY KEY  (`userID`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;