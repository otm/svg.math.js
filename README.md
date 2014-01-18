svg.math.js
===========

This is a plugin for the [svg.js](http://svgjs.com) library to which provides common math functions.

svg.math.js is licensed under the terms of the MIT License.

## Usage
Include this plugin after including svg.js in your html document.

## Introduction
The math library is a utility library to aid common geometric calculations when 
dealing with SVG:s. The Library is splitted into seperate functions and a point and 
line object. All angles in the library is using radians. 

## Object: SVG.math

### angle(p1, p2[, p3])
Calculate the angle of a line, or the angle between three points.

#### Syntax:
```javascript
	var angle = SVG.math.angle(p1, p2[, p3])
```

#### Arguments:
1. p1 - (*point*) The first point
2. p2 - (*point*) The second point
3. p3 - (*point*, optional) The third point

#### Returns:
* (*numeric*) A numeric value between 0 and 2*pi 

![angle function](https://raw.github.com/otm/svg.math.js/master/images/angle.png "SVG.math.angle(p1, p2[, p3])")


### rad(degree)
Convert an angle in degrees to radians.

#### Syntax:
```javascript
	var angle = SVG.math.rad(degree)
```

#### Arguments:
1. degree - (*numeric*) angle in degrees

#### Returns:
* (*numeric*) An angle in radians



### deg(radians)
Convert an angle in radians to degrees.

#### Syntax:
```javascript
	var angle = SVG.math.deg(radians)
```

#### Arguments:
1. radians - (*numeric*) angle in radians

#### Returns:
* (*numeric*) An angle in degrees

### snapToAngle(angle, directions)
Round to angle to the nerest angle in the directions array

#### Syntax:
```javascript
	var angle = SVG.math.snapToAngle(angle, [0, Math.PI/2, Math.PI, Math.PI*3/2])
```

#### Arguments:
1. angle - (*numeric*) angle in radians
2. directions - (*array*) array containing angles

#### Returns:
* (*numeric*) An angle in degrees

### lerp(a, b, x)
Linear interpolation between a and b where 0 <= x <= 1.

#### Syntax:
```javascript
	var angle = SVG.math.lerp(a, b, x)
```

#### Arguments:
1. a - (*numeric*) The first floating point value.
2. b - (*numeric*) The second floting point value.
3. x - (*numeric*) A value that linearly interpolates between the x parameter and the y parameter.

#### Returns:
* (*numeric*) An angle in degrees

#### Remark:
The linear interpolation is based on the formula `a + x * (b - a)`



## Type: SVG.math.Point
The point object is used in the math library to store x and y coordinates. 

### constructor(x, y)

#### Syntax:
```javascript
	var point = new SVG.math.Point(x, y);
```

#### Arguments:
1. x - (*numeric*) The x coordinate of the Point.
2. y - (*numeric*) The y coordinate of the Point.

#### Returns:
* (*point*) A new SVG.math.Point object.

#### Examples:
```javascript
	// Creating an new point object
	var point = new SVG.math.Point(10, 10);
```

### draw(svg[, attr])
The draw function is a utility function mainly for debugging. It will draw a circle on the
SVG in the first argument.

#### Syntax:
```javascript
	var point = new SVG.math.Point(x, y).draw(svg);
```

#### Arguments:
1. svg - (*object*) The SVG to draw on. If null, the point will remove itself from the SVG.
2. attr - (*object*, optional) Options (attributes) for the circle, takes same attributes as a normal circle.

#### Returns:
* (*Point*) It will return itself.



## Type: SVG.math.Line
The point object is used in the math library to both represent a line segment and a line.

### constructor(p1, p2)
The constructor takes to point objects which will define both a line and a line segment. 
If a function, for instance on the form `y = mx + a` should be modeled with this object
your should just calculate two points from that function, see third example.

#### Syntax:
```javascript
	var line = new SVG.math.Line(p1, p2);
```

#### Arguments:
1. p1 - (*Point*) The firts point that defines the line
2. p2 - (*Point*) The second point that defines the line

#### Returns: 
* (*line*) A new SVG.math.Line object.

#### Examples:
```javascript
	// Creating an new line object
	var line = new SVG.math.Line(
		new SVG.math.Point(10, 10),
		new SVG.math.Point(20, 20);
	);

	// Creating an new line by using a custom point object
	var line = new SVG.math.Line(
		{x: 10, y:10},
		{x: 20, y:20}
	);

	// Creating a line object from a *function* on the form `y = mx + a`
	var func = new SVG.math.Line(
		{x: 1, y: m + a},
		{x: 10, y: 10*m + a}
	);
```

### draw(svg[, options])
The draw function is a utility function mainly for debugging. It will draw a line on the
SVG in the first argument. 

#### Syntax:
```javascript
	var line = new SVG.math.Line(x, y).draw(svg);
```

#### Arguments:
1. svg - (*numeric*) The SVG to draw on. If null it will remove the itself from SVG.
2. options - (*object*, optional) Options for the line, takes same attributes as a normal line.

#### Returns:
* (*Line*) It will return itself.

### update(p1, p2)
Updates the points that defines the line.

### TODO:
If the line has been drawn to a SVG it should also be updated.

#### Syntax:
```javascript
	line.update(x1, x2);
```

#### Arguments:
1. p1 - (*Point*) The first point defining the line.
2. p2 - (*Point*) The second point defining the line.

#### Returns:
* (*Line*) It will return itself.



### parallel(line)
Returns true if the lines are parallel.

#### Syntax:
```javascript
	var isParallel = line.update(line2);
```

#### Arguments:
1. line - (*Line*) The line to check if it's parallel.

#### Returns:
* (*boolean*) True if the lines are parallel, false otherwise.


### move(from, towards, distance)
Move a *distance* on the line from the point *from* towards the point *towards*. 
See figure for more information.

#### Syntax:
```javascript
	line.move(from, towards, distance);
```

#### Arguments:
1. from - (*Point*) The Point on the line to move from
2. towards - (*Point*) A Point on the line to move towards 
3. distance - (*numeric*) The distance to move

#### Returns:
* (*Point*) A Point on the line.

![move function](https://raw.github.com/otm/svg.math.js/master/images/move.png "SVG.math.move(from, towards, distance)")

### intersection(line)
Returns an the intersection point between the two lines. There is an additional property 
`parallel` in the Point object which will be true if the two lines are parallel, false otherwise.

#### Syntax:
```javascript
	line.intersection(line2);
```

#### Arguments:
1. line - (*Line*) The line to find the intersection point with.

#### Returns:
* (*Point*) A special point object representing the intersection of the two lines.


### midPoint()
Returns the midpoint of the line segment.

#### Syntax:
```javascript
	line.midPoint();
```

#### Returns:
* (*Point*) The midpoint of the line segment.


### segmentLengthSquared()
Retutns the squared segment length.

#### Syntax:
```javascript
	line.segmentLengthSquared();
```

#### Returns:
* (*numeric*) The squared segment length.


### closestLinearInterpolation(point)
Calculatates the interpolation (`x`) value of the closest point 
on the line to `point`. This is mainly used internally, it is probably 
the method `closestPoint` you want.

#### Syntax:
```javascript
	var interpolation = line.closestLinearInterpolation(point);
```

#### Arguments:
1. point - (*Point*) The point to find the interpolation value for.

#### Returns:
* (*numeric*) The interpolatioin value.



### interpolatedPoint(t)
Calculates, with a linear interpolation, a new point. This is mainly used internally, 
when finding closest point, midpoint or similar calculations. 

#### Syntax:
```javascript
	var point = line.interpolatedPoint(t);
```

#### Arguments:
1. t - (*numeric*) The interpolation value.

#### Returns:
* (*Point*) A point of calculated with a numeric interpolation.



### closestPoint(p)
Calculates the closest point on the line with `p`.

#### Syntax:
```javascript
	var point = line.closestPoint(p);
```

#### Arguments:
1. p - (*Point*) The point to find the closest point on the line to.

#### Returns:
* (*Point*) A point of calculated with a numeric interpolation.



### perpendicularLine(p, distance)
Calculates a perpendicular line that passes through the point `p` and has the 
length `distance`. The midpoint of the new line will be `p`.

#### Syntax:
```javascript
	var line2 = line.perpendicularLine(p, distance);
```

#### Arguments:
1. p - (*Point*) The midpoint of the new line.
1. distance - (*numeric*) The length of the new line.

#### Returns:
* (*Line*) A new Line object which the midpoint `p` and the length `distance`.


## Examples

### Arrow
This example will show how to draw an arrow. Please note that this is not the
fastest way to draw this shape, but it's only an example how it's possible to 
utilize the functions in the math library.

1. Create a line object that defines the start and end of the arrow. 

         var shadowPath = new SVG.math.Line(p1, p2);

2. Now we want to find the back point of the arrow (p3 in the figure).
the easiest way to do this is to use the move function.

         var p3 = shadowPath.move(shadowPath.p2, shadowPath.p1, distance);

3. Now we will calculate the *body* of the arrow. We will do that by 
calculate the perpedicular lines through the points `p1` and `p3`. This
will calculate the green point on the black dashed lines.

         var back = shadowPath.perpendicularLine(shadowPath.p1, arrowThickness);
         var front = shadowPath.perpendicularLine(shadowPath.p2, arrowThickness);

4. Almost there, the only thing missing is the last points on the arrow
head. That is, the green points on the red dashed line. We will calculate
those points in a similar fashion as the last step.

         var arrowhead = shadowPath.perpendicularLine(shadowPath.p2, arrowheadWidth);

5. The only thing left now is to draw the arrow.

         var draw = SVG('paper');
         draw.polygon(
                [back.p1.x, back.p1.y],
         	[front.p1.x, front.p1.y],
         	[arrhowhead.p1.x, arrowhead.p1.y],
         	[p2.x, p2.y],
         	[arrhowhead.p2.x, arrowhead.p2.y],
         	[front.p2.x, front.p2.y],
         	[back.p2.x, back.p2.y]
         );

![arrow example](https://raw.github.com/otm/svg.math.js/master/images/arrowExample.png "Arrow example")
