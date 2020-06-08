<?php

include_once("../header.php");
include_once("../util.sql.php");

$queryIntoleranceRead= new Query();
$queryIntoleranceRead->setParams('id,name,idSchool');
$queryIntoleranceRead->setType('select');
$queryIntoleranceRead->setTable('MPG_INTOLERANCES');
$queryIntoleranceRead->setOrder('name');
$queryIntoleranceRead->execute();

if ($queryIntoleranceRead->getNumRowsAffected()<=0){
	echo json_encode(array("message" => "No intolerances found."));
} else {  
	$elements_arr=array();
	while($fila= mysqli_fetch_array($queryIntoleranceRead->getResult())){
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