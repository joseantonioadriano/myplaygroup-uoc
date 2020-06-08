<?php

include_once("../header.php");
include_once("../util.sql.php");

if( notBlank('GET', 'CIF') && 
	notBlank('GET', 'name')) 
{    
  $queryKindergartenRead= new Query();
  $queryKindergartenRead->setParams('CIF,name');
  $queryKindergartenRead->setType('insert');
  $queryKindergartenRead->setTable('MPG_KINDERGARTENS');
  $queryKindergartenRead->execute(); 

	if ($queryKindergartenRead->getNumRowsAffected()<=0){
		http_response_code(400);
		echo json_encode(array("message" => "Register non created."));
	} else {               
		http_response_code(200);
		echo json_encode(array("message" => "Register created width id: ".$queryKindergartenRead->getNewId(), "newId" => $queryKindergartenRead->getNewId()));
	}    
} else {
	http_response_code(400);
	echo json_encode(array("message" => "Not all values received."));	
}


?>