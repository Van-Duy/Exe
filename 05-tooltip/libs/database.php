<?php
class Database {
    private $host = 'localhost';
    private $username = 'root';
    private $password = '';
    private $databaseName = 'movies';
    private $charset = 'utf8';
    private $conn;

    public function __construct()
    {
        $this->connect();
    }

    public function connect()
    {
        if(!$this->conn){
            $this->conn = mysqli_connect($this->host,$this->username,$this->password,$this->databaseName);
            if (mysqli_connect_errno()) {
                echo 'Failed: '. mysqli_connect_error();
                die();
            }
            mysqli_set_charset($this->conn,$this->charset);
        }
    }

    public function disConnect()
    {
        if($this->conn)
            mysqli_close($this->conn);
    }

    public function error()
    {
        if($this->conn)
            return mysqli_error($this->conn);
        else
            return false;
    }

    public function getArray($table = '')
    {
        $sql = 'SELECT * FROM '. $table;
        $data = null;
        if($result = mysqli_query($this->conn,$sql)){
            while($row = mysqli_fetch_array($result)){
                $data[] = $row;
            }
            mysqli_free_result($result);
            return $data;
        }
        else
            return false;
    }

    public function getArrayByLoadMore($table = '', $position)
    {
        $sql = 'SELECT * FROM '. $table . ' LIMIT '. $position . ', 4';
        $data = null;
        if($result = mysqli_query($this->conn,$sql)){
            while($row = mysqli_fetch_array($result)){
                $data[] = $row;
            }
            mysqli_free_result($result);
            return $data;
        }
        else
            return false;
    }

    public function getArrayData($table = '', $position, $items)
    {
        $sql = 'SELECT * FROM '. $table . ' LIMIT '. $position . ', ' . $items;
        $data = null;
        if($result = mysqli_query($this->conn,$sql)){
            while($row = mysqli_fetch_array($result)){
                $data[] = $row;
            }
            mysqli_free_result($result);
            return $data;
        }
        else
            return false;
    }

    public function getArrayDataByCategoryId($categoryID) {
        $sql = 'SELECT * FROM item WHERE category_id = ' . $categoryID;
        $data = null;
        if($result = mysqli_query($this->conn,$sql)){
            while($row = mysqli_fetch_array($result)){
                $data[] = $row;
            }
            mysqli_free_result($result);
            return $data;
        }
        else
            return false;
    }

    public function getArrayDataToolTip($id) {
        $sql = 'SELECT item.*, category.name as category_name, category.description as category_description, actor.name as actor_name FROM item, category, actor WHERE item.id = ' . $id . ' and category.id = item.category_id and actor.id = item.actor_id';
        $data = null;
        if($result = mysqli_query($this->conn,$sql)){
            while($row = mysqli_fetch_array($result)){
                $data[] = $row;
            }
            mysqli_free_result($result);
            return $data;
        }
        else
            return false;
    }

    public function removeXss($string) {
        $string = preg_replace('#&(?!\#[0-9]+;)#si', '&amp;', $string);
        $string = str_replace("<", "&lt;", $string);
        $string = str_replace(">", "&gt;", $string);
        $string = str_replace("\"", "&quot;", $string);
        $string = str_replace("\'", "&quot;", $string);

        static $preg_find = array(
            '#javascript#i',
            '#vbscript#i'
        );

        static $preg_replace = array(
            'java script',
            'vb script'
        );

        return preg_replace($preg_find, $preg_replace, $string);
    }
}