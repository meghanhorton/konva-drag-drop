// INITIALIZE KONVA
var containerWidth = document.getElementById('wall').offsetWidth;
var containerHeight = document.getElementById('wall').offsetHeight;

var stage = new Konva.Stage({
  container: 'wall',
  width: containerWidth,
  height: containerHeight
});


// LOAD JSON
loadJSON("frames.json",function(response) {
    // Parse JSON string into object
    var obj = JSON.parse(response);
    for (var id in obj.frames) {
        var product = obj.frames[id];

        for (var itemID in product.options ){
            addToList( "options", product.options[itemID].item_id, product.dimensions.frame.height * scale, product.dimensions.frame.width * scale, product.name );
        }
    }

    // Add event listeners to products
    var frames = document.getElementsByClassName('product');
    for(var i=0; i<frames.length; i++){
        frames[i].addEventListener('click',function(e){
            var width = e.target.getAttribute('width'),
                height = e.target.getAttribute('height'),
                src = e.target.getAttribute('src'),
                id = e.target.getAttribute('data-target');
            addToCanvas(width,height,src,id);
        });
    }
});