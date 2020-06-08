<?php

class Cx {

	private $hostname = "";
	private $usuario = "";
	private $password = "";
	private $database = "";


	function __construct($hostname = "", $usuario = "", $password = "", $database = ""){
		$this->hostname= $hostname;
		$this->usuario= $usuario;
		$this->password= $password;
		$this->database= $database;
	}

	function getServidor(){
		return $this->hostname;
	}

	function getUsuario(){
		return $this->usuario;
	}

	function getPassword(){
		return $this->password;
	}

	function getDatabase(){
		return $this->database;
	}


}

?>