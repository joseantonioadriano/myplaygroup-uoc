<?php

include_once("../header.php");
include_once("../util.sql.php");

if( notBlank('GET', 'id') && 
    notBlank('GET', 'name')) 
{    
  $queryCourseRead= new Query();
  $queryCourseRead->setParams('name');
  $queryCourseRead->setType('update');
  $queryCourseRead->setTable('MPG_COURSES');
  $queryCourseRead->execute(); 
  //echo "getSQLCommand:".$queryCourseRead->getSQLCommand();

	if ($queryCourseRead->getNumRowsAffected()<=0){
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