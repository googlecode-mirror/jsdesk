<?php
// get the desktop
require_once("desktop.php");
if(class_exists('desktop'))
{
	$desktop = new desktop();
	$desktop->logout();
}
?>
