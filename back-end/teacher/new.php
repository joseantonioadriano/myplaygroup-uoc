<?php

include_once("../header.php");
include_once("../util.sql.php");

if( notBlank('GET', 'dni') && 
    notBlank('GET', 'name') && 
    notBlank('GET', 'surname') && 
    notBlank('GET', 'idSchool')) 
{    
  $queryTeacherRead= new Query();
  $queryTeacherRead->setParams('dni,name,surname,idSchool');
  $queryTeacherRead->setType('insert');
  $queryTeacherRead->setTable('MPG_TEACHERS');
  $queryTeacherRead->execute(); 

	if ($queryTeacherRead->getNumRowsAffected()<=0){
		http_response_code(400);
		echo json_encode(array("message" => "Register non created."));
	} else {               
		http_response_code(200);
		echo json_encode(array("message" => "Register created width id: ".$queryTeacherRead->getNewId(), "newId" => $queryTeacherRead->getNewId()));
	}    
} else {
	http_response_code(400);
	echo json_encode(array("message" => "Not all values received."));	
}


?>