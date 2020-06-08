<?php

include_once("../header.php");
include_once("../util.sql.php");

if( notBlank('GET', 'idStudent') && 
	notBlank('GET', 'idCourse') && 
	notBlank('GET', 'idSchool') && 
	notBlank('GET', 'fee') && 
	notBlank('GET', 'namePicture') && 
	notBlank('GET', 'idGroup')) 
{    
  $queryCourseRead= new Query();
  $queryCourseRead->setParams('idStudent,idCourse,idSchool,fee,namePicture,idGroup');
  $queryCourseRead->setType('insert');
  $queryCourseRead->setTable('MPG_ENROLLMENTS');
  $queryCourseRead->execute(); 

	if ($queryCourseRead->getNumRowsAffected()<=0){
		http_response_code(400);
		echo json_encode(array("message" => "Register non created."));
	} else {               
		http_response_code(200);
		echo json_encode(array("message" => "Register created width id: ".$queryCourseRead->getNewId(), "newId" => $queryCourseRead->getNewId()));
	}    
} else {
	http_response_code(400);
	echo json_encode(array("message" => "Not all values received."));	
}


?>