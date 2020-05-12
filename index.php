<!doctype html>
<html>

<head>
  <title> Vegan Cronometer </title>
  <script> // todo construct RDA at server; </script>
  <script src="search.js"></script>

</head>

<body>
  
  <form id="search" method="POST">
    <input type="text" name="brand" placeholder="Brand"/>
    <input type="text" name="query" placeholder="Foods"/ value="Beef, cured, pastrami">
    <input type="submit" value="Search"></input>
  </form>

  <div id="pagenum"></div>
  <ul id="searchlist">
  </ul>
  
  <table id="summary">
  </table>

  <div id="test"></div>
</body>

</html>
