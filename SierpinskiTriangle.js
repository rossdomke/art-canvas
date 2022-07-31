class SierpinskiTri {

  constructor(id, width, height, color) {
    this._canvas = document.getElementById(id);
    this._canvas.height = height;
    this._canvas.width = width;

    let ctx = this.ctx;
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, width, height);
  }

  get ctx() {
    return this._canvas.getContext("2d");
  }


  draw(pal) {
    let st = this;
    let width = this._canvas.width;
    let height = this._canvas.height;
    let size = width > height ? height : width;
    let bg = "#0D1321";
    let points = this.DrawCenterTri(width / 2, height / 2, size, bg);

    while (true) {
      let newPoints = [];
      _.forEach(points, function (point) {
        _.forEach(point.centers, function (center) {
          let output_end = 255,
            output_start = 0,
            input_end = (height / 2) + (size / 2),
            input_start = (height / 2) - (size / 2);

          let slope = (output_end - output_start) / (input_end - input_start);
          let c_idx = output_start + slope * (center.y - input_start);
          let pts = st.DrawInvertedCenterTri(center.x, center.y, point.size, pal.get(c_idx));
          newPoints.push(pts);
        });
      });
      points = _.flatten(newPoints);

      if (points[0].size < 3)
        break;
    }
  }

  DrawCenterRect(x, y, size, color) {
    let ctx = this.ctx;
    ctx.fillStyle = color;
    ctx.fillRect(x - (size / 2), y - (size / 2), size, size);
  }

  DrawCenterTri(x, y, size, color) {
    let ctx = this.ctx;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x - size / 2, y + size / 2);
    ctx.lineTo(x, y - size / 2);
    ctx.lineTo(x + size / 2, y + size / 2);
    ctx.lineTo(x - size / 2, y + size / 2);
    ctx.fill()

    return [{
      centers: [{
        x: x,
        y: y
      }],
      size: size / 2
    }];

  }

  DrawInvertedCenterTri(x, y, size, color) {
    let ctx = this.ctx;
    ctx.fillStyle = color;
    ctx.beginPath();
    y += size / 2;
    ctx.moveTo(x - size / 2, y - size / 2);
    ctx.lineTo(x, y + size / 2);
    ctx.lineTo(x + size / 2, y - size / 2);
    ctx.lineTo(x - size / 2, y - size / 2);
    ctx.fill();

    return [{
      centers: [{
          x: x,
          y: y - size
        },
        {
          x: x - size / 2,
          y: y
        },
        {
          x: x + size / 2,
          y: y
        }
      ],
      size: size / 2,
    }]
  }
}