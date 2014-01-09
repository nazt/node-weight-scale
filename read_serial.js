var serialport = require("serialport");
var SerialPort = require("serialport").SerialPort;


var serialPort = new SerialPort("/dev/ttyACM0", {
  baudrate: 9600,
  parser: serialport.parsers.readline("\r\n")
});

var arr = []

serialPort.on('data', function(data) {
  console.log(data); 
});
