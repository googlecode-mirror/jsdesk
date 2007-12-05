<?php
include("inConfig.php");
class desktop {
	function desktop()	{
	
	}
	
	/* PRIVATE
	 *
	 * Intended for internal use
	 */
	function get_key()	{
		return addslashes($_COOKIE["key"]); // prevent sql injection attacks
	} // end get_key()
	
	/* PUBLIC
	 *
	 * Requires get_key() method
	 *
	 * Returns boolean True/False
	 */
	function is_logged_in()
	{
		$logged_in = false;
		
		// get the random login key
		$key = $this->get_key();
		
		// query the db for the login id
		$sql = "select member_id from login where login_key = '".addslashes($key)."'";
		
		// if a record is found, they are logged in
		if(mysql_num_rows($result = mysql_query($sql)) > 0) { $logged_in = true; }
		
		return $logged_in;
	} // end is_loggid_in()
	
	
	
	/* PUBLIC
	 *
	 * Requires the get_key() method
	 *
	 * Returns id of member currently logged in
	 */
	function get_member_id() {
		// get the random login key
		$key = $this->get_key();
		
		// query the db for the login id
		if(mysql_num_rows($result = mysql_query("select member_id from login where login_key = '".$key."'")) > 0) {
			$row = mysql_fetch_assoc($result);
			$member_id = $row['member_id'];
		} else {
//			$member_id = "no memberid, key=".$key;
			$member_id = "";
		}
		
		return $member_id;
	} // end get_member_id()
	
	
	
	/* PUBLIC
	 *
	 * Requires the get_key() method
	 *
	 * Returns id of member currently logged in
	 */
	function get_member_name() {
		// get the random login key
		$key = $this->get_key();
		
		// get member id
		$member_id = $this->get_member_id();
		
		// query the db for the member name
		if(mysql_num_rows($result = mysql_query("select member_first_name, member_last_name from members where member_id = '".$member_id."'")) > 0) {
			$row = mysql_fetch_assoc($result);
			$member_name = $row['member_first_name']." ".$row['member_last_name'];
		} else {
			$member_name = "";
		}
		
		return $member_name;
	} // end get_member_name()
	
	
	/* PUBLIC
	 *
	 * Requires the get_member_id() method
	 *
	 * Returns a string
	 */
	function get_member_type($member_id) {

		// get the member id
		if(!isset($member_id)) { $member_id = $this->get_member_id(); }
		
		// query the db for the member type id
		if(mysql_num_rows($result = mysql_query("select t2.type_text from members t1, member_types t2 where t1.member_id = ".$member_id." and t1.member_type = t2.type_id")) > 0) {
			$row = mysql_fetch_assoc($result);
			$member_type = $row['type_text'];
		} else {
			$member_type = "";
		}
		
		return $member_type;
	} // end get_member_type()
	
	
	/* PUBLIC
	 *
	 * Requires the get_member_type() method
	 *
	 * Usage: if(is_member_type('administrator') { // do something }
	 *
	 * Returns boolean True/False
	 */
	function is_member_type($type_check) {
		// get member type
		$member_type = $this->get_member_type();
		
		// case-insensitive string comparison
		if(strcasecmp($member_type, $type_check) == 0) {
			return true;
		} else {
			return false;
		}		
	} // end is_member_type()
	
	
	
	/* PUBLIC
	 *
	 * Returns JSON data 
	 */
	function login($user, $pass) {
		$json = "";

		if(!isset($user)||!strlen($user)) {
			$json = "{errors:[{id:'user', msg:'Required Field'}]}";
		}elseif(!isset($pass)||!strlen($pass)){
			$json = "{errors:[{id:'pass', msg:'Required Field'}]}";
		}else {
				
			// check username
			$sql = "select member_id from members where member_username = '".$user."'";
			if(mysql_num_rows(mysql_query($sql)) < 1)
			{
				$json = "{errors:[{id:'user', msg:'User not found'}]}";
			}
			else
			{
				// check password
				$sql = "select member_id, member_type, member_username, member_first_name, member_last_name, member_email from members where member_username = '".$user."' and member_password=aes_encrypt('".$pass."','".$GLOBALS['AES']."')";
				if(mysql_num_rows($result = mysql_query($sql)) < 1)
				{
					$json = "{errors:[{id:'pass', msg:'Incorrect Password'}]}";
				}
				else
				{
					// grab needed data
					$row = mysql_fetch_assoc($result);
					$member_id = $row['member_id'];
					$member_type = $row['member_type'];
					$member_username = $row['member_username'];
					$member_name = $row['member_first_name']." ".$row['member_last_name'];

					// delete existing login record, but not for demo login
                    $sql = "delete from login where member_id = ".$member_id;
                    if(!mysql_query($sql)) { $json = "{errors:[{id:'user', msg:'Login Failed'}]}"; }
					
					// get our random login key
					$rand_key = $this->get_rand_key();
					
					// save temporary login key to our db
					$sql = "insert into login
							(member_id,
							login_key,
							login_ip,
							login_date)
							values
							(".$member_id.",
							'".$rand_key."',
							'".$_SERVER['REMOTE_ADDR']."',
							'".date("Y-m-d H:i:s")."')";
					
					if(!mysql_query($sql)) { $json = "{errors:[{id:'user', msg:'Login Failed'}]}"; }
					
					$json = "{success:true, key:'".$rand_key."', username:'".$member_username."', name:'".$member_name."', type:'".$this->get_member_type($member_id)."'}\n";
				}
			}
		}
		return $json;
	} // end login()
	
	
	
	/*
	 * PUBLIC
	 *
	 * Requires get_member_id() method
	 *
	 * Redirects to login.html on success
	 */
	function logout() {
		// get member id
		$member_id = $this->get_member_id();

		// delete login from database
		$sql = "delete from login where member_id = ".$member_id;
		mysql_query($sql);// or die ($member_id." Logout failed...");
		// if no valid key, logout, clear and redirect anyway
		
		// clear the cookie
		setcookie("key", "");
		setcookie("memberName", "");
		
		// redirect to main page
		header( 'Location: /index.php' ); // TODO: Setup sync so that we don't have to redirect (just launch a new login/lockout dialog and update page content to fit anonymous user creds)
	} // end logout()
	
	
	
	/*
	 * PRIVATE
	 *
	 * Requires get_rand_id method
	 *
	 * Returns a random key
	 */
	function get_rand_key()
	{
		$rand_key = $this->get_rand_id(10);
		return md5($rand_key);
	} // end get_rand_key()
	
	
	
	/*
	 * PRIVATE
	 *
	 * Requires get_rand_value method
	 *
	 * Returns a random id
	 */
	function get_rand_id($length)
	{
		if($length>0) 
		{ 
			$rand_id="";
			for($i=1; $i<=$length; $i++)
			{
				mt_srand((double)microtime() * 1000000);
				$num = mt_rand(1,36);
				$rand_id .= $this->get_rand_value($num);
			}
		}
		
		return $rand_id;
	} // end get_rand_id()
	
	
	
	/*
	 * PRIVATE
	 *
	 * Returns a random value
	 */
	function get_rand_value($num)
	{
		// accepts 1 - 36
		switch($num)
		{
			case "1":
			 $rand_value = "a";
			break;
			case "2":
			 $rand_value = "b";
			break;
			case "3":
			 $rand_value = "c";
			break;
			case "4":
			 $rand_value = "d";
			break;
			case "5":
			 $rand_value = "e";
			break;
			case "6":
			 $rand_value = "f";
			break;
			case "7":
			 $rand_value = "g";
			break;
			case "8":
			 $rand_value = "h";
			break;
			case "9":
			 $rand_value = "i";
			break;
			case "10":
			 $rand_value = "j";
			break;
			case "11":
			 $rand_value = "k";
			break;
			case "12":
			 $rand_value = "l";
			break;
			case "13":
			 $rand_value = "m";
			break;
			case "14":
			 $rand_value = "n";
			break;
			case "15":
			 $rand_value = "o";
			break;
			case "16":
			 $rand_value = "p";
			break;
			case "17":
			 $rand_value = "q";
			break;
			case "18":
			 $rand_value = "r";
			break;
			case "19":
			 $rand_value = "s";
			break;
			case "20":
			 $rand_value = "t";
			break;
			case "21":
			 $rand_value = "u";
			break;
			case "22":
			 $rand_value = "v";
			break;
			case "23":
			 $rand_value = "w";
			break;
			case "24":
			 $rand_value = "x";
			break;
			case "25":
			 $rand_value = "y";
			break;
			case "26":
			 $rand_value = "z";
			break;
			case "27":
			 $rand_value = "0";
			break;
			case "28":
			 $rand_value = "1";
			break;
			case "29":
			 $rand_value = "2";
			break;
			case "30":
			 $rand_value = "3";
			break;
			case "31":
			 $rand_value = "4";
			break;
			case "32":
			 $rand_value = "5";
			break;
			case "33":
			 $rand_value = "6";
			break;
			case "34":
			 $rand_value = "7";
			break;
			case "35":
			 $rand_value = "8";
			break;
			case "36":
			 $rand_value = "9";
			break;
		}
		return $rand_value;
	}
} // end get_rand_value()
?>