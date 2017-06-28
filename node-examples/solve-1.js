/**
 * Created by shijo on 12/06/2017.
 */
var rect = require("./rectangle-1");
function solveRect(l, b) {
    console.log("Solving rectangle with lenght = " + l + " breadth = " + b);

    if (l <= 0 || b <= 0) {
        console.log("Dimensions should be greater than 0");
    } else {
        console.log("Area = " + rect.area(l, b) + "\nPerimeter = " + rect.perimeter(l, b));
    }

}

solveRect(2, 3);
solveRect( 5, 7);
solveRect(0, 1);
