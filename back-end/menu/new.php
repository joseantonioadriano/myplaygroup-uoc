<?php

include_once("../header.php");
include_once("../util.sql.php");

if( notBlank('GET', 'name') && 
	notBlank('GET', 'idSchool') ) 
{   
  
  $queryMenuNew= new Query();
  $queryMenuNew->setParams('name,idSchool');
  $queryMenuNew->setType('insert');
  $queryMenuNew->setTable('MPG_MENUS');
  $queryMenuNew->execute(); 
  $newIdMenu= $queryMenuNew->getNewId();

	if ($queryMenuNew->getNumRowsAffected()<=0){
		http_response_code(400);
		echo json_encode(array("message" => "Register non created."));
	} else {               
				
		notBlank('GET', 'idBreakfast') ? newDishMenu($_GET['idBreakfast'], $newIdMenu, 1) : null;
		notBlank('GET', 'idStarter')   ? newDishMenu($_GET['idStarter'], $newIdMenu, 2)   : null;
		notBlank('GET', 'idMain') 	   ? newDishMenu($_GET['idMain'], $newIdMenu, 3) 	  : null;
		notBlank('GET', 'idDessert')   ? newDishMenu($_GET['idDessert'], $newIdMenu, 4)   : null;
		notBlank('GET', 'idSnack') 	   ? newDishMenu($_GET['idSnack'], $newIdMenu, 5) 	  : null;

		http_response_code(200);
		echo json_encode(array("message" => "Register created width id: ".$newIdMenu, "newId" => $newIdMenu));
	}    
} else {
	http_response_code(400);
	echo json_encode(array("message" => "Not all values received."));	
}

function newDishMenu($idDish,$idMenu,$idType){
	$_GET['idDish']= $idDish;
	$_GET['idMenu']= $idMenu;
	$_GET['idType']= $idType;
	$queryMenuNewDish= new Query();
	$queryMenuNewDish->setParams('idMenu,idDish,idType');
	$queryMenuNewDish->setType('insert');
	$queryMenuNewDish->setRelation(true);
	$queryMenuNewDish->setTable('MPG_MENUDISHES');
	$queryMenuNewDish->execute(); 
}


?>