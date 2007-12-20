<?php
include("../desktop.php");
$return = array();
$return['success'] = 0;
$return['error'] = '';
// requires module, UserName, FullName, Email, Password, Password2
$Module 	= addslashes(strip_tags($_POST['module']));
$UserName 	= addslashes(strip_tags($_POST['UserName']));
$FirstName 	= addslashes(strip_tags($_POST['FirstName']));
$LastName 	= addslashes(strip_tags($_POST['LastName']));
$Email 		= addslashes(strip_tags($_POST['Email']));
$Password 	= addslashes(strip_tags($_POST['Password']));
$Password2 	= addslashes(strip_tags($_POST['Password2']));
$emailRegEx = "/^(\w+([.+-]*\w+)*@\w+([+.-]*\w)*\.\w{2,})$/";
if($UserName=='')			$return['error']['UserName'] = 'Username invalid';
if($FirstName=='')			$return['error']['FirstName'] = 'First name invalid';
if($LastName=='')			$return['error']['LastName'] = 'Last name invalid';
if(!preg_match($emailRegEx, $Email))	$return['error']['Email'] = 'Email invalid';
if($Password=='')			$return['error']['Password'] = 'Password invalid';
if($Password2!=$Password)	$return['error']['Password2'] = 'Passwords do not match';

// see if user exists
$sql = "SELECT COUNT(member_id) FROM desktop_members WHERE member_email='".$Email."'";
$que = mysql_query($sql);
$exists = mysql_result($que,0);
if($exists)	$return['error']['Email'] = 'Your Email is already registered. Contact '.$GLOBALS['email']['admin'];
$sql = "SELECT COUNT(member_id) FROM desktop_members WHERE member_username='".$UserName."'";
$que = mysql_query($sql);
$exists = mysql_result($que,0);
if($exists)	$return['error']['UserName'] = 'Username is taken :(';

if($return['error']!=''){
	echo json_encode($return);
	exit();
}else{ // register user

	$sql = "INSERT INTO desktop_members(member_username,member_first_name,member_last_name,member_email,member_password) VALUES('".$UserName."','".$FirstName."','".$LastName."','".$Email."',aes_encrypt('".$Password."','".$GLOBALS['db_key']."') )";
	$que = mysql_query($sql);
	$return['success'] = 1;

    if(class_exists('desktop')) {
        $desktop = new desktop();
        echo $desktop->login($Module, $UserName, $Password);
    }else{
        echo json_encode($return);
        exit();
    }
}
?>