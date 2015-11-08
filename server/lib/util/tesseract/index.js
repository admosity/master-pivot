var express = require('express');
var exec = require('child_process').exec;
var fs = require('fs');
var shortid = require('shortid');

var jpeg = require('jpeg-js');


function makeBinaryImage(fileName, cb){
  try{
    var jpegData = fs.readFileSync(fileName);
    var rawImageData = jpeg.decode(jpegData);
    var histogram = [];
    for(var i = 0; i < 256; i++) histogram[i] = 0;
    var count = 0;
    for(var h = 0; h < rawImageData.height; h++){
      for(var w = 0; w < rawImageData.width; w++){
        var avg = 0;
        avg += rawImageData.data[count];
        avg += rawImageData.data[count+1];
        avg += rawImageData.data[count+2];
        avg += rawImageData.data[count+3];
        avg = Math.floor(avg / 4);
        if(histogram[avg]){
          histogram[avg]++;
        }else{
          histogram[avg] = 1;
        }
        count+=4;
      }
    }

    //Best threshold
    var start = 0;
    var end = histogram.length - 1;
    var left = 0;
    var right = 0;
    while(start < end) {
      if(left < right) {
        //More information on right side, add weight to left
        left += histogram[start];
        start++;
      }else if(left > right){
        //More information on left side, add weight to right
        right += histogram[end];
        end--;
      }else{
        //Both equal, don't bother adding since they're equal
        start++;
        end--;
      }
    }

    count = 0;
    for(var h = 0; h < rawImageData.height; h++){
      for(var w = 0; w < rawImageData.width; w++){
        var avg = 0;
        avg += rawImageData.data[count];
        avg += rawImageData.data[count+1];
        avg += rawImageData.data[count+2];
        avg += rawImageData.data[count+3];
        avg = Math.floor(avg / 4);
        if(avg < start){
          rawImageData.data[count] = 0;
          rawImageData.data[count+1] = 0;
          rawImageData.data[count+2] = 0;
          rawImageData.data[count+3] = 0;
        }else{
          rawImageData.data[count] = 255;
          rawImageData.data[count+1] = 255;
          rawImageData.data[count+2] = 255;
          rawImageData.data[count+3] = 255;
        }
        count+=4;
      }
    }

    var jpegImageData = jpeg.encode(rawImageData, 50);

    var file = fs.createWriteStream(fileName);
    file.write(jpegImageData.data);
    file.end();
  }catch(e){
    console.log(e);
  }
  cb();
}

function runTesseract(fileName, cb){
  var child;
  var command = "tesseract -l eng " + fileName + " stdout";
  console.log("Running command: " + command);
  child = exec(command, function (error, stdout, stderr) {
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
    console.log("Tesseract complete!");
    if (error !== null) {
      console.log('exec error: ' + error);
    }
    cb(error, stdout);
  });
}

module.exports = function () {
  return new Promise(function(resolve, reject) {
    console.log('f730ce42-802d-4a2d-abe3-9bed48fadeb1');
    makeBinaryImage(fileName, function(){
      console.log('9e68999a-3689-457a-b9be-c2767177f6a6');
      runTesseract(fileName, function (err, result) {
        console.log('b3883723-24e7-4032-8b7d-c3da2451010b');
        if(err) return reject(err);
        return resolve(result);
      });
    });
  });
}
