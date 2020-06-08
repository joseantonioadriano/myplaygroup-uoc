<?php

include_once("../header.php");
include_once("../util.sql.php");

if( notBlank('GET', 'dni') && 
    notBlank('GET', 'name') && 
    notBlank('GET', 'surname') && 
    notBlank('GET', 'idSchool'))
{    

  $queryPsychologistRead= new Query();
  $queryPsychologistRead->setParams('dni,name,surname,idSchool');
  $queryPsychologistRead->setType('insert');
  $queryPsychologistRead->setTable('MPG_PSYCHOLOGISTS');
  //echo $queryPsychologistRead->getSQLCommand(); 
  $queryPsychologistRead->execute(); 
  
  

	if ($queryPsychologistRead->getNumRowsAffected()<=0){
		http_response_code(400);
		echo json_encode(array("message" => "Register non created."));
	} else {               
		http_response_code(200);
		echo json_encode(array("message" => "Register created width id: ".$queryPsychologistRead->getNewId(), "newId" => $queryPsychologistRead->getNewId()));
	}    
} else {
	http_response_code(400);
	echo json_encode(array("message" => "Not all values received."));	
}


?>