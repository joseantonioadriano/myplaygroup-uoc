<?php

//include_once($_SERVER['CONTEXT_DOCUMENT_ROOT']."/".$_SERVER['_application_folder']."/models/components/Log.class.php");

class DBManager {

	private $cx = "";
	private $conectado = false;
	private $dbsel = "";
	private $dblink = "";
	private $NumRowsAffected= 0;
	private $log= "";
	private $SQLCommand= "";
	private $result= "";

	function __construct($cx){
		$this->log= new Log("DBManager");
		$this->cx= $cx;				
		$this->conectado= false;
		$this->dbsel= false;		
		//$this->log->escribir("");			
		//$this->log->escribir("----------------------");			
		//$this->log->escribir("DBManager inicializado");			
		//$this->log->escribir("----------------------");			
	}

	function getEstado(){
		return $this->conectado;
	}

	function getDBSel(){
		return $this->dbsel;
	}

	function getDBLink(){
		return $this->dblink;
	}
	
	function setDBLink(){
		$this->dblink= mysqli_connect('p:'.$this->cx->getServidor(),
					  		    $this->cx->getUsuario(),
					            $this->cx->getPassword(),
								$this->cx->getDatabase()) or die;
		//var_dump($this->dblink);
		//echo("host_info:".mysqli_get_host_info($dblink));		
		//$src= mysqli_query($this->getDBLink(), $SQLCommand) or trigger_error($mysqli->error);		
	}

	function setEstado($estado){
		$this->conectado= $estado;
	}

	function setDB($db){
		$this->dbsel= $db;
	}

	function conectar(){
		

		$this->setDBLink();		

		if ($this->dblink) {
			$this->setEstado(false);
			mysqli_connect_error();
			//$this->log->escribir(mysqli_connect_error());
		}
		else 
			$this->setEstado(true);

		//escribir($this->getDBLink());
		//escribir($this->getEstado());
		
		if ($this->getEstado()){
			//$this->log->escribir("Conectado");
			//$this->setDB(mysqli_select_db($this->cx->getDatabase()));
			/*if ($this->getDBSel())
				//$this->log->escribir(" a la db: ".$this->cx->getDatabase());
			else {
				//$this->log->escribir(" a ninguna db");				
				die;
			}*/
		}

	}

	function desconectar(){
		mysql_close($dblink);
		$this->cx= "";				
		$this->conectado= false;
		$this->dbsel= "";	
		$this->dblink = "";	
	}

	function insertOrUpdate($obj, $key= null, $values= 0){
		$this->NumRowsAffected= 0;
		//hacer update si devuelve 0 filas hacer insert
		//la key es para en el update buscar por esos campos, key es un stringlist y values cada uno d los valores del key

		return $this->insert($obj);
	}

	function update($obj, $campo= "id_", $valor= ""){
		$this->NumRowsAffected= 0;
		return $this->executeSQL($this->getSQLUpdate($obj, $campo, $valor),$obj,"UPDATE");
	}

	function insert($obj){
		$this->NumRowsAffected= 0;
		return $this->executeSQL($this->getSQLInsert($obj),$obj,"INSERT");
	}

	function select($obj, $campo="", $valor="", $ord= "1"){
		$this->NumRowsAffected= 0;
		return $this->executeSQL($this->getSQLSelect($obj, $campo, $valor, $ord),$obj,"SELECT");	
	}

	function selectDef($obj, $nomSelect, $parms= ""){
		$this->NumRowsAffected= 0;
		return $this->executeSQL($this->getSQLSelectDef($obj, $nomSelect, $parms),$obj,"SELECT");	
	}

	function rowsAffected(){
		return $this->NumRowsAffected;
	}


	function getTabla($linea){
		return $linea;
	}

	function procesarRel($obj= "", $lectura= "", $qry1= "", $qry2= ""){
		$upd= false;

		if($qry2=="")
			$upd= true;

		//escribir("procersarRel");		
		$numLinea=0;
		
		foreach($lectura as $linea){				
			if($numLinea==0){
				$qry1.=$this->getTabla($linea);					
				if($upd)			//procesar update
					$qry1.=" set ";					
				else				//procesar insert
					$qry1.="(";				
			}					
			else{
				if($this->getAttrVal($linea,$obj)!=null){					
					if($upd)		//procesar update					
						$qry1.=$this->getNomCampo($linea)."=".$this->getAttrVal($linea,$obj).",";					
					else			//procesar insert
					{
						$qry1.=$this->getNomCampo($linea).",";
						$qry2.=$this->getAttrVal($linea,$obj).",";
					}
				}
			}
			$numLinea++;
		}
	
		if(!$upd)
			$qry1.=")".$qry2.")";
		
		return $qry1;
	}

	private function getSQLSelectDef($obj, $nomSelect, $parms){
		$cls= get_class($obj);		
		$nomFic= $cls.".qrs";
		$selExec="";
		
		
		//$this->log->escribir("Buscando la select: ".$nomSelect);


		//if(!file_exists($_SERVER['CONTEXT_DOCUMENT_ROOT']."/".$_SERVER['_application_folder']."/models/qrys/".$nomFic))
			//$this->log->escribir("Fichero de queries: '".$nomFic."' inexistente") ;
		if(file_exists($_SERVER['CONTEXT_DOCUMENT_ROOT']."/".$_SERVER['_application_folder']."/models/qrys/".$nomFic)){
			$lectura= file($_SERVER['CONTEXT_DOCUMENT_ROOT']."/".$_SERVER['_application_folder']."/models/qrys/".$cls.".qrs") or die("Error leyendo el fichero de queries: ".$cls.".qrs");
				foreach($lectura as $linea){				
					if($this->getNomQry($linea)==$nomSelect)
						$selExec=$this->getValQry($linea);
				}					
		}	

		if($parms!=""){			
			$i= 0;
			$numRemp= 1;
			while($i<mb_substr_count($parms,";")+1){
				$selExec=$this->str_rep_first("?",explode(";",$parms)[$i],$selExec);
			$i++;
			}
		}
		
		return $selExec.";";
	}

	private function str_rep_first($sub1= "", $sub2= "", $str= ""){
		return substr($str, 0, strpos($str, $sub1)).$sub2.substr($str, strpos($str, $sub1)+1, strlen($str));
	}

	private function getSQLSelect($obj, $campo= "", $valor= "", $cmpOrder= "1"){
		$cls= get_class($obj);		
		
		$qrySel="";
		$qrySel="select * from ".trim($this->getTablaRel($cls))." where ";
		//$this->log->escribir("Construyendo select..");

			if($campo!="" && $valor!="")
			{
				$i= 0;
				while($i<mb_substr_count($campo,";")+1){
					$qrySel.=explode(";",$campo)[$i]."=";
					//$this->log->escribir("Campo de la base de datos a incluire en el where: ".explode(";",$campo)[$i]);
					//$this->log->escribir("De tipo: ".$this->getTipoBusq($cls, explode(";",$campo)[$i], 1));
					if (trim($this->getTipoBusq($cls, explode(";",$campo)[$i], 1))=="varchar2" || trim($this->getTipoBusq($cls, explode(";",$campo)[$i], 1))=="") {
							//$this->log->escribir("Agregado a la query como (varchar2): "."'".explode(";",$valor)[$i]."'");					
							$qrySel.="'".explode(";",$valor)[$i]."'";
						}
					else{
							//$this->log->escribir("Agregado a la query como: ".explode(";",$valor)[$i]);
							$qrySel.=explode(";",$valor)[$i];
					}
					$qrySel.=" and ";
				$i++;
				}
			}						
			
	
		$qrySel.=";";
		$qrySel=$this->formatear($qrySel)." order by ".$cmpOrder.";";
		//$this->log->escribir("Funcion getSQLSelect devuelve: ".$qrySel);
		return $qrySel;
	}

	private function getTablaRel($cls){
		$nomFic= $cls.".rel";
		$lectura="";
		$linea="";
		$numLinea=0;
		$table="";
		
		$tabla= "";
		
		//if(!file_exists($_SERVER['CONTEXT_DOCUMENT_ROOT']."/".$_SERVER['_application_folder']."/models/relations/".$nomFic))
			//$this->log->escribir("Fichero relacional: '".$nomFic."' inexistente") ;
		if(file_exists($_SERVER['CONTEXT_DOCUMENT_ROOT']."/".$_SERVER['_application_folder']."/models/relations/".$nomFic)){
			$lectura= file($_SERVER['CONTEXT_DOCUMENT_ROOT']."/".$_SERVER['_application_folder']."/models/relations/".$cls.".rel") or die("Error leyendo el fichero relacional: ".$cls.".rel");				
				foreach($lectura as $linea){				
					if($numLinea==0)
						$tabla=$this->getTabla($linea);					
					$numLinea++;
				}					
		}	

		return $tabla;
	}
	
	function getSQLUpdate($obj, $campo= "id_", $valor= ""){
		$cls= get_class($obj);
		$nomFic= $cls.".rel";		
		$lectura="";
		$linea="";
		$numLinea=0;
		$tabla="";
		$qryUpd="update ";
		$elem="";
		

		//$this->log->escribir("procesando.. '".$nomFic."'");
		
		//if(!file_exists($_SERVER['CONTEXT_DOCUMENT_ROOT']."/".$_SERVER['_application_folder']."/models/relations/".$nomFic))
			//$this->log->escribir("Fichero relacional: '".$nomFic."' inexistente") ;
		if(file_exists($_SERVER['CONTEXT_DOCUMENT_ROOT']."/".$_SERVER['_application_folder']."/models/relations/".$nomFic)){
			$lectura= file($_SERVER['CONTEXT_DOCUMENT_ROOT']."/".$_SERVER['_application_folder']."/models/relations/".$cls.".rel") or die("Error leyendo el fichero relacional: ".$cls.".rel");				
			$qryUpd=$this->procesarRel($obj, $lectura, $qryUpd);
			if($valor=="")
				$qryUpd.=" where ".$this->getNomCampoBusq($cls, $campo)."=".$obj->getAttrVal($campo)."";
			else{
				$qryUpd.=" where ";//.$valor."";
				$i= 0;
				while($i<mb_substr_count($campo,";")+1){
					$qryUpd.=explode(";",$campo)[$i]."=";
					if ($this->getTipoBusq($cls, explode(";",$valor)[$i])=="varchar2")
						$qryUpd.="'".explode(";",$valor)[$i]."'";
					else
						$qryUpd.="'".explode(";",$valor)[$i]."'";
					$qryUpd.=" and ";
					$i+=1;
				}
			}
			$qryUpd.=";";
			$qryUpd=$this->formatear($qryUpd);
		}
	
	return ($qryUpd);
	}

	function getSQLInsert($obj){
		$cls= get_class($obj);
		$nomFic= $cls.".rel";		
		$lectura="";
		$linea="";
		$numLinea=0;
		$tabla="";
		$qryPart1="insert into ";
		$qryPart2=" values (";
		

		//$this->log->escribir("procesando.. '".$nomFic."'");
		
		//if(!file_exists($_SERVER['CONTEXT_DOCUMENT_ROOT']."/".$_SERVER['_application_folder']."/models/relations/".$nomFic))
			//$this->log->escribir("Fichero relacional: '".$nomFic."' inexistente") ;
		if(file_exists($_SERVER['CONTEXT_DOCUMENT_ROOT']."/".$_SERVER['_application_folder']."/models/relations/".$nomFic)){
			$lectura= file($_SERVER['CONTEXT_DOCUMENT_ROOT']."/".$_SERVER['_application_folder']."/models/relations/".$cls.".rel") or die("Error leyendo el fichero relacional: ".$cls.".rel");
			$qryPart1=$this->procesarRel($obj, $lectura, $qryPart1, $qryPart2);
			$qryPart1=$this->formatear($qryPart1).";";
		}

		return ($qryPart1);
	}

	//hacer que se ejcute cuando sehaga el commit y meter en un array todas las queries que hay pendientes de ejecutar
	//para lanzarlas todas con el commit
	//poner autocommit on / off tb como attr
	function executeSQL($SQLCommand, $obj, $tipo = "SELECT"){		
		$cls= get_class($obj);
		
		//echo $SQLCommand; 
		//echo $cls;
		
		$nomFic= $cls.".rel";
		//$this->log->escribir("Ejecutando query.. ".$SQLCommand);
		$src= mysqli_query($this->getDBLink(), $SQLCommand); //or trigger_error($mysqli->error);
		////$this->log->escribir("Ejecutando query.. ".$SQLCommand);		
		//var_dump($src);
		
		
		$this->NumRowsAffected= mysqli_affected_rows($this->getDBLink());
		//$this->log->escribir($this->NumRowsAffected." filas afectadas");		

		if ($this->NumRowsAffected==0){
			//$this->log->escribir("Funcion executeSQL() devuelve false");
			return false;
		}
		/*else if ($tipo!="SELECT"){
			//$this->log->escribir("Funcion executeSQL() devuelve true");
			return true;
		}*/
		else if(is_object($src)){
			//$this->log->escribir("Funcion executeSQL().. ");
			$numReg= 0;
			//$listaObj= array();
			//echo "src:";
			//var_dump($src);
			$listaObj[$numReg]= new $cls();
			while($fila= mysqli_fetch_array($src)){
				////$this->log->escribir("Procesando nuevo registro de la query");
				$objSrc= new $obj();
				//escribir("id:".$fila['id']);
				//var_dump($src);

					//if(!file_exists($_SERVER['CONTEXT_DOCUMENT_ROOT']."/".$_SERVER['_application_folder']."/models/relations/".$nomFic))
						//$this->log->escribir("Fichero relacional: '".$nomFic."' inexistente") ;
					if(file_exists($_SERVER['CONTEXT_DOCUMENT_ROOT']."/".$_SERVER['_application_folder']."/models/relations/".$nomFic)){
						$lectura= file($_SERVER['CONTEXT_DOCUMENT_ROOT']."/".$_SERVER['_application_folder']."/models/relations/".$cls.".rel") or die("Error leyendo el fichero relacional: ".$cls.".rel");
												
						
						//$this->log->escribir("Procesando archivo relacional '".$nomFic."' para leer nueva linea devuelta por el comando SQL");

						$numLinea= 0;
						foreach($lectura as $linea){
							//$this->log->escribir(">> Procesando linea: ".trim(preg_replace('/\s+/', ' ', $linea)));
							if($numLinea>0){
								//echo "fichero:".$nomFic;
								//echo "linea:".$linea;
								//echo "a:".$this->getNomCampo($linea)."<br>";
								//var_dump($fila);
								$objSrc->setAttrVal($this->getNomAttr($linea), $fila[$this->getNomCampo($linea)]);
								////$this->log->escribir($this->getNomAttr($linea));
								////$this->log->escribir($fila[$this->getNomCampo($linea)]);
								//$this->log->escribir("---- Atributo: ".$this->getNomAttr($linea)." > Campo: ".$this->getNomCampo($linea)." > Valor: ".$fila[$this->getNomCampo($linea)]);
							}
							$numLinea++;
						}
					}
				//array_push($listaObj, $objSrc);					
				$listaObj[$numReg]=$objSrc;

			$numReg++;
			}
			//$this->log->escribir("Funcion executeSQL() devuelve una lista de objetos de tipo $cls con ".$numReg." elementos.");
			//var_dump($listaObj);
			return $listaObj;
		}
	}

	function formatear($qry){				
		return trim(str_replace(" where ;","", str_replace("and ;", "", str_replace(", where"," where",str_replace(",)", ")", $qry)))));
	}

	function getValQry($linea){
		return explode(";",$linea)[1];
	}	

	function getNomQry($linea){
		return explode(";",$linea)[0];
	}	

	function getNomCampo($linea){
		return explode(";",$linea)[1];
	}

	function getNomAttr($linea){
		return explode(";",$linea)[0];
	}

	function getTipoBusq($cls, $attr, $pos= 0){
		$nomFic= $cls.".rel";		
		$lectura="";
		$tipo="";
		
		//escribir(">> cls:".$cls);
		//escribir(">> attr:".$attr);

		if(!file_exists($_SERVER['CONTEXT_DOCUMENT_ROOT']."/".$_SERVER['_application_folder']."/models/relations/".$nomFic))
			//$this->log->escribir("Fichero relacional: '".$nomFic."' inexistente") ;
		if(file_exists($_SERVER['CONTEXT_DOCUMENT_ROOT']."/".$_SERVER['_application_folder']."/models/relations/".$nomFic)){
			$lectura= file($_SERVER['CONTEXT_DOCUMENT_ROOT']."/".$_SERVER['_application_folder']."/models/relations/".$cls.".rel") or die("Error leyendo el fichero relacional: ".$cls.".rel");
						
			foreach($lectura as $linea)					
				if(strpos($linea,";")!="" && explode(";",$linea)[$pos]==$attr)
					$tipo=explode(";",$linea)[2];			
		}
		
		return $tipo;
	}

	function getNomCampoBusq($cls, $attr){
		$nomFic= $cls.".rel";		
		$lectura="";
		$nomCampo="";
		
		//escribir("cls:".$cls);
		//escribir("attr:".$attr);

		
		//if(!file_exists($_SERVER['CONTEXT_DOCUMENT_ROOT']."/".$_SERVER['_application_folder']."/models/relations/".$nomFic))
			//$this->log->escribir("Fichero relacional: '".$nomFic."' inexistente");
		if(file_exists($_SERVER['CONTEXT_DOCUMENT_ROOT']."/".$_SERVER['_application_folder']."/models/relations/".$nomFic)){
			$lectura= file($_SERVER['CONTEXT_DOCUMENT_ROOT']."/".$_SERVER['_application_folder']."/models/relations/".$cls.".rel") or die("Error leyendo el fichero relacional: ".$cls.".rel");

			foreach($lectura as $linea)				
				if(explode(";",$linea)[0]==$attr)
					$nomCampo=explode(";",$linea)[1];

		}
		
		return $nomCampo;
	}

	function getAttrVal($linea, $obj){		
		$attrVal=explode(";",$linea)[0];
		$attrTyp=trim(explode(";",$linea)[2]);
		//escribir("attrTyp:'".$attrTyp."'");
		
		switch ("$attrTyp"){
			case "varchar2":
				if($obj->getAttrVal($attrVal)!="")
					$attrVal="'".$obj->getAttrVal($attrVal)."'";
				else
					$attrVal="null";
				break;
			case "date":
				break;
			default:
				if($obj->getAttrVal($attrVal)!="")
					$attrVal=$obj->getAttrVal($attrVal);		
				else
					$attrVal=null;		
				break;
		}
		return $attrVal;
	}

	function getResult(){
		return mysqli_fetch_array($this->result);
	}

	function executeQuery($SQLCommand){
		$this->SQLCommand= $SQLCommand;
		//$this->log->escribir("Ejecutando query.. ".$SQLCommand);
		$this->result= mysqli_query($this->getDBLink(), $SQLCommand);
		$this->NumRowsAffected= mysqli_affected_rows($this->getDBLink());
		//$this->log->escribir($this->NumRowsAffected." filas afectadas");		
		return $this->NumRowsAffected;
	}
	

}

?>