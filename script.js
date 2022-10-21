
var invalidChars = [
    "-", "+", "e",
]

document.getElementById('price').addEventListener("keydown", function(e) {
    if (invalidChars.includes(e.key)) {
        e.preventDefault();
    }
})

document.getElementById('price').addEventListener("input", function() {
    this.value = this.value.replace(/[e\+\-]/gi, "");
})


function submitform()
{
    var format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    var sku = document.getElementById('sku')
    var name = document.getElementById('name')
    var price = document.getElementById('price')
    var weight = document.getElementById('weight')
    var dvd = document.getElementById('size')
    var width = document.getElementById('width')
    var length = document.getElementById('length')
    var height = document.getElementById('height')
    var type = document.getElementById('product_type')
    var errorMsg = document.getElementById('error')
    errorMsg.innerHTML = ""

    try {
        if (sku.value == "") throw "SKU field is required";
        if (sku.value.length < 5 ) throw "SKU should be longer than 5 symbols";
        if (sku.value.length > 10) throw "SKU should be shorted than 10 symbols";
        if (format.test(sku.value)) throw "SKU must not contain any special characters";
        if (checkSKU(sku.value) == 1) throw "This SKU is already exist";
        if (name.value == "") throw "Enter name";
        if (name.value.length < 3) throw "Name must be longer that 3 digits";
        if (name.value.length > 15) throw "Name must be shorter that 15 digits";
        if (format.test(name.value)) throw "Name must not contain any special characters";
        if (price.value == "") throw "Enter price";
        if (price.value.length > 10) throw "Price should be shorted than 10 digits";
        if (!type) throw "You must choose the type of product";
        if (dvd) if (dvd.value == "") throw "Size field is required";
        if (weight) if (weight.value == "") throw "Weight field is required";
        if (width) if (width.value == "") throw "Width field is required";
        if (length) if (length.value == "") throw "Length field is required";
        if (height) if (height.value == "") throw "Height field is required";

        document.getElementById("product_form").submit();
    } catch (e) {
        errorMsg.innerHTML = e;
    }
}


function checkSKU(sku)
{
    var checkSKU = new XMLHttpRequest();


    checkSKU.open("GET","requests/checksku.request.php?sku="+sku, false);
    checkSKU.send();

    if (checkSKU.readyState == 4 && checkSKU.status == 200) return checkSKU.response;
}


function deletethem()
{
    let divcount = document.getElementById('containerProduct').children.length;
    let arraywhattodelete =[];
    var requestToDelete = new XMLHttpRequest();

    for (i=1; i<divcount+1; i++){
        if (document.getElementById('checkbox'+i).checked == true) {
            arraywhattodelete.push(i);
        }
    }

    requestToDelete.open("POST","requests/deleteproduct.request.php",false);
    requestToDelete.setRequestHeader( "Content-Type", "application/json" );
    requestToDelete.send(JSON.stringify(arraywhattodelete));

    if (requestToDelete.readyState == 4 && requestToDelete.status == 200) {
        window.location.reload();
    } else {
        console.log("Failed to perform deletion request, status: " + requestToDelete.status);
    }
}


function changeform(value)
{
    var target = document.getElementById('bottomform');

    var hiddentype = Object.assign(document.createElement("input"), {
    name : 'product_type',
    type : 'hidden',
    id : 'product_type'
    })

    if (value == "DVD") {
        target.innerHTML = ""
        var dvdform = Object.assign(document.createElement("input"), {
        name : 'size',
        id : 'size',
        type: 'number',
        placeholder : 'mb'
        })
        target.appendChild(Object.assign(document.createElement("div"), {
        innerHTML : 'Size: ',}))
        target.appendChild(dvdform)
        hiddentype.setAttribute('value', 'DVD')
        target.appendChild(hiddentype)
    } else if (value == "Book") {
        target.innerHTML = ""
        var bookform = Object.assign(document.createElement("input"), {
        name : 'weight',
        id : 'weight',
        type : 'number',
        placeholder : "kg",
        })

        target.appendChild(Object.assign(document.createElement("div"), {
        innerHTML : 'Weight: ',}))
        target.appendChild(bookform)
        hiddentype.setAttribute('value', 'Book')
        target.appendChild(hiddentype)
    } else if (value == "Furniture") {
        target.innerHTML = ""
        var width = Object.assign(document.createElement("input"), {
        name : 'width',
        type : 'number',
        id : 'width',
        placeholder : 'cm'
        })

        var length = Object.assign(document.createElement("input"), {
        name : 'length',
        type : 'number',
        id : 'length',
        placeholder : 'cm'
        })

        var height = Object.assign(document.createElement("input"), {
        name : 'height',
        type : 'number',
        id : 'height',
        placeholder : "cm"
        })

        var furniturepart = Object.assign(document.createElement("div"), {
        id : 'Furniture',
        })

        furniturepart.appendChild(Object.assign(document.createElement("div"), {
        innerHTML : 'Width: ',}))
        furniturepart.appendChild(width)

        furniturepart.appendChild(Object.assign(document.createElement("div"), {
        innerHTML : 'Length: ',}))
        furniturepart.appendChild(length)

        furniturepart.appendChild(Object.assign(document.createElement("div"), {
        innerHTML : 'Height: ',}))
        furniturepart.appendChild(height)
        target.appendChild(furniturepart)
        hiddentype.setAttribute('value', 'Furniture')
        target.appendChild(hiddentype)
    } else {
        target.innerHTML = ""
    }
}
