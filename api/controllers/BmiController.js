/**
 * BmiController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

var _ = require('underscore')
var serialport = require("serialport")
var SerialPort = serialport.SerialPort;
var serialPort = new SerialPort("/dev/ttyACM0", {
     baudrate: 9600
}, false);

var serial_openned = false


module.exports = {
    
  
  /**
   * Action blueprints:
   *    `/bmi/read`
   */
   read: function (req, res) {
     ret = { }
    
    var do_in_serial = function () {
      console.log('do in serial ja')
      serialPort.on('data', function(data) {
        console.log('data received: ' + data);
        var h = parseInt(data.toString(), 10)
        sails.io.sockets.emit('height', { height: h})
      });
    }
    console.log('gogo')
    if (!serial_openned) {
      serialPort.open(do_in_serial)
    }
    else {
      serial_openned = true
    }

    // serialport.list(function (err, ports) {
    //   console.log(ports)
    // });

console.log(serialPort)

     // Rfid.create({card_id: req.params.id }).done(function (err, msg) {
     //   if (err) {
     //     ret = { status: 'error', info: err }
     //   }
     //   else {
     //     ret = { status: 'ok', info: msg }
     //   }
     // })

     return res.json({result: ret});
  },




  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to BmiController)
   */
  _config: {}

  
};
