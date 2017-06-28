/**
 * Created by shijo on 12/06/2017.
 */


var argv = require('yargs')
    .usage('Usage: node $0 --l=[num] $1 --b=[num]')
    .demand(['l', 'b'])
    .argv;

var rect = require("./rectangle-callback");

function solveRect(l, b) {
    rect(l, b, function (err, rectangle) {
        if (err) {
            console.log(err);
        } else {

            console.log("Area = " + rectangle.area() + "\nPerimeter = " + rectangle.perimeter());
        }
    });
}

solveRect(argv.l, argv.b);
