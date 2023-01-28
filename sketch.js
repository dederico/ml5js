let video;
let poseNet;
let pose;
let skeleton;


function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.hide();
  poseNet = ml5.poseNet(video, modelReady); 
  poseNet.on('pose', gotPoses);
  poses = [];
}

function gotPoses(poses) {
  //console.log(poses);
  if (poses.length > 0) {
    pose = poses[0].pose;
    skeleton = poses[0].skeleton;
  }
}

function calculateSize() {
  if (pose) {
    let hombroIzq = pose.leftShoulder;
    let hombroDer = pose.rightShoulder;
    let d = dist(hombroIzq.x, hombroIzq.y, hombroDer.x, hombroDer.y);
    // calculate size based on the distance between shoulders
    console.log("THIS IS SPARTA",d);
    return d;
}
}

  function modelReady() {
    console.log("model ready");
  }

  function draw() {
    image(video, 0, 0);
    if (pose) {
      let eyeR = pose.rightEye;
      let eyeL = pose.leftEye;
      let d = dist(eyeR.x, eyeR.y, eyeL.x, eyeL.y);
      //console.log(d);

      for (let i = 0; i < pose.keypoints.length; i++) {
        let x = pose.keypoints[i].position.x;
        let y = pose.keypoints[i].position.y;
        fill(0, 255, 0);
        ellipse(x, y, 16, 16);
      }

    //  for (let i = 0; i < skeleton.length; i++) {
    //    let a = skeleton[i][0];
    //    let b = skeleton[i][1];
    //    strokeWeight(2); 
    //    stroke(255);
    //    line(a.position.x, a.position.y, b.position.x, b.position.y);
    //  }
      
    }
  }
