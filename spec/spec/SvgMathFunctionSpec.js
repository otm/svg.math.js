	jasmine.Matchers.prototype.toBeNearTo = function(expected, precision) {
  return Math.abs((expected - this.actual)) <= precision;
};

describe('SVG.math.functions', function() {
	it('SVG.math.rad', function(){
		expect(SVG.math.rad(0)).toEqual(0);
		expect(SVG.math.rad(90)).toEqual(Math.PI/2);
		expect(SVG.math.rad(180)).toEqual(Math.PI);
		expect(SVG.math.rad(270)).toEqual(Math.PI + Math.PI/2);
		expect(SVG.math.rad(360)).toEqual(Math.PI*2);
	});

	it('SVG.math.deg', function(){
		expect(SVG.math.deg(0)).toEqual(0);
		expect(SVG.math.deg(Math.PI/2)).toEqual(90);
		expect(SVG.math.deg(Math.PI)).toEqual(180);
		expect(SVG.math.deg(Math.PI + Math.PI/2)).toEqual(270);
		expect(SVG.math.deg(Math.PI*2)).toEqual(360);
	});

	it('SVG.math.angle', function() {
		expect(SVG.math.angle({x:0, y:0}, {x:10, y:0})).toEqual(SVG.math.rad(0));
		expect(SVG.math.angle({x:0, y:0}, {x:0, y:10})).toEqual(SVG.math.rad(90));
		expect(SVG.math.angle({x:0, y:0}, {x:-10, y:0})).toEqual(SVG.math.rad(180));
		expect(SVG.math.angle({x:0, y:0}, {x:-10, y:-10})).toEqual(SVG.math.rad(225));
		expect(SVG.math.angle({x:0, y:0}, {x:0, y:-10})).toEqual(SVG.math.rad(270));

		expect(SVG.math.angle({x:20, y:20}, {x:30, y:20})).toEqual(SVG.math.rad(0));
		expect(SVG.math.angle({x:20, y:20}, {x:20, y:30})).toEqual(SVG.math.rad(90));
		expect(SVG.math.angle({x:20, y:20}, {x:10, y:20})).toEqual(SVG.math.rad(180));
		expect(SVG.math.angle({x:20, y:20}, {x:10, y:10})).toEqual(SVG.math.rad(225));
		expect(SVG.math.angle({x:20, y:20}, {x:20, y:10})).toEqual(SVG.math.rad(270));

		expect(SVG.math.angle({x:20, y:20}, {x:30, y:20}, {x:30, y:30})).toEqual(SVG.math.rad(45));

	});

	it('SVG.math.snapToAngle', function() {
		expect(SVG.math.snapToAngle(SVG.math.rad(15), [0, Math.PI/2, Math.PI, 3/2 * Math.PI])).toEqual(0);
		expect(SVG.math.snapToAngle(SVG.math.rad(-15), [0, Math.PI/2, Math.PI, 3/2 * Math.PI])).toEqual(0);
		expect(SVG.math.snapToAngle(SVG.math.rad(44.9), [0, Math.PI/2, Math.PI, 3/2 * Math.PI])).toEqual(0);
		expect(SVG.math.snapToAngle(SVG.math.rad(45), [0, Math.PI/2, Math.PI, 3/2 * Math.PI])).toEqual(SVG.math.rad(90));
	});

	it('SVG.math.lerp', function() {
		expect(SVG.math.lerp(1, 2, 0.5)).toEqual(1.5);
		expect(SVG.math.lerp(3, 8, 0.5)).toEqual(5.5);
	});
});

describe('SVG.math.Point', function() {
	it('knows its x and y coordinates', function(){
		var point = new SVG.math.Point(10,20);
		expect(point.x).toEqual(10);
		expect(point.y).toEqual(20);
	});

	it('draws itself on an SVG paper with default attributes', function(){
		var point = new SVG.math.Point(10,20);
		var svgpaper = SVG('svg');
		point.draw(svgpaper);
		var id = point.circle.node.id;
		var svgNode = document.getElementById(id);
		expect(svgNode.getAttribute('radius')).toEqual('5');
		expect(svgNode.getAttribute('fill')).toEqual('none');
		expect(svgNode.getAttribute('stroke')).toEqual('#000000');
	});

	it('draws itself on an SVG paper with custom attributes', function(){
		var point = new SVG.math.Point(50,60);
		var svgpaper = SVG('svg');
		point.draw(svgpaper, {radius:10,fill:'blue'});
		expect(point.circle.attr('cx')).toEqual(50);
		expect(point.circle.attr('cy')).toEqual(60);
		expect(point.circle.attr('radius')).toEqual(10);
	});

  	it('removes itself from the SVG paper', function(){
		var point = new SVG.math.Point(30,40);
		var svgpaper = SVG('svg');
		point.draw(svgpaper);
		var id = point.circle.node.id;
		point.draw();
		expect(document.getElementById(id)).toEqual(null);
	});
});

describe('SVG.math.Line', function() {
	var line, intersect, parallel;

	beforeEach(function() {
		line = new SVG.math.Line(
			new SVG.math.Point(10,20),
			new SVG.math.Point(20,30)
		);

		intersect = new SVG.math.Line(
			new SVG.math.Point(20,10),
			new SVG.math.Point(10,20)
		);

		parallel = new SVG.math.Line(
			new SVG.math.Point(0,10),
			new SVG.math.Point(10,20)
		);
	});

	it('Create SVG.math.Line', function(){
		expect(line.p1.x).toEqual(10);
		expect(line.p1.y).toEqual(20);

		expect(line.p2.x).toEqual(20);
		expect(line.p2.y).toEqual(30);

		expect(line.a).toEqual(10);
		expect(line.b).toEqual(-10);
		expect(line.c).toEqual(-100);
	});

	it('Update the points defining the line', function(){
		line.update(
			new SVG.math.Point(20,10),
			new SVG.math.Point(30,20)
		);

		expect(line.p1.x).toEqual(20);
		expect(line.p1.y).toEqual(10);

		expect(line.p2.x).toEqual(30);
		expect(line.p2.y).toEqual(20);

		expect(line.a).toEqual(10);
		expect(line.b).toEqual(-10);
		expect(line.c).toEqual(100);
	});

	it('SVG.math.Line.parallel', function(){
		expect(line.parallel(parallel)).toEqual(true);
		expect(line.parallel(intersect)).toEqual(false);
	});

	describe("SVG.math.Line.move", function() {
		it('Normal line', function(){
			var point = line.move(line.p1, line.p2, 28.2842712475);
			
			expect(point.x).toBeNearTo(30, 0.00001);
			expect(point.y).toBeNearTo(40, 0.00001);
		});

		it('Vertical line moving up', function(){
			point = new SVG.math.Line( 
				new SVG.math.Point( 100, 100 ),
				new SVG.math.Point( 100, 200 ) 
			).move( 
				new SVG.math.Point( 100, 150 ),
				new SVG.math.Point( 100, 200 ), 
				10
			); 
			expect(point.x).toBeNearTo(100, 0.00001);
			expect(point.y).toBeNearTo(160, 0.001);
		});

		it('Vertical line moving down', function(){
			point = new SVG.math.Line( 
				new SVG.math.Point( 100, 100 ),
				new SVG.math.Point( 100, 200 ) 
			).move( 
				new SVG.math.Point( 100, 150 ), 
				new SVG.math.Point( 100, 100 ),
				10
			); 
			expect(point.x).toBeNearTo(100, 0.00001);
			expect(point.y).toBeNearTo(140, 0.001);
		});

		it('Inverse vertical line moving up', function(){
			point = new SVG.math.Line(
				new SVG.math.Point( 100, 200 ),
				new SVG.math.Point( 100, 100 )
			).move( 
				new SVG.math.Point( 100, 150 ), 
				new SVG.math.Point( 100, 200 ),
				10
			); 
			expect(point.x).toBeNearTo(100, 0.00001);
			expect(point.y).toBeNearTo(160, 0.001);
		});

		it('Inverse vertical line moving down', function(){
			point = new SVG.math.Line(
				new SVG.math.Point( 100, 200 ),
				new SVG.math.Point( 100, 100 )
			).move( 
				new SVG.math.Point( 100, 150 ), 
				new SVG.math.Point( 100, 100 ),
				10
			); 
			expect(point.x).toBeNearTo(100, 0.00001);
			expect(point.y).toBeNearTo(140, 0.001);
		});

	});

	it('SVG.math.Line.intersection', function(){
		var point = line.intersection(intersect);

		expect(point.parallel).toEqual(false);
		expect(point.x).toEqual(10);
		expect(point.y).toEqual(20);

		point = line.intersection(parallel);

		expect(point.parallel).toEqual(true);
	});

	it('SVG.math.Line.midPoint', function(){
		var point = line.midPoint();

		expect(point.x).toEqual(15);
		expect(point.y).toEqual(25);
	});

	it('SVG.math.Line.segmentLengthSquared', function(){
		expect(line.segmentLengthSquared()).toEqual(200);
	});

	it('SVG.math.Line.closestLinearInterpolation', function(){
		var point = new SVG.math.Point(20,20);
		expect(line.closestLinearInterpolation(point)).toEqual(0.5);
	});

	it('SVG.math.Line.interpolatedPoint', function(){
		var point = line.interpolatedPoint(0.2);
		expect(point.x).toEqual(12);
		expect(point.y).toEqual(22);
	});

	it('SVG.math.Line.closestPoint', function(){
		var point = line.closestPoint(new SVG.math.Point(10, 30));
		expect(point.x).toEqual(15);
		expect(point.y).toEqual(25);
	});
	
	it('SVG.math.Line.perpendicularLine', function(){
		var pLine = line.perpendicularLine(line.midPoint(), Math.sqrt(line.segmentLengthSquared()) / 2);
		expect(pLine.p1.x).toEqual(10);
		expect(pLine.p1.y).toEqual(30);
		expect(pLine.p2.x).toEqual(20);
		expect(pLine.p2.y).toEqual(20);

	});
});