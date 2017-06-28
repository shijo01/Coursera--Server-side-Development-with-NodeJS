var rect = {
    perimeter: function (x, y) {
        return (2 * (x + y )) + "cm";
    },
    area: function (x, y) {
        return (x * y) + "cm^2";
    }
};

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