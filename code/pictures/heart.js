var ws281x = require('../lib/ws281x-native');

var NUM_LEDS = parseInt(process.argv[2], 10) || 10,
        pixelData = new Uint32Array(NUM_LEDS);

ws281x.init(NUM_LEDS);

process.on('SIGINT', function () {
      ws281x.reset();
          process.nextTick(function () { process.exit(0); });
});

var map = {};
for (var i = 0; i < NUM_LEDS; i++) {
      var col = Math.floor(i / 9);
          var row = (col % 2 === 0) ? 8 - (i % 9) : i % 9;
              map[i] = 9 * row + col;
}
ws281x.setIndexMapping(map);

var red = 0xff0000
var pink = 0xFFC0CB

for(var i = 0; i < NUM_LEDS; i++) {
  pixelData[i] = pink;
}

pixelData[11] = red
pixelData[12] = red
pixelData[14] = red
pixelData[15] = red
pixelData[19] = red
pixelData[20] = red
pixelData[21] = red
pixelData[22] = red
pixelData[23] = red
pixelData[24] = red
pixelData[25] = red
pixelData[28] = red
pixelData[29] = red
pixelData[30] = red
pixelData[31] = red
pixelData[32] = red
pixelData[33] = red
pixelData[34] = red
pixelData[37] = red
pixelData[38] = red
pixelData[39] = red
pixelData[40] = red
pixelData[41] = red
pixelData[42] = red
pixelData[43] = red
pixelData[47] = red
pixelData[48] = red
pixelData[49] = red
pixelData[50] = red
pixelData[51] = red
pixelData[57] = red
pixelData[58] = red
pixelData[59] = red
pixelData[67] = red

ws281x.render(pixelData);

var t0 = Date.now();
setInterval(function () {
      var dt = Date.now() - t0;

          ws281x.setBrightness(
                    Math.floor(Math.sin(dt/1000) * 128 + 128));
}, 1000 / 30);

console.log('Press <ctrl>+C to exit.');
