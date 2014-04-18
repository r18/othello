X_OFFSET = 10;
Y_OFFSET = 10;
X_LINES = 8;
Y_LINES = 8;
UNIT = 40;
LINE_WIDTH = 1;
WIDTH = X_OFFSET*2 +UNIT * (X_LINES + 1);
HEIGHT = Y_OFFSET *2  + UNIT * (Y_LINES + 1);

PIECELIST = [];

TURN = true;

function main() {
  cvs = document.getElementById("cvs");
  ctx = cvs.getContext('2d');
  cvs.width  = WIDTH;
  cvs.height = HEIGHT;

  initBoard();
  window.onclick = mouseClicked;
}

function  initBoard() {
  ctx.beginPath();
  for(var x = 0; x< X_LINES + 1; ++x){
    ctx.moveTo(X_OFFSET + x * UNIT ,Y_OFFSET); 
    ctx.lineTo(X_OFFSET + x * UNIT ,Y_OFFSET + UNIT * Y_LINES ); 
  }

  for(var y = 0; y < Y_LINES + 1 ; ++y){
    ctx.moveTo(X_OFFSET ,Y_OFFSET + y*UNIT); 
    ctx.lineTo(X_OFFSET + X_LINES * UNIT ,Y_OFFSET + UNIT * y); 
  }

  ctx.stroke();

  setPiece(3,3,true);
  setPiece(4,4,true);
  setPiece(4,3,false);
  setPiece(3,4,false);
}

function setPiece(x,y,c) {
  ctx.beginPath();
  ctx.fillStyle = c ? "black" : "white"; 
  ctx.arc(X_OFFSET+x*UNIT + UNIT/2, Y_OFFSET+y*UNIT+UNIT/2,UNIT*2/5,0,Math.PI*2,true);
  ctx.stroke();
  ctx.fill();

  PIECELIST.push({x:x,y:y,c:c});
}

function check(x,y,c) {

}

function getPieceByCoordinate(x,y) {
  for(var i in PIECELIST){
    var p = PIECELIST[i];
    if(p.x == x && p.y == y)return p;
  }
  return -1;
}

function isSettable(x,y,c) {
  var p = getPieceByCoordinate(x,y);
}

function collectPieces(x,y,dx,dy,res) {
  x += dx;
  y += dy;
  if(x < 0 || x > 8 || y < 0 || y > 8)return res;
  var p = getPieceByCoordinate(x,y);
  if(p == -1) return res;
  res.push(p);
  return collectPieces(x,y,dx,dy,res);
}


function mouseClicked(e) {
  var x = Math.floor((e.clientX - X_OFFSET *2) / UNIT);
  var y = Math.floor((e.clientY - Y_OFFSET *2) / UNIT);
  console.log(collectPieces(x,y,1,0,[]));
  if(getPieceByCoordinate(x,y) == -1 ){
    setPiece(x,y,TURN);
    TURN = !TURN;
  }
}
