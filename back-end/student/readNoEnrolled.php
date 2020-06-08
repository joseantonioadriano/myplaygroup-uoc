<?php

include_once("../header.php");
include_once("../util.sql.php");

$queryStudentRead= new Query();
$queryStudentRead->setSQL('select s.* from MPG_STUDENTS s where s.idSchool= '.$_GET['idSchool'].' and s.id not in (select e.idStudent from MPG_ENROLLMENTS e, MPG_COURSES c where e.idCourse = c.id and e.idSchool= '.$_GET['idSchool'].' and c.active = 1)');
$queryStudentRead->execute();

if ($queryStudentRead->getNumRowsAffected()<=0){
	echo json_encode(array("message" => "No students found."));
} else {  
	$elements_arr=array();
	while($fila= mysqli_fetch_array($queryStudentRead->getResult())){
		$element=array(			
			"id" => $fila['id'],
			"dni" => $fila['dni'],
			"name" => $fila['name'],
			"surname" => $fila['surname'],
			"idResponsable1" => $fila['idResponsable1'],
			"idResponsable2" => $fila['idResponsable2'],
			"idSchool" => $fila['idSchool'],
			"genre" => $fila['genre'],
			"dateBirth" => $fila['dateBirth']
		);
		array_push($elements_arr, $element);
	}
	http_response_code(200);
    echo json_encode($elements_arr);
}


?>