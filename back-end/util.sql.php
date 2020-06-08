<?php

function notBlank($method, $param){
	if($method=="GET"){
		return (isset($_GET[$param]) && !empty($_GET[$param]));
	} else if ($method=="POST"){
		return (isset($_POST[$param]) && !empty($_POST[$param]));
	}
}

?>