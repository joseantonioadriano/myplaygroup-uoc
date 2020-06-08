<?php

include_once("../header.php");
include_once("../util.sql.php");

if( notBlank('GET', 'dni') && 
    notBlank('GET', 'name') && 
    notBlank('GET', 'surname')) 
{    
  $queryStaffRead= new Query();
  $queryStaffRead->setParams('dni,name,surname,idSchool');
  $queryStaffRead->setType('insert');
  $queryStaffRead->setTable('MPG_STAFFS');
  $queryStaffRead->execute(); 

	if ($queryStaffRead->getNumRowsAffected()<=0){
		http_response_code(400);
		echo json_encode(array("message" => "Register non created."));
	} else {               
		http_response_code(200);
		echo json_encode(array("message" => "Register created width id: ".$queryStaffRead->getNewId(), "newId" => $queryStaffRead->getNewId()));
	}    
} else {
	http_response_code(400);
	echo json_encode(array("message" => "Not all values received."));	
}


?>