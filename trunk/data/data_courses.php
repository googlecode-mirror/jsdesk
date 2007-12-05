<?php

include("../inConfig.php");

$sql = "SELECT * FROM classList WHERE active=1";
$que = mysql_query($sql);
echo json_encode(mysql_fetch_assoc($que));
?>