song = "";
status =  "";
object = [];

function preload(){

	song = loadSound("alert.mp3");
}

function setup() {
    canvas = createCanvas(375, 375);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(375,375);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function modelLoaded(){
    console.log("Model is Intialized");
    status = true;
}

function gotResult(e, r) {
    if (e) {
      console.log(e);
    }
    console.log(r);
    objects = r;
}

function draw(){
    image(video, 0, 0, 375, 375);

    if(status != true ){
        r = random(255);
        g = random(255)
        b = random(255);
        objectDetector.detect(video, gotResult);
        for (i = 0; i < object.length; i++) {
          document.getElementById("status").innerHTML = "Status : Object Detected";
 
          fill(r,g,b);
          percent = floor(object[i].confidence * 100);
          text(object[i].label + " " + percent + "%", object[i].x + 15, object[i].y + 15);
          noFill();
          stroke(r,g,b);
          rect(object[i].x, object[i].y, object[i].width, object[i].height);

        }
        
        if(object[1].label = "person"){
            document.getElementById("number_of_obj").innerHTML = "Baby Found";
            console.log("stop");
            song.stop();
        }

        else{
            document.getElementById("number_of_obj").innerHTML = "Baby Not Found";
            console.log("play");
            song.play();
        }

        if(object.length == 0)
        {
          document.getElementById("number_of_obj").innerHTML = "Baby Not Found";
          console.log("play"); 
          song.play();
        }
    }
}
