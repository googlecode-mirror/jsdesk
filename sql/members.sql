CREATE TABLE `members` (
  `member_id` int(11) unsigned NOT NULL auto_increment,
  `member_type` int(2) unsigned default NULL,
  `member_first_name` varchar(25) default NULL,
  `member_last_name` varchar(35) default NULL,
  `member_email` varchar(55) default NULL,
  `member_password` varchar(15) default NULL,
  `mail_server` varchar(100) default NULL,
  `mail_server_login` varchar(25) default NULL,
  `mail_server_password` varchar(25) default NULL,
  `mail_server_port` varchar(15) default NULL,
  PRIMARY KEY  (`member_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;