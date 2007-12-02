<?php
// vars / site config options
$GLOBALS['URL'] = 'http://YOUR_DOMAIN.NET'; // your site URL
$GLOBALS['wapURL'] = 'http://YOUR_DOMAIN.NET/wap'; // mobile URL

// database connection
$GLOBALS['dbHost']   = "HOST_NAME";
$GLOBALS['dbUser']   = "DATABASE_USER";
$GLOBALS['dbPass']   = "PASSWORD";
$GLOBALS['dbName']   = "DB_NAME";

$sConn = @mysql_pconnect($GLOBALS['dbHost'], $GLOBALS['dbUser'], $GLOBALS['dbPass'])
or die("Couldnt connect to database");

$dbConn = @mysql_select_db($GLOBALS['dbName'], $GLOBALS['sConn'])
or die("Couldnt select database $dbName");

//session_name('DOMAINUser'); // Custom session variable name (instead of PHPSESSION)
//session_set_cookie_params(86400*30); // set to expire in 30 days

$GLOBALS['company']="COMPANY NAME";

// META
$txtKeywords = '';
$txtDescription = '';
$robots = 'INDEX,ALL';
$distribution = 'GLOBAL';

$txtTitlePrefix = 'YOUR TITLE';
$txtTitleSuffix = '';

$txtFoot = $GLOBALS['company'];

// for Censor function in func.php
// censor($text,$GLOBALS['badWords']);
$GLOBALS['badWords'] = array("cunt", "shit", "fuck", "dick", "cock", "pussy");

$GLOBALS['email']['admin']='admin@YOUR_DOMAIN.NET';

// db encryption key
$GLOBALS['db_key'] = 'YOUR_RANDOM_CODE_HERE';