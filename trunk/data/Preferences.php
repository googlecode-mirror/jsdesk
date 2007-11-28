<?php
// default
$json = "{'success': false}";

// get the desktop
require_once("desktop.php");
if(class_exists('desktop')){
	$desktop = new desktop();
	
	// connect to data
	$desktop->connect_to_db();
	
	// get member id
	$member_id = $desktop->get_member_id();
	
	// get post data
	$quickstart = Mod_addslashes($_POST["quickstart"]);
	
	if($member_id != ""){
		
		// what preference?
		if($quickstart != ""){
			if(mysql_num_rows(mysql_query("select quickstart from desktopConfig where member_id = ".$member_id)) > 0){
				$sql = "update desktopConfig set quickstart = '".$quickstart."' where member_id = ".$member_id;
			}else{
				$sql = "insert into desktopConfig (member_id, quickstart) values (".$member_id.", '".$quickstart."')";
			}
			
			if(mysql_query($sql)){
				$json = "{'success': true}";
			}
		}
	}
}

print $json;



// helper
function Mod_addslashes($string){
	if(get_magic_quotes_gpc()==1){
		return ($string);
	}else{
		return (addslashes($string ));
	}
}
?>