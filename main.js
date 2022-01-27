var prediction_1;
var prediction_2;

Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    image_quality:100
});

camera = document.getElementById("camera");
Webcam.attach("#camera");

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="captured_image" src="' + data_uri + '"/>'; 
    });
}

console.log(ml5.version);
var classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/gJFYYlvUQ/model.json', modelLoaded);

function modelLoaded(){
    console.log("model loaded");
}

function speak(){
    var synth = window.speechSynthesis;
    speak_data_1 = "The first prediction is " + prediction_1;
    speak_data_2 = "And the second prediction is " + prediction_2;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    synth.speak(utterThis);
}

function check(){
    img = document.getElementById("captured_image");
    classifier.classify(img, gotResult);
}

function gotResult(error,results){
    if(error){
        console.error(error);
    } else{
        console.log(results);
        document.getElementById("result").style.marginTop = '-300px';
        prediction_1 = results[0].label;
        prediction_2 = results[1].label;
        speak();
        if(results[0].label=="hello"){
            document.getElementById("update_emoji").innerHTML = "&#128075;";
            document.getElementById("result_emotion_name").innerHTML = "Hello";
        }
        else if(results[0].label=="two"){
            document.getElementById("update_emoji").innerHTML = "&#9996;";
            document.getElementById("result_emotion_name").innerHTML = "Peace";
        }
        else if(results[0].label == "Bunch"){
            document.getElementById("update_emoji").innerHTML = "&#128074;";
            document.getElementById("result_emotion_name").innerHTML = "Punch";
        }
        else if(results[0].label == "up"){
            document.getElementById("update_emoji").innerHTML = "&#128077;";
            document.getElementById("result_emotion_name").innerHTML = "Thumbs Up";
        }
        else if(results[0].label == "down"){
            document.getElementById("update_emoji").innerHTML = "&#128078;";
            document.getElementById("result_emotion_name").innerHTML = "Thumbs Down";
        }
        else if(results[0].label == "bro"){
            document.getElementById("update_emoji").innerHTML = "&#128548;";
            document.getElementById("result_emotion_name").innerHTML = "Call Me";
        }


        if(results[1].label=="hello"){
            document.getElementById("update_emoji2").innerHTML = "&#128075;";
            document.getElementById("result_emotion_name2").innerHTML = "Hello";
        }
        else if(results[1].label=="two"){
            document.getElementById("update_emoji2").innerHTML = "&#9996;";
            document.getElementById("result_emotion_name2").innerHTML = "Peace";
        }
        else if (results[1].label == "Bunch"){
            document.getElementById("update_emoji2").innerHTML = "&#128074;";
            document.getElementById("result_emotion_name2").innerHTML = "Punch";
        }
        if(results[1].label=="up"){
            document.getElementById("update_emoji2").innerHTML = "&#128077;";
            document.getElementById("result_emotion_name2").innerHTML = "Thumbs Up";
        }
        else if(results[1].label=="down"){
            document.getElementById("update_emoji2").innerHTML = "&#128078;";
            document.getElementById("result_emotion_name2").innerHTML = "Thumbs Down";
        }
        else if (results[1].label == "bro"){
            document.getElementById("update_emoji2").innerHTML = "&#129305;";
            document.getElementById("result_emotion_name2").innerHTML = "Call Me";
        }
    }
}