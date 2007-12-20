

This desktop example is a work in progress.

Several great contributions were made by Todd Murdock (mxracer), including the
TaskBar and StartMenu UX components. Other parts have been added by Adam Eivy (atomantic)

More information can be found in
this thread on the ext js forums:

http://extjs.com/forum/showthread.php?t=10950

This download came from the Google Code Project jsDesk:

http://code.google.com/p/jsdesk/


----------------------------------------------------


DIRECTORY STRUCTURE

	Resources directory contains:

	1. css - desktop's css file
	2. images - default images 
	3. themes - 3rd party themes
	4. wallpapers - desktop wallpapers

	Source directory contains:

	1. core - all core modules
	2. helpers - any module that supports the desktop directly, e.g. the Preferences module
	3. login - if you already have a login system, it can be put here
	4. modules - all modules/apps
	5. desktop.php - desktop PHP class
	6. json.php - json PHP class

DATABASE TABLES

	1. desktop_config - holds default and member configurations/preferences
	2. desktop_login - holds member's temporary login keys
	3. desktop_member_types - holds member types, e.g. administrator, demo, etc.
	4. desktop_members - holds member data
	5. desktop_themes - holds id, thumbnail and path to css
	6. desktop_wallpapers - holds id, thumbnail and path to image
