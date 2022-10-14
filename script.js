
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
