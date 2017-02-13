var img = [],
    scale = 5,
    canvasScale = 15,
    spacing = 1 * scale;

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
function addToCanvas(width,height,src,id){
    var layer = new Konva.Layer();
    stage.add(layer);

    var width = width * (canvasScale/scale),
        height = height * (canvasScale/scale),
        posX = (containerWidth - width)/2,
        posY = (containerHeight - height)/2;

    // Creates new Konva Image
    var imgObj = new Image();
    img[id] = new Konva.Image({
        id: id,
        x: posX,
        y: posY,
        image: imgObj,
        width: width,
        height: height,
        draggable: true,
    });

    // Adds to canvas
    layer.add(img[id]);
    
    imgObj.onload = function() {
        img[id].image(imgObj);
        layer.draw();
    };

    imgObj.src = src;



    layer.find('#'+id)[0].addEventListener("dblclick",function(){
        layer.destroy();
    })
}

// IMAGE MENU
// function showImageMenu(id){
//     var obj = stage.find('#'+id)[0];

//     obj.addEventListener("mouseenter",function(){
//         obj.
//         console.log('mouse entered!', obj);
//     });

//     obj.addEventListener("mouseleave",function(){
//         console.log('mouse left!', obj);
//     });

//     obj.addEventListener("dblclick",function(){
//     })
// }