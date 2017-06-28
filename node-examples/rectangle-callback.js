/**
 * Created by shijo on 12/06/2017.
 */
module.exports = function (x, y, callback) {
    try {
        if (x<=0 || y <=0) {
            throw new Error("Dimensions should be greater than 0");
        } else {
            callback(null, {
                perimeter: function () {
                    return 2 * (x + y);

                },
                area: function () {
                    return x*y;
                }
            });
        }
    }
     catch(error) {
        callback(error, null);
     }

};