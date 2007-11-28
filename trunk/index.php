<?php
include("inConfig.php");
include("func.php");
//if( preg_match ("/wml/i", $_SERVER['HTTP_ACCEPT'])){
//	header("Location: http://".$GLOBALS['wapURL']);
//}
$pageTitle = "";
//$jsCode = '<script language="javascript" type="text/javascript" src="scripts/ajax_send.js"></script>';
//$cssCode = '<script language="javascript" type="text/javascript" src="scripts/ajax_send.js"></script>';
include("inHeader.php");
?>

<div id="x-desktop">
	<dl id="x-shortcuts">

        <dt id="docs-win-shortcut">
            <a href="#"><img src="css/images/s.gif" />
            <div>Developer Docs</div></a>
        </dt>
        <dt id="grid-win-shortcut">
            <a href="#"><img src="css/images/s.gif" />
            <div>Grid Window</div></a>
        </dt>

        <dt id="acc-win-shortcut">
            <a href="#"><img src="css/images/s.gif" />
            <div>Accordion Window</div></a>
        </dt>

    </dl>
</div>
<div id="ux-taskbar">
	<div id="ux-taskbar-start"></div>
	<div id="ux-taskbar-panel-wrap">

		<div id="ux-quickstart-panel"></div>
		<div id="ux-taskbuttons-panel"></div>
	</div>
	<div class="x-clear"></div>
</div>

<?
include('inFooter.php');
?>