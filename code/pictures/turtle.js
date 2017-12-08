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

var dark_blue = 0x003366
var green = 0x60C92B
var brown = 0xA52A2A
var gray = 0x808080

for(var i = 0; i < NUM_LEDS; i++) {
      pixelData[i] = dark_blue;
}

pixelData[14] = brown
pixelData[15] = brown
pixelData[22] = brown
pixelData[23] = brown
pixelData[24] = brown
pixelData[25] = brown
pixelData[30] = brown
pixelData[31] = brown
pixelData[32] = brown
pixelData[33] = brown
pixelData[34] = brown
pixelData[35] = brown
pixelData[39] = brown
pixelData[40] = brown
pixelData[41] = brown
pixelData[42] = brown
pixelData[43] = brown
pixelData[44] = brown
pixelData[48] = brown
pixelData[49] = brown
pixelData[50] = brown
pixelData[51] = brown
pixelData[52] = brown
pixelData[53] = brown
pixelData[19] = green
pixelData[20] = green
pixelData[27] = green
pixelData[29] = green
pixelData[36] = green
pixelData[37] = green
pixelData[38] = green
pixelData[46] = green
pixelData[47] = green
pixelData[57] = green
pixelData[58] = green
pixelData[59] = green
pixelData[60] = green
pixelData[61] = green
pixelData[62] = green
pixelData[66] = green
pixelData[67] = green
pixelData[70] = green
pixelData[71] = green
pixelData[28] = gray

ws281x.render(pixelData);

var t0 = Date.now();
setInterval(function () {
      var dt = Date.now() - t0;
          ws281x.setBrightness(
              Math.floor(Math.sin(dt/1000) * 128 + 128));
}, 1000 / 30);

console.log('Press <ctrl>+C to exit.');

