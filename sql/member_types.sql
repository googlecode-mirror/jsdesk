CREATE TABLE `member_types` (
  `type_id` int(2) unsigned NOT NULL auto_increment,
  `type_text` varchar(25) default NULL,
  PRIMARY KEY  (`type_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;