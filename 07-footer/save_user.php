<?php
require_once 'libs/database.php';
$database = new Database();

$email  = $_GET['email'];
$time   = $_GET['time'];

$Items	= $database->saveItem('user',$email,$time);

echo json_encode(array("items" => $Items));
?>