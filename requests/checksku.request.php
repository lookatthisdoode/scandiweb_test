<?php

include_once '../classes/database.class.php';


$sku = $_GET['sku'];

$data = new Database;
$isexist = $data->skuExist($sku);

echo $isexist;


//yes thisis a little extra bc my formhandler is on js and i cba to rewrite it:)
