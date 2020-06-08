<?php

include_once("../header.php");
include_once("../util.sql.php");

$queryPsychologistRead= new Query();
$queryPsychologistRead->setParams('id,dni,name,surname,idSchool');
$queryPsychologistRead->setType('select');
$queryPsychologistRead->setTable('MPG_PSYCHOLOGISTS');
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


?>