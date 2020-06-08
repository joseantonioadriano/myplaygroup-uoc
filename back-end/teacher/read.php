<?php

include_once("../header.php");
include_once("../util.sql.php");

$queryTeacherRead= new Query();
$queryTeacherRead->setParams('id,dni,name,surname,idSchool');
$queryTeacherRead->setType('select');
$queryTeacherRead->setTable('MPG_TEACHERS');
$queryTeacherRead->setOrder('surname');
$queryTeacherRead->execute();
//echo $queryTeacherRead->getSQLCommand();

if ($queryTeacherRead->getNumRowsAffected()<=0){
	//echo "No teachers found.";
	echo json_encode(array("message" => "No teachers found."));
} else {  
	$elements_arr=array();
	while($fila= mysqli_fetch_array($queryTeacherRead->getResult())){		
		$element=array(			
			"id" => $fila['id'],
			"dni" => $fila['dni'],
			"name" => $fila['name'],
			"surname" => $fila['surname'],
			"idSchool" => $fila['idSchool']
		);
		array_push($elements_arr, $element);
	}
	//var_dump($elements_arr);
	http_response_code(200);
	echo json_encode($elements_arr);
}


?>