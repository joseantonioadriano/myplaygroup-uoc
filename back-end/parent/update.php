<?php

include_once("../header.php");
include_once("../util.sql.php");

if( notBlank('GET', 'id') && 
    notBlank('GET', 'dni') && 
    notBlank('GET', 'name') && 
    notBlank('GET', 'surname') && 
    notBlank('GET', 'type') && 
    notBlank('GET', 'idSchool')) 
{    
  $queryParentRead= new Query();
  $queryParentRead->setParams('dni,name,surname,type,idSchool');
  $queryParentRead->setType('update');
  $queryParentRead->setTable('MPG_PARENTS');
  $queryParentRead->execute(); 
  //echo "getSQLCommand:".$queryParentRead->getSQLCommand();

	if ($queryParentRead->getNumRowsAffected()<=0){
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