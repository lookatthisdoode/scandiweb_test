
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
      id : 'DVD',
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
        id : 'Book',
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
