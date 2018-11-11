// Len defines the total pixel for a single image.
const len = 784;
// Defines the training data amount.
const training_amount = 800;

// Train
let trains = {};
let trains_training;
let trains_testing;
// Cats
let cats = {};
let cats_training;
let cats_testing;
// Rainbow
let rainbows = {};
let rainbows_training;
let rainbows_testing;


function preload() {
  cats = loadBytes("./data/cat1000.bin");
  trains = loadBytes("./data/train1000.bin");
  rainbows = loadBytes("./data/rainbow1000.bin");
}

// function to categorise the data into training and testing data
// 0.8% used as training data and 0.2% used as testing data.
function prepareData(category, data) {
  category.training = [];
  category.testing = [];
  for(let n = 0; n < 1000; n++) {
    let offset = n * len;
    if(n < training_amount) {
      // Using 800 data for training.
      category.training[n] = data.subarray(offset, offset + len);
    }else {
      // Using 0.2% of total data for testing i.e 200.
      category.testing[n - training_amount] = data.subarray(offset, offset + len);
    } 
  }  
}
// function used to view the dataset imported from googledataset.
function viewData(category) {
  
  let total = 100;
  for(let n = 0; n < total; n++) {
    let img = createImage(28, 28);
    img.loadPixels();
    let offset = len * n;
    for(let i = 0; i < len; i++) {
      let val = 255 - category.bytes[i + offset];
      for(let j = 0; j < 4; j++) {
        if(j === 3) {
          // For Alpha Value of the pixel.
        img.pixels[i * 4 + j] = 255; 

        }else {
          // For RGB value of the pixel.
          img.pixels[i * 4 + j] = val; 
        }
      }
      // img.pixels[i * 4 + 0] = val; 
      // // G
      // img.pixels[i * 4 + 1] = val; 
      // // B
      // img.pixels[i * 4 + 2] = val; 
      // // Alpha
      // img.pixels[i * 4 + 3] = 255; 
  
    }
    img.updatePixels();
    let x = (n % 10) * 28;
    let y = floor(n / 10) * 28
    image(img, x, y);
  }

}
function setup() {
  createCanvas(280, 280);
  background(0);
  // Creating Cats Training and Testing data.
  prepareData(cats, cats.bytes);
  // Creating Trains testing and training data.
  prepareData(trains, trains.bytes);
  // Creating Rainbows training and testing data.
  prepareData(rainbows, rainbows.bytes);

  
  viewData(trains);


}

function draw() {
  // put drawing code here
}