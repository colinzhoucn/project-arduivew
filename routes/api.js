/////////////////////////////////////////////////////////////////////////////////
// Copyright (c) Autodesk, Inc. All rights reserved
// Written by Philippe Leefsma 2014 - ADN/Developer Technical Services
//
// Permission to use, copy, modify, and distribute this software in
// object code form for any purpose and without fee is hereby granted,
// provided that the above copyright notice appears in all copies and
// that both that copyright notice and the limited warranty and
// restricted rights notice below appear in all supporting
// documentation.
//
// AUTODESK PROVIDES THIS PROGRAM "AS IS" AND WITH ALL FAULTS.
// AUTODESK SPECIFICALLY DISCLAIMS ANY IMPLIED WARRANTY OF
// MERCHANTABILITY OR FITNESS FOR A PARTICULAR USE.  AUTODESK, INC.
// DOES NOT WARRANT THAT THE OPERATION OF THE PROGRAM WILL BE
// UNINTERRUPTED OR ERROR FREE.
/////////////////////////////////////////////////////////////////////////////////
var credentials =(require ('fs').existsSync ('credentials.js') ?
	  require('../credentials')
	: (console.log ('No credentials.js file present, assuming using CONSUMERKEY & CONSUMERSECRET system variables.'), require('../credentials_'))) ;
var express =require ('express') ;
var request =require ('request') ;
var sensorController = require('../controllers/sensorCtl');

var mqttconfig = require('../config/mqttconfig');

var router =express.Router () ;

///////////////////////////////////////////////////////////////////////////////
// Generates access token
///////////////////////////////////////////////////////////////////////////////
router.get ('/token', function (req, res) {
    request.post (
        credentials.Authentication,
        { form: credentials.credentials },
        function (error, response, body) {
            if ( !error && response.statusCode == 200 )
                res.send (body) ;
        }) ;
}) ;

router.get('/mqttconfig',function(req,res){

  res.json(mqttconfig);

});



router.route('/sensors')
  .get(sensorController.getAllSensors)
  .post(sensorController.createNewSensor);

router.route('/sensors/:sensorId')
  .get(sensorController.getSensor)
  .put(sensorController.updateSensor)
  .delete(function(req,res){

  });

router.route('/sensors/:sensorId/values')
  .get(sensorController.getSensorValues)
  .put(sensorController.appendSensorValues);

router.route('/sensors/:sensorId/values/last')
  .get(sensorController.getSensorLastValue)

router.route('/sensors/:sensorId/values/:count')
  .get(sensorController.getSensorLastNValues)
  

module.exports =router ;
