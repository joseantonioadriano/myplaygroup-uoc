<?php

include_once("../header.php");
include_once("../util.sql.php");

if( notBlank('GET', 'id') ) {

	$queryDishDelete= new Query();
  	$queryDishDelete->setParams('id');
  	$queryDishDelete->setType('delete');
  	$queryDishDelete->setTable('MPG_DISHES');
  	$queryDishDelete->execute(); 

	if ($queryDishDelete->getNumRowsAffected()<=0){
		http_response_code(400);
		echo json_encode(array("message" => "No register found."));
	} else {

		$_GET['idDish']= $_GET['id'];
		$queryDishIntolerancesDelete= new Query();
		$queryDishIntolerancesDelete->setParams('idDish');
		$queryDishIntolerancesDelete->setType('delete');
		$queryDishIntolerancesDelete->setTable('MPG_DISHESINTOLERANCES');
		$queryDishIntolerancesDelete->execute(); 

		http_response_code(200);
		echo json_encode(array("message" => "Register deleted."));
	}

} else {
	http_response_code(400);
	echo json_encode(array("message" => "No id received."));	
}

?>