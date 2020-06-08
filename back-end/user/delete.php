<?php

include_once("../header.php");
include_once("../util.sql.php");

if( notBlank('GET', 'id') ) {

	$queryUserDelete= new Query();
  	$queryUserDelete->setParams('id');
  	$queryUserDelete->setType('delete');
  	$queryUserDelete->setTable('mpg_users');
  	$queryUserDelete->execute(); 

	if ($queryUserDelete->getNumRowsAffected()<=0){
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