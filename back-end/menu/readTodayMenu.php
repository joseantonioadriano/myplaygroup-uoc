<?php

include_once("../header.php");
include_once("../util.sql.php");

if( notBlank('GET', 'idSchool') ) {

	$_GET['dateMenu']= getdate()['mday']."/".getdate()['mon']."/".getdate()['year'];

	$queryStudentRead= new Query();
	$queryStudentRead->setParams('idSchool,dateMenu,idStudent');
	$queryStudentRead->setType('select');
	$queryStudentRead->setTable('MPG_MENUASSIGNMENTS');
	$queryStudentRead->execute(); 
 
	if ($queryStudentRead->getNumRowsAffected()<=0){
		echo json_encode(array("message" => "No assigments founds for the group."));
	} else {  
		$elements_arr=array();
		while($fila= mysqli_fetch_array($queryStudentRead->getResult())) {			
			$element=array(			
				"idSchool" => $fila['idSchool'],			
				"idGroup" => $fila['idGroup'],
				"idStudent" => $fila['idStudent'],							
				"idBreakfast" => $fila['idBreakfast'],			
				"idStarter" => $fila['idStarter'],			
				"idMain" => $fila['idMain'],			
				"idDessert" => $fila['idDessert'],			
				"idSnack" => $fila['idSnack']
			);
			array_push($elements_arr, $element);
		}	

		http_response_code(200);
		echo json_encode($elements_arr);			
	}
	
} else {
	echo json_encode(array("message" => "No group or menu received."));	
}


?>