<?php


include_once("../header.php");
include_once("../util.sql.php");


if( notBlank('GET', 'id') && 
    notBlank('GET', 'username') ) 
{    
  $queryUserRead= new Query();
  $queryUserRead->setParams('username');
  $queryUserRead->setType('update');
  $queryUserRead->setTable('mpg_users');
  $queryUserRead->execute(); 
  //echo "getSQLCommand:".$queryUserRead->getSQLCommand();

	if ($queryUserRead->getNumRowsAffected()<=0){
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