var ws281x = require('../lib/ws281x-native');

var NUM_LEDS = parseInt(process.argv[2], 10) || 10,
        pixelData = new Uint32Array(NUM_LEDS);
var COLOR_SCHEME_COOL = [0x13b5aa, 0x09d1b8, 0x58dbee, 0x35c3de, 0x0da7d0];
var COLOR_SCHEME_WILD = [0xff0000, 0x0000ff, 0x800080, 0x008000, 0xe3ff00];

ws281x.init(NUM_LEDS);

// ---- trap the SIGINT and reset before exit
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

var csIndex = 0;
for(var i = 0; i < NUM_LEDS; i++) {
  if(csIndex >= 5) csIndex = 0;
  pixelData[i] = COLOR_SCHEME_COOL[csIndex++];
  //pixelData[i] = 0xffcc22;
}
ws281x.render(pixelData);

// ---- animation-loop
var t0 = Date.now();
setInterval(function () {
    var dt = Date.now() - t0;

    ws281x.setBrightness(
        Math.floor(Math.sin(dt/1000) * 128 + 128));
}, 1000 / 30);

console.log('Press <ctrl>+C to exit.');
