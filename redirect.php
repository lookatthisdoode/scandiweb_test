<?php
include_once 'classes/Database.php';
include_once 'classes/DVD.php';
include_once 'classes/Furniture.php';
include_once 'classes/Book.php';

session_start();

function makeDVD(array $x)
{
    $newprod = new DVD($x['sku'], $x['name'], $x['price'], $x['size']);
    return $newprod;
}

function makeBook(array $x)
{
    $newprod = new Book($x['sku'], $x['name'], $x['price'], $x['weight']);
    return $newprod;
}

function makeFurniture(array $x)
{
    $newprod = new Furniture($x['sku'], $x['name'], $x['price'], $x['width'], $x['length'], $x['height']);
    return $newprod;
}

$database = new Database;
$map = ["DVD" => 'makeDVD', "Book" => 'makeBOOK', "Furniture" => 'makeFurniture'];


$map[$_POST['product_type']]($_POST)->toDB();

echo "<script> location.href='index.php'; </script>";
exit();
