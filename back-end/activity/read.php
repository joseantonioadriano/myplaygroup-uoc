<?php

include_once("../header.php");
include_once("../util.sql.php");

$queryActivityRead= new Query();
$queryActivityRead->setParams('id,name,idSchool');
$queryActivityRead->setType('select');
$queryActivityRead->setTable('MPG_ACTIVITIES');
$queryActivityRead->setOrder('name');
$queryActivityRead->execute();

if ($queryActivityRead->getNumRowsAffected()<=0){
	echo json_encode(array("message" => "No Activities found."));
} else {  
	$elements_arr=array();
	while($fila= mysqli_fetch_array($queryActivityRead->getResult())){
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