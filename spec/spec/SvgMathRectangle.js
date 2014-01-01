describe('SVG.math.Rectangle', function() {
	var Point = SVG.math.Point;
	var Rectangle = SVG.math.Rectangle;
	var p1 = new Point(-1,-2);
	var p2 = new Point(-1,2);
	var p3 = new Point(1,-2);
	var p4 = new Point(1,2);
	var rect1 = new Rectangle(p1,p4);

	it('knows its dimensions', function() {
 		expect(rect1.xmin).toEqual(-1);
 		expect(rect1.ymin).toEqual(-2);
 		expect(rect1.xmax).toEqual(1);
 		expect(rect1.ymax).toEqual(2);
 		expect(rect1.width).toEqual(2);
 		expect(rect1.height).toEqual(4);
 		expect(rect1.area()).toEqual(8);
	})
	
	it('can be constructed with any pair of opposite corners', function() {
 		expect(new Rectangle(p2,p3)).toEqual(rect1);
 		expect(new Rectangle(p3,p2)).toEqual(rect1);
 		expect(new Rectangle(p4,p1)).toEqual(rect1);
 		expect(new Rectangle(p1,p2)).not.toEqual(rect1);
	});
	
	it('can have zero width', function() {
 		var rect5 = new Rectangle(p1,p2);
 		expect(rect5.xmin).toEqual(-1);
 		expect(rect5.ymin).toEqual(-2);
 		expect(rect5.xmax).toEqual(-1);
 		expect(rect5.ymax).toEqual(2);
 		expect(rect5.width).toEqual(0);
 		expect(rect5.height).toEqual(4);
 		expect(rect5.area()).toEqual(0);
	});
	
	it ('knows what points it contains', function() {
		expect(rect1.contains(new Point(0.5,1.5))).toBe(true);
		expect(rect1.contains(new Point(1.5,0.5))).toBe(false);
		expect(rect1.contains(new Point(0.5,2.5))).toBe(false);
	})
	
	it ('knows what rectangles it intersects', function() {
		expect(rect1.intersects(rect1)).toBe(true);
		expect(rect1.intersects(new Rectangle(new Point(-3,-4),new Point(3,-3)))).toBe(false);
		expect(rect1.intersects(new Rectangle(new Point(-3,-4),new Point(3,1)))).toBe(true);
		expect(rect1.intersects(new Rectangle(new Point(-3,-4),new Point(3,4)))).toBe(true);
		expect(rect1.intersects(new Rectangle(new Point(-3,-4),new Point(3,4)))).toBe(true);
	})
});

