<?php

include_once("../header.php");
include_once("../util.sql.php");

if( notBlank('GET', 'id') ) {

	$queryCourseDelete= new Query();
  	$queryCourseDelete->setParams('id');
  	$queryCourseDelete->setType('delete');
  	$queryCourseDelete->setTable('MPG_COURSES');
	$queryCourseDelete->execute(); 

	if ($queryCourseDelete->getNumRowsAffected()<=0){
		http_response_code(400);
		echo json_encode(array("message" => "No register found."));
	} else {
			  
		$_GET['idCourse']=$_GET['id'];
		$queryCourseSchoolDelete= new Query();
		$queryCourseSchoolDelete->setParams('idCourse');
		$queryCourseSchoolDelete->setType('delete');
		$queryCourseSchoolDelete->setTable('MPG_COURSESSCHOOLS');
		$queryCourseSchoolDelete->execute(); 

		$queryCourseMaxId= new Query();
		$queryCourseMaxId->setSQL('select max(id) as maxId from MPG_COURSES');	
		$queryCourseMaxId->execute(); 
		$filaMaxId= mysqli_fetch_array($queryCourseMaxId->getResult());

		if ($queryCourseMaxId->getNumRowsAffected()>0){
			$queryCourseUpdate= new Query();
			$queryCourseUpdate->setSQL('update MPG_COURSES set active= 1 where id ='.$filaMaxId['maxId']);	
			$queryCourseUpdate->execute(); 
		}

		http_response_code(200);
		echo json_encode(array("message" => "Register deleted."));
	}

} else {
	http_response_code(400);
	echo json_encode(array("message" => "No id received."));	
}

?>