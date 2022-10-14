<?php


class Database {

  private $host = 'localhost';
  private $user = 'root';
  private $pwd = 'root';
  private $dbase = 'scandiweb_test';
  private $table = 'scandiweb_products';



  public function connect(){
    $conn = mysqli_connect($this->host , $this->user , $this->pwd , $this->dbase);
    if ($this->conn->connect_error){
      echo('Connection failed: ' . $conn->connect_error);
    }else {
      //echo "connected succesfully";
    };
    return $conn;
  }


  public function getData(){
    $result = mysqli_query($this->connect(), "select * from scandiweb_products");
    return $result;
  }



  public function arrangeId(){
    $counter = 1;
    $data = $this->getData(); //get all data just to get qty
    while ($row = mysqli_fetch_row($data)) {
      mysqli_query($this->connect(), "UPDATE scandiweb_products SET id = $counter WHERE id=$row[0]");
      $counter ++;
    }
  }




  public function deleteThem (array $ids){
    $idstodelete = "";

    // formats array into sql string
    foreach ($ids as $key => $value) {
      if($key == count($ids)-1){
        $idstodelete .= intval($value);
      }
      else {
        $idstodelete .= $value . ", ";
      }
    }

    $sql = "DELETE FROM scandiweb_products WHERE id IN ( $idstodelete )";
    mysqli_query($this->connect(), $sql);
    $this->arrangeId();
    $this->connect()->close();
  }



  public function skuExist($sku) {
    $data = $this->getData();
    $isexist = 0;
    while ($row = mysqli_fetch_row($data)) {
      if (strtolower($row [1]) === strtolower($sku)){
        $isexist = 1;
      }
    }
    return $isexist;  //defo returns true/false
  }



}
