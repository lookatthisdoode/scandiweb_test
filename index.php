<!DOCTYPE html>

<?php
    include_once 'classes/database.class.php';
    include_once 'classes/dvd.class.php';
    include_once 'classes/furniture.class.php';
    include_once 'classes/book.class.php';
    header('Content-type: text/html; charset=utf-8');
?>

<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <link rel="stylesheet" type="text/css" href="style.css">
        <link rel="icon" href="icon.png">
        <script type="text/javascript" src="script.js"></script>

        <title>test_scandiweb</title>
    </head>

    <body>
        <span id="title"><h1>Product List</h1></span>

        <nav>
            <button id="add"><a href="addproduct.php">ADD</a></button>
            <button  onclick="deletethem()">MASS DELETE</button>
            <div class="divider"></div>
        </nav>

        <div id="containerProduct">
            <?php
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




                if ($_POST) {
                    if (!$database->skuExist($_POST['sku'])) {
                        $map[$_POST['product_type']]($_POST)->toDB();
                    }
                }

                $data = $database->getData();

                while ($row = mysqli_fetch_assoc($data)) {
                    $render = $map[$row['product_type']]($row);

                    echo "<div class='mydiv'" . $row['id'] . "'>";
                    echo "<input type='checkbox' id='checkbox" . $row['id'] . "' class='delete-checkbox'>";
                    echo "<div class='deletetext'>Check to delete</div><br>";

                    $render->toHTML();

                    echo "</div>";
                }
            ?>
        </div>
    </body>
</html>
