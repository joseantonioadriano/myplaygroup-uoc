<?php

include_once("../header.php");
include_once("../util.sql.php");

if( notBlank('GET', 'id') && 
    notBlank('GET', 'name') && 
	notBlank('GET', 'idSchool')) 
{    
  $queryIntoleranceRead= new Query();
  $queryIntoleranceRead->setParams('name,idSchool');
  $queryIntoleranceRead->setType('update');
  $queryIntoleranceRead->setTable('MPG_INTOLERANCES');
  $queryIntoleranceRead->execute(); 
  //echo "getSQLCommand:".$queryIntoleranceRead->getSQLCommand();

	if ($queryIntoleranceRead->getNumRowsAffected()<=0){
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