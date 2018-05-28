/*
 * Copyright 2013. Amazon Web Services, Inc. All Rights Reserved.
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *     http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
**/

// Load the SDK and UUID
var AWS = require('aws-sdk');
var uuid = require('node-uuid');
const Fs = require('fs')
AWS.config.accessKeyId = "AKIAJOJ6Z7NBFTVKYCAQ";
AWS.config.secretAccessKey = "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";
AWS.config.region = "us-east-1";


// Create an Polly client
const Polly = new AWS.Polly({
  signatureVersion: 'v4',
  region: 'us-east-1'
})

let params = {
  'Text': 'Hi, my name is @anaptfox.',
  'OutputFormat': 'mp3',
  'VoiceId': 'Aditi'
}

Polly.synthesizeSpeech(params, (err, data) => {
  if (err) {
      console.log(err.code)
  } else if (data) {
      if (data.AudioStream instanceof Buffer) {
          Fs.writeFile("./speech.mp3", data.AudioStream, function(err) {
              if (err) {
                  return console.log(err)
              }
              console.log("The file was saved!")
          })
      }
  }
})


// // Create an S3 client
// var s3 = new AWS.S3();

// // Create a bucket and upload something into it
// var bucketName = 'node-sdk-sample-' + uuid.v4();
// var keyName = 'hello_world.txt';

// s3.createBucket({Bucket: bucketName}, function() {
//   var params = {Bucket: bucketName, Key: keyName, Body: 'Hello World!'};
//   s3.putObject(params, function(err, data) {
//     if (err)
//       console.log(err)
//     else
//       console.log("Successfully uploaded data to " + bucketName + "/" + keyName);
//   });
// });
