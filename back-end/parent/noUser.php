<?php

include_once("../header.php");
include_once("../util.sql.php");

if( notBlank('GET', 'idSchool') ) 
{ 
	$queryParentRead= new Query();
	$queryParentRead->setSQL('select * from MPG_PARENTS where idSchool= '.$_GET['idSchool'].' and idUser not in (select id from MPG_USERS)');
	$queryParentRead->execute();

	if ($queryParentRead->getNumRowsAffected()<=0){
		echo json_encode(array("message" => "No parents found."));
	} else {  
		$elements_arr=array();
		while($fila= mysqli_fetch_array($queryParentRead->getResult())){
			$element=array(			
				"id" => $fila['id'],
				"dni" => $fila['dni'],
				"name" => $fila['name'],
				"surname" => $fila['surname'],
				"type" => $fila['type'],
				"idSchool" => $fila['idSchool']
			);
			array_push($elements_arr, $element);
		}
		http_response_code(200);
		echo json_encode($elements_arr);
	}
}

?>