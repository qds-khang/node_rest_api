var chalk = require('chalk');
var moment = require('moment');

function log(color, message) {
    var now = moment().format('YYYY-MM-DD HH:mm:ss');
    message = '[' + now + '] ' + message;
    message = color(message);

    console.log(message);
}

module.exports = {
    error: function (message) {
        var color = chalk.bold.red;
        log(color, message);
    },
    warning: function (message) {
        var color = chalk.keyword('orange');
        log(color, message);
    },
    info: function (message) {
        var color = chalk.bold.green;
        log(color, message);
    },
    error_bg: function (message) {
        var color = chalk.bgRed;
        log(color, message);
    },
    info_bg: function (message) {
        var color = chalk.bgGreen;
        log(color, message);
    },
};