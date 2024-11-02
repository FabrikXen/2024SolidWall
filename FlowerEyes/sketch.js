let faceMesh;
let video;
let faces = [];
let options = { maxFaces: 1, refineLandmarks: false, flipHorizontal: false };

let min;

function preload() {
    faceMesh = ml5.faceMesh(options);     // Load the faceMesh model
  }

  function setup() {
    createCanvas(840, 680);

    video = createCapture(VIDEO);
    video.size(840, 680);
    video.hide();
    // Start detecting faces from the webcam video
    faceMesh.detectStart(video, gotFaces);

    console.log(ml5.version);
  }

  function mousePressed() {
    console.log(faces);
  }

  function draw() {
     // Draw the webcam video
    image(video, 0, 0, width, height)

    for (let i = 0; i < faces.length; i++) {
        let face = faces[i];

// LEFT SIDE
        for (let j = 0; j < face.leftEye.keypoints.length; j++) {
            let eyes = face.leftEye.keypoints[j];
            let centerX = face.leftEye.centerX;
            let centerY = face.leftEye.centerY;
            fill(255,255,255);
            circle(eyes.x, eyes.y, 4);

            fill(234,67,156, 10);
            circle(centerX,centerY, 17);
        }
    // DRAW LEFT EYE LASHES
        let leftEyeTop = [];
        for(let j = 0 ; j < 9 ; j++) {
          leftEyeTop.push(face.leftEye.keypoints[16 - j]); // 16 keypoints on eye
        }
        let leftEyebrow = [];
        for (let j = 0; j <  9 ; j++) {
          leftEyebrow.push( face.leftEyebrow.keypoints[j] ); // 9 keypoint on eyebrow

          let eyes = face.leftEyebrow.keypoints[j];
          fill(255,255,255);
          circle(eyes.x, eyes.y, 4);
        }

        let eyesize = leftEyeTop.length;   // put in setup!
        let browsize = leftEyebrow.length;
        min = 9;         //min = min(eyesize, browsize);
        
        for ( let i = 1; i < min ; i ++) {
          pointA = { x: leftEyeTop[eyesize - i].x, y: leftEyeTop[ eyesize - i ].y};
          pointB = { x: leftEyebrow[i].x, y: leftEyebrow[i].y};
  
          let xThreeQuarter = pointA.x + 0.5 * (pointB.x - pointA.x);
          let yThreeQuarter = pointA.y + 0.5 * (pointB.y - pointA.y);

          stroke(255, 0, 40);
          strokeWeight(5);
          line(pointA.x - 2, pointA.y - 2, xThreeQuarter, yThreeQuarter);
        }
      


// RIGHT SIDE
        for (let j = 0; j < face.rightEye.keypoints.length; j++) {
            let eyes = face.rightEye.keypoints[j];
            let centerX = face.rightEye.centerX;
            let centerY = face.rightEye.centerY;
            fill(255,255,255);
            circle(eyes.x, eyes.y, 4);
            fill(234,67,156, 10);
            noStroke();
            circle(centerX,centerY, 17);
        }

        for (let j = 0; j < face.rightEyebrow.keypoints.length; j++) {
          let eyes = face.rightEyebrow.keypoints[j];
          fill(255,255,255);
          circle(eyes.x, eyes.y, 4);
        }

  // DRAW RIGHT EYE LASHES
  let rightEyeTop = [];
  for(let j = 0 ; j < 9 ; j++) {
    rightEyeTop.push(face.rightEye.keypoints[16 - j]); // 16 keypoints on eye
  }
  let rightEyebrow = [];
  for (let j = 0; j <  9 ; j++) {
    rightEyebrow.push( face.rightEyebrow.keypoints[j] ); // 9 keypoint on eyebrow

    let eyes = face.rightEyebrow.keypoints[j];
    fill(255,255,255);
    circle(eyes.x, eyes.y, 4);
  }

  //let eyesize = rightEyeTop.length;   // put in setup!
  //let browsize = rightEyebrow.length;
  //min = 9;         //min = min(eyesize, browsize);
  
  for ( let i = 1; i < min ; i ++) {
    pointA = { x: rightEyeTop[eyesize - i].x, y: rightEyeTop[ eyesize - i ].y};
    pointB = { x: rightEyebrow[i].x, y: rightEyebrow[i].y};

    let xThreeQuarter = pointA.x + 0.5 * (pointB.x - pointA.x);
    let yThreeQuarter = pointA.y + 0.5 * (pointB.y - pointA.y);

    stroke(255, 0, 40);
    strokeWeight(5);
    line(pointA.x - 2, pointA.y - 2, xThreeQuarter, yThreeQuarter);
  }



      } // faces
  } // draw

  // Callback function for when faceMesh outputs data
function gotFaces(results) {
    // Save the output to the faces variable
    faces = results;
  }
