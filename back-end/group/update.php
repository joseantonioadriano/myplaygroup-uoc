<?php

include_once("../header.php");
include_once("../util.sql.php");

if( notBlank('GET', 'id') && 
    notBlank('GET', 'name') && 
	notBlank('GET', 'idSchool') && 
	notBlank('GET', 'idTutor')) 
{    
  $queryGroupRead= new Query();
  $queryGroupRead->setParams('name,idSchool,idTutor');
  $queryGroupRead->setType('update');
  $queryGroupRead->setTable('MPG_GROUPS');
  $queryGroupRead->execute(); 
  //echo "getSQLCommand:".$queryGroupRead->getSQLCommand();

	if ($queryGroupRead->getNumRowsAffected()<=0){
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