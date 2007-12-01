CREATE TABLE `desktopConfig` (
  `member_id` int(11) unsigned NOT NULL default '0',
  `startmenu` text,
  `quickstart` text,
  `desktopcontextmenu` text,
  PRIMARY KEY  (`member_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records 
-- ----------------------------
INSERT INTO `desktopConfig` VALUES ('0', '[\"docs-win\",\"grid-win\",\"tab-win\",\"bogus-menu\",\"acc-win\",\"layout-win\"]', '[\"docs-win\",\"grid-win\",\"tab-win\",\"acc-win\",\"layout-win\"]', '[\"preferences-win\"]');
INSERT INTO `desktopConfig` VALUES ('3', null, '[\"layout-win\",\"docs-win\",\"grid-win\",\"tab-win\",\"acc-win\",\"bogus-win\",\"preferences-win\"]', null);
INSERT INTO `desktopConfig` VALUES ('1', null, '[\"grid-win\",\"tab-win\",\"layout-win\",\"bogus-win\"]', null);

