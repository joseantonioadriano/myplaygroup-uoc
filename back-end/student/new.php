<?php

include_once("../header.php");
include_once("../util.sql.php");

if( notBlank('GET', 'dni') && 
    notBlank('GET', 'name') && 
    notBlank('GET', 'surname') && 
    notBlank('GET', 'idResponsable1') && 
    notBlank('GET', 'idResponsable2') && 
    notBlank('GET', 'idSchool') && 
    notBlank('GET', 'genre') && 
    notBlank('GET', 'dateBirth')) 
{    
  $queryStudentNew= new Query();
  $queryStudentNew->setParams('dni,name,surname,idResponsable1,idResponsable2,idSchool,genre,dateBirth');
  $queryStudentNew->setType('insert');
  $queryStudentNew->setTable('MPG_STUDENTS');
  $queryStudentNew->execute(); 

	if ($queryStudentNew->getNumRowsAffected()<=0){
		http_response_code(400);
		echo json_encode(array("message" => "Register non created."));
	} else {               

      if( notBlank('GET', 'intolerancesStudent') ) {			
        $intolerances= explode("@", $_GET['intolerancesStudent']);
        $_GET['idStudent']= $queryStudentNew->getNewId();
        for ($i = 0; $i < count($intolerances); $i++) {		
          $_GET['idIntolerance']= $intolerances[$i];
          $queryStudentNewIntolerance= new Query();
          $queryStudentNewIntolerance->setParams('idStudent,idIntolerance');
          $queryStudentNewIntolerance->setType('insert');
          $queryStudentNewIntolerance->setRelation(true);
          $queryStudentNewIntolerance->setTable('MPG_STUDENTSINTOLERANCES');
          $queryStudentNewIntolerance->execute(); 
        }
      }

		http_response_code(200);
		echo json_encode(array("message" => "Register created width id: ".$queryStudentNew->getNewId(), "newId" => $queryStudentNew->getNewId()));
	}    
} else {
	http_response_code(400);
	echo json_encode(array("message" => "Not all values received."));	
}


?>