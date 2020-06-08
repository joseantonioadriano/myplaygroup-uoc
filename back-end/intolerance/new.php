<?php

include_once("../header.php");
include_once("../util.sql.php");

if( notBlank('GET', 'name') && 
	notBlank('GET', 'idSchool')) 
{    
  $queryIntoleranceRead= new Query();
  $queryIntoleranceRead->setParams('name,idSchool');
  $queryIntoleranceRead->setType('insert');
  $queryIntoleranceRead->setTable('MPG_INTOLERANCES');
  $queryIntoleranceRead->execute(); 

	if ($queryIntoleranceRead->getNumRowsAffected()<=0){
		http_response_code(400);
		echo json_encode(array("message" => "Register non created."));
	} else {               
		http_response_code(200);
		echo json_encode(array("message" => "Register created width id: ".$queryIntoleranceRead->getNewId(), "newId" => $queryIntoleranceRead->getNewId()));
	}    
} else {
	http_response_code(400);
	echo json_encode(array("message" => "Not all values received."));	
}


?>