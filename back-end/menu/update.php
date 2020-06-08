<?php

include_once("../header.php");
include_once("../util.sql.php");

if( notBlank('GET', 'id') && 
    notBlank('GET', 'name') && 
    notBlank('GET', 'idSchool') && 
    notBlank('GET', 'idBreakfast') && 
    notBlank('GET', 'idStarter') && 
    notBlank('GET', 'idMain') && 
    notBlank('GET', 'idDessert') && 
    notBlank('GET', 'idSnack') ) 
{    

  $queryMenuUpdate= new Query();
  $queryMenuUpdate->setParams('name,idSchool');
  $queryMenuUpdate->setType('update');
  $queryMenuUpdate->setTable('MPG_MENUS');
  $queryMenuUpdate->execute(); 
  
  //echo "getSQLCommand:".$queryMenuUpdate->getSQLCommand()."<br>";

  deleteDishMenu($_GET['id']);

  notBlank('GET', 'idBreakfast') ? newDishMenu($_GET['idBreakfast'], $_GET['id'], 1) : null;
  notBlank('GET', 'idStarter')   ? newDishMenu($_GET['idStarter'], $_GET['id'], 2)   : null;
  notBlank('GET', 'idMain') 	   ? newDishMenu($_GET['idMain'], $_GET['id'], 3) 	   : null;
  notBlank('GET', 'idDessert')   ? newDishMenu($_GET['idDessert'], $_GET['id'], 4)   : null;
  notBlank('GET', 'idSnack') 	   ? newDishMenu($_GET['idSnack'], $_GET['id'], 5) 	   : null;

  http_response_code(200);
  echo json_encode(array("message" => "Register updated."));

} else {
    http_response_code(400);
    echo json_encode(array("message" => "Not all values received."));	
}

function deleteDishMenu($idMenu){
	$_GET['idMenu']= $idMenu;
	$queryMenuDeleteDishes= new Query();
	$queryMenuDeleteDishes->setParams('idMenu');
	$queryMenuDeleteDishes->setType('delete');
	$queryMenuDeleteDishes->setRelation(true);
	$queryMenuDeleteDishes->setTable('MPG_MENUDISHES');
  $queryMenuDeleteDishes->execute(); 
  //echo "getSQLCommand:".$queryMenuDeleteDishes->getSQLCommand()."<br>";
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
  //echo "getSQLCommand:".$queryMenuNewDish->getSQLCommand()."<br>";
}

?>