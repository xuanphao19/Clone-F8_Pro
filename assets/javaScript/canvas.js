// Vẽ Canvas:
{
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");
  var radius = canvas.height / 2;
  ctx.translate(radius, radius);
  radius = radius * 0.95;
  setInterval(drawClock, 1000);

  function drawClock() {
    drawFace(ctx, radius);
    drawNumbers(ctx, radius);
    drawTime(ctx, radius);
  }

  function drawFace(ctx, radius) {
    var grad;
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    // ctx.fillStyle = "violet";
    ctx.fill();
    var img = document.getElementById("scream");
    ctx.drawImage(img, -132, -132, 265, 285);
    grad = ctx.createRadialGradient(0, 0, radius * 0.85, 0, 0, radius * 1.18);
    grad.addColorStop(0, "#88cd88");
    grad.addColorStop(0.4, "#fff");
    grad.addColorStop(1, "#eb94dd");
    // grad.addColorStop(0, "#333");
    // grad.addColorStop(0.4, "white");
    // grad.addColorStop(1, "#333");
    ctx.strokeStyle = grad;
    ctx.lineWidth = radius * 0.14;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.075, 0, 2 * Math.PI);
    ctx.fillStyle = "blue";
    ctx.strokeStyle = "#0000ffb3";
    ctx.fill();
  }

  function drawNumbers(ctx, radius) {
    var ang;
    var num;
    ctx.font = radius * 0.16 + "px Verdana";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.fillStyle = "rgb(239 0 255)";
    for (num = 1; num < 13; num++) {
      ang = (num * Math.PI) / 6;
      ctx.rotate(ang);
      ctx.translate(0, -radius * 0.8);
      ctx.rotate(-ang);
      ctx.fillText(num.toString(), 0, 0);
      ctx.rotate(ang);
      ctx.translate(0, radius * 0.8);
      ctx.rotate(-ang);
    }
    var grd = ctx.createLinearGradient(0, 0, canvas.width, 0);
    grd.addColorStop(0, "blue");
    grd.addColorStop(0.1, "red");
    grd.addColorStop(0.1, "green");
    ctx.font = "italic 15px Verdana";
    ctx.fillStyle = grd;
    ctx.shadowOffsetX = -2;
    ctx.shadowOffsetY = 1;
    ctx.shadowColor = "white";
    ctx.fillText("English 8A6 Full", 0, 70);
  }

  function drawTime(ctx, radius) {
    var now = new Date();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    //hour
    hour = hour % 12;
    hour = (hour * Math.PI) / 6 + (minute * Math.PI) / (6 * 60) + (second * Math.PI) / (360 * 60);
    drawHand(ctx, hour, radius * 0.46, radius * 0.08);
    //minute
    minute = (minute * Math.PI) / 30 + (second * Math.PI) / (30 * 60);
    drawHand(ctx, minute, radius * 0.7, radius * 0.065);
    // second
    second = (second * Math.PI) / 30;
    drawHand(ctx, second, radius * 0.82, radius * 0.02);
  }

  function drawHand(ctx, pos, length, width) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.moveTo(0, 0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos);
  }
}
