<?php

include_once("../header.php");
include_once("../util.sql.php");

$queryDishRead= new Query();
$queryDishRead->setParams('id,name,idSchool');
$queryDishRead->setType('select');
$queryDishRead->setTable('MPG_MENUS');
$queryDishRead->setOrder('name');
$queryDishRead->execute();

if ($queryDishRead->getNumRowsAffected()<=0){
	echo json_encode(array("message" => "No menus found."));
} else {  
	$elements_arr=array();
	while($fila= mysqli_fetch_array($queryDishRead->getResult())){
		
		$element=array(			
			"id" => $fila['id'],			
			"name" => $fila['name'],				
			"idBreakfast" => getDishesFromMenu(1, $fila['id']),
			"idStarter" => getDishesFromMenu(2, $fila['id']),
			"idMain" => getDishesFromMenu(3, $fila['id']),
			"idDessert" => getDishesFromMenu(4, $fila['id']),
			"idSnack" => getDishesFromMenu(5, $fila['id']),
			"idSchool" => $fila['idSchool']
		);
		array_push($elements_arr, $element);

	}
	http_response_code(200);
    echo json_encode($elements_arr);
}

	function getDishesFromMenu($idType, $idMenu){
		$queryDishReadType= new Query();
		$queryDishReadType->setSQL('select idMenu, idType, idDish from MPG_MENUDISHES where idType='.$idType.' and idMenu='.$idMenu);		
		$queryDishReadType->execute();		
		$filaType= mysqli_fetch_array($queryDishReadType->getResult());		
		($queryDishReadType->getNumRowsAffected()<=0) ? $dishType= 0 : $dishType= $filaType['idDish'];
		return $filaType['idDish'];
	}

?>