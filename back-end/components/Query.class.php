<?php

class Query {

    private $type;
    private $params;
    private $table;
    private $SQLCommand;
    private $result;
    private $numRowsAffected;
    private $newId;
    private $searchMode;
    private $relation= false;
    private $manualMode= false;
    private $order = "";

    function __construct(){}

    function getType(){
        return $this->type;
    }

    function setOrder($order) {
        $this->order= $order;
    }

    function getOrder(){
        return $this->order;
    }

    function setType($type){
        $this->type= $type;
    }

    function getParams(){
        return $this->params;
    }

    function setParams($params){
        $this->params= $params;
    }

    function getTable(){
        return $this->table;
    }

    function setRelation($relation){
        $this->relation= $relation;
    }

    function getRelation(){
        return $this->relation;
    }

    function setTable($table){
        $this->table= $table;
    }

    function setSQL($SQLCommand){
        $this->SQLCommand= $SQLCommand;
        $this->manualMode= true;
    }

    function createSQLCommand(){
        $this->SQLCommand = $this->initQueryFromTable($this->type, $this->table, $this->addParams($this->params));
        $this->SQLCommand.= $this->createQueryFromParams($this->type, $this->addParams($this->params));        
        if($this->getSearchMode() === true){
            $this->SQLCommand.= " order by id desc";
        } else if ($this->getOrder() != "") {
             $this->SQLCommand.= " order by ".$this->getOrder()." asc";
        }
        $this->getType() === 'update' ? $this->SQLCommand.= " where id = ".$_GET['id'] : null;        
        $this->setSearchMode(false);
    }

    function setResult($result){
        $this->result= $result;
    }
    
    function execute(){
        !$this->manualMode ? $this->createSQLCommand() : null;
        //echo $this->SQLCommand."<br/>";
        $this->result= mysqli_query($_SESSION['dbm']->getDBLink(), $this->getSQLCommand()) OR die(mysqli_error($_SESSION['dbm']->getDBLink()));          
        $this->numRowsAffected= mysqli_affected_rows($_SESSION['dbm']->getDBLink());
        ($this->getType() === 'insert' && $this->numRowsAffected > 0 && !$this->getRelation()) ? $this->searchNewId() : null;
    }

    function getNumRowsAffected(){
        return $this->numRowsAffected;
    }

    function getResult(){
        return $this->result;
    }

    function getSQLCommand(){
        return $this->SQLCommand;
    }

    function setSearchMode($searchMode){
        $this->searchMode= $searchMode;
    }

    function getSearchMode(){
        return $this->searchMode;
    }

    function searchNewId(){
        if(strtoupper($this->type)=='INSERT')        
        {
            $this->setParams($this->getParams());
            $this->setType('select');
            $this->setTable($this->getTable());
            $this->setSearchMode(true);
            $this->execute();
            $this->setNewId(mysqli_fetch_array($this->getResult())['id']);            
        } else {
            $this->setNewId(-1);
        }
    }    

    function setNewId($newId){
        $this->newId= $newId;
    }

    function getNewId(){
        return $this->newId;
    }

    function getStrSQLCommand($type, $str){        
        switch($type){
            case "select":
                return (" and ".$str."='".$_GET[$str]."'");
                break;
            case "insert":
                return ("'".$_GET[$str]."'");
                break;
            case "delete":
                return ("'".$_GET[$str]."'");
                break;
            case "update":
                return ($str."='".$_GET[$str]."'");
                break;
            default: 
                return "";
                break;
            }
    }
    
    function createQueryFromParams($type, $listParams){	
        $SQLCommand= "";
        $i= 0;	
        switch($type){
            case "select":
                while ($i < count($listParams)){
                    //(notBlank('GET', $listParams[$i])) ? $SQLCommand.= $this->getStrSQLCommand($type, $listParams[$i]) : null;				                    
                    if (notBlank('GET', $listParams[$i])) {					
                        $SQLCommand.= $this->getStrSQLCommand($type, $listParams[$i]);						
                    }
                    $i+= 1;
                }
            break;
            case "insert":
                $SQLCommand.= " (";
                while ($i < count($listParams)){
                    if (notBlank('GET', $listParams[$i])) {					
                        $SQLCommand.= $this->getStrSQLCommand($type, $listParams[$i]);						
                        ($i < count($listParams)-1) ? 
                            $SQLCommand.= ", " : null; 					
                    }
                    $i+= 1;
                }			
                $SQLCommand.= " ) ";			
            break;
            case "delete":
                while ($i < count($listParams)){
                    (notBlank('GET', $listParams[$i])) ? $SQLCommand.= $listParams[$i]. "=". $this->getStrSQLCommand($type, $listParams[$i]) : null;	
                    $i+= 1;
                }
            break;
            case "update":
                while ($i < count($listParams)){
                    if (notBlank('GET', $listParams[$i])) {					
                        $SQLCommand.= $this->getStrSQLCommand($type, $listParams[$i]);						
                        ($i < count($listParams)-1) ? 
                            $SQLCommand.= ", " : null; 					
                    }
                    $i+= 1;
                }			
            break;
            default: 
                break;
        }		
        return $SQLCommand;
    }
    function addParams($paramNames){
        $listParams= array();
        $i= 0;
        $params= explode(',',$paramNames);        
        while($i<= substr_count($paramNames,',',0)){
            array_push($listParams, $params[$i]);
            $i+= 1;
        }    
        return $listParams;
    }
    function getStrListParams($listParams){
        $i= 0;	
        $str= "";
        while ($i < count($listParams)){
            $str.= $listParams[$i];						
            ($i < count($listParams)-1) ? $str.= (", ") : null;
            $i+= 1;
        }		
        return $str;
    }
    function initQueryFromTable($type, $table, $listParams){
        switch($type){
            case "select":
                return ("select * from $table where 1=1 ");
                break;
            case "insert":
                return ("insert into $table (".$this->getStrListParams($listParams).") values ");
                break;
            case "delete":
                return ("delete from $table where ");
                break;
            case "update":
                return ("update $table set ");
                break;
            default: 
                return "";
                break;
        }    
    }

}

?>