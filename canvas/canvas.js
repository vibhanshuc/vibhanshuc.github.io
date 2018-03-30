(function () {
  'use strict';

  function drawCanvasOne() {
    var canvas = document.getElementById('canvas-1');
    var context = canvas.getContext('2d');
    context.beginPath();
    context.moveTo(100, 100);
    context.lineTo(400, 400);
    context.stroke();
  }

  function drawCanvasTwo() {
    var canvas = document.getElementById('canvas-2');
    var ctx = canvas.getContext('2d');
    ctx.fillStyle = 'green';
    ctx.fillRect(50, 50, 100, 150);
    ctx.fillStyle = 'red';
    ctx.fillRect(300, 50, 50, 50);
    ctx.strokeStyle = 'blue';
    ctx.strokeRect(250, 200, 100, 150);
    ctx.clearRect(60, 60, 80, 130);

    // setup path
    ctx.beginPath();
    // drawing command
    ctx.fillStyle = 'blue';
    ctx.moveTo(100, 350);
    ctx.lineTo(200, 100);
    ctx.lineTo(250, 210);
    ctx.lineTo(100, 350);
    ctx.fill();

    ctx.fillStyle = 'yellow';
    ctx.beginPath();
    ctx.arc(240, 160, 100, 0, 2 * Math.PI);
    ctx.fill();
  }

  function drawCanvasThree() {
    var canvas = document.getElementById('canvas-3');
    var ctx = canvas.getContext('2d');
    ctx.fillStyle = 'blue';
    ctx.rect(100, 100, 300, 300);
    ctx.shadowBlur = 40;
    ctx.shadowColor = '#000000';
    ctx.shadowOffsetX = -20;
    ctx.shadowOffsetY = -20;
    ctx.fill();
  }

  function drawSmiley() {
    var canvas = document.getElementById('canvas-4');
    if (canvas.getContext) {
      var ctx = canvas.getContext('2d');

      ctx.beginPath();
      ctx.arc(240, 240, 200, 0, Math.PI * 2, true); // Outer circle
      ctx.moveTo(400, 240);
      ctx.arc(240, 240, 160, 0, Math.PI, false);  // Mouth (clockwise)
      ctx.moveTo(200, 150);
      ctx.arc(170, 150, 30, 0, Math.PI * 2, true);  // Left eye
      ctx.moveTo(340, 150);
      ctx.arc(310, 150, 30, 0, Math.PI * 2, true);  // Right eye
      ctx.stroke();
    }
  }

  function drawIntersectingRectangles() {
    var canvas = document.getElementById('canvas-5');
    var ctx = canvas.getContext('2d');
    ctx.fillStyle = 'rgb(200, 0, 0)';
    ctx.fillRect(100, 100, 250, 250);

    ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
    ctx.fillRect(150, 150, 250, 250);
  }

  function drawRectanglePattern() {
    var ctx = document.getElementById('canvas-6').getContext('2d');
    for (var i = 0; i < 6; i++) {
      for (var j = 0; j < 6; j++) {
        ctx.fillStyle = 'rgb(' + Math.floor(255 - 42.5 * i) + ', ' +
          Math.floor(255 - 42.5 * j) + ', 0)';
        ctx.fillRect(j * 80, i * 80, 80, 80);
      }
    }
  }

  function drawCirclePattern() {
    var ctx = document.getElementById('canvas-7').getContext('2d');
    for (var i = 0; i < 6; i++) {
      for (var j = 0; j < 6; j++) {
        ctx.beginPath();
        ctx.fillStyle = 'rgb(' + Math.floor(255 - 42.5 * i) + ', ' +
          Math.floor(255 - 42.5 * j) + ', 0)';
        ctx.arc(j * 80 + 40, i * 80 + 40, 40, 0, 2 * Math.PI, true);
        ctx.fill();
      }
    }
  }

  drawCanvasOne();
  drawCanvasTwo();
  drawCanvasThree();
  drawSmiley();
  drawIntersectingRectangles();
  drawRectanglePattern();
  drawCirclePattern();
}());
