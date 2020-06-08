<?php

include_once("../header.php");
include_once("../util.sql.php");

if( notBlank('GET', 'name') && 
	notBlank('GET', 'idSchool')) 
{    
  $queryActivityRead= new Query();
  $queryActivityRead->setParams('name,idSchool');
  $queryActivityRead->setType('insert');
  $queryActivityRead->setTable('MPG_ACTIVITIES');
  $queryActivityRead->execute(); 

	if ($queryActivityRead->getNumRowsAffected()<=0){
		http_response_code(400);
		echo json_encode(array("message" => "Register non created."));
	} else {               
		http_response_code(200);
		echo json_encode(array("message" => "Register created width id: ".$queryActivityRead->getNewId(), "newId" => $queryActivityRead->getNewId()));
	}    
} else {
	http_response_code(400);
	echo json_encode(array("message" => "Not all values received."));	
}


?>