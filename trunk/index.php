<?php
include("data/desktop.php");
//include("func.php");
//session_start();
//header("Cache-control: private"); // IE 6 Fix.
?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<?php
echo '<meta name="keywords" content="'.$txtKeywords.'" />';
echo '<meta name="description" content="'.$txtDescription.'" />';
echo '<meta name="robots" content="'.$robots.'" />';
echo '<meta name="distribution" content="'.$distribution.'" />';
echo '<title>'.$txtTitlePrefix.' | Desktop | '.$txtTitleSuffix.'</title>';
?>
<link rel="stylesheet" type="text/css" href="css/load.css?v='.$ver_css.'" />
</head>
<body scroll="no">
<div id="loading-mask">&#160;</div>
	<div id="loading">
		<div class="loading-indicator"><img src="js/ext/resources/images/default/grid/loading.gif" style="width:16px;height:16px;" align="absmiddle">&#160;Loading...</div>
</div>
<!-- include everything after the loading indicator -->

<!-- EXT -->
<link rel="stylesheet" type="text/css" href="js/ext/resources/css/ext-all.css" />
<script type="text/javascript" src="js/ext/adapter/ext/ext-base.js"></script>
<script type="text/javascript" src="js/ext/ext-all.js"></script>
<link rel="stylesheet" type="text/css" href="css/vista.css" />
<script type="text/javascript" src="lang/ENG/Text.js"></script>
<script type="text/javascript" src="js/lib/Module.js"></script>

<!-- LOGIN -->
<script type="text/javascript" src="js/lib/Cookies.js"></script>
<!--script type="text/javascript" src="js/ext/ux/Crypto/Ext.ux.Crypto.AES.js"></script-->
<?
function showLogin(){
	echo '<script type="text/javascript" src="js/Login.js"></script>';
}

if(!class_exists('desktop')) {
//if(!isset($_SESSION["Logged"])){ // no session var (alternative using phpsessions)
	showLogin();
} else {
	$desktop = new desktop();
	if(!$desktop->is_logged_in()) {
	// if($_SESSION["Logged"] != $_SESSION["UserName"].'_'.$_SESSION["Random"]) {//ses var, but NOT equal!!
	//    session_destroy();
		showLogin();
	}
}
?>

<!-- DESKTOP -->
<link rel="stylesheet" type="text/css" href="css/desktop.css<?='?v='.$ver_css ?>" />
<script type="text/javascript" src="js/lib/StartMenu.js"></script>
<script type="text/javascript" src="js/lib/TaskBar.js"></script>
<script type="text/javascript" src="js/Desktop.js"></script>
<script type="text/javascript" src="js/lib/App.js"></script>

<!-- PLUGINS / APPS -->
<script type="text/javascript" src="plugins/layout-window/js/plugin.js"></script>
<script type="text/javascript" src="plugins/docs/js/plugin.js"></script>
<link rel="stylesheet" type="text/css" href="plugins/docs/css/styles.css" />

<!-- DESKTOP CONFIGURATION -->
<script type="text/javascript" src="js/DesktopConfig.js"></script>
<script type="text/javascript" src="js/Preferences.js"></script>

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

<div id="ux-taskbar">
	<div id="ux-taskbar-start"></div>
	<div id="ux-taskbuttons-panel"></div>
	<div class="x-clear"></div>
</div>
</body>
</html>