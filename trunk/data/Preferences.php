<?php
// default
$output = "{'success': false}";

// get the desktop
require_once("desktop.php");
if(class_exists('desktop'))
{
	$desktop = new desktop();
	
	// connect to data
	//$desktop->connect_to_db();

	// get member id
	$member_id = $desktop->get_member_id();
	
	// get post data
	$task = $_POST["task"];
	$what = $_POST["what"];
	$data = $_POST["data"];
	
	if($member_id != "")
	{
		// saving?
		if($task == "save" && $data != "")
		{
			if(save($what, $member_id, Mod_addslashes($data)))
			{
				$output = "{'success': true}";
			}
		}
		// loading?
		else if($task == "load")
		{
			// what?
			if($what == "wallpapers")
			{
				$output = load_wallpapers();
			}
		}
	}
}

print $output;



// helper functions
function Mod_addslashes($string)
{
	if(get_magic_quotes_gpc()==1)
	{
		return ($string);
	}
	else
	{
		return (addslashes($string ));
	}
}



function save($field, $member_id, $data)
{
	$success = false;

	$sql = "select ".$field." from desktopConfig where member_id = ".$member_id;

	// if user already has a saved preference, update it, else, insert new
	if(mysql_num_rows(mysql_query($sql)) > 0)
	{
		$sql = "update desktopConfig set ".$field." = '".$data."' where member_id = ".$member_id;
	}
	else
	{
		$sql = "insert into desktopConfig (member_id, ".$field.") values (".$member_id.", '".$data."')";
	}

	if(mysql_query($sql))
	{
		$success = true;
	}

	return $success;
}



function load_wallpapers()
{
	/* If you don't have built in json services, use this.
	 * Create a new instance of Services_JSON */
	require_once("json.php");
	$json = new Services_JSON();

	$Items = array();
	$dir_wallpapers = '../wallpapers/thumbnails/';

	if(is_dir($dir_wallpapers))
	{
	    if ($dh = opendir($dir_wallpapers))
	    {
	        while (($file = readdir($dh)) !== false)
	        {
		    	if(is_file($dir_wallpapers . $file))
		    	{
	               $Items[] = array(name=>$file, url=>"wallpapers/thumbnails/".$file);
	            }
			}
	        closedir($dh);
	    }
	}

	/* If you have built in json support
	 return '{"images":'.json_encode($Items).'}'; */

	// If not
	return '{"images":'.$json->encode($Items).'}';
}
?>