const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    port = process.env.PORT || 3000
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));
fs = require('fs');

var AWS = require('aws-sdk');
var uuid = require('node-uuid');
const Fs = require('fs')
AWS.config.accessKeyId = "AKIAIGJGYEHY3YH5JFMQ";
AWS.config.secretAccessKey = "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";
AWS.config.region = "us-east-1";


// Create an Polly clients
const Polly = new AWS.Polly({
  signatureVersion: 'v4',
  region: 'us-east-1'
})


app.get('/', (req, res) => {
    res.send(__dirname + 'index.html');
});

app.post('/listen', (req, res) => {
    console.log("body " + req.body.txtSpeech);

    let params = {
        'Text': req.body.txtSpeech,
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
                        res.send("Error writing mp3");
                    }
                    else{
                        fs.readFile("speech.mp3", function (err, data) {
                            if (err) {
                                res.send("Error reading mp3");
                            }
                            else {
                                res.setHeader('Content-disposition', 'attachment; filename=' + "sample.mp3");
                                res.setHeader('Content-Type', 'mp3');
                                res.send(data);
                            }
                        });
                    }
                    console.log("The file was saved!")
                })
            }
        }
      })

});

app.get('/download', (req, res) => {
    fs.readFile("speech.mp3", function (err, data) {
        if (err) {
            res.send("Error");
        }
        else {
            res.setHeader('Content-disposition', 'attachment; filename=' + "afile.mp3");
            res.setHeader('Content-Type', 'mp3');
            res.send(data);
        }
    });
});

app.listen(port, () => {
    console.log('listening on ', port);
})

