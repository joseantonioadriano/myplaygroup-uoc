<?php

include_once("../header.php");
include_once("../util.sql.php");

$queryHomeworkRead= new Query();
$queryHomeworkRead->setParams('id,name,idSchool');
$queryHomeworkRead->setType('select');
$queryHomeworkRead->setTable('MPG_HOMEWORKS');
$queryHomeworkRead->setOrder('name');
$queryHomeworkRead->execute();

if ($queryHomeworkRead->getNumRowsAffected()<=0){
	echo json_encode(array("message" => "No Homeworks found."));
} else {  
	$elements_arr=array();
	while($fila= mysqli_fetch_array($queryHomeworkRead->getResult())){
		$element=array(			
			"id" => $fila['id'],			
			"name" => $fila['name'],			
			"idSchool" => $fila['idSchool']
		);
		array_push($elements_arr, $element);
	}
	http_response_code(200);
    echo json_encode($elements_arr);
}


?>