/**
 * Created by shijo on 12/06/2017.
 */
var rect = require("./rectangle-callback")
function solveRect(l, b) {
    rect(l, b, function (err, rectangle) {
        if (err) {
            console.log(err);
        } else {

            console.log("Area = " + rectangle.area() + "\nPerimeter = " + rectangle.perimeter());
        }
    });
}

solveRect(3, 7);
solveRect( 0, 1);
solveRect(-2, 3);
solveRect(3,10);