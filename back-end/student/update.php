<?php

include_once("../header.php");
include_once("../util.sql.php");

if( notBlank('GET', 'id') && 
    notBlank('GET', 'dni') && 
    notBlank('GET', 'name') && 
    notBlank('GET', 'surname') && 
    notBlank('GET', 'idResponsable1') && 
    notBlank('GET', 'idResponsable2') && 
    notBlank('GET', 'idSchool') && 
    notBlank('GET', 'genre') && 
    notBlank('GET', 'dateBirth')) 
{    
  $queryStudentRead= new Query();
  $queryStudentRead->setParams('dni,name,surname,idResponsable1,idResponsable2,idSchool,genre,dateBirth');
  $queryStudentRead->setType('update');
  $queryStudentRead->setTable('MPG_STUDENTS');
  $queryStudentRead->execute(); 
  echo "getSQLCommand:".$queryStudentRead->getSQLCommand();

	if ($queryStudentRead->getNumRowsAffected()<=0){
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