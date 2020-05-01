const SEARCH_PAGE_SIZE = 50;
var timeStamp = 0;

window.onload = function() {
  document.getElementById("search").addEventListener("submit", search);
}

function search() {
  var eventTime = event.timeStamp;
  var xhttp = new XMLHttpRequest();
  var url = "/search.php";
  xhttp.open("POST", url, true);
  xhttp.setRequestHeader('Content-type', 'application/json');
  var args = 
    '{ "query" : "' + this.elements["query"].value + '"' + ', ' +
    '  "brandOwner" : "' + this.elements["brand"].value + '"' + ', ' +
    '  "requireAllWords" : true' +
    '}';
  
  xhttp.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200 && eventTime > timeStamp) {
        timeStamp = eventTime;
        fillSearchList(this.responseText);
    }
  }
  xhttp.send(args);

  event.preventDefault();
}

function fillSearchList(json) {
  document.getElementById("test").innerHTML = json;

  json = JSON.parse(json);

  // document.getElementById("pagenum").innerHTML = "Page: " + json.currentPage;

  var list = document.getElementById("searchlist");
  list.innerHTML = '';
  for(var i = 0; i < json.foods.length; i++) {
    var listitem = document.createElement("li");
    var text = "";
    if(json.foods[i].brandOwner != undefined)
      text += json.foods[i].brandOwner + " ";
    text += json.foods[i].description;
    
    listitem.appendChild(document.createTextNode(text));
    list.appendChild(listitem);
  }

}