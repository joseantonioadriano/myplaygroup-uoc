<?php

include_once("../header.php");
include_once("../util.sql.php");

if( notBlank('GET', 'id') ) {

	$queryDishIntolerancesRead= new Query();
	$queryDishIntolerancesRead->setSQL('select i.* from MPG_INTOLERANCES i, MPG_DISHES d, MPG_DISHESINTOLERANCES di where di.idDish=d.id and di.idIntolerance=i.id and d.id='.$_GET['id'].' order by i.name asc');
	$queryDishIntolerancesRead->execute();

	if ($queryDishIntolerancesRead->getNumRowsAffected()<=0) {
		echo json_encode(array("message" => "No intolerances found for the dish."));
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