<?php

include_once("../header.php");
include_once("../util.sql.php");

$queryGroupRead= new Query();
$queryGroupRead->setParams('id,name,idSchool,idTutor');
$queryGroupRead->setType('select');
$queryGroupRead->setTable('MPG_GROUPS');
$queryGroupRead->setOrder('name');
$queryGroupRead->execute();

if ($queryGroupRead->getNumRowsAffected()<=0){
	echo json_encode(array("message" => "No intolerances found."));
} else {  
	$elements_arr=array();
	while($fila= mysqli_fetch_array($queryGroupRead->getResult())){
		$element=array(			
			"id" => $fila['id'],			
			"name" => $fila['name'],			
			"idSchool" => $fila['idSchool'],			
			"idTutor" => $fila['idTutor']
		);
		array_push($elements_arr, $element);
	}
	http_response_code(200);
    echo json_encode($elements_arr);
}


?>