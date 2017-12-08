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
var white = 0xffffff
var yellow = 0xFFEE00

for(var i = 0; i < NUM_LEDS; i++) {
        pixelData[i] = dark_blue;
}

pixelData[3] = yellow
pixelData[4] = yellow
pixelData[5] = yellow
pixelData[6] = yellow
pixelData[10] = yellow
pixelData[11] = yellow
pixelData[12] = yellow
pixelData[13] = yellow
pixelData[14] = yellow
pixelData[15] = yellow
pixelData[16] = yellow
pixelData[18] = yellow
pixelData[19] = yellow
pixelData[20] = yellow
pixelData[21] = yellow
pixelData[22] = yellow
pixelData[23] = yellow
pixelData[24] = yellow
pixelData[25] = yellow
pixelData[27] = yellow
pixelData[28] = yellow
pixelData[29] = yellow
pixelData[30] = yellow
pixelData[31] = yellow
pixelData[36] = yellow
pixelData[37] = yellow
pixelData[38] = yellow
pixelData[45] = yellow
pixelData[46] = yellow
pixelData[47] = yellow
pixelData[48] = yellow
pixelData[49] = yellow
pixelData[54] = yellow
pixelData[55] = yellow
pixelData[56] = yellow
pixelData[57] = yellow
pixelData[58] = yellow
pixelData[59] = yellow
pixelData[60] = yellow
pixelData[61] = yellow
pixelData[64] = yellow
pixelData[65] = yellow
pixelData[66] = yellow
pixelData[67] = yellow
pixelData[68] = yellow
pixelData[69] = yellow
pixelData[70] = yellow
pixelData[75] = yellow
pixelData[76] = yellow
pixelData[77] = yellow
pixelData[78] = yellow
pixelData[42] = white
pixelData[44] = white

ws281x.render(pixelData);

var t0 = Date.now();
setInterval(function () {
        var dt = Date.now() - t0;
                  ws281x.setBrightness(
                                  Math.floor(Math.sin(dt/1000) * 128 + 128));
}, 1000 / 30);

console.log('Press <ctrl>+C to exit.');


