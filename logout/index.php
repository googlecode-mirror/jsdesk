<?php
include("../inConfig.php");
session_start();
header("Cache-control: private"); // IE 6 Fix.

// destroy session data
$_SESSION = array();

// This will destroy the session, and not just the session data!
if (isset($_COOKIE[session_name()])) {
   setcookie(session_name(), '', time()-42000, '/');
}

session_destroy();

header("Location: ".$GLOBALS['URL']);

?>