const ColorMode = {
  INDEX: "index",
  RANDOM: "random",
  DRAND: "deterministic-random",
  GINDEX: "gradient-index"
};

class ColorPallette {
  constructor(colors, mode) {
    this._colors = colors;
    this._mode = mode || ColorMode.INDEX;
    this._dRandAmount = Math.floor(Math.random() * this._colors.length);
  }
  colorBasedOnX(minN, maxN, n) {
    let stepSize = Math.floor((maxN - minN) / (this._colors.length - 1));
    let color = Math.floor((n - minN) / stepSize);
    let colorMixPercentage = ((n - minN) % stepSize) / stepSize;
    try {
      var c = this.mix([this._colors[color], this._colors[(color + 1) % this._colors.length]], colorMixPercentage);
      return c;
    } catch (err) {
      console.error('ColorPallette.colorBasedOnX()', minN, maxN, n);
    }
  }
  get length() {
    return this._colors.length;
  }
  mix(c, ratio) {

    var deltaRatio = 50;
    var c = {
      ratio: 50,
      color: this.average(c[0], c[1]),
      parent: c
    }
    ratio = Math.floor(ratio * 100);
    var emerg = 0
    while (1) {
      deltaRatio = Math.round(deltaRatio / 2);
      if (ratio < c.ratio)
        c = {
          ratio: c.ratio - deltaRatio,
          color: this.average(c.parent[0], c.color),
          parent: [c.parent[0], c.color]
        };
      else if (ratio > c.ratio)
        c = {
          ratio: c.ratio + deltaRatio,
          color: this.average(c.color, c.parent[1]),
          parent: [c.color, c.parent[0]]
        };
      else
        break;

      if (emerg > 10)
        break;
      emerg++;
    }
    return c.color;
  }
  average(c1, c2) {
    function dec2hex(v) {
      return v.toString(16);
    }

    function hex2dec(v) {
      return parseInt(v, 16);
    }
    let seg = /[\da-z]{2}/gi;

    var b1 = c1.match(seg);
    var b2 = c2.match(seg);
    var t, c = [];
    for (var i = 0; i < b1.length; i++) {
      t = dec2hex((hex2dec(b1[i]) + hex2dec(b2[i])) >> 1)

      c[i] = (t.length == 2 ? '' : '0') + t;
    }

    return '#' + c.join('');
  }
  setMode(mode) {
    this._mode = mode;
  }
  get(idx) {
    idx = idx || 0;
    try {
      switch (this._mode) {
        case ColorMode.INDEX:
          return this._colors[Math.floor(idx % this._colors.length)];
        case ColorMode.RANDOM:
          return this.random;
        case ColorMode.DRAND:
          return this.deterministicRandom(idx);
        case ColorMode.GINDEX:
          return this.colorBasedOnX(0, 255, Math.floor(idx % 255));
      }
    } catch (err) {
      console.error('ColorPallette.Get', idx, this._mode, err);
    }
  }
  deterministicRandom(idx) {
    //not really random just shifted
    let i = (this._dRandAmount + idx) % this._colors.length;
    return this._colors[i];
  }
  get random() {
    let i = Math.floor(Math.random() * this._colors.length);
    return this._colors[i];
  }


}