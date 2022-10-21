<?php

include_once 'Product.php';
include_once 'Database.php';


class DVD extends Product
{
    public $sku;
    public $name;
    public $price;
    public $size;
    public $type = "DVD";

    public function __construct(string $a, string $b,string $c, string $d)
    {
        $this->sku = $a;
        $this->name = $b;
        $this->price = $c;
        $this->size = $d;
    }

    public function toHTML()
    {
        echo "SKU: " . mb_strtoupper($this->sku) . "<br>";
        echo "Type: DVD<br>";
        echo "Name: " . $this->name . " <br>";
        echo "Price: " . $this->price . " $<br>";
        echo "Size: " . $this->size . " Mb<br>";
    }

    public function toDB()
    {
        $dbconn = new Database;
        $presql = "'$this->sku', '$this->name', '$this->price', '$this->size', '$this->type'";
        $sql = "insert into scandiweb_products (sku, name, price, size, product_type) values (" . $presql . ")";

        mysqli_query($dbconn->connect(), $sql);

        $dbconn->arrangeId();
    }
}
