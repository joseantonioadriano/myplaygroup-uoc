<?php

include_once("../header.php");
include_once("../util.sql.php");

$queryLoginRead= new Query();
$queryLoginRead->setParams('id,username,password');
$queryLoginRead->setType('select');
$queryLoginRead->setTable('MPG_USERS');
$queryLoginRead->execute();

if ($queryLoginRead->getNumRowsAffected()<=0){
	echo json_encode(array("message" => "No users found."));
} else {      
        
    $elements_arr=array();
    $responsables_array=array();
    $students_arr=array();
    $info_students_arr=array();
    $nameResponsable="";
    $surnameResponsable="";
    $nameSchool="";

	while($fila= mysqli_fetch_array($queryLoginRead->getResult())){
                
        switch($fila['idType']){
            //SUPERADMIN
            case 1:             
                $responsables_array=getIdResponsableFromUser($fila['id']);
                $students_arr=getStudentsFromResponsable($responsables_array['id']);           
                $nameResponsable=$responsables_array['name'];
                $surnameResponsable=$responsables_array['surname'];
                $nameSchool=getNameSchoolFromId($fila['id']);
                $info_students_arr=getInfoStudents($students_arr);
                break;
            //ADMIN
            case 2:                                
                $nameSchool=getNameSchoolFromId($fila['id']);
                break;
            //TEACHER
            case 3:
                $nameSchool=getNameSchoolFromId($fila['id']);
                break;
            //PSYCHOLOGIST
            case 4:
                $nameSchool=getNameSchoolFromId($fila['id']);
                break;
            //PARENT
            case 5:                
                $responsables_array=getIdResponsableFromUser($fila['id']);
                $students_arr=getStudentsFromResponsable($responsables_array['id']);        
                $nameResponsable=$responsables_array['name'];
                $surnameResponsable=$responsables_array['surname'];
                $nameSchool=getNameSchoolFromId($fila['id']);
                $info_students_arr=getInfoStudents($students_arr);
                break;
            //DEMO
            case 99:
                $responsables_array=getIdResponsableFromUser($fila['id']);
                $students_arr=getStudentsFromResponsable($responsables_array['id']);   
                $nameResponsable=$responsables_array['name'];
                $surnameResponsable=$responsables_array['surname'];
                $nameSchool=getNameSchoolFromId($fila['id']);
                $info_students_arr=getInfoStudents($students_arr);
                break;
            default:
                break;
        }

		$element=array(			
			"id" => $fila['id'],
			"username" => $fila['username'],
			"type" => $fila['idType'],
			"activated" => $fila['activated'],
            "lastConnection" => $fila['lastConnection'],
            "favouriteLang" => $fila['favouriteLang'],
            "name" => $nameResponsable,
            "surname" => $surnameResponsable,
			"studentsArray" => $students_arr,
            "schoolsArray" => null,
            "idSchool" => $fila['idSchool'],
            "nameSchool" => $nameSchool,
            "infoStudentsArray" => $info_students_arr
		);
		array_push($elements_arr, $element);
	}
	http_response_code(200);
	echo json_encode($elements_arr);
}

function getInfoStudents($infoStudentsArray){
    $infoStudents_arr= array();
    $result= null;

    if (is_array($infoStudentsArray) ) { 
        
        for ($i = 0; $i < count($infoStudentsArray); ++$i){
            $intolerances_arr= array();
            $infoStudents_arr[$i]['id']= $infoStudentsArray[$i]['id'];

            $queryEnrollmentRead= new Query();
            $queryEnrollmentRead->setSQL('select * from MPG_ENROLLMENTS e, MPG_COURSES c where e.idCourse = c.id and e.idStudent= '.$infoStudentsArray[$i]['id'].' and c.active = 1');
            $queryEnrollmentRead->execute();

            $infoStudents_arr[$i]['idGroup']= 0;
            $infoStudents_arr[$i]['idSchool']= 0;
            $infoStudents_arr[$i]['idTutor']= 0;
            $infoStudents_arr[$i]['nameGroup']= '';
            $infoStudents_arr[$i]['nameSchool']= '';
            $infoStudents_arr[$i]['nameTutor']= '';
            $infoStudents_arr[$i]['intolerances']= 0;
            $infoStudents_arr[$i]['age']= 0;
            
            if ($queryEnrollmentRead->getNumRowsAffected()>0){
                $filaEnrollment= mysqli_fetch_array($queryEnrollmentRead->getResult());
                $infoStudents_arr[$i]['idGroup']= $filaEnrollment['idGroup'];
                $infoStudents_arr[$i]['idSchool']= $filaEnrollment['idSchool'];
                $infoStudents_arr[$i]['namePicture']= $filaEnrollment['namePicture'];

                $_GET['id']= $infoStudents_arr[$i]['idGroup'];
                $queryGroupRead= new Query();
                $queryGroupRead->setParams('id');
                $queryGroupRead->setType('select');
                $queryGroupRead->setTable('MPG_GROUPS');
                $queryGroupRead->execute();

                if ($queryGroupRead->getNumRowsAffected()>0){
                    $filaGroup= mysqli_fetch_array($queryGroupRead->getResult());
                    $infoStudents_arr[$i]['nameGroup']= $filaGroup['name'];
                    $infoStudents_arr[$i]['idTutor']= $filaGroup['idTutor'];

                    $_GET['id']= $filaGroup['idTutor'];
                    $queryTutorRead= new Query();
                    $queryTutorRead->setParams('id');
                    $queryTutorRead->setType('select');
                    $queryTutorRead->setTable('MPG_TEACHERS');
                    $queryTutorRead->execute();

                    if ($queryTutorRead->getNumRowsAffected()>0){
                        $filaTutor= mysqli_fetch_array($queryTutorRead->getResult());
                        $infoStudents_arr[$i]['nameTutor']= $filaTutor['name']." ".$filaTutor['surname'];
                    }

                }

                $_GET['id']= $infoStudents_arr[$i]['idSchool'];
                $querySchoolRead= new Query();
                $querySchoolRead->setParams('id');
                $querySchoolRead->setType('select');
                $querySchoolRead->setTable('MPG_SCHOOLS');
                $querySchoolRead->execute();

                if ($querySchoolRead->getNumRowsAffected()>0){
                    $filaSchool= mysqli_fetch_array($querySchoolRead->getResult());
                    $infoStudents_arr[$i]['nameSchool']= $filaSchool['name'];
                }
                
                $queryIntolerancesRead= new Query();
                $queryIntolerancesRead->setSQL('select i.* from MPG_STUDENTSINTOLERANCES si, MPG_INTOLERANCES i where si.idIntolerance = i.id and si.idStudent= '.$filaEnrollment['idStudent']);
                $queryIntolerancesRead->execute();            

                if ($queryIntolerancesRead->getNumRowsAffected()>0){                
                    $filaIntolerances= mysqli_fetch_array($queryIntolerancesRead->getResult());

                    while($filaIntolerances= mysqli_fetch_array($queryIntolerancesRead->getResult())){
                        $elementIntolerance=array(
                            "id" => $filaIntolerances['id'],
                            "name" => $filaIntolerances['name']
                        );		
                        array_push($intolerances_arr, $elementIntolerance);	
                    }                                  
                    $infoStudents_arr[$i]['intolerances']= $intolerances_arr;
                }

                $_GET['id']= $infoStudents_arr[$i]['id'];
                $queryStudentRead= new Query();
                $queryStudentRead->setParams('id');
                $queryStudentRead->setType('select');
                $queryStudentRead->setTable('MPG_STUDENTS');
                $queryStudentRead->execute();

                if ($queryStudentRead->getNumRowsAffected()>0){
                    $filaStudent= mysqli_fetch_array($queryStudentRead->getResult());
                    $infoStudents_arr[$i]['age']= calculaEdad($filaStudent['dateBirth']);
                }            

            }

        }
        
        (count($infoStudents_arr)>0) ? $result=$infoStudents_arr : $result= null;
    }

    return $result;
}

function getNameSchoolFromId($idSchool){
    
    $nameSchool="";
    $querySchoolRead= new Query();
    $querySchoolRead->setParams('id,name');
    $querySchoolRead->setType('select');
    $querySchoolRead->setTable('MPG_SCHOOLS');
    $querySchoolRead->execute();

    if ($querySchoolRead->getNumRowsAffected()>0){
        $fila= mysqli_fetch_array($querySchoolRead->getResult());
        $nameSchool= $fila['name'];
    }

    return $nameSchool;
}

function getIdResponsableFromUser($idUser){
    $responsables_arr= array();

    $queryLoginResponsableRead= new Query();
    $queryLoginResponsableRead->setSQL('select * from MPG_PARENTS where idUser= '.$idUser);
    $queryLoginResponsableRead->execute();
    
    //echo $queryLoginResponsableRead->getSQLCommand();
    
    while($fila= mysqli_fetch_array($queryLoginResponsableRead->getResult())){
        $elementResponsable=array(
            "id" => $fila['id'],
            "name" => $fila['name'],
            "surname" => $fila['surname']
        );		
		array_push($responsables_arr, $elementResponsable);	
    }    

    (count($responsables_arr)>0) ? $result=$responsables_arr[0] : $result= null;

    return $result;
}

function getStudentsFromResponsable($idResponsable){    

    if ($idResponsable===null)
        return null;

    $students_arr=array();

    $queryLoginStudentsRead= new Query();
    $queryLoginStudentsRead->setSQL('select * from MPG_STUDENTS where idResponsable1= '.$idResponsable.' or idResponsable2= '.$idResponsable);
    $queryLoginStudentsRead->execute();
    
    //echo $queryLoginStudentsRead->getSQLCommand();
    
    while($filaStudent= mysqli_fetch_array($queryLoginStudentsRead->getResult())){
        $elementStudent=array(
            "id" => $filaStudent['id'],
            "dni" => $filaStudent['dni'],
            "name" => $filaStudent['name'],
            "surname" => $filaStudent['surname'],
            "idResponsable1" => $filaStudent['idResponsable1'],
            "idResponsable2" => $filaStudent['idResponsable2']
        );		
		array_push($students_arr, $elementStudent);	
    }

    return $students_arr;
}


function calculaEdad($fechanacimiento){
    if ($fechanacimiento==null)
        return 0;
    $date=explode("/",$fechanacimiento);
    $dia= $date[0];
    $mes= $date[1];
    $ano= $date[2];
    $ano_diferencia  = date("Y") - $ano;
    $mes_diferencia = date("m") - $mes;
    $dia_diferencia   = date("d") - $dia;
    if ($dia_diferencia < 0 || $mes_diferencia < 0)
      $ano_diferencia--;
    return $ano_diferencia;
  }

?>