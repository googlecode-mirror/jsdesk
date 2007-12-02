<?php
/*
 * need to return something like this:
 * 
 * {
 * 		'success': true,
 * 		'config': {
 * 			'desktopcontextmenu': [
 * 				'docs-win',
 * 				'preferences-win'
 * 			],
 * 			'quickstart': [
 * 				'grid-win',
 * 				'tab-win',
 * 				'acc-win',
 * 				'layout-win'
 * 			],
 * 			'startmenu': [
 * 				'docs-win',
 * 				'grid-win',
 * 				'tab-win',
 * 				'acc-win',
 * 				'layout-win',
 * 				'bogus-menu'
 * 			]
 * 		}
 * }
 */
 
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
	
	if($member_id != ""){
		$sql =
			"select
			desktopcontextmenu,
			quickstart,
			startmenu
			from
			desktopConfig
			where
			member_id = 0
			or
			member_id = ".$member_id."
			order by
			member_id asc";
		
		if($result = mysql_query($sql)){
			$row = mysql_fetch_assoc($result);
			
			$desktopcontextmenu = $row["desktopcontextmenu"] != "" ? $row["desktopcontextmenu"] : "['docs-win', 'preferences-win']";
			$quickstart = $row["quickstart"] != "" ? $row["quickstart"] : "['grid-win','tab-win','acc-win','layout-win']";
			$startmenu = $row["startmenu"] != "" ? $row["startmenu"] : "['docs-win','grid-win','tab-win','acc-win','layout-win','bogus-menu']";
			
			if(mysql_num_rows($result) > 1){ // get members preferences
				$row = mysql_fetch_assoc($result);
				if($row["quickstart"] != ""){
					$quickstart = $row["quickstart"];
				}
			}
			
			$json =
			"{
				'success': true,
				'config': {
					'desktopcontextmenu': ".$desktopcontextmenu.",
					'quickstart': ".$quickstart.",
					'startmenu': ".$startmenu."
				}
			}";
		}
	}
}

print $json;
?>