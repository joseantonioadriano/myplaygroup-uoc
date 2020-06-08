<?php

include_once("../header.php");
include_once("../util.sql.php");

if( notBlank('GET', 'id') ) {

	$queryGroupDelete= new Query();
  	$queryGroupDelete->setParams('id');
  	$queryGroupDelete->setType('delete');
  	$queryGroupDelete->setTable('MPG_GROUPS');
  	$queryGroupDelete->execute(); 

	if ($queryGroupDelete->getNumRowsAffected()<=0){
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