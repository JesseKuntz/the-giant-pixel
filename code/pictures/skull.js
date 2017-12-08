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

var black = 0x000000
var white = 0xffffff
var blue = 0x0000ff

for(var i = 0; i < NUM_LEDS; i++) {
    pixelData[i] = blue;
}

pixelData[11] = white
pixelData[12] = white
pixelData[13] = white
pixelData[14] = white
pixelData[15] = white
pixelData[19] = white
pixelData[20] = white
pixelData[21] = white
pixelData[22] = white
pixelData[23] = white
pixelData[24] = white
pixelData[25] = white
pixelData[28] = white
pixelData[29] = black
pixelData[30] = black
pixelData[31] = white
pixelData[32] = black
pixelData[33] = black
pixelData[34] = white
pixelData[37] = white
pixelData[38] = black
pixelData[39] = white
pixelData[40] = white
pixelData[41] = white
pixelData[42] = black
pixelData[43] = white
pixelData[46] = white
pixelData[47] = white
pixelData[48] = white
pixelData[49] = black
pixelData[50] = white
pixelData[51] = white
pixelData[52] = white
pixelData[56] = white
pixelData[57] = white
pixelData[58] = white
pixelData[59] = white
pixelData[60] = white
pixelData[65] = white
pixelData[67] = white
pixelData[69] = white

ws281x.render(pixelData);

var t0 = Date.now();
setInterval(function () {
    var dt = Date.now() - t0;
    ws281x.setBrightness(
	Math.floor(Math.sin(dt/1000) * 128 + 128));
}, 1000 / 30);

console.log('Press <ctrl>+C to exit.');
