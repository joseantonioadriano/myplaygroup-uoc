<?php


include_once("../header.php");
include_once("../util.sql.php");


if( notBlank('GET', 'username') && 
    notBlank('GET', 'password') && 
    notBlank('GET', 'idType') && 
    notBlank('GET', 'idSchool') && 
    notBlank('GET', 'idElement')) 
{    

  $_GET['activated']= 1;
  $_GET['favouriteLang']= 2;
  $queryUserRead= new Query();
  $queryUserRead->setParams('username,password,idType,idSchool,activated,favouriteLang');
  $queryUserRead->setType('insert');
  $queryUserRead->setTable('MPG_USERS');
  $queryUserRead->execute(); 

	if ($queryUserRead->getNumRowsAffected()<=0){
		http_response_code(400);
		echo json_encode(array("message" => "Register non created."));
	} else {               

		$_GET['id']= $_GET['idElement'];
		$_GET['idUser']= $queryUserRead->getNewId();
		$queryUserUpdate= new Query();
		$queryUserUpdate->setParams('idUser');
		$queryUserUpdate->setType('update');
		switch($_GET['idType']){
			case 3: 
				$queryUserUpdate->setTable('MPG_TEACHERS');
				break;
			case 4: 
				$queryUserUpdate->setTable('MPG_PSYCHOLOGISTS');
				break;
			case 5: 
				$queryUserUpdate->setTable('MPG_PARENTS');
				break;
		}			
		$queryUserUpdate->execute(); 

		http_response_code(200);
		echo json_encode(array("message" => "Register created width id: ".$queryUserRead->getNewId(), "newId" => $queryUserRead->getNewId()));
	}    
} else {
	http_response_code(400);
	echo json_encode(array("message" => "Not all values received."));	
}


?>