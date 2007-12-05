<?php
// vars / site config options
$GLOBALS['URL'] = 'http://jsdesk.com';
$GLOBALS['wapURL'] = 'http://jsdesk.com/wap';

// database connection
$GLOBALS['dbHost'] = "sql.shadowpuppet.net";
$GLOBALS['dbUser'] = "sqljsdesk";
$GLOBALS['dbPass'] = "Kdu72#q^";
$GLOBALS['dbName'] = "dbjsdesk";

$sConn = @mysql_pconnect($GLOBALS['dbHost'], $GLOBALS['dbUser'], $GLOBALS['dbPass'])
or die("Couldnt connect to database");

$dbConn = @mysql_select_db($GLOBALS['dbName'], $GLOBALS['sConn'])
or die("Couldnt select database $dbName");

session_name('jsDeskUser');
//session_cache_expire(60*24*30); // set to expire in 30 days
session_set_cookie_params(86400*30); // set to expire in 30 days

$GLOBALS['company']="jsDesk";

// META
$txtKeywords = '';
$txtDescription = '';
$robots = 'INDEX,ALL';
$distribution = 'GLOBAL';

$txtTitlePrefix = 'jsDesk: A JavaScript Desktop Web Application';
$txtTitleSuffix = '\m/';

$txtFoot = $GLOBALS['company'];

// for Censor function in func.php
// censor($text,$GLOBALS['badWords']);
$GLOBALS['badWords'] = array("cunt", "shit", "fuck", "dick", "cock", "pussy");

$GLOBALS['email']['admin']='root@shadowpuppet.net';

// db encryption key
$GLOBALS['db_key'] = '221610ae-8f4d-11dc-8314-0800200c9a66';

?>