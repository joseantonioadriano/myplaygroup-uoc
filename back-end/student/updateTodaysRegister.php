<?php

include_once("../header.php");
include_once("../util.sql.php");

if( notBlank('GET', 'id') && 
    (notBlank('GET', 'depositions') || $_GET['depositions']== 0) && 
    notBlank('GET', 'meals') && 
    notBlank('GET', 'nap') && 
    notBlank('GET', 'remarks') || $_GET['remarks']=== '') 
{    

  $_GET['date']= getdate()['mday']."/".getdate()['mon']."/".getdate()['year'];

  $queryStudentRead= new Query();
  $queryStudentRead->setSQL('select * from MPG_STUDENTSDAILYREGISTER where idStudent= '.$_GET['id']. ' and dateRegister= "'.$_GET['date'].'"');
  $queryStudentRead->execute();

	if ($queryStudentRead->getNumRowsAffected()<=0){
    
    $queryStudentInsert= new Query();
    $queryStudentInsert->setSQL('insert into MPG_STUDENTSDAILYREGISTER (idStudent, depositions, meals, nap, remarks, dateRegister) values 
                                ('.$_GET['id'].','.$_GET['depositions'].','.$_GET['meals'].','.$_GET['nap'].',"'.$_GET['remarks'].'","'.$_GET['date'].'")');
    $queryStudentInsert->execute();
    //echo "getSQLCommand:".$queryStudentInsert->getSQLCommand();

    http_response_code(200);
		echo json_encode(array("message" => "Register created."));
	} else {               
    
    $queryStudentUpdate= new Query();
    $queryStudentUpdate->setSQL('update MPG_STUDENTSDAILYREGISTER set depositions= '.$_GET['depositions'].', meals= '.$_GET['meals'].', nap= '.
                                $_GET['nap'].', remarks= "'.$_GET['remarks'].'" where idStudent= '.$_GET['id']. ' and dateRegister= "'.$_GET['date'].'"');
    $queryStudentUpdate->execute();
    //echo "getSQLCommand:".$queryStudentUpdate->getSQLCommand()."<br/>";
    
		http_response_code(200);
		echo json_encode(array("message" => "Register updated."));
	}    
} else {
	http_response_code(400);
	echo json_encode(array("message" => "Not all values received."));	
}


?>