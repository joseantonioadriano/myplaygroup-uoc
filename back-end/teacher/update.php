<?php

include_once("../header.php");
include_once("../util.sql.php");

if( notBlank('GET', 'id') && 
    notBlank('GET', 'dni') && 
    notBlank('GET', 'name') && 
    notBlank('GET', 'surname') && 
    notBlank('GET', 'idSchool')) 
{    
  $queryTeacherRead= new Query();
  $queryTeacherRead->setParams('dni,name,surname,idSchool');
  $queryTeacherRead->setType('update');
  $queryTeacherRead->setTable('MPG_TEACHERS');
  $queryTeacherRead->execute(); 
  //echo "getSQLCommand:".$queryTeacherRead->getSQLCommand();

	if ($queryTeacherRead->getNumRowsAffected()<=0){
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