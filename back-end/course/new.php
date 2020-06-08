<?php

include_once("../header.php");
include_once("../util.sql.php");

if( notBlank('GET', 'name') ) 
{      
  $queryCourseUpdate= new Query();
  $queryCourseUpdate->setSQL('update MPG_COURSES set active= 0');	
  $queryCourseUpdate->execute(); 

  $_GET['active']= '1';
  $queryCourseRead= new Query();
  $queryCourseRead->setParams('name,active');
  $queryCourseRead->setType('insert');
  $queryCourseRead->setTable('MPG_COURSES');
  $queryCourseRead->execute(); 
  //echo "getSQLCommand:".$queryCourseRead->getSQLCommand();

	if ($queryCourseRead->getNumRowsAffected()<=0){
		http_response_code(400);
		echo json_encode(array("message" => "Register non created."));
	} else {               

		$queryAllCourses= new Query();
		$queryAllCourses->setSQL('select id from MPG_SCHOOLS');	
		$queryAllCourses->execute(); 
		
		if ($queryAllCourses->getNumRowsAffected()>0){			
			while($fila= mysqli_fetch_array($queryAllCourses->getResult())){				
				$_GET['idCourse']=$queryCourseRead->getNewId();
				$_GET['idSchool']=$fila['id'];
				$queryAddCourseSchool= new Query();
				$queryAddCourseSchool->setParams('idCourse,idSchool');
				$queryAddCourseSchool->setType('insert');
				$queryAddCourseSchool->setRelation(true);
				$queryAddCourseSchool->setTable('MPG_COURSESSCHOOLS');				
				$queryAddCourseSchool->execute(); 

				/*if ($queryAddCourseSchool->getNumRowsAffected()<=0) {
					echo json_encode(array("message" => "Schools not saved for the course."));
					http_response_code(400);
				} else {  
					http_response_code(200);
					echo json_encode(array("message" => "Scholls saved to the course."));
				}*/
			}
		}

		http_response_code(200);
		echo json_encode(array("message" => "Register created width id: ".$queryCourseRead->getNewId(), "newId" => $queryCourseRead->getNewId()));
	}    
} else {
	http_response_code(400);
	echo json_encode(array("message" => "Not all values received."));	
}


?>