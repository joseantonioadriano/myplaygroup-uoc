<?php

include_once("../header.php");
include_once("../util.sql.php");

if( notBlank('GET', 'name') && 
	notBlank('GET', 'idSchool') && 
	notBlank('GET', 'idTutor')) 
{    
  $queryGroupRead= new Query();
  $queryGroupRead->setParams('name,idSchool,idTutor');
  $queryGroupRead->setType('insert');
  $queryGroupRead->setTable('MPG_GROUPS');
  $queryGroupRead->execute(); 

	if ($queryGroupRead->getNumRowsAffected()<=0){
		http_response_code(400);
		echo json_encode(array("message" => "Register non created."));
	} else {               
		http_response_code(200);
		echo json_encode(array("message" => "Register created width id: ".$queryGroupRead->getNewId(), "newId" => $queryGroupRead->getNewId()));
	}    
} else {
	http_response_code(400);
	echo json_encode(array("message" => "Not all values received."));	
}


?>