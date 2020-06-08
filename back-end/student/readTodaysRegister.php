<?php

include_once("../header.php");
include_once("../util.sql.php");

if( notBlank('GET', 'id') ) 
{    

  $_GET['date']= getdate()['mday']."/".getdate()['mon']."/".getdate()['year'];

  $queryStudentRead= new Query();
  $queryStudentRead->setSQL('select * from MPG_STUDENTSDAILYREGISTER where idStudent= '.$_GET['id']. ' and dateRegister= "'.$_GET['date'].'"');
  $queryStudentRead->execute();

	if ($queryStudentRead->getNumRowsAffected()<=0){
    
    echo json_encode(array("message" => "No register found."));
	} else {               
    
    $elements_arr=array();
    while($fila= mysqli_fetch_array($queryStudentRead->getResult())){
      $element=array(			
        "id" => $fila['idStudent'],
        "depositions" => $fila['depositions'],
        "meals" => $fila['meals'],
        "nap" => $fila['nap'],
        "remarks" => $fila['remarks']
      );
      array_push($elements_arr, $element);
    }    
    		
    http_response_code(200);
    echo json_encode($elements_arr);
	}    
} else {
	http_response_code(400);
	echo json_encode(array("message" => "Not all values received."));	
}


?>