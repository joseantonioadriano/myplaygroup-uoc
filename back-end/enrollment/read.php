<?php

include_once("../header.php");
include_once("../util.sql.php");

$queryCourseRead= new Query();
$queryCourseRead->setParams('id,idStudent,idCourse,idSchool,fee,namePicture,idGroup');
$queryCourseRead->setType('select');
$queryCourseRead->setTable('MPG_ENROLLMENTS');
$queryCourseRead->setOrder('id');
$queryCourseRead->execute();

if ($queryCourseRead->getNumRowsAffected()<=0){
	echo json_encode(array("message" => "No Courses found."));
} else {  
	$elements_arr=array();
	while($fila= mysqli_fetch_array($queryCourseRead->getResult())){
		$element=array(			
			"id" => $fila['id'],			
			"idStudent" => $fila['idStudent'],			
			"idCourse" => $fila['idCourse'],			
			"idSchool" => $fila['idSchool'],			
			"fee" => $fila['fee'],
			"namePicture" => $fila['namePicture'],
			"idGroup" => $fila['idGroup']
		);
		array_push($elements_arr, $element);
	}
	http_response_code(200);
    echo json_encode($elements_arr);
}


?>