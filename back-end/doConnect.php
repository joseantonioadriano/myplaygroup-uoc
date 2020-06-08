<?php

if ($_SERVER['HTTP_HOST']=="localhost") {
    $cx= new Cx("localhost", "root", "crnagora", "myplaygroup-db");
} else {
    $cx= new Cx("rdbms.strato.de", "U2748791", "Nidhalito2017", "DB2748791");
}

?>