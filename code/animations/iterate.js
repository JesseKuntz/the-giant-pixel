var ws281x = require('../index.js');

var NUM_LEDS = parseInt(process.argv[2], 10) || 10,
    pixelData = new Uint32Array(NUM_LEDS);

ws281x.init(NUM_LEDS);

// ---- trap the SIGINT and reset before exit
process.on('SIGINT', function () {
  ws281x.reset();
  process.nextTick(function () { process.exit(0); });
});

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

var map = {};
for (var i = 0; i < NUM_LEDS; i++) {
  var col = Math.floor(i / 9);
  var row = (col % 2 === 0) ? 8 - (i % 9) : i % 9;
  map[i] = 9 * row + col;
}
ws281x.setIndexMapping(map);


// ---- animation-loop
var offset = 0;
setInterval(function () {
  var i=NUM_LEDS;
  while(i--) {
      pixelData[i] = 0;
  }
  pixelData[offset] = getRandomColor();

  offset = (offset + 1) % NUM_LEDS;
  ws281x.render(pixelData);
}, 100);

console.log('Press <ctrl>+C to exit.');
