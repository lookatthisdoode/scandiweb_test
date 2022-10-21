<!DOCTYPE html>

<?php
    include_once 'classes/Database.php';
    include_once 'classes/DVD.php';
    include_once 'classes/Furniture.php';
    include_once 'classes/Book.php';
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

        <nav>
            <div class="pagettl"><h1>Product List</h1></div>
            <button id="add" onclick="location.href = 'addproduct.php'">ADD</button>
            <button  onclick="deletethem()">MASS DELETE</button>
        </nav>
        
        <div class="divider"></div>

        <div id="containerProduct">
            <?php
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




                if ($_SERVER['REQUEST_METHOD'] === 'POST') {
                    if (!$database->skuExist($_POST['sku'])) {
                        $map[$_POST['product_type']]($_POST)->toDB();
                    }

                    header( "Location: {$_SERVER['PHP_SELF']}", true, 303);
                }

                $data = $database->getData();

                while ($row = mysqli_fetch_assoc($data)) {
                    $render = $map[$row['product_type']]($row);

                    echo "<div class='mydiv'" . $row['id'] . "'>";
                    echo "<input type='checkbox' id='checkbox" . $row['id'] . "' class='delete-checkbox'>";
                    echo "<div class='deletetext'>Check to delete</div>";

                    $render->toHTML();

                    echo "</div>";
                }
            ?>
        </div>
    </body>
</html>
