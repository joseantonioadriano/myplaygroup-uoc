<?php

include_once("../header.php");
include_once("../util.sql.php");

if( notBlank('GET', 'id') &&
	notBlank('GET', 'CIF') && 
    notBlank('GET', 'name') ) 
{    
  $queryKindergartenRead= new Query();
  $queryKindergartenRead->setParams('CIF,name');
  $queryKindergartenRead->setType('update');
  $queryKindergartenRead->setTable('MPG_KINDERGARTENS');
  $queryKindergartenRead->execute(); 
  //echo "getSQLCommand:".$queryKindergartenRead->getSQLCommand();

	if ($queryKindergartenRead->getNumRowsAffected()<=0){
		http_response_code(400);
		echo json_encode(array("message" => "No register to update."));
	} else {               
		http_response_code(200);
		echo json_encode(array("message" => "Register updated."));
	}    
} else {
	http_response_code(400);
	echo json_encode(array("message" => "Not all values received."));	
}


?>