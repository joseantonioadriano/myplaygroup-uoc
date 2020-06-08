<?php

include_once("../header.php");
include_once("../util.sql.php");

$queryStaffRead= new Query();
$queryStaffRead->setParams('id,dni,name,surname,idSchool');
$queryStaffRead->setType('select');
$queryStaffRead->setTable('MPG_STAFFS');
$queryStaffRead->execute();

if ($queryStaffRead->getNumRowsAffected()<=0){
	echo json_encode(array("message" => "No staff found."));
} else {  
	$elements_arr=array();
	while($fila= mysqli_fetch_array($queryStaffRead->getResult())){
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