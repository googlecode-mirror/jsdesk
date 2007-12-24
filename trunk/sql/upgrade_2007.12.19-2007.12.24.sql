
ALTER TABLE `desktop_config` ADD `autorun` TEXT NOT NULL AFTER `member_id` ;

UPDATE desktop_config SET autorun='["docs-win","chat-win"]' where autorun='';

UPDATE desktop_config SET 
startmenu='["docs-win","grid-win","tab-win","bogus-menu","acc-win","chat-win","forum-win","layout-win"]',
desktopcontextmenu='["preferences-win"]'
WHERE member_id=3;