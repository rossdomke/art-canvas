class LunchBox {
  constructor(id, width, height) {
    this._canvas = document.getElementById(id);
    this.clear(width, height);
  }
  clear(width, height) {
    this._canvas.height = height || this._canvas.height;
    this._canvas.width = width || this._canvas.width;
  }
  get ctx() {
    return this._canvas.getContext("2d");
  }

  draw(cPallet) {
    this.ctx.fillStyle = cPallet.get(0);
    this.ctx.fillRect(0, 0, this._canvas.width, this._canvas.height);

    this.ctx.fillStyle = cPallet.get(1);
    let w = this._canvas.width,
        h = this._canvas.height;
    this.ctx.arc(w/2, h/4, h/5, 0,  2 * Math.PI);
    this.ctx.fill();

    let r = 10,
        c = 10
    console.log(r);    
    for(let i = 4; i != 0; i--){
      this.ctx.beginPath();
      let lineHeight = (h/r * (r - i)) + Math.floor(Math.random() * 30),
        triSize = h/c,
        triCount = 3;
      //     triSize = h/

      this.ctx.moveTo(0, lineHeight);
      for(let j  = 0; j < triCount; j++){
        
        if(Math.floor(Math.random() * 10) < 4)
          continue;
        let triPosition =  w/c * (Math.floor(Math.random() * Math.floor(c/triCount)) +  Math.floor(c/triCount) * j);
        let shift = Math.floor(Math.random() * 50 + 20)
        this.ctx.lineTo(triPosition, lineHeight);
        this.ctx.lineTo(triPosition + shift/2 + triSize, lineHeight - shift - triSize );
        this.ctx.lineTo(triPosition + shift + triSize * 2, lineHeight);
      }


      this.ctx.lineTo(w, lineHeight);
      this.ctx.lineTo(w, h);
      this.ctx.lineTo(0, h);
      var color = cPallet.mix([cPallet.get(3), cPallet.get(2)], i/4);
      this.ctx.fillStyle = color;
      this.ctx.globalAlpha = .55;
      this.ctx.fill();
    }
    
  }


}