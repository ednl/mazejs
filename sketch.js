var cols, rows;
var cellsize = 30;
var grid = [];
var stack = [];
var current;
var done = false;

function cell(r, c)
{
	if (r < 0 || c < 0 || r >= rows || c >= cols)
		return undefined;
	return grid[r * cols + c];
}

function setup()
{
	// frameRate(10);
	createCanvas(720, 720);
	strokeWeight(2);

	cols = floor(width / cellsize);
	rows = floor(height / cellsize);

	for (var i = 0; i < rows; ++i)
		for (var j = 0; j < cols; ++j)
			grid.push(new Cell(i, j));

	current = grid[0];
}

function draw()
{
	background(0, 0, done ? 102 : 0);

	for (var i = 0; i < grid.length; ++i)
		grid[i].show();

	if (!done) {
		current.visited = true;
		var next = current.next();
		if (next)
			current = next;
		else if (stack.length)
			current = stack.pop();
		else
			done = true;
	}
}
