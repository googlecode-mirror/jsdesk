<?php
// get the desktop
require_once("../desktop.php");

$return = array();
$return['success'] = 0;
$return['error'] = '';

if(class_exists('desktop')) {
	$desktop = new desktop();

    // requires Module, UserName, Password
    $Module 	= addslashes(strip_tags($_POST['module']));
    $UserName 	= addslashes(strip_tags($_POST['UserName']));
    $Password 	= addslashes(strip_tags($_POST['Password']));
    if($UserName=='')			$return['error']['UserName'] = 'UserName invalid';
    if($Password=='')			$return['error']['Password'] = 'Password invalid';

	echo $desktop->login($Module, $UserName, $Password);
}else{
    echo json_encode($return);
    exit();
}
?>