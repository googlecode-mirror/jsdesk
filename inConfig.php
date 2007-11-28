<?php
// vars / site config options
$GLOBALS['URL'] = 'http://YOUR_DOMAIN.NET'; // your site URL
$GLOBALS['wapURL'] = 'http://YOUR_DOMAIN.NET/wap'; // mobile URL

// database connection
$dbServer   = "HOST_NAME";
$dbUser     = "DATABASE_USER";
$dbPass     = "PASSWORD";
$dbName     = "DB_NAME";

session_name('DOMAINUser'); // Custom session variable name (instead of PHPSESSION)
session_set_cookie_params(86400*30); // set to expire in 30 days

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

?>