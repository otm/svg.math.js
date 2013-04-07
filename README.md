svg.math.js
===========

This is a plugin for the [svg.js](http://svgjs.com) library to which provides common math functions.

svg.math.js is licensed under the terms of the MIT License.

## Usage

Include this plugin after including svg.js in your html document.

Object: SVG.math
================

Function: angle
---------------
Calculate the angle of a line, or the angle between three points.

### Syntax:

	var angle = SVG.math.angle(p1, p2[, p3])

### Arguments:

1. p1 - (*point*) The first point
2. p2 - (*point*) The second point
3. p3 - (*point*, optional) The third point

### Returns:

* (*numeric*) A numeric value between 0 and 2*pi 




Type: SVG.math.Point
====================
The point object is used in the math library to store x and y coordinates. 

Point Method: constructor
-------------------------

### Syntax:

	var point = new SVG.math.Point(x, y);

### Arguments:

1. x - (*numeric*) The x coordinate of the Point.
2. y - (*numeric*) The y coordinate of the Point.

### Returns:

* (*point*) A new SVG.math.Point object.

### Examples:

	// Creating an new point object
	var point = new SVG.math.Point(10, 10);





Type: SVG.math.Line
===================
The point object is used in the math library to both represent a line segment and a line.

Line Method: constructor
------------------------
The constructor takes to point objects which will define a line and a line segment

### Syntax:

	var line = new SVG.math.Line(p1, p2);

### Arguments:

1. p1 - (*Point*) The firts point that defines the line
2. p2 - (*Point*) The second point that defines the line

### Returns: 

* (*line*) A new SVG.math.Line object.

### Examples:

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
