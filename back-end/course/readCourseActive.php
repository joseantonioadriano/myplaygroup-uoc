<?php

include_once("../header.php");
include_once("../util.sql.php");

$queryCourseRead= new Query();
$queryCourseRead->setSQL('select * from MPG_COURSES c, MPG_COURSESSCHOOLS cs where c.id = cs.idCourse and c.active= 1 and cs.idSchool='.$_GET['idSchool']);
$queryCourseRead->execute();

if ($queryCourseRead->getNumRowsAffected()<=0){
	echo json_encode(array("message" => "No Courses actives found."));
} else {  
	$elements_arr=array();
	while($fila= mysqli_fetch_array($queryCourseRead->getResult())){
		$element=array(			
			"id" => $fila['id'],			
			"name" => $fila['name']
		);
		array_push($elements_arr, $element);
	}
	http_response_code(200);
    echo json_encode($elements_arr);
}


?>