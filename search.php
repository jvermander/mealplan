<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

  $SRV = "https://api.nal.usda.gov/fdc";
  $OP = "/v1/foods/search?";
  $APIKEY = "api_key=Zx0OTBuWcRPTqgN4TRPEQcM15reEkPLJiD4ot8Zz";
  $url = $SRV . $OP . $APIKEY;
  $post = file_get_contents("php://input");

  $options = array(
    'http' => array(
      'method' => 'POST',
      'content' => $post,
      'header' => "Content-type: application/json\r\n" .
                  "Accept: application/json\r\n"
    )
  );

  $context = stream_context_create($options);
  $result = file_get_contents($url, false, $context);
  echo $result;


  // function display_product($obj) {
  //   echo "Description: " . $obj->description . "<br/>";
  //   echo "Category: " . $obj->brandedFoodCategory . "<br/>";
  //   echo "FDC_ID: " . $obj->fdcId . "<br/>";
  //   echo "Ingredients: " . $obj->ingredients . "<br/>";

  //   echo "<br/>";

  //   echo "Nutrients (per 100g): <br/>";
  //   foreach($obj->foodNutrients as $nutrient) {
  //     echo sprintf("%s: %s%s <br/>",
  //       $nutrient->nutrient->name, $nutrient->amount, $nutrient->nutrient->unitName);
  //   }
  // }
?>