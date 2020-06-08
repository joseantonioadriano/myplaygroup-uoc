<?php

include_once("../header.php");
include_once("../util.sql.php");

if( notBlank('GET', 'id') ) {

	$queryDishIntolerancesRead= new Query();
	$queryDishIntolerancesRead->setSQL('select i.* from MPG_INTOLERANCES i, MPG_STUDENTS s, MPG_STUDENTSINTOLERANCES si where si.idStudent=s.id and si.idIntolerance=i.id and s.id='.$_GET['id'].' order by i.name asc');
	$queryDishIntolerancesRead->execute();

	if ($queryDishIntolerancesRead->getNumRowsAffected()<=0) {
		echo json_encode(array("message" => "No intolerances found for the student."));
	} else {  
		$elements_arr=array();
		while($fila= mysqli_fetch_array($queryDishIntolerancesRead->getResult())){
			$element=array(			
				"id" => $fila['id'],			
				"name" => $fila['name']
			);
			array_push($elements_arr, $element);
		}
		http_response_code(200);
		echo json_encode($elements_arr);
	}

} else {
	http_response_code(400);
	echo json_encode(array("message" => "No id received."));	
}


?>