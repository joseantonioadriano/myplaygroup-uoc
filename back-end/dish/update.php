<?php

include_once("../header.php");
include_once("../util.sql.php");

if( notBlank('GET', 'id') && 
    notBlank('GET', 'name') && 
	notBlank('GET', 'idSchool')) 
{    
  $queryDishRead= new Query();
  $queryDishRead->setParams('name,idSchool');
  $queryDishRead->setType('update');
  $queryDishRead->setTable('MPG_DISHES');
  $queryDishRead->execute(); 
  //echo "getSQLCommand:".$queryDishRead->getSQLCommand();

	if ($queryDishRead->getNumRowsAffected()<=0){
		http_response_code(200);
		echo json_encode(array("message" => "Nothing to update."));
	} else {               
		http_response_code(200);
		echo json_encode(array("message" => "Register updated."));
	}    
} else {
	http_response_code(400);
	echo json_encode(array("message" => "Not all values received."));	
}


?>