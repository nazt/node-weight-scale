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
var median = require('filters').median;

var serialport = require("serialport")
var SerialPort = serialport.SerialPort;
var serialPort = new SerialPort("/dev/ttyACM0", {
     baudrate: 9600,
     parser: serialport.parsers.readline("\r\n") 
}, false);

var serial_openned = false


module.exports = {
    
  
  /**
   * Action blueprints:
   *    `/bmi/read`
   */
   read: function (req, res) {
     console.log("DO READ");
     ret = { }
    var arr = []
    
    var do_in_serial = function () {
      console.log('do in serial ja')
      serialPort.on('data', function(data) {
        var h = parseInt(data.toString(), 10)
        var sum;

        console.log('data received: ' + data);

        //arr = arr.reverse().splice(0, 4)

        arr.push(h)

        if (_(arr).size() > 5) {
          arr = median(arr)

          console.log(arr)
          sum = _.reduce(arr, function(memo, num){ return memo + num; }, 0);

          sails.io.sockets.emit('height', { height: 206-Math.round(sum/_(arr).size()) })

          arr = []
        } 
        
 
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
