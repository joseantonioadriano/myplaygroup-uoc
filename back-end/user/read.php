<?php

include_once("../header.php");
include_once("../util.sql.php");

$queryUserRead= new Query();
if($_GET['idSchool']==10){
	$queryUserRead->setSQL('select * from MPG_USERS where idSchool not in (select idSchool from MPG_USERS where idType=1) and idType != 1 ');
} else {
	$queryUserRead->setSQL('select * from MPG_USERS where idSchool= '.$_GET['idSchool'].' and idType != 1 ');
}
$queryUserRead->execute();


if ($queryUserRead->getNumRowsAffected()<=0){
	echo json_encode(array("message" => "No users found."));
} else {  
	$elements_arr=array();
	while($fila= mysqli_fetch_array($queryUserRead->getResult())){
		$element=array(			
			"id" => $fila['id'],
			"username" => $fila['username'],
			"password" => '',
			"idType" => $fila['idType'],
			"idSchool" => $fila['idSchool']
		);
		array_push($elements_arr, $element);
	}
	http_response_code(200);
    echo json_encode($elements_arr);
}

?>