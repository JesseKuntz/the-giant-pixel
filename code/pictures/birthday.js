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

var white = 0xffffff
var orange = 0xffa500
var tan = 0xf8f9a5
var pink = 0xffc0cb
var light_blue = 0x00b8ff
var light_green = 0x9cdaa4

for(var i = 0; i < NUM_LEDS; i++) {
    pixelData[i] = light_green;
}

pixelData[2] = orange
pixelData[4] = orange
pixelData[6] = orange
pixelData[11] = white
pixelData[13] = white
pixelData[15] = white
pixelData[20] = white
pixelData[22] = white
pixelData[24] = white
pixelData[29] = light_blue
pixelData[30] = light_blue
pixelData[31] = light_blue
pixelData[32] = light_blue
pixelData[33] = light_blue
pixelData[38] = tan
pixelData[39] = tan
pixelData[40] = tan
pixelData[41] = tan
pixelData[42] = tan
pixelData[46] = pink
pixelData[47] = pink
pixelData[48] = pink
pixelData[49] = pink
pixelData[50] = pink
pixelData[51] = pink
pixelData[52] = pink
pixelData[55] = tan
pixelData[56] = tan
pixelData[57] = tan
pixelData[58] = tan
pixelData[59] = tan
pixelData[60] = tan
pixelData[61] = tan
pixelData[63] = light_blue
pixelData[64] = light_blue
pixelData[65] = light_blue
pixelData[66] = light_blue
pixelData[67] = light_blue
pixelData[68] = light_blue
pixelData[69] = light_blue
pixelData[70] = light_blue
pixelData[71] = light_blue
pixelData[72] = tan
pixelData[73] = tan
pixelData[74] = tan
pixelData[75] = tan
pixelData[76] = tan
pixelData[77] = tan
pixelData[78] = tan
pixelData[79] = tan
pixelData[80] = tan

ws281x.render(pixelData);

var t0 = Date.now();
setInterval(function () {
    var dt = Date.now() - t0;
    ws281x.setBrightness(
	Math.floor(Math.sin(dt/1000) * 128 + 128));
}, 1000 / 30);

console.log('Press <ctrl>+C to exit.');
