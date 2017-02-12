function loadJSON(url, callback) {   
    var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
    xobj.open('GET', url, true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
          }
    };
    xobj.send(null);  
}

var scale = 15;

loadJSON("frames.json",function(response) {
  // Parse JSON string into object
    var obj = JSON.parse(response);
    for (var id in obj.frames) {
        var product = obj.frames[id];

        for (var itemID in product.options ){
            // HORIZONTAL
            var elem = document.createElement("img");
            elem.setAttribute("src", "assets/img/frames/"+ product.options[itemID].item_id +".png");
            elem.setAttribute("height", product.dimensions.frame.height * scale );
            elem.setAttribute("width", product.dimensions.frame.width * scale );
            elem.setAttribute("alt", product.name );
            elem.setAttribute("class", "product");
            elem.setAttribute("id", product.options[itemID].item_id );
            elem.setAttribute("draggable", true);
            
            document.getElementById("options").appendChild(elem);

            // VERTICAL
            var elem = document.createElement("img");
            elem.setAttribute("src", "assets/img/frames/"+ product.options[itemID].item_id +".png");
            elem.setAttribute("height", product.dimensions.frame.width * scale );
            elem.setAttribute("width", product.dimensions.frame.height * scale );
            elem.setAttribute("alt", product.name );
            elem.setAttribute("class", "product");
            elem.setAttribute("id", product.options[itemID].item_id );
            elem.setAttribute("draggable", true);
            
            document.getElementById("options").appendChild(elem);
        }
    }
 });