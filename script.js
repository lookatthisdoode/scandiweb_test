
function submitform() {
  var values = [];
  var format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
//             ^                                        ^
  var sku = document.getElementById('sku');
  var name = document.getElementById('name');
  var price = document.getElementById('price');
  var weight = document.getElementById('weight');
  var dvd = document.getElementById('size');
  var width = document.getElementById('width');
  var length = document.getElementById('length');
  var height = document.getElementById('height');
  var type = document.getElementById('product_type');



  var errorMsg = document.getElementById('error')
  errorMsg.innerHTML = "" //clear


  // sku
  if (sku.value == "") {
    errorMsg.innerHTML += "SKU field is required" + "</br>";
    return;
  }

  if (sku.value.length < 5 ){
    errorMsg.innerHTML += "SKU should be longer than 5 symbols" + "</br>";
    return;
  }

  if (sku.value.length > 10 ){
    errorMsg.innerHTML += "SKU should be shorted than 10 symbols" + "</br>";
    return;
  }

  if (format.test(sku.value)) {
    errorMsg.innerHTML += "SKU must not contain any special characters" + "</br>";
    return;
  }
  if (checkSKU(sku.value) == 1) {
    errorMsg.innerHTML += "This SKU is already exist" + "</br>";
    return;
  }


  //name
  if (name.value == "") {
    errorMsg.innerHTML += "Enter name" + "</br>";
    return;
  }

  if (name.value.length < 3) {
    errorMsg.innerHTML += "Name must be longer that 3 digits" + "</br>";
    return;
  }

  if (name.value.length > 15) {
    errorMsg.innerHTML += "Name must be shorter that 15 digits" + "</br>";
    return;
  }

  if (format.test(name.value)) {
    errorMsg.innerHTML += "Name must not contain any special characters" + "</br>";
    return;
  }


  //price
  if (price.value == "") {
    errorMsg.innerHTML += "Enter price" + "</br>";
    return;
  }

  if (price.value.length > 10 ){
    errorMsg.innerHTML += "Price should be shorted than 10 digits" + "</br>";
    return;
  }

  if (!type){
    errorMsg.innerHTML += "You must choose the type of product" + "</br>";
    return;
  }

  if (weight){
    if (weight.value == "") {
      errorMsg.innerHTML += "Weight field is required" + "</br>";
      return;
    }
  }

  if (dvd){
    if (dvd.value == "") {
      errorMsg.innerHTML += "Size field is required" + "</br>";
      return;
    }
  }

  if (width){
    if (width.value == "") {
      errorMsg.innerHTML += "Width field is required" + "</br>";
      return;
    }
  }

  if (length){
    if (length.value == "") {
      errorMsg.innerHTML += "Length field is required" + "</br>";
      return;
    }
  }

  if (height){
    if (height.value == "") {
      errorMsg.innerHTML += "Height field is required" + "</br>";
      return;
    }
  }



  //console.log("success");
  document.getElementById("product_form").submit();
  return;
}




function checkSKU(sku){
  var checkSKU = new XMLHttpRequest();


  checkSKU.open("GET","requests/checksku.request.php?sku="+sku,false); // бля просто надо было фалс поставить на асинхрон
  checkSKU.send();

  if (checkSKU.readyState == 4 && checkSKU.status == 200) return checkSKU.response;
}


function deletethem(){
    let divcount = document.getElementById('containerProduct').children.length;
    let arraywhattodelete =[];
    var requestToDelete = new XMLHttpRequest();

    for (i=1; i<divcount+1; i++){
        if (document.getElementById('checkbox'+i).checked == true){
        arraywhattodelete.push(i);
        }
    }

    requestToDelete.open("POST","requests/deleteproduct.request.php",false);
    requestToDelete.setRequestHeader( "Content-Type", "application/json" );
    requestToDelete.send(JSON.stringify(arraywhattodelete));

    if (requestToDelete.readyState == 4 && requestToDelete.status == 200) {
      //console.log(requestToDelete.responseText);
      //reloads site after request is done
      window.location.reload();
    }
    else {
      console.log("Failed to perform deletion request, status: " + requestToDelete.status);
    }

}


function changeform(value){
  var target = document.getElementById('bottomform')

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
      hiddentype.setAttribute('value', 'DVD');
      target.appendChild(hiddentype)
  }

  else if (value == "Book") {
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
  }


  else if (value == "Furniture") {
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
  }
  else{
    target.innerHTML = ""
  }

}
