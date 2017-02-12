// INITIALIZE KONVA

var containerWidth = document.getElementById('wall').offsetWidth;
var containerHeight = document.getElementById('wall').offsetHeight;

var stage = new Konva.Stage({
  container: 'wall',
  width: containerWidth,
  height: containerHeight
});

var layer = new Konva.Layer();
stage.add(layer);

// READ JSON
var scale = 15,
    canvasScale = 15,
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
            addToList( "options", product.options[itemID].item_id, product.dimensions.frame.height * scale, product.dimensions.frame.width * scale, product.name );
        }
    }

    // 
    var frames = document.getElementsByClassName('product');
    for(var i=0; i<frames.length; i++){
        frames[i].addEventListener('click',function(e){
            var width = e.target.getAttribute('width'),
                height = e.target.getAttribute('height'),
                src = e.target.getAttribute('src');
            addToCanvas(layer,width,height,src);
        });
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

// ADD TO OPTIONS
function addToList(target,id,height,width,alt){
    var elem = document.createElement("img");
    elem.setAttribute("src", "assets/img/frames/"+ id +".png");
    elem.setAttribute("height", height);
    elem.setAttribute("width", width );
    elem.setAttribute("alt", alt );
    elem.setAttribute("class", "product");
    elem.setAttribute("data-target", id );
    elem.setAttribute("draggable", true);
    
    document.getElementById(target).appendChild(elem);
}

// ADD TO CANVAS
function addToCanvas(target,width,height,src){
    var width = width * (canvasScale/scale),
        height = height * (canvasScale/scale),
        posX = (containerWidth - width)/2,
        posY = (containerHeight - height)/2;

    var imgObj = new Image();
    var img = new Konva.Image({
        x: posX,
        y: posY,
        image: imgObj,
        width: width,
        height: height,
        draggable: true
    });

    target.add(img);
    
    imgObj.onload = function() {
        img.image(imgObj);
        target.draw();
    };
    imgObj.src = src;

    // Adds spacing
    // x = x + (product.dimensions.frame.width * scale) + spacing;
}