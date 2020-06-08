<?php

include_once("../header.php");
include_once("../util.sql.php");

if( notBlank('GET', 'id') ) {

	$_GET['idDish']= $_GET['id'];

	$queryDeleteIntoleranceDish= new Query();
	$queryDeleteIntoleranceDish->setParams('idDish');
	$queryDeleteIntoleranceDish->setType('delete');
	$queryDeleteIntoleranceDish->setTable('MPG_DISHESINTOLERANCES');
	$queryDeleteIntoleranceDish->execute(); 

	if( notBlank('GET', 'intolerances') ) {			
		$intolerances= explode("@", $_GET['intolerances']);
		
		for ($i = 0; $i < count($intolerances); $i++) {		

			$_GET['idIntolerance']= $intolerances[$i];
			$queryDishNewIntolerance= new Query();
			$queryDishNewIntolerance->setParams('idDish,idIntolerance');
			$queryDishNewIntolerance->setType('insert');
			$queryDishNewIntolerance->setRelation(true);
			$queryDishNewIntolerance->setTable('MPG_DISHESINTOLERANCES');
			$queryDishNewIntolerance->execute(); 
			
			if ($queryDishNewIntolerance->getNumRowsAffected()<=0) {
				echo json_encode(array("message" => "No intolerances saved for the dish."));
				http_response_code(400);
			} else {  
				http_response_code(200);
				echo json_encode(array("message" => "Intolerances added to the dish."));
			}
		}
		
	} else {
		http_response_code(200);
		echo json_encode(array("message" => "All intolerances were deleted for the dish."));
	}
	
} else {
	echo json_encode(array("message" => "No dish or intolerances received."));	
}


?>