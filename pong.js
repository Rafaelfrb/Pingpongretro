//variáveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 15;
let raio = diametro / 2;

//variáveis velocidade da bolinha
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;

//variáveis da raquete
let xRaquete = 5;
let yRaquete = 150;
let raqueteComprimento = 10;
let raqueteAltura = 90;

//variáveis do oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYOponente;

//placar
let meusPontos = 0;
let pontosDoOponente = 0;

//sons do jogo
let raquetada;
let ponto;
let trilha;

//chance de errar do oponente
let chanceDeErrar = 0;

function preload(){
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
  imagemDeFundo = loadImage("imagens/pongfundo.png")
}

let colidiu = false;

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  background(imagemDeFundo);
  mostraBolinha();
  movimentaBolinha();
  verificaColisaoBorda();
  mostraRaquete(xRaquete, yRaquete);
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaMinhaRaquete();
  movimentaRaqueteOponente();
  //verificaColisaoRaquete2();
  verificaColisaoRaquete(xRaquete, yRaquete);
  verificaColisaoRaquete(xRaqueteOponente,yRaqueteOponente);
  incluiPlacar();
  marcaPonto();
}

function mostraBolinha(){
  circle(xBolinha, yBolinha, diametro);
}

function movimentaBolinha(){
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function verificaColisaoBorda(){
  if(xBolinha + raio > width || xBolinha - raio < 0){
    velocidadeXBolinha *= -1;
  }
  if(yBolinha + raio > height || yBolinha - raio <0){
    velocidadeYBolinha *= -1;
  }
}

function mostraRaquete(x,y){
  fill(color(0, 0, 153))
  rect(x, y, raqueteComprimento, raqueteAltura);
}

function movimentaMinhaRaquete(){
  if (keyIsDown(UP_ARROW)){
    yRaquete -= 10;
  }
  if (keyIsDown(DOWN_ARROW)){
    yRaquete += 10;
  }
}

function verificaColisaoRaquete2(){
  if (xBolinha - raio < xRaquete + raqueteComprimento && yBolinha - raio < yRaquete + raqueteAltura && yBolinha + raio > yRaquete){
    velocidadeXBolinha *= -1;
    raquetada.play()
  }
}

function verificaColisaoRaquete(x,y){
  colidiu =
  collideRectCircle(x, y, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, raio);
  if(colidiu){
    velocidadeXBolinha *= -1;
    raquetada.play()
  }
}

function movimentaRaqueteOponente(){
  velocidadeYOponente = yBolinha -yRaqueteOponente - raqueteComprimento / 2 - 30;
  yRaqueteOponente += velocidadeYOponente + chanceDeErrar
  calculaChanceDeErrar()
}

function incluiPlacar(){
  stroke(255)
  textSize(16)
  textAlign(CENTER)
  fill(color(255, 150, 0))
  rect(130, 10, 40, 20)
  fill(255)
  text(meusPontos, 150, 26)
  fill(color(255, 150, 0))
  rect(430, 10, 40, 20)
  fill(255)
  text(pontosDoOponente, 450, 26)
}

function marcaPonto(){
  if(xBolinha > 590){
    meusPontos += 1
    ponto.play()
  }
  if(xBolinha < 10){
    pontosDoOponente += 1
    ponto.play()
  }
}

function calculaChanceDeErrar() {
  if (pontosDoOponente >= meusPontos) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 39){
    chanceDeErrar = 40
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
    chanceDeErrar = 35
    }
  }
}