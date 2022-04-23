song1 = "";
song2= "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreleftWrist = 0;
songStatus1 = "";
songStatus2 = "";
tonotmakedemon = 0;
function preload() {
    song1 = loadSound("insomia.mp3");
    song2 = loadSound("anysong.mp3");
}
function setup() {
    canvas = createCanvas(600,500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}
function modelLoaded() {
    console.log("poseNet is intialized");
}
function gotPoses(results) {
    if(results.length > 0) {
        console.log(results);

        scoreleftWrist = results[0].pose.keypoints[9].score;
        console.log("Score Left Wrist: " + scoreleftWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("Left Wrist X - " + leftWristX + ", Left Wrist Y - " + leftWristY);
        
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("Right Wrist X - " + rightWristX + ", Right Wrist Y - " + rightWristY);
    }
}
function draw() {
    image(video, 0, 0, 600, 500);
    fill("#eb4034");
    stroke("#eb4034");
    songStatus = song1.isPlaying();
    if (scoreleftWrist > 0.2) {
        circle(leftWristX, leftWristY, 20);
        song2.stop();
        tonotmakedemon++;
            if (songStatus1 == false && tonotmakedemon == 1) {
                song1.play();
                document.getElementById("songname").innerHTML = "Insomia by Dvwn";
            }
        }
} 