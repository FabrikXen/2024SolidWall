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

        fill(255);
        for (let j = face.lips.keypoints.length -1 ; j >=0 ; j--) {
            let lips = face.lips.keypoints[j]; 
            circle(lips.x, lips.y, 2);
        }
    }
}

// Callback function for when faceMesh outputs data
function gotFaces(results) {
    // Save the output to the faces variable
    faces = results;
  }
