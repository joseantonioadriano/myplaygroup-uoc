<?php

include_once("../header.php");
include_once("../util.sql.php");

if( notBlank('GET', 'idSchool') ) 
{ 
	$queryPsychologistRead= new Query();
	$queryPsychologistRead->setSQL('select * from MPG_PSYCHOLOGISTS where idSchool= '.$_GET['idSchool'].' and idUser not in (select id from MPG_USERS)');
	$queryPsychologistRead->execute();

	if ($queryPsychologistRead->getNumRowsAffected()<=0){
		echo json_encode(array("message" => "No psychologists found."));
	} else {  
		$elements_arr=array();
		while($fila= mysqli_fetch_array($queryPsychologistRead->getResult())){
			$element=array(			
				"id" => $fila['id'],
				"dni" => $fila['dni'],
				"name" => $fila['name'],
				"surname" => $fila['surname'],
				"idSchool" => $fila['idSchool']
			);
			array_push($elements_arr, $element);
		}
		http_response_code(200);
		echo json_encode($elements_arr);
	}
}

?>