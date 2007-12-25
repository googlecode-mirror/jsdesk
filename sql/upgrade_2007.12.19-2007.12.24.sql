
ALTER TABLE `desktop_config` ADD `autorun` TEXT NOT NULL AFTER `member_id` ;

UPDATE desktop_config SET autorun='["docs-win","chat-win"]' where autorun='';

UPDATE desktop_config SET 
startmenu='["docs-win","grid-win","tab-win","bogus-menu","acc-win","chat-win","forum-win","layout-win"]',
desktopcontextmenu='["preferences-win"]'
WHERE member_id=3;

INSERT INTO `desktop_themes` VALUES ('Vista-black', 'resources/themes/xtheme-vista-black/xtheme-vista.png', 'resources/themes/xtheme-vista-black/vista-black.css');
INSERT INTO `desktop_themes` VALUES ('Vista-clear', 'resources/themes/xtheme-vista-clear/xtheme-vista.png', 'resources/themes/xtheme-vista-clear/vista-clear.css');
INSERT INTO `desktop_themes` VALUES ('Windows-blue', 'resources/themes/xtheme-windows-blue/xtheme-vista.png', 'resources/themes/xtheme-windows-blue/windows-blue.css');

INSERT INTO `desktop_wallpapers` VALUES ('Beauty1', 'resources/wallpapers/thumbnails/beauty1.jpg', 'resources/wallpapers/beauty1.jpg');
INSERT INTO `desktop_wallpapers` VALUES ('Beauty2', 'resources/wallpapers/thumbnails/beauty2.jpg', 'resources/wallpapers/beauty2.jpg');
INSERT INTO `desktop_wallpapers` VALUES ('Beauty3', 'resources/wallpapers/thumbnails/beauty3.jpg', 'resources/wallpapers/beauty3.jpg');
INSERT INTO `desktop_wallpapers` VALUES ('Beauty4', 'resources/wallpapers/thumbnails/beauty4.jpg', 'resources/wallpapers/beauty4.jpg');
INSERT INTO `desktop_wallpapers` VALUES ('Beauty5', 'resources/wallpapers/thumbnails/beauty5.jpg', 'resources/wallpapers/beauty5.jpg');
INSERT INTO `desktop_wallpapers` VALUES ('Beauty6', 'resources/wallpapers/thumbnails/beauty6.jpg', 'resources/wallpapers/beauty6.jpg');
INSERT INTO `desktop_wallpapers` VALUES ('Beauty7', 'resources/wallpapers/thumbnails/beauty7.jpg', 'resources/wallpapers/beauty7.jpg');
INSERT INTO `desktop_wallpapers` VALUES ('Beauty8', 'resources/wallpapers/thumbnails/beauty8.jpg', 'resources/wallpapers/beauty8.jpg');
INSERT INTO `desktop_wallpapers` VALUES ('Beauty9', 'resources/wallpapers/thumbnails/beauty9.jpg', 'resources/wallpapers/beauty9.jpg');