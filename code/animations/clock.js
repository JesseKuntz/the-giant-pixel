var ws281x = require('../lib/ws281x-native');

var NUM_LEDS = parseInt(process.argv[2], 10) || 10, pixelData = new Uint32Array(NUM_LEDS);

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

var purple = 0x2C8DA9
var green = 0x60C92B
var orange = 0xFFA500

function clearClock() {
    for (var i = 0; i < NUM_LEDS; i++) {
        pixelData[i] = purple;
    }
    pixelData[19] = green;
    pixelData[20] = green;
    pixelData[21] = green;
    pixelData[22] = green;
    pixelData[23] = green;
    pixelData[24] = green;
    pixelData[25] = green;
    pixelData[28] = green;
    pixelData[34] = green;
    pixelData[37] = green;
    pixelData[43] = green;
    pixelData[46] = green;
    pixelData[52] = green;
    pixelData[55] = green;
    pixelData[61] = green;
    pixelData[64] = green;
    pixelData[65] = green;
    pixelData[66] = green;
    pixelData[67] = green;
    pixelData[68] = green;
    pixelData[69] = green;
    pixelData[70] = green;
}
var hoursMap = [56, 47, 38, 29];
var minutesTensMap = [57, 48, 39];
var minutesOnesMap = [58, 49, 40, 31];
var secondsTensMap = [59, 50, 41];
var secondsOnesMap = [60, 51, 42, 33];


function intToBinary(n) {
    // check to see if the number is even or odd
    var even = false;
    if (n % 2 === 0) even = true;
    else n++;

    //get the size of the array by seeing how many times it needs to be divided
    var size = 1;
    var temp = n;
    while (temp >= 2) {
        temp /= 2;
        size++;
    }
    // subtract the '1' that was previously added
    if (!even) n--;

    // get the bits of the bit string and put them in an array (backwards)
    var bits = []
    for(var i = 0; i < size; i++) {
        bits[i] = n % 2;
        n = Math.floor(n /= 2);
    }

    return bits;
}

function timeToBinary(time) {
    var time = new Date();

    // turn on the hours
    var hours = time.getHours();
    if (hours > 12) {hours -= 12;}
    hours++;
//  console.log(hours);
    var hoursBinary = intToBinary(hours);
//  console.log(hoursBinary);
    for (var i = 0; i < hoursBinary.length; i++) {
        if (hoursBinary[i] === 1) {
            //console.log("Block number " + hoursMap[i] + " is turned on!");
            pixelData[hoursMap[i]] = orange;
        }
    }

    // turn on the minutes
    var minutes = time.getMinutes();
    if (minutes > 9) {
        var tensMinutesBinary = intToBinary(Math.floor((minutes / 10) % 10));
        var onesMinutesBinary = intToBinary(Math.floor((minutes / 1) % 10));
        for (var i = 0; i < tensMinutesBinary.length; i++) {
            if (tensMinutesBinary[i] === 1) {
                //console.log("Block number " + minutesTensMap[i] + " is turned on!");
                pixelData[minutesTensMap[i]] = orange;
            }
        }
        for (var i = 0; i < onesMinutesBinary.length; i++) {
            if (onesMinutesBinary[i] === 1) {
                //console.log("Block number " + minutesOnesMap[i] + " is turned on!");
                pixelData[minutesOnesMap[i]] = orange;
            }
        }
    } else {
        var minutesBinary = intToBinary(minutes);
        for (var i = 0; i < minutesBinary.length; i++) {
            if (minutesBinary[i] === 1) {
                //console.log("Block number " + minutesOnesMap[i] + " is turned on!");
                pixelData[minutesOnesMap[i]] = orange;
            }
        }
    }
    // turn on the seconds
    var seconds = time.getSeconds();
    if (seconds > 9) {
        var tensSecondsBinary = intToBinary(Math.floor((seconds / 10) % 10));
        var onesSecondsBinary = intToBinary(Math.floor((seconds / 1) % 10));
        for (var i = 0; i < tensSecondsBinary.length; i++) {
            if (tensSecondsBinary[i] === 1) {
                //console.log("Block number " + secondsTensMap[i] + " is turned on!");
                pixelData[secondsTensMap[i]] = orange;
            }
        }
        for (var i = 0; i < onesSecondsBinary.length; i++) {
            if (onesSecondsBinary[i] === 1) {
                //console.log("Block number " + secondsOnesMap[i] + " is turned on!");
                pixelData[secondsOnesMap[i]] = orange;
            }
        }
    } else {
        var secondsBinary = intToBinary(seconds);
        for (var i = 0; i < secondsBinary.length; i++) {
            if (secondsBinary[i] === 1) {
                //console.log("Block number " + secondsOnesMap[i] + " is turned on!");
                pixelData[secondsOnesMap[i]] = orange;
            }
        }
    }
}

setInterval(function() {
    clearClock();
    timeToBinary();
    ws281x.render(pixelData);
}, 1000);

console.log('Press <ctrl>+C to exit.');