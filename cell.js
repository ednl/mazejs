function Cell(r, c)
{
	this.row = r;
	this.col = c;
	this.walls = [ true, true, true, true ];
	this.visited = false;
	this.todo = 4;

	this.show = function()
	{
		var x1 = this.col * cellsize;
		var y1 = this.row * cellsize;
		var x2 = x1 + cellsize - 1;
		var y2 = y1 + cellsize - 1;

		if (done)
			stroke(255);
		else
			stroke(153, 153, 255);

		if (this.walls[0])
			line(x1, y1, x2, y1);  // top
		if (this.walls[1])
			line(x2, y1, x2, y2);  // right
		if (this.walls[2])
			line(x2, y2, x1, y2);  // bottom
		if (this.walls[3])
			line(x1, y2, x1, y1);  // left

		if (!done) {
			if (this === current) {
				noStroke();
				fill(255, 102, 102);
				rect(x1 + 1, y1 + 1, cellsize - 3, cellsize - 3);
			}
			else if (this.visited) {
				noStroke();
				if (this.todo)
					fill(0, 51 + 102 * this.todo, 0);
				else
					fill(0, 0, 102);
				rect(x1 + 1, y1 + 1, cellsize - 3, cellsize - 3);
			}
		}
	}

	this.next = function()
	{
		var free = [];
		var c, n;

		if (c = cell(this.row - 1, this.col))  // up
			if (!c.visited)
				free.push(c);
		if (c = cell(this.row, this.col + 1))  // right
			if (!c.visited)
				free.push(c);
		if (c = cell(this.row + 1, this.col))  // down
			if (!c.visited)
				free.push(c);
		if (c = cell(this.row, this.col - 1))  // left
			if (!c.visited)
				free.push(c);

		if (free.length == 0) {
			this.todo = 0;
			return undefined;
		}

		this.todo = free.length - 1;
	
		if (free.length == 1)
			n = free[0];
		else {
			n = free[floor(random(free.length))];
			stack.push(this);
		}
		
		var hori = n.col - this.col;
		var vert = n.row - this.row;
		
		if (vert == -1) {  // up
			this.walls[0] = false;
			n.walls[2] = false;
		}
		else if (hori == 1) {  // right
			this.walls[1] = false;
			n.walls[3] = false;
		}
		else if (vert == 1) {  // down
			this.walls[2] = false;
			n.walls[0] = false;
		}
		else {  // left
			this.walls[3] = false;
			n.walls[1] = false;
		}
		
		return n;
	}
}
