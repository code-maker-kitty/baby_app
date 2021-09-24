song = "";
status = "";
objects = [];
function preload(){
song= loadSound("milkman_karlson.mp3");
}
function setup(){
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Baby's";
}
function draw() {
    image(video, 0, 0, 380, 380);
if(status != ""){
    r = random(255);
    g = random(255);
    b = random(255);
    objectDetector.detect(video, gotResults);
    for (i = 0; i < objects.length; i++){
        document.getElementById("status").innerHTML = "Status : Baby or person Detected";
        fill(r,g,b);
        percent = floor(objects[i].confidence * 100);
        text(objects[i].label +" " + percent + "%", objects[i].x + 15, objects[i].y + 15);
        noFill();
        stroke(r,g,b);
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        if (objects[i]=="person"){
            document.getElementById("number_of_objects").innerHTML="Baby found";
            console.log("stop");
            song.stop();
        }
        else {
            document.getElementById("number_of_objects").innerHTML="Baby not found you are bad parents";
            console.log("play");
            song.play();
        }
    }
    if(objects.length==0){
        document.getElementById("number_of_objects").innerHTML="Baby not found you are bad parents";
            console.log("play");
            song.play();
    }
}
}
function modelLoaded() {
    console.log("Model Loaded!")
    status = true;
}
function gotResults(error, results){
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}