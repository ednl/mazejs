class Cell {

	constructor(r, c) {
		this.row = r;
		this.col = c;
		this.walls = [true, true, true, true];
		this.visited = false;
		this.todo = 4;
	}

	show() {

		var x1 = this.col * cellsize;
		var y1 = this.row * cellsize;
		var x2 = x1 + cellsize - 1;
		var y2 = y1 + cellsize - 1;

		if (done)
			stroke(255);
		else
			stroke(153, 153, 255);

		if (this.walls[0])
			line(x1, y1, x2, y1); // top
		if (this.walls[1])
			line(x2, y1, x2, y2); // right
		if (this.walls[2])
			line(x2, y2, x1, y2); // bottom
		if (this.walls[3])
			line(x1, y2, x1, y1); // left

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

	next() {

		var free = [];
		var n;

		function checkfree(a, dx, dy) {
			var c;
			if (c = cell(a.row + dy, a.col + dx))
				if (!c.visited)
					free.push(c);
		}

		checkfree(this, 0, -1);  // top
		checkfree(this, 1,  0);  // right
		checkfree(this, 0,  1);  // bottom
		checkfree(this, -1, 0);  // left

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

		var hor = n.col - this.col;
		var ver = n.row - this.row;

		if (ver == -1) {          // top
			this.walls[0] = false;
			n.walls[2] = false;
		}
		else if (hor == 1) {      // right
			this.walls[1] = false;
			n.walls[3] = false;
		}
		else if (ver == 1) {      // bottom
			this.walls[2] = false;
			n.walls[0] = false;
		}
		else {                     // left
			this.walls[3] = false;
			n.walls[1] = false;
		}

		return n;
	}
}