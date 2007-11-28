<?php
include("inConfig.php");
include("func.php");
//if( preg_match ("/wml/i", $_SERVER['HTTP_ACCEPT'])){
//	header("Location: http://".$GLOBALS['wapURL']);
//}
$pageTitle = "404 Page Not Found";
//$jsCode = '<script language="javascript" type="text/javascript" src="scripts/ajax_send.js"></script>';
//$cssCode = '<script language="javascript" type="text/javascript" src="scripts/ajax_send.js"></script>';
include("inHeader.php");
echo '<div id="default">';
$ip = getenv("REMOTE_ADDR");
$requri = getenv("REQUEST_URI");
$servname = getenv("SERVER_NAME");
$combine = $ip . " tried to load " . $servname . $requri ;
$httpref = getenv ("HTTP_REFERER");
$httpagent = getenv ("HTTP_USER_AGENT");
$today = date("D M j Y g:i:s a T");

$note = "Your request has been logged and we will fix the error that brought you here soon--unless you maliciously tried to access a page that doesn't exist. Naughty..." ;

$message = "$today \n
<br>
$combine <br> \n
User Agent = $httpagent \n
<h2> $note </h2>\n
<br> <a href=\"$httpref\">$httpref</a> ";

$message2 = "$today \n
$combine \n
User Agent = $httpagent \n
$note \n
$httpref ";

$to = "error@".$servname;
$subject = $servname." Error Page";
$from = "From: fake@".$servname."\r\n";

//mail($to, $subject, $message2, $from);

echo $message;

echo '</div>';
include('inFooter.php');
?>