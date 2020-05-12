/* Standard food object



*/

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
        document.getElementById("test").innerHTML = this.responseText;
        fillSearchList(JSON.parse(this.responseText));
    }
  }
  xhttp.send(args);

  event.preventDefault();
}

function fillSearchList(json) {
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

    listitem.addEventListener("click", function(temp) {
      return function() { fillSummary(json.foods[temp]) };
    }(i));
  }
}

  function fillSummary(obj) {
    obj = makeFoodObj(obj);
    console.log(obj);
    document.getElementById("test").innerHTML = 
    "Description: " + obj.description + "<br/>" +
    "Brand: " + (obj.brandOwner == undefined ? "" : obj.brandOwner) + "<br/>" +
    "FDC_ID: " + obj.fdcId + "<br/>" + 
    "Ingredients: " + obj.ingredients + "<br/>" +
    "<br/>" +
    "Nutrients (per 100g): <br/>";

    document.getElementById("test").innerHTML += fillId(obj.nutrients);
  }


  function fillId(obj) {
    var txt = "";
    
    for(var x in obj) {
      if(x == "protein" || x == "carbs" || x == "fats" || x == "energy" || x == "vitamins" || x == "minerals")
        txt += "<br/>";
      if(obj[x].unit != undefined && obj[x].value != undefined) {
        txt += x + ": " + obj[x].value + obj[x].unit + "<br/>";
      }
      if(typeof obj[x] == "object" && obj[x] !== null) {
        txt += fillId(obj[x]);
      }
    }
    return txt;
  }

  function makeFoodObj(obj) {
    var foodObj;
    if(obj.fdcId != undefined) {
    foodObj = 
      { 
        fdcId: obj.fdcId,
        description: obj.description,
        brand: obj.brandOwner,
        ingredients: obj.ingredients,
        nutrients: {
          energy: {},
          protein: { aa: {} },
          carbs: { 
            fiber: {}, 
            sugar: {} 
          },
          fats: { 
            saturated: {}, 
            trans: {}, 
            cholesterol: {}, 
            omega3: { 
              dha: {}, 
              epa: {}, 
              ala: {} 
            }, 
            omega6: {} 
          },
          vitamins: {
            vitamin_b1: {},
            vitamin_b2: {},
            vitamin_b3: {},
            vitamin_b5: {},
            vitamin_b6: {},
            vitamin_b7: {},
            vitamin_b9: {},
            vitamin_b12: {},
            vitamin_a: {},
            vitamin_c: {},
            vitamin_d: {},
            vitamin_e: {},
            vitamin_k: { value: 0 } 
          },
          minerals: {
            calcium: {},
            copper: {},
            iron: {},
            magnesium: {},
            manganese: {},
            phosphorus: {},
            potassium: {},
            selenium: {},
            sodium: {},
            zinc: {}
          }
        }
      };

      var l = obj.foodNutrients.length;
      for(var i = 0; i < l; i++) {
        var nutrient = obj.foodNutrients[i];
        var nutrientObj = {value: nutrient.value, unit: nutrient.unitName.toLowerCase()};
        
        switch(nutrient.nutrientId) {
          case 1008: foodObj.nutrients.energy = nutrientObj; break;
          case 1003: Object.assign(foodObj.nutrients.protein, nutrientObj); break;
          case 1005: Object.assign(foodObj.nutrients.carbs, nutrientObj); break;
          case 1004: Object.assign(foodObj.nutrients.fats, nutrientObj); break;

          case 1221: foodObj.nutrients.protein.aa.histidine = nutrientObj; break;
          case 1212: foodObj.nutrients.protein.aa.isoleucine = nutrientObj; break;
          case 1213: foodObj.nutrients.protein.aa.leucine = nutrientObj; break;
          case 1214: foodObj.nutrients.protein.aa.lysine = nutrientObj; break;
          case 1215: foodObj.nutrients.protein.aa.methionine = nutrientObj; break;
          case 1217: foodObj.nutrients.protein.aa.phenylalanine = nutrientObj; break;
          case 1211: foodObj.nutrients.protein.aa.threonine = nutrientObj; break;
          case 1210: foodObj.nutrients.protein.aa.tryptophan = nutrientObj; break;
          case 1219: foodObj.nutrients.protein.aa.valine = nutrientObj; break;

          case 1079: Object.assign(foodObj.nutrients.carbs.fiber, nutrientObj); break;
          case 1082: foodObj.nutrients.carbs.fiber.sol = nutrientObj; break;
          case 1084: foodObj.nutrients.carbs.fiber.insol = nutrientObj; break;
          case 2000: Object.assign(foodObj.nutrients.carbs.sugar, nutrientObj); break;
          case 1235: foodObj.nutrients.carbs.sugar.added = nutrientObj; break;

          case 1404: foodObj.nutrients.fats.omega3.ala = nutrientObj; break;
          case 1278: foodObj.nutrients.fats.omega3.epa = nutrientObj; break;
          case 1272: foodObj.nutrients.fats.omega3.dha = nutrientObj; break;
          case 1280: foodObj.nutrients.fats.omega3.dpa = nutrientObj; break;
          case 1405: foodObj.nutrients.fats.omega3._20to3 = nutrientObj; break;
          case 1257: foodObj.nutrients.fats.trans = nutrientObj; break;
          case 1258: foodObj.nutrients.fats.saturated = nutrientObj; break;
          case 1253: foodObj.nutrients.fats.cholesterol = nutrientObj; break;
          case 1313: foodObj.nutrients.fats.omega6._20to2 = nutrientObj; break;
          case 1316: foodObj.nutrients.fats.omega6._18to2 = nutrientObj; break;
          case 1321: foodObj.nutrients.fats.omega6._18to3 = nutrientObj; break;
          case 1406: foodObj.nutrients.fats.omega6._20to3 = nutrientObj; break;
          case 1408: foodObj.nutrients.fats.omega6._20to4 = nutrientObj; break;
          
          case 1165: foodObj.nutrients.vitamins.vitamin_b1 = nutrientObj; break;
          case 1166: foodObj.nutrients.vitamins.vitamin_b2 = nutrientObj; break;
          case 1167: foodObj.nutrients.vitamins.vitamin_b3 = nutrientObj; break;
          case 1170: foodObj.nutrients.vitamins.vitamin_b5 = nutrientObj; break;
          case 1175: foodObj.nutrients.vitamins.vitamin_b6 = nutrientObj; break;
          case 1176: foodObj.nutrients.vitamins.vitamin_b7 = nutrientObj; break;
          case 1177: foodObj.nutrients.vitamins.vitamin_b9 = nutrientObj; break;
          case 1178: foodObj.nutrients.vitamins.vitamin_b12 = nutrientObj; break;
          case 1104: foodObj.nutrients.vitamins.vitamin_a = nutrientObj; break;
          case 1162: foodObj.nutrients.vitamins.vitamin_c = nutrientObj; break;
          case 1110: foodObj.nutrients.vitamins.vitamin_d = nutrientObj; break;
          case 1124: foodObj.nutrients.vitamins.vitamin_e = nutrientObj; break;
          case 1183:
          case 1184:
          case 1185:
                     foodObj.nutrients.vitamins.vitamin_k.value += nutrientObj.value;
                     foodObj.nutrients.vitamins.vitamin_k.unit = nutrientObj.unit;
                     
                     break;

          case 1087: foodObj.nutrients.minerals.calcium = nutrientObj; break;
          case 1098: foodObj.nutrients.minerals.copper = nutrientObj; break;
          case 1089: foodObj.nutrients.minerals.iron = nutrientObj; break;
          case 1090: foodObj.nutrients.minerals.magnesium = nutrientObj; break;
          case 1101: foodObj.nutrients.minerals.manganese = nutrientObj; break;
          case 1091: foodObj.nutrients.minerals.phosphorus = nutrientObj; break;
          case 1092: foodObj.nutrients.minerals.potassium = nutrientObj; break;
          case 1103: foodObj.nutrients.minerals.selenium = nutrientObj; break;
          case 1093: foodObj.nutrients.minerals.sodium = nutrientObj; break;
          case 1095: foodObj.nutrients.minerals.zinc = nutrientObj; break;
        }
      }
    }
    return foodObj;
  }



  // txt += "Energy: " + obj.energy.value + obj.energy.unit + "<br/> <br/>";

  // txt += "Protein: " + obj.protein.value + obj.protein.unit + "<br/>";
  // for(var x in obj.protein.aa) {
  //   txt += "" + x + ": " + obj.protein.aa[x].value + obj.protein.aa[x].unit + "<br/>";
  // }
  
  //   txt += "<br/>" +
  //   "Carbohydrates: " + obj.carbs.value + obj.carbs.unit + "<br/>";
  //   if(obj.carbs.fiber.value != undefined) {
  //     txt += "Fiber: " + obj.carbs.fiber.value + obj.carbs.fiber.unit + "<br/>";
  //     if(obj.carbs.fiber.sol != undefined)
  //       txt += "Soluable: " + obj.carbs.fiber.sol.value + obj.carbs.fiber.sol.unit + "<br/>";
  //     if(obj.carbs.fiber.insol != undefined)
  //       txt += "Insoluable: " + obj.carbs.fiber.insol.value + obj.carbs.fiber.insol.unit + "<br/>";
  //   }
  //   if(obj.carbs.sugar.value != undefined) {
  //     txt += "Sugar: " + obj.carbs.sugar.value + obj.carbs.sugar.unit + "<br/>";
  //     if(obj.carbs.sugar.added != undefined) {
  //       txt += "Added: " + obj.carbs.sugar.added.value + obj.carbs.sugar.added.unit + "<br/>";
  //     }
  //   }

  //   txt += "<br/>" +
  //   "Fat: " + obj.fats.value + obj.fats.unit + "<br/>";