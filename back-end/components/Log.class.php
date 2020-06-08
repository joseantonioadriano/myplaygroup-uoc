<?php

class Log {

	//private $archivo= "";
	private $repert= "";
	private $logFiles= "";
	private $numLogFiles= 0;

	function __construct($logFiles= "test"){
		$this->numLogFiles= 0;
		//$this->setRepert($_SERVER['CONTEXT_DOCUMENT_ROOT']."/".$_SERVER['_application_folder']."/logs/");				
		$this->creaLog($logFiles);
	}

	function creaLog($logFiles){
		$i= 0;
		while(array_key_exists($i, explode(";",$logFiles)) && (explode(";",$logFiles)[$i])){
			$this->setArchivo(trim(explode(";",$logFiles)[$i])."-".date("dmy").".log");
			$this->numLogFiles++;
			$i++;
		}
	}

	function setArchivo($logFile){
		$this->logFiles[$this->numLogFiles]=$logFile;
	}

	function setRepert($rep){
		$this->repert= $rep;	
	}

	function getArchivo($i){
		return $this->logFiles[$i];
	}

	function getRepert(){
		return $this->repert;
	}

	function escribir($msg){
		$i= 0;
		while($i<$this->numLogFiles){
			file_put_contents($this->getRepert().$this->getArchivo($i), date("Y-m-d H:i:s")." - ".$msg."\r\n", FILE_APPEND) or die("Error: No se puede abrir el archivo de log.");
			$i++;
		}
	}

}

?>