<?php

include_once("../header.php");
include_once("../util.sql.php");

if( notBlank('GET', 'kindergarten') ) {

	$querySchoolRead= new Query();
	$SQLCommand= 'select s.id, s.name, s.idKindergarten, s.address, k.name as nameKindergarten from MPG_SCHOOLS s, MPG_KINDERGARTENS k where k.id=s.idKindergarten';
	(notBlank('GET', 'id')) ? $SQLCommand.= ' and s.id='.$_GET['id'] : null;	
	$SQLCommand.= ' order by s.name asc';
	$querySchoolRead->setSQL($SQLCommand);	
	$querySchoolRead->execute();
	
	//echo $querySchoolRead->getSQLCommand();


	if ($querySchoolRead->getNumRowsAffected()<=0){
		echo json_encode(array("message" => "No schools found."));
	} else {  
		$elements_arr=array();
		while($fila= mysqli_fetch_array($querySchoolRead->getResult())){
			$element=array(			
				"id" => $fila['id'],			
				"name" => $fila['name'],			
				"idKindergarten" => $fila['idKindergarten'],			
				"address" => $fila['address'],
				"nameKindergarten" => $fila['nameKindergarten']
			);
			array_push($elements_arr, $element);
		}
		http_response_code(200);
		echo json_encode($elements_arr);
	}

} else {

	$querySchoolRead= new Query();
	$querySchoolRead->setParams('id,name,idKindergarten,address');
	$querySchoolRead->setType('select');
	$querySchoolRead->setTable('MPG_SCHOOLS');
	$querySchoolRead->setOrder('name');
	$querySchoolRead->execute();

	if ($querySchoolRead->getNumRowsAffected()<=0){
		echo json_encode(array("message" => "No schools found."));
	} else {  
		$elements_arr=array();
		while($fila= mysqli_fetch_array($querySchoolRead->getResult())){
			$element=array(			
				"id" => $fila['id'],			
				"name" => $fila['name'],			
				"idKindergarten" => $fila['idKindergarten'],			
				"address" => $fila['address']
			);
			array_push($elements_arr, $element);
		}
		http_response_code(200);
		echo json_encode($elements_arr);
	}

}

?>