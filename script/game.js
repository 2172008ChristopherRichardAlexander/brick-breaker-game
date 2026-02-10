export var canvas = document.querySelector('#canvas1');
export var canvas2 = document.querySelector('#canvas2');
export function draw_point(imageData, x, y, color) {
    var index;
    let [r, g, b] = color;
    index = 4 * (Math.ceil(x) + (Math.ceil(y) * canvas.width));
    imageData.data[index] = r;
    imageData.data[index + 1] = g;
    imageData.data[index + 2] = b;
    imageData.data[index + 3] = 255;
}

export function draw_point2(imageData, x, y, color) {
    var index;
    let [r, g, b] = color;
    index = 4 * (Math.ceil(x) + (Math.ceil(y) * canvas2.width));
    imageData.data[index] = r;
    imageData.data[index + 1] = g;
    imageData.data[index + 2] = b;
    imageData.data[index + 3] = 255;
}
export function dda_line2(imageData, point1, point2, color) {
    let [x1, y1] = point1;
    let [x2, y2] = point2;

    var dx = x2 - x1;
    var dy = y2 - y1;

    if (Math.abs(dx) > Math.abs(dy)) {
        if (x2 > x1) {
            var y = y1;
            for (var x = x1; x < x2; x++) {
                y = y + dy / Math.abs(dx);
                draw_point2(imageData, x, y, color);
            }
        } else {
            var y = y1;
            for (var x = x1; x > x2; x--) {
                y = y + dy / Math.abs(dx);
                draw_point2(imageData, x, y, color);
            }
        }
    } else {
        if (y2 > y1) {
            var x = x1
            for (var y = y1; y < y2; y++) {
                x = x + dx / Math.abs(dy);
                draw_point2(imageData, x, y, color);
            }
        } else {
            var x = x1
            for (var y = y1; y > y2; y--) {
                x = x + dx / Math.abs(dy);
                draw_point2(imageData, x, y, color);
            }
        }
    }
}

export function dda_line(imageData, point1, point2, color) {
    let [x1, y1] = point1;
    let [x2, y2] = point2;

    var dx = x2 - x1;
    var dy = y2 - y1;

    if (Math.abs(dx) > Math.abs(dy)) {
        if (x2 > x1) {
            var y = y1;
            for (var x = x1; x < x2; x++) {
                y = y + dy / Math.abs(dx);
                draw_point(imageData, x, y, color);
            }
        } else {
            var y = y1;
            for (var x = x1; x > x2; x--) {
                y = y + dy / Math.abs(dx);
                draw_point(imageData, x, y, color);
            }
        }
    } else {
        if (y2 > y1) {
            var x = x1
            for (var y = y1; y < y2; y++) {
                x = x + dx / Math.abs(dy);
                draw_point(imageData, x, y, color);
            }
        } else {
            var x = x1
            for (var y = y1; y > y2; y--) {
                x = x + dx / Math.abs(dy);
                draw_point(imageData, x, y, color);
            }
        }
    }
}

export function circle_polar(imageData, coordinate, rad, color) {
    let [xc, yc] = coordinate;

    for (var theta = 0; theta < Math.PI * 2; theta += 0.001) {
        let x = xc + rad * Math.cos(theta);
        let y = yc + rad * Math.sin(theta);

        draw_point(imageData, x, y, color);
    }
}

export function flower(imageData, coordinate, rad, n, color) {
    let [xc, yc] = coordinate;

    for (var theta = 0; theta < 2 * Math.PI; theta += 0.001) {

        let x = xc + rad * Math.cos(n * theta) * Math.cos(theta);
        let y = yc + rad * Math.cos(n * theta) * Math.sin(theta);

        draw_point(imageData, x, y, color);


    }
}
export function floodFillStacked(imageData, canvas2, x0, y0, toFlood, color) {
    var stack = [];
    stack.push({ x: x0, y: y0 });

    while (stack.length > 0) {
        var current_point = stack.pop();
        var current_index = 4 * (current_point.x + current_point.y * canvas.width);
        var r1 = imageData.data[current_index];
        var g1 = imageData.data[current_index + 1];
        var b1 = imageData.data[current_index + 2];
        if ((r1 == toFlood.r) && (g1 == toFlood.g) && (b1 == toFlood.b)) {
            imageData.data[current_index] = color.r;
            imageData.data[current_index + 1] = color.g;
            imageData.data[current_index + 2] = color.b;
            imageData.data[current_index + 3] = 255.

            stack.push({ x: current_point.x + 1, y: current_point.y });
            stack.push({ x: current_point.x - 1, y: current_point.y });
            stack.push({ x: current_point.x, y: current_point.y + 1 });
            stack.push({ x: current_point.x, y: current_point.y - 1 });
        }
    }

}
export function polygon(imageData, arrayPoint, color) {
    var point = arrayPoint[0];

    for (var i = 1; i < arrayPoint.length; i++) {
        var point2 = arrayPoint[i];
        dda_line2(imageData, [point.x, point.y], [point2.x, point2.y], color);
        point = point2;
    }
    dda_line2(imageData, [point.x, point.y], [arrayPoint[0].x, arrayPoint[0].y], color);
}

export function polygon_canvas(imageData,canvas, arrayPoint, color) {
    var point = arrayPoint[0];

    for (var i = 1; i < arrayPoint.length; i++) {
        var point2 = arrayPoint[i];
        dda_line2(imageData, [point.x, point.y], [point2.x, point2.y], color);
        point = point2;
    }
    dda_line2(imageData, [point.x, point.y], [arrayPoint[0].x, arrayPoint[0].y], color);
}
export function translation(old_point, T) {
    var new_x = old_point.x + T.x;
    var new_y = old_point.y + T.y;

    return { x: new_x, y: new_y };
}
export function scale(old_point, S) {
    var new_x = old_point.x * S.x;
    var new_y = old_point.y * S.y;

    return { x: new_x, y: new_y };
}

export function rotate(old_point, angle) {
    var new_x = old_point.x * Math.cos(angle) - old_point.y * Math.sin(angle);
    var new_y = old_point.x * Math.sin(angle) + old_point.y * Math.cos(angle);

    return { x: new_x, y: new_y };
}

export function rotate_fp(old_point, rotate_point, angle) {
    var p1 = translation(old_point, { x: -rotate_point.x, y: -rotate_point.y });
    var p2 = rotate(p1, angle);
    var p3 = translation(p2, rotate_point);

    return p3;
}

export function scale_fp(old_point, center_point, S) {
    var p1 = translation(old_point, {x:-center_point.x, y:-center_point.y});
    var p2 = scale(p1, S);
    var p3 = translation(p2, center_point);

    return p3;
}

export function translation_array(point_array, T) {
    var result_array = [];

    for (var i = 0; i < point_array.length; i++) {
        var temp = translation(point_array[i], T);
        result_array.push(temp);
    }
    return result_array;
}

export function rotate_array(point_array, center_point, angle) {
    var result_array = [];
    for (var i = 0; i < point_array.length; i++) {
        var temp = rotate_fp(point_array[i], center_point, angle);
        result_array.push(temp);
    }
    return result_array;
}

export function scale_array(point_array, center_point, S) {
    var result_array = [];
    for (var i=0; i<point_array.length;i++){
        var temp = scale_fp(point_array[i], center_point, S);
        result_array.push(temp);
    }
    return result_array;
}

export function createIdentity() {
    var identity =
        [
            [1, 0, 0],
            [0, 1, 0],
            [0, 0, 1]

        ]
    return identity;
}

export function multiplyMatrix(m1, m2) {
    var result = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ]

    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            for (var k = 0; k < 3; k++) {
                result[i][k] += (m1[i][j] * m2[j][k]);
            }
        }
    }
}

export function createTranslation(Tx, Ty) {
    var translation = [
        [1, 0, Tx],
        [0, 1, Ty],
        [0, 0, 1]
    ]
    return translation;
}

export function createScale(Sx, Sy) {
    var scale = [
        [Sx, 0, 0],
        [0, Sy, 0],
        [0, 0, 1]
    ]
    return scale;
}

export function createRotation(theta) {
    var rotation = [
        [Math.cos(theta), -Math.sin(theta), 0],
        [Math.sin(theta), Math.cos(theta), 0],
        [0, 0, 1]
    ]
    return rotation;
}

export function arrayRotationFp(xc, yc, theta) {
    var m1 = createTranslation(-xc, -yc);
    var m2 = createRotation(theta);
    var m3 = createTranslation(xc, yc);

    var result;
    result = multiplyMatrix(m3, m2);
    result = multiplyMatrix(result, m1);
    return result;
}

export function arrayScaleFp(xc, yc, Sx, Sy) {
    var m1 = createTranslation(-xc, -yc);
    var m2 = createScale(Sx, Sy);
    var m3 = createTranslation(xc, yc);

    var result;
    result = multiplyMatrix(m3, m2);
    result = multiplyMatrix(result, m1);
    return result;
}

export function transform_point(old_point, m) {
    var new_x = m[0][0] * old_point.x + m[0][1] * old_point.y + m[0][2] * 1;
    var new_y = m[1][0] * old_point.x + m[1][1] * old_point.y + m[1][2] * 1;

    return { x: new_x, y: new_y };

}

export function transformArray(point_array, m) {
    var result = [];
    for (var i = 0; i < point_array.length; i) {
        var point_result;
        point_result = transform_point(point_array[i], m);
        result.push(point_result);

    }
    return result;
}