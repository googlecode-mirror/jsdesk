<?php
include("source/desktop.php");
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
<link rel="stylesheet" type="text/css" href="resources/css/load.css?v='.$ver_css.'" />
</head>
<body scroll="no">
<div id="loading-mask">&#160;</div>
	<div id="loading">
		<div class="loading-indicator"><img src="resources/images/default/grid/loading.gif" style="width:16px;height:16px;" align="absmiddle">&#160;Loading...</div>
</div>
<!-- include everything after the loading indicator -->

<!-- EXT -->
<link rel="stylesheet" type="text/css" href="js/ext/resources/css/ext-all.css" />
<script type="text/javascript" src="js/ext/adapter/ext/ext-base.js"></script>
<script type="text/javascript" src="js/ext/ext-all.js"></script>



<!-- LOGIN -->
<script type="text/javascript" src="source/login/cookies.js"></script>
<!--script type="text/javascript" src="js/ext/ux/Crypto/Ext.ux.Crypto.AES.js"></script-->

<!-- DESKTOP STYLES -->
<link rel="stylesheet" type="text/css" href="resources/css/desktop.css" />
<link rel="stylesheet" type="text/css" href="source/helpers/preferences/preferences.css" />

<!-- fisheye -->
<link href="source/modules/lmtoolbar/fisheye.css" type="text/css" rel="stylesheet"/>
<script src="source/modules/lmtoolbar/fisheye.js" type="text/javascript"></script>
<script src="source/modules/lmtoolbar/lmtoolbar.js" type="text/javascript"></script>


<!-- THEME -->
<link id="theme" rel="stylesheet" type="text/css" href="resources/themes/xtheme-vista/css/xtheme-vista.css" />

<!-- LOCALIZATION -->
<script type="text/javascript" src="lang/ENG/Text.js"></script>

<!-- MODULE BASE -->
<script type="text/javascript" src="source/core/Module.js"></script>

<?
function showLogin(){
	echo '<script type="text/javascript" src="source/login/login.js"></script>';
}

if(!class_exists('desktop')) {
	showLogin();
} else {
	$desktop = new desktop();
	if(!$desktop->is_logged_in()) {
		showLogin();
	}
}
?>

<!-- DESKTOP -->
<script type="text/javascript" src="source/core/StartMenu.js"></script>
<script type="text/javascript" src="source/core/TaskBar.js"></script>
<script type="text/javascript" src="source/core/Desktop.js"></script>
<script type="text/javascript" src="source/core/App.js"></script>
<script type="text/javascript" src="source/core/DesktopConfig.js"></script>

<!-- DESKTOP HELPERS -->
<script type="text/javascript" src="source/helpers/color-picker/color-picker.ux.js"></script>
<link rel="stylesheet" type="text/css" href="source/helpers/color-picker/color-picker.ux.css" />
<script type="text/javascript" src="source/helpers/preferences/Preferences.js"></script>

<!-- MODULES -->
<script type="text/javascript" src="source/modules/layout-window/js/layout-window.js"></script>
<script type="text/javascript" src="source/modules/docs/js/docs.js"></script>
<link rel="stylesheet" type="text/css" href="source/modules/docs/css/docs.css" />

<div id="x-desktop">
	<dl id="x-shortcuts">

        <dt id="docs-win-shortcut">
            <a href="#"><img src="resources/images/default/s.gif" />
            <div>Developer Docs</div></a>
        </dt>
        <dt id="grid-win-shortcut">
            <a href="#"><img src="resources/images/default/s.gif" />
            <div>Grid Window</div></a>
        </dt>
        <dt id="acc-win-shortcut">
            <a href="#"><img src="resources/images/default/s.gif" />
            <div>Accordion Window</div></a>
        </dt>
		
    </dl>
	<dl id="x-toolbars">
		<dt id="toolbar2">
	          
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

</body>
</html>