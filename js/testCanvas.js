var ctx = null;
var canvas = null;
var context = [];
var fontSize = 20;
var font = fontSize + "px Arial";
var againCount = 10;
var fontWidth = 2

function drowing(type = null) {
  let width = 500;
  let height = 400;
  canvas.width = width;
  canvas.height = height;
  ctx.font = font;

  if (type === "again") {
    againCount = againCount - 1;
  }

  if (type === "reset") {
    ctx.globalCompositeOperation = 'destination-out';
    drowingText()
    ctx.globalCompositeOperation = 'source-over';
  }
  drowingText();

  function drowingText() {
    let line = context.length;
    let lineHight = fontSize;
    ctx.font = font;
    ctx.globalAlpha = (againCount / 10);
    ctx.fillStyle = "black";
    ctx.textBaseline = "top";

    for (i = 0; i < line; i++) {
      ctx.fillText(context[i], 0, lineHight, 500)
      lineHight = lineHight + fontSize;
    }
    // ctx.wrapText(context, 0, 0, 300, 20);
  }
}


window.onload = function () {
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');
  var isPress = false;
  var old = null;

  canvas.addEventListener('mousedown', function (e) {
    isPress = true;
    old = {
      x: e.offsetX,
      y: e.offsetY
    };
  });

  canvas.addEventListener('mousemove', function (e) {
    if (isPress) {
      var x = e.offsetX;
      var y = e.offsetY;
      ctx.globalCompositeOperation = 'destination-out';

      ctx.beginPath();
      ctx.arc(x, y, 10, 0, 2 * Math.PI);
      ctx.fill();

      ctx.lineWidth = 20;
      ctx.beginPath();
      ctx.moveTo(old.x, old.y);
      ctx.lineTo(x, y);
      ctx.stroke();

      old = {
        x: x,
        y: y
      };
    }
  });

  canvas.addEventListener('mouseup', function (e) {
    isPress = false;
  });


  $('#memo').on('keydown', function () {
    console.log($(this).val().length)
    if ($(this).val().length > 200) {
      $(this).val($(this).val().substring(0, 200));
    }
  });
}