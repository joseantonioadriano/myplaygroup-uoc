<?php

include_once("../header.php");
include_once("../util.sql.php");

if( notBlank('GET', 'idSchool') &&
	notBlank('GET', 'idMenu') &&
	notBlank('GET', 'idBreakfast') &&	
	notBlank('GET', 'idStarter') &&	
	notBlank('GET', 'idMain') &&	
	notBlank('GET', 'idDessert') &&	
	notBlank('GET', 'idSnack') &&	
	notBlank('GET', 'idGroup') ) {

	$_GET['dateMenu']= getdate()['mday']."/".getdate()['mon']."/".getdate()['year'];

	$queryDeleteTodayMenu= new Query();
	$queryDeleteTodayMenu->setSQL('delete from MPG_MENUASSIGNMENTS where idGroup= '.$_GET['idGroup'].' and idSchool= '.$_GET['idSchool'].' and dateMenu= "'.$_GET['dateMenu'].'"');	
	$queryDeleteTodayMenu->execute(); 
	//$queryDeleteTodayMenu->getCommandSQL();

	$queryStudentRead= new Query();
	$queryStudentRead->setSQL('select s.* from MPG_STUDENTS s where s.idSchool= '.$_GET['idSchool'].' and s.id in (select e.idStudent from MPG_ENROLLMENTS e, MPG_COURSES c where e.idCourse = c.id and e.idGroup= '.$_GET['idGroup'].' and e.idSchool= '.$_GET['idSchool'].' and c.active = 1)');
	$queryStudentRead->execute();
	//$queryStudentRead->getCommandSQL();
 
	if ($queryStudentRead->getNumRowsAffected()<=0){
		echo json_encode(array("message" => "No students found in group."));
	} else {  

		while($fila= mysqli_fetch_array($queryStudentRead->getResult())) {			
			$_GET['idStudent']= $fila['id'];
			$queryAssignmentNewStudent= new Query();
			$queryAssignmentNewStudent->setParams('dateMenu,idGroup,idStudent,idBreakfast,idStarter,idMain,idDessert,idSnack,idSchool');
			$queryAssignmentNewStudent->setType('insert');
			$queryAssignmentNewStudent->setRelation(true);
			$queryAssignmentNewStudent->setTable('MPG_MENUASSIGNMENTS');
			$queryAssignmentNewStudent->execute(); 
			//$queryAssignmentNewStudent->getCommandSQL();
		}	

		http_response_code(200);
		echo json_encode(array("message" => "Menus assigned to group."));				
	}
	
} else {
	echo json_encode(array("message" => "No group or menu received."));	
}


?>