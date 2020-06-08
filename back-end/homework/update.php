<?php

include_once("../header.php");
include_once("../util.sql.php");

if( notBlank('GET', 'id') && 
    notBlank('GET', 'name') && 
	notBlank('GET', 'idSchool')) 
{    
  $queryHomeworkRead= new Query();
  $queryHomeworkRead->setParams('name,idSchool');
  $queryHomeworkRead->setType('update');
  $queryHomeworkRead->setTable('MPG_HOMEWORKS');
  $queryHomeworkRead->execute(); 
  //echo "getSQLCommand:".$queryHomeworkRead->getSQLCommand();

	if ($queryHomeworkRead->getNumRowsAffected()<=0){
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