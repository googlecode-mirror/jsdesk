CREATE TABLE `login` (
  `member_id` int(11) unsigned NOT NULL default '0',
  `login_key` varchar(128) default NULL,
  `login_ip` varchar(16) default NULL,
  `login_date` datetime default NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;