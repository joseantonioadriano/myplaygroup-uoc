<?php

include_once("../header.php");
include_once("../util.sql.php");

if( notBlank('GET', 'id') ) {

	$queryIntoleranceDelete= new Query();
  	$queryIntoleranceDelete->setParams('id');
  	$queryIntoleranceDelete->setType('delete');
  	$queryIntoleranceDelete->setTable('MPG_INTOLERANCES');
  	$queryIntoleranceDelete->execute(); 

	if ($queryIntoleranceDelete->getNumRowsAffected()<=0){
		http_response_code(400);
		echo json_encode(array("message" => "No register found."));
	} else {
		http_response_code(200);
		echo json_encode(array("message" => "Register deleted."));
	}

} else {
	http_response_code(400);
	echo json_encode(array("message" => "No id received."));	
}

?>