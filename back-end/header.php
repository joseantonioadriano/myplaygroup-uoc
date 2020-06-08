<?php

error_reporting(E_ALL);
ini_set('display_errors', '1');
ini_set('display_startp_errors', '1');
error_reporting(E_ALL);


header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Max-Age: 1000");
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, Accept, Accept-Encoding");
header("Access-Control-Allow-Methods: PUT, POST, GET, OPTIONS, DELETE");
date_default_timezone_set('Europe/Paris');
$_SERVER['_application_folder'] = 'myplaygroup-back-php';
$_SERVER['_components_folder']  = 'components';

if ($_SERVER['HTTP_HOST']=="localhost") {
	include_once($_SERVER['CONTEXT_DOCUMENT_ROOT']."/".$_SERVER['_application_folder']."/".$_SERVER['_components_folder']."/Cx.class.php");
	include_once($_SERVER['CONTEXT_DOCUMENT_ROOT']."/".$_SERVER['_application_folder']."/".$_SERVER['_components_folder']."/Log.class.php");
	include_once($_SERVER['CONTEXT_DOCUMENT_ROOT']."/".$_SERVER['_application_folder']."/".$_SERVER['_components_folder']."/DBManager.class.php");
	include_once($_SERVER['CONTEXT_DOCUMENT_ROOT']."/".$_SERVER['_application_folder']."/".$_SERVER['_components_folder']."/Query.class.php");
} else {
	include_once($_SERVER['_components_folder']."/Cx.class.php");
	include_once($_SERVER['_components_folder']."/Log.class.php");
	include_once($_SERVER['_components_folder']."/DBManager.class.php");
	include_once($_SERVER['_components_folder']."/Query.class.php");
}
include_once("doConnect.php");

ini_set('max_execution_time', 300);
$_SESSION['dbm']= new DBManager($cx);
$_SESSION['dbm']->conectar();

?>