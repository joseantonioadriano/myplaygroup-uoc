<?php

include_once("../header.php");
include_once("../util.sql.php");

$queryParentRead= new Query();
$queryParentRead->setParams('id,dni,name,surname,type,idSchool');
$queryParentRead->setType('select');
$queryParentRead->setTable('MPG_PARENTS');
$queryParentRead->execute();

if ($queryParentRead->getNumRowsAffected()<=0){
	echo json_encode(array("message" => "No parents found."));
} else {  
	$elements_arr=array();
	while($fila= mysqli_fetch_array($queryParentRead->getResult())){
		$element=array(			
			"id" => $fila['id'],
			"dni" => $fila['dni'],
			"name" => $fila['name'],
			"surname" => $fila['surname'],
			"type" => $fila['type'],
			"idSchool" => $fila['idSchool']
		);
		array_push($elements_arr, $element);
	}
	http_response_code(200);
    echo json_encode($elements_arr);
}


?>