<?php
require_once 'libs/database.php';
$database = new Database();

$arrayItems	= $database->getArray('user');

echo json_encode(array("items" => $arrayItems));
?>