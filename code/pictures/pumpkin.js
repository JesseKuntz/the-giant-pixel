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

var purple = 0x800080
var green = 0x60C92B
var orange = 0xFFA500
var black = 0x000000

for(var i = 0; i < NUM_LEDS; i++) {
        pixelData[i] = purple;
}

pixelData[14] = green
pixelData[22] = green
pixelData[37] = orange
pixelData[38] = orange
pixelData[40] = orange
pixelData[29] = orange
pixelData[30] = orange
pixelData[31] = orange
pixelData[32] = orange
pixelData[33] = orange
pixelData[42] = orange
pixelData[43] = orange
pixelData[60] = orange
pixelData[61] = orange
pixelData[55] = orange
pixelData[56] = orange
pixelData[46] = orange
pixelData[47] = orange
pixelData[48] = orange
pixelData[49] = orange
pixelData[50] = orange
pixelData[51] = orange
pixelData[52] = orange
pixelData[65] = orange
pixelData[66] = orange
pixelData[67] = orange
pixelData[68] = orange
pixelData[69] = orange
pixelData[39] = black
pixelData[41] = black
pixelData[57] = black
pixelData[58] = black
pixelData[59] = black

ws281x.render(pixelData);

var t0 = Date.now();
setInterval(function () {
        var dt = Date.now() - t0;
                  ws281x.setBrightness(
                                  Math.floor(Math.sin(dt/1000) * 128 + 128));
}, 1000 / 30);

console.log('Press <ctrl>+C to exit.');


