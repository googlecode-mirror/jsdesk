<?php
include("../inConfig.php");
$return = array();
$return['success'] = 0;
$return['error'] = '';
// requires UserName, Password
$UserName 	= addslashes(strip_tags($_POST['UserName']));
$Password 	= addslashes(strip_tags($_POST['Password']));
if($UserName=='')			$return['error']['UserName'] = 'UserName invalid';
if($Password=='')			$return['error']['Password'] = 'Password invalid';

$sql= "SELECT userID,userName,fullName,email,avatar,classes FROM osUsers WHERE active=1 AND userName='".$UserName."' AND passWord=aes_encrypt('".$Password."','".$GLOBALS['AES']."')";
$que = mysql_query($sql);

if(mysql_num_rows($que) > 0){ // must exist
	$return['success'] = 1;
	session_start();
	header("Cache-control: private"); // IE 6 Fix.

	$user = mysql_fetch_assoc($que);
	$_SESSION["Random"] = 		rand(0,1000).rand(0,1000).rand(0,1000).rand(0,1000).rand(0,1000);
	$_SESSION["Logged"] = 		$UserName.'_'.$_SESSION["Random"];  //unique string
	$_SESSION["UserName"] =		$UserName;
	$_SESSION["FullName"] =		$FullName;
	$_SESSION["Email"] =		$Email;

}else{ // failed
	$return['error']['Password'] = 'Login failed';
}

echo json_encode($return);
exit();
?>