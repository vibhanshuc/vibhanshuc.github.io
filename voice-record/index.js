(function () {
  'use strict';

  var recorder;
  window.AudioContext = window.AudioContext
        || window.webkitAudioContext;
  navigator.getUserMedia = (navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia);
  var audioContext = new AudioContext();
  var recordingslist = document.getElementById('recordingsList');

  navigator.mediaDevices.getUserMedia({audio: true})
    .then(function (stream) {
      var input = audioContext.createMediaStreamSource(stream);
      recorder = new Recorder(input, {
        numChannels: 1
      });
    })
    .catch(function (error) {
      alert(error);
    });

  function record() {
    recorder.record();
  }

  function stop() {
    console.log('stp');
    recorder.stop();
    createDownloadLink();

    recorder.clear();
  }

  function start() {
    recorder.play();
  }

  function createDownloadLink() {
    console.log('crdl');
    recorder.exportWAV(function (blob) {
      var url = URL.createObjectURL(blob);
      var li = document.createElement('li');
      var au = document.createElement('audio');
      var hf = document.createElement('a');

      au.controls = true;
      au.src = url;
      hf.href = url;
      hf.download = new Date().toISOString() + '.wav';
      hf.innerHTML = hf.download;
      li.appendChild(au);
      li.appendChild(hf);
      recordingslist.appendChild(li);
      console.log(li);
    });
  }

  var recordBtn = document.getElementById('recordBtn');
  var playBtn = document.getElementById('playBtn');
  var stopBtn = document.getElementById('stopBtn');

  console.log(recordBtn, playBtn, stopBtn);

  recordBtn.addEventListener('click', record);
  playBtn.addEventListener('click', start);
  stopBtn.addEventListener('click', stop);
}());
