<?php
include("inConfig.php");

connect_to_db();
//modify_database("../sql/dbjsdesk.sql");
modify_database("../sql/upgrade_2007.12.26.sql");

function connect_to_db()
{
	$sConn = mysql_pconnect($GLOBALS['dbHost'], $GLOBALS['dbUser'], $GLOBALS['dbPass'])
or die("Couldnt connect to database");

    $dbConn = mysql_select_db($GLOBALS['dbName'], $GLOBALS['sConn'])
or die("Couldnt select database $dbName");
	
}
function modify_database($sqlfile='', $sqlstring='') {

    global $db;

    $success = true;  // Let's be optimistic

    if (!empty($sqlfile)) {
        if (!is_readable($sqlfile)) {
            $success = false;
            echo '<p>Tried to modify database, but "'. $sqlfile .'" doesn\'t exist!</p>';
            return $success;
        } else {
            $lines = file($sqlfile);
        }
    } else {
        $sqlstring = trim($sqlstring);
        if ($sqlstring{strlen($sqlstring)-1} != ";") {
            $sqlstring .= ";"; // add it in if it's not there.
        }
        $lines[] = $sqlstring;
    }

    $command = '';

    foreach ($lines as $line) {
        $line = rtrim($line);
        $length = strlen($line);

        if ($length and $line[0] <> '#' and $line[0].$line[1] <> '--') {
            if (substr($line, $length-1, 1) == ';') {
                $line = substr($line, 0, $length-1);   // strip ;
                $command .= $line;
                //$command = str_replace('prefix_', $CFG->prefix, $command); // Table prefixes
                if (! execute_sql($command)) {
                    $success = false;
                }
                $command = '';
            } else {
                $command .= $line;
            }
        }
    }

    //$METATABLES = $db->Metatables();
    
    
    return $success;

}

function execute_sql($command, $feedback=true) {
/// Completely general function - it just runs some SQL and reports success.

    global $db;//, $CFG;

 	echo mysql_query($command) or die("Could not execut $command");  
    

    
}
?>