<?php

include_once("../header.php");
include_once("../util.sql.php");

if( notBlank('GET', 'dni') && 
    notBlank('GET', 'name') && 
    notBlank('GET', 'surname') && 
    notBlank('GET', 'type') && 
    notBlank('GET', 'idSchool')) 
{    
  $queryParentRead= new Query();
  $queryParentRead->setParams('dni,name,surname,type,idSchool');
  $queryParentRead->setType('insert');
  $queryParentRead->setTable('MPG_PARENTS');
  $queryParentRead->execute(); 

	if ($queryParentRead->getNumRowsAffected()<=0){
		http_response_code(400);
		echo json_encode(array("message" => "Register non created."));
	} else {               
		http_response_code(200);
		echo json_encode(array("message" => "Register created width id: ".$queryParentRead->getNewId(), "newId" => $queryParentRead->getNewId()));
	}    
} else {
	http_response_code(400);
	echo json_encode(array("message" => "Not all values received."));	
}


?>