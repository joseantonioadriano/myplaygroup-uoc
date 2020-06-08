<?php

include_once("../header.php");
include_once("../util.sql.php");

if( notBlank('GET', 'id') ) {
	
	$queryMenuDelete= new Query();
  	$queryMenuDelete->setParams('id');
  	$queryMenuDelete->setType('delete');
  	$queryMenuDelete->setTable('MPG_MENUS');
  	$queryMenuDelete->execute(); 

	if ($queryMenuDelete->getNumRowsAffected()<=0){
		http_response_code(400);
		echo json_encode(array("message" => "No register found."));
	} else {	
	  
		$_GET['idMenu']= $_GET['id'];
		$queryMenuDeleteDishesDelete= new Query();
		$queryMenuDeleteDishesDelete->setParams('idMenu');
		$queryMenuDeleteDishesDelete->setType('delete');
		$queryMenuDeleteDishesDelete->setTable('MPG_MENUDISHES');
		$queryMenuDeleteDishesDelete->execute(); 		

		http_response_code(200);
		echo json_encode(array("message" => "Register deleted."));
	}

} else {
	http_response_code(400);
	echo json_encode(array("message" => "No id received."));	
}

?>