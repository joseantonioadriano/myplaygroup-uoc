<?php

include_once("../header.php");
include_once("../util.sql.php");

if( notBlank('GET', 'name') && 
	notBlank('GET', 'idSchool')) 
{    
  $queryHomeworkRead= new Query();
  $queryHomeworkRead->setParams('name,idSchool');
  $queryHomeworkRead->setType('insert');
  $queryHomeworkRead->setTable('MPG_HOMEWORKS');
  $queryHomeworkRead->execute(); 

	if ($queryHomeworkRead->getNumRowsAffected()<=0){
		http_response_code(400);
		echo json_encode(array("message" => "Register non created."));
	} else {               
		http_response_code(200);
		echo json_encode(array("message" => "Register created width id: ".$queryHomeworkRead->getNewId(), "newId" => $queryHomeworkRead->getNewId()));
	}    
} else {
	http_response_code(400);
	echo json_encode(array("message" => "Not all values received."));	
}


?>