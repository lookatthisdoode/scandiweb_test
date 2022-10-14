<?php

class DbConn {
  private $host = 'localhost';
  private $user = 'id19573064_scandiweb';
  private $pwd = '\MGHcOh0NSUL)#|(';
  private $dbase = 'id19573064_test_database';

  public function connect(){
    $conn = mysqli_connect($this->host , $this->user , $this->pwd , $this->dbase);
    if ($this->conn->connect_error){
      echo('Connection failed: ' . $conn->connect_error);
    }else {
      //echo "connected succesfully";
    };
    return $conn;
  }
}

?>
