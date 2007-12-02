################
# Requirements #
################

Web server running PHP/MySQL

################
# Installation #
################

1. Edit jsDesk/data/inConfig.php to point to your mysql host and enter your username, password, database for the server. Change the rest of the variables to fit your server.

2. Import jsDesk/sql/*.sql into your mysql database

3. Upload the jsDesk/ (root) folder and it's contents to your webserver

4. open http://[YOUR_WEB_SERVER]/jsDesk or whatever directory you put it in

5. rock out \m/

#######################
# Alternative Install #
#######################

1. SSH into your web server

2. enter the following command

	svn checkout http://jsdesk.googlecode.com/svn/trunk/ jsdesk

3. edit jsdesk/data/inConfig.php to point to your mysql host and enter your username, password, database for the server. Change the rest of the variables to fit your server.

4. open http://[YOUR_WEB_SERVER]/jsDesk or whatever directory you put it in

5. rock out \m/


