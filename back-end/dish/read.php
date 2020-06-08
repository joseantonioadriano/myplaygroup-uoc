<?php

include_once("../header.php");
include_once("../util.sql.php");

$queryDishRead= new Query();
$queryDishRead->setParams('id,name,idSchool');
$queryDishRead->setType('select');
$queryDishRead->setTable('MPG_DISHES');
$queryDishRead->setOrder('name');
$queryDishRead->execute();

if ($queryDishRead->getNumRowsAffected()<=0){
	echo json_encode(array("message" => "No dishes found."));
} else {  
	$elements_arr=array();
	while($fila= mysqli_fetch_array($queryDishRead->getResult())){
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