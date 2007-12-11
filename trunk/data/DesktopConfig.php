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
 * 			],
 * 			'styles': {
 * 				'backgroundcolor': 'f9f9f9',
 * 				'transparency': false,
 * 				'wallpaper': 'qwikioffice.jpg'
 * 			}
 * 		}
 * }
 */
 
// default
$json = "{'success': false}";

// get the desktop
require_once("desktop.php");
if(class_exists('desktop'))
{
	$desktop = new desktop();
	
	// connect to data
	//$desktop->connect_to_db();

	// get member id
	$member_id = $desktop->get_member_id();
	
	if($member_id != "")
	{
		$sql =
			"select
			backgroundcolor,
			desktopcontextmenu,
			quickstart,
			startmenu,
			transparency,
			wallpaper
			from
			desktopConfig
			where
			member_id = 0
			or
			member_id = ".$member_id."
			order by
			member_id asc";
		
		if($result = mysql_query($sql))
		{
			// get defaults
			$row = mysql_fetch_assoc($result);
			
			$backgroundcolor = $row["backgroundcolor"];
			$desktopcontextmenu = $row["desktopcontextmenu"] != "" ? $row["desktopcontextmenu"] : "[]";
			$quickstart = $row["quickstart"] != "" ? $row["quickstart"] : "[]";
			$startmenu = $row["startmenu"] != "" ? $row["startmenu"] : "[]";
			$transparency = $row["transparency"] != "" ? $row["transparency"] : false;
			$wallpaper = $row["wallpaper"];
			
			// get member preferences, if any
			if(mysql_num_rows($result) > 1)
			{
				$row = mysql_fetch_assoc($result);

				$backgroundcolor = $row["backgroundcolor"] != "" ? $row["backgroundcolor"] : $backgroundcolor;
				$quickstart = $row["quickstart"] != "" ? $row["quickstart"] : $quickstart;
				$transparency = $row["transparency"] != "" ? $row["transparency"] : $transparency;
				$wallpaper = $row["wallpaper"] != "" ? $row["wallpaper"] : $wallpaper;
			}

			$json =
			"{
				'success': true,
				'config': {
					'desktopcontextmenu': ".$desktopcontextmenu.",
					'quickstart': ".$quickstart.",
					'startmenu': ".$startmenu.",
					'styles': {
						'backgroundcolor': '".$backgroundcolor."',
						'transparency': ".$transparency.",
						'wallpaper': '".$wallpaper."'
					}
				}
			}";
		}
	}
}

print $json;
?>