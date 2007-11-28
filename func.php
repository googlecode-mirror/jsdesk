<?php
// Clean potentially nasty stuff from a string
// allowed="a-z,A-Z,0-9,_,-"
// print clean_string("a-z,A-Z,0-9,_,-,[,],(,),',?", $string, ".");
function clean_string($allowed, $string, $replacement){
   return $filename=ereg_replace("[^".$allowed."]",$replacement,$string);
}
function censor($text,$badwords) {
	$mask = "*";
	for ($i = 0; $i < sizeof($words); $i++) {
		$censored = substr($badwords[$i], 0, 1);
		for ($x = 1; $x < strlen($badwords[$i]); $x++) $censored .= $mask;
		$text = str_replace($badwords[$i], $censored, $text);
	}
	return $text;
}
/*************************\
 *   SQL Quote Handler   *
\*************************/
// Quote variable to make safe against SQL injection attacks
function quote_smart($value){
   if (get_magic_quotes_gpc())	$value = stripslashes($value);
   if (!is_numeric($value))		$value = "'" . mysql_real_escape_string($value) . "'";// Quote if not integer
   return $value;
}

//posts transaction data using fsockopen.
function fsockPost($url,$data){
	//Parse url
	$web=parse_url($url);
	//build post string
	foreach($data as $i=>$v){
		$postdata.= $i . "=" . urlencode($v) . "&";
	}
	//Create connection
	$fp=@fsockopen($ssl . $web[host],$web[port],$errnum,$errstr,30);
	//Error checking
	if(!$fp){
		echo "$errnum: $errstr";
	}
	else{// POST
		fputs($fp, "POST $web[path] HTTP/1.1\r\n");
		fputs($fp, "Host: $web[host]\r\n");
		fputs($fp, "Content-type: application/x-www-form-urlencoded\r\n");  // text/xml?
		fputs($fp, "Content-length: ".strlen($postdata)."\r\n");
		fputs($fp, "Connection: close\r\n\r\n");
		fputs($fp, $postdata . "\r\n\r\n");

		//loop through the response from the server
		while(!feof($fp))
		{ $info[]=@fgets($fp, 1024); }
		//close fp - we are done with it
		fclose($fp);

		//break up results into a string
		$info=implode(",",$info);
	}
	return $info;
}
// $xml:String
// xml2array cannot parse child elements with the same name as the parent
// the value of the first 'element' attribute will be '<element>2'
// this won't affect our mblox transactions but it's something to keep in mind
function xml2array ($xml){
	$xmlary = array ();

	if ((strlen ($xml) < 256) && is_file ($xml))
	$xml = file_get_contents ($xml);

	$ReElements = '/<(\w+)\s*([^\/>]*)\s*(?:\/>|>(.*?)<(\/\s*\1\s*)>)/s';
	$ReAttributes = '/(\w+)=(?:"|\')([^"\']*)(:?"|\')/';

	preg_match_all ($ReElements, $xml, $elements);
	foreach ($elements[1] as $ie => $xx)	{
		$xmlary[$ie]["name"] = $elements[1][$ie];
		if ( $attributes = trim($elements[2][$ie])) 		{
			preg_match_all ($ReAttributes, $attributes, $att);
			foreach ($att[1] as $ia => $xx)
				// all the attributes for current element are added here
				$xmlary[$ie]["attributes"][$att[1][$ia]] = $att[2][$ia];
		} // if $attributes

		// get text if it's combined with sub elements
		$cdend = strpos($elements[3][$ie],"<");
		if ($cdend > 0) 		{
			$xmlary[$ie]["text"] = substr($elements[3][$ie],0,$cdend -1);
		} // if cdend

		if (preg_match ($ReElements, $elements[3][$ie]))		{
			$xmlary[$ie]["elements"] = xml2array ($elements[3][$ie]);
		}
		else if (isset($elements[3][$ie]))		{
			$xmlary[$ie]["text"] = $elements[3][$ie];
		}
			$xmlary[$ie]["closetag"] = $elements[4][$ie];
	}//foreach
	return $xmlary;
}
function hexstr($hexstr) {
  $hexstr = str_replace(' ', '', $hexstr);
  $retstr = pack('H*', $hexstr);
  return $retstr;
}
function strhex($string) {
  $hexstr = unpack('H*', $string);
  return array_shift($hexstr);
}
function getExtension($filename){
	$ext = substr (strrchr ($filename, "."), 1);
	return ($ext);
}
function mailTo($frmEmail,$usrEmail,$subject,$message,$redirect){
		// Begin Header information
		$headers  = "MIME-Version: 1.0" . "\x0d\x0a";
		$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\x0d\x0a";
		$headers .= "X-Priority: 3\x0d\x0a";
		$headers .= "X-MSMail-Priority: Normal\x0d\x0a";
		$headers .= "X-Mailer: AtomMailer" . "\x0d\x0a";
		$headers .= "From: \"".$GLOBALS['SiteName']."\" <".$frmEmail.">\x0d\x0a";
		$headers .= "Reply-To: ".$frmEmail."\x0d\x0a";
		//$headers .= "To: " . $recipient . "\n";
		mail($usrEmail, $subject, $message, $headers);
		if($redirect)	header("Location: ".$redirect);
}
function ascii2hex($ascii,$delimeter=" ") {
	$hex = '';
	for ($i = 0; $i < strlen($ascii); $i++) {
		$byte = strtoupper(dechex(ord($ascii{$i})));
		$byte = str_repeat('0', 2 - strlen($byte)).$byte;
		$hex.=$delimeter.$byte;
	}
	return $hex;
}
function hex2ascii($hex,$delimeter=" "){
	$ascii='';
	$hex=str_replace($delimeter, "", $hex);
	for($i=0; $i<strlen($hex); $i=$i+2) {
		$ascii.=chr(hexdec(substr($hex, $i, 2)));
	}
	return($ascii);
}
function hexToAscii($hex, $delimeter=" "){
	//Remove delimiters from hex string
	$hex = str_replace($delimeter, "", $hex);
    $strLength = strlen($hex);
    $returnVal = '';
    for($i=0; $i<$strLength; $i += 2){
		$dec_val = hexdec(substr($hex, $i, 2));
        $returnVal .= chr($dec_val);
    }
    return $returnVal;
}
?>