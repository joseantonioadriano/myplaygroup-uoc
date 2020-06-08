<?php

include_once("../header.php");
include_once("../util.sql.php");

if( notBlank('GET', 'id') ) {

	$_GET['idStudent']= $_GET['id'];

	$queryDeleteIntoleranceStudent= new Query();
	$queryDeleteIntoleranceStudent->setParams('idStudent');
	$queryDeleteIntoleranceStudent->setType('delete');
	$queryDeleteIntoleranceStudent->setTable('MPG_STUDENTSINTOLERANCES');
	$queryDeleteIntoleranceStudent->execute(); 

	if( notBlank('GET', 'intolerances') ) {			
		$intolerances= explode("@", $_GET['intolerances']);
		
		for ($i = 0; $i < count($intolerances); $i++) {		

			$_GET['idIntolerance']= $intolerances[$i];
			$queryStudentNewIntolerance= new Query();
			$queryStudentNewIntolerance->setParams('idStudent,idIntolerance');
			$queryStudentNewIntolerance->setType('insert');
			$queryStudentNewIntolerance->setRelation(true);
			$queryStudentNewIntolerance->setTable('MPG_STUDENTSINTOLERANCES');
			$queryStudentNewIntolerance->execute(); 
			
			if ($queryStudentNewIntolerance->getNumRowsAffected()<=0) {
				echo json_encode(array("message" => "No intolerances saved for the student."));
				http_response_code(400);
			} else {  
				http_response_code(200);
				echo json_encode(array("message" => "Intolerances added to the student."));
			}
		}
		
	} else {
		http_response_code(200);
		echo json_encode(array("message" => "All intolerances were deleted for the student."));
	}
	
} else {
	echo json_encode(array("message" => "No student or intolerances received."));	
}


?>