<?php

include_once("../header.php");
include_once("../util.sql.php");

if( notBlank('GET', 'name') && 
	notBlank('GET', 'idSchool')) 
{    
  $queryDishNew= new Query();
  $queryDishNew->setParams('name,idSchool');
  $queryDishNew->setType('insert');
  $queryDishNew->setTable('MPG_DISHES');
  $queryDishNew->execute(); 

	if ($queryDishNew->getNumRowsAffected()<=0){
		http_response_code(400);
		echo json_encode(array("message" => "Register non created."));
	} else {               

		if( notBlank('GET', 'intolerancesDish') ) {			
			$intolerances= explode("@", $_GET['intolerancesDish']);
			$_GET['idDish']= $queryDishNew->getNewId();
			for ($i = 0; $i < count($intolerances); $i++) {		
				$_GET['idIntolerance']= $intolerances[$i];
				$queryDishNewIntolerance= new Query();
				$queryDishNewIntolerance->setParams('idDish,idIntolerance');
				$queryDishNewIntolerance->setType('insert');
				$queryDishNewIntolerance->setRelation(true);
				$queryDishNewIntolerance->setTable('MPG_DISHESINTOLERANCES');
				$queryDishNewIntolerance->execute(); 
			}
		}

		http_response_code(200);
		echo json_encode(array("message" => "Register created width id: ".$queryDishNew->getNewId(), "newId" => $queryDishNew->getNewId()));
	}    
} else {
	http_response_code(400);
	echo json_encode(array("message" => "Not all values received."));	
}


?>