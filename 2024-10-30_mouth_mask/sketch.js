let faceMesh;
let video;
let faces = [];
let options = { maxFaces: 2, refineLandmarks: false, flipHorizontal: false };

function preload() {
    // Load the faceMesh model
    faceMesh = ml5.faceMesh(options);
  }

function setup() {
  createCanvas(840, 680);
  background(0);

  video = createCapture(VIDEO,{ flipped:true });
  video.size(640, 480);
  video.hide();
  // Start detecting faces from the webcam video
  faceMesh.detectStart(video, gotFaces);
}

function draw() 
{
  background(0); // comment out to get trailing dots

  for (let i = 0; i < faces.length; i++) 
  {
        let face = faces[i];

        // dots on face
        for (let j = 0; j < face.keypoints.length; j++) {
          let keypoint = face.keypoints[j];
          fill(255, 255, 255);
          noStroke();
          circle(keypoint.x, keypoint.y, 2);
        }

        fill(255);
        for (let j = face.lips.keypoints.length -1 ; j >=0 ; j--) {
            let lips = face.lips.keypoints[j]; 
            circle(lips.x, lips.y, 2);
        }

        for (let j = 0; j < face.leftEye.keypoints.length; j++) {
            let eyes = face.leftEye.keypoints[j];
            fill(255,255,255);
            circle(eyes.x, eyes.y, 4);
        }

        for (let j = 0; j < face.rightEye.keypoints.length; j++) {
            let eyes = face.rightEye.keypoints[j];
            fill(255,255,255);
            circle(eyes.x, eyes.y, 4);
        }
    }
}

// Callback function for when faceMesh outputs data
function gotFaces(results) {
    // Save the output to the faces variable
    faces = results;
  }