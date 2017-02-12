function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
}

var wall = document.getElementById("wall");

// Add event listener to wall object
wall.addEventListener("drop", drop() );
wall.addEventListener("dragover", allowDrop() );

// Add event listener to each frame
var frames = document.getElementsByClassName('product');
frames.addEventListener("dragstart", drag());