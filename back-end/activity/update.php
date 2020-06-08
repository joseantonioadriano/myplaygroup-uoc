<?php

include_once("../header.php");
include_once("../util.sql.php");

if( notBlank('GET', 'id') && 
    notBlank('GET', 'name') && 
	notBlank('GET', 'idSchool')) 
{    
  $queryActivityRead= new Query();
  $queryActivityRead->setParams('name,idSchool');
  $queryActivityRead->setType('update');
  $queryActivityRead->setTable('MPG_ACTIVITIES');
  $queryActivityRead->execute(); 
  //echo "getSQLCommand:".$queryActivityRead->getSQLCommand();

	if ($queryActivityRead->getNumRowsAffected()<=0){
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