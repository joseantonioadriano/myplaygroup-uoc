<?php

include_once("../header.php");
include_once("../util.sql.php");

if( notBlank('GET', 'id') && 
    notBlank('GET', 'name') &&
	notBlank('GET', 'idKindergarten') &&
	notBlank('GET', 'address')) 
{    
  $querySchoolRead= new Query();
  $querySchoolRead->setParams('name,idKindergarten,address');
  $querySchoolRead->setType('update');
  $querySchoolRead->setTable('MPG_SCHOOLS');
  $querySchoolRead->execute(); 
  
  //echo "getSQLCommand:".$querySchoolRead->getSQLCommand();

	if ($querySchoolRead->getNumRowsAffected()<=0){
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