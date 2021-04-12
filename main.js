img="";
status="";
object=[];
function preload(){
song=loadSound("alarm.mp3");
}
function draw(){
image(video,0,0,640,420);
if (status !=""){
    r=random(255);
    g=random(255);
    b=random(255);
    objectDetector.detect(video, gettheresults);
    for (i=0; i<object.length; i++){
        document.getElementById("status").innerHTML="Status: Baby Detected";
        document.getElementById("noofobjdetect").innerHTML="No. of persons detected are: "+object.length;
        fill(r,g,b);
        percent=floor(object[i].confidence * 100);
        text(object[i].label+ " " +percent+ "%" ,object[i].x, object[i].y);
        noFill();
        stroke(r,g,b);
        rect(object[i].x, object[i].y, object[i].width, object[i].height);
        song.stop();
    }
}
else{
    document.getElementById("status").innerHTML="Status: Baby not Detected";
    song.start();
}
}
function setup(){
canvas=createCanvas(380,380);
canvas.center();
video=createCapture(VIDEO);
video.hide();
objectDetector=ml5.objectDetector('cocossd',modelLoaded);
document.getElementById("status").innerHTML="Status: detecting baby";
}
function modelLoaded(){
    console.log("The model has been loaded. Thank you for your patience:)");
    status=true;
    objectDetector.detect(video, gettheresults);
}
function gettheresults(error, results){
if (error) {
    console.error(error);
}
else {
console.log(results);
object=results;
}
}