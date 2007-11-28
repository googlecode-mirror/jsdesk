CREATE TABLE `desktopConfig` (
  `member_id` int(11) unsigned NOT NULL default '0',
  `startmenu` text,
  `quickstart` text,
  `desktopcontextmenu` text,
  PRIMARY KEY  (`member_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;