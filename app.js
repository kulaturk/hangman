'use strict';

var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var SwaggerExpress = require('swagger-express-mw');
var SwaggerUi = require('swagger-tools/middleware/swagger-ui');
var expressvalidator = require('express-validator');
var validator = require('validator');

var routes = require('./routes/api');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(expressvalidator({
    customValidators: {
        arrayPropNotEmpty: function(values, prop) {
            return values.every(function(val) {
                return !validator.isEmpty(val.prop);
            });
        }
    }
}));

app.use('/', routes);

SwaggerExpress.create({ appRoot: __dirname }, function(err, swaggerExpress) {

  if (err) { throw err; }

  app.use(SwaggerUi(swaggerExpress.runner.swagger));
  swaggerExpress.register(app);

  var port = process.env.PORT || 10010;
  app.listen(port);

});

module.exports = app;