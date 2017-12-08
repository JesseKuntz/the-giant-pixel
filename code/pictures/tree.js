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
var green = 0x008000
var brown = 0xA52A2A
var light_blue = 0x049be5

for(var i = 0; i < NUM_LEDS; i++) {
  pixelData[i] = light_blue;
}

pixelData[3] = green
pixelData[4] = red
pixelData[5] = green
pixelData[11] = green
pixelData[12] = green
pixelData[13] = green
pixelData[14] = green
pixelData[15] = red
pixelData[20] = green
pixelData[21] = red
pixelData[22] = green
pixelData[23] = green
pixelData[24] = green
pixelData[30] = green
pixelData[31] = green
pixelData[32] = green
pixelData[40] = brown
pixelData[49] = brown
pixelData[58] = brown
pixelData[67] = brown
pixelData[75] = brown
pixelData[76] = brown
pixelData[77] = brown

ws281x.render(pixelData);
