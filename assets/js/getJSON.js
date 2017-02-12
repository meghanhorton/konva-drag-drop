// INITIALIZE KONVA

var stage = new Konva.Stage({
  container: 'wall',
  width: document.getElementById('wall').offsetWidth,
  height: document.getElementById('wall').offsetHeight
});

var layer = new Konva.Layer();
stage.add(layer);

// READ JSON
var scale = 15,
    spacing = 1 * scale, // 1 inch
    addImages = [],
    x = 0,
    y = 0;

loadJSON("frames.json",function(response) {
  // Parse JSON string into object
    var obj = JSON.parse(response);
    for (var id in obj.frames) {
        var product = obj.frames[id];

        for (var itemID in product.options ){
            var imgObj = new Image();
            var img = new Konva.Image({
                x: x,
                y: y,
                image: imgObj,
                width: product.dimensions.frame.width * scale,
                height: product.dimensions.frame.height * scale,
                draggable: true
            });

            layer.add(img);
            
            imgObj.onload = function() {
                img.image(imgObj);
                layer.draw();
            };
            imgObj.src = "assets/img/frames/"+ product.options[itemID].item_id +".png";

            // Adds spacing
            x = x + (product.dimensions.frame.width * scale) + spacing;
        }
    }
 });

// FUNCTIONS
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

// ADD IMAGE
function addImage(){

}