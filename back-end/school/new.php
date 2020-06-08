<?php

include_once("../header.php");
include_once("../util.sql.php");

if( notBlank('GET', 'name') &&
	notBlank('GET', 'idKindergarten') &&
	notBlank('GET', 'address')) 
{    
  $querySchoolNew= new Query();
  $querySchoolNew->setParams('name,idKindergarten,address');
  $querySchoolNew->setType('insert');
  $querySchoolNew->setTable('MPG_SCHOOLS');
  $querySchoolNew->execute();  

	if ($querySchoolNew->getNumRowsAffected()<=0){
		http_response_code(400);
		echo json_encode(array("message" => "Register non created."));
	} else {               
		http_response_code(200);
		echo json_encode(array("message" => "Register created width id: ".$querySchoolNew->getNewId(), "newId" => $querySchoolNew->getNewId()));
	}    
} else {
	http_response_code(400);
	echo json_encode(array("message" => "Not all values received."));	
}


?>