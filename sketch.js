//variaveis da bolinha
let xBolinha = 350;
let yBolinha = 200;
let diametro = 17;
let raio = diametro / 2;

//velocidade da bolinha
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;

//variaveis da raquete
let xRaquete = 10;
let yRaquete = 200;
let comprimentoRaquete = 10;
let alturaRaquete = 90;

//variavel do oponente
let xRaqueteOponente = 680;
let yRaqueteOponente = 200;
let velocidadeYOponente ;

//variavel de colisao
let colisao = true;

//placar do jogo
let meusPontos = 0;
let pontosOponente= 0;

//sons do jogo
let raquetada;
let ponto;
let trilha;

function preload(){
  trilha = loadSound("sounds/trilha.mp3");
  ponto = loadSound("sounds/ponto.mp3");
  raquetada = loadSound("sounds/raquetada.mp3");
}

function setup() {
  createCanvas(700, 400);
  trilha.loop();
}

function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha();
  verificaColisao();
  mostraRaquete(xRaquete, yRaquete);
  movimentoMinhaRaquete();
  verificaColisaoRaquete();
  bolinhaNaoFicaPresa();
  colisaoRaqueteBiblioteca (xRaquete, yRaquete);
  colisaoRaqueteBiblioteca ( xRaqueteOponente, yRaqueteOponente)
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaRaqueteOponente();
  incluiPlacar();
  marcaPonto();
}

function mostraBolinha (){
  circle(xBolinha, yBolinha, diametro)
}

function movimentaBolinha(){
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function verificaColisao(){
    if (xBolinha + raio > width ||
     xBolinha - raio < 0){
    velocidadeXBolinha *= -1
  }
  
  if(yBolinha + raio > height ||
    yBolinha - raio < 0){
    velocidadeYBolinha *= -1
  }
}

function mostraRaquete(x, y){
    rect (x, y, comprimentoRaquete, alturaRaquete)
}

function bolinhaNaoFicaPresa (){
    if (xBolinha - raio <= 0){
    xBolinha = 20;

    } else {

      if (xBolinha - raio >= 688){
        xBolinha = 670;
      }
    }
}

function movimentoMinhaRaquete(){
  if (keyIsDown(87)){
    yRaquete -= 10;
  }
    if (keyIsDown(83)){
    yRaquete += 10;
  }
}

function verificaColisaoRaquete(){
  if (xBolinha - raio < xRaquete + comprimentoRaquete && yBolinha - raio < yRaquete + alturaRaquete && yBolinha + raio > yRaquete){
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}

function colisaoRaqueteBiblioteca(x, y){
  colisao =
  collideRectCircle(x, y, comprimentoRaquete, alturaRaquete, xBolinha, yBolinha, raio);
  if (colisao){
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}

function movimentaRaqueteOponente(){
  velocidadeYOponente = yBolinha - yRaqueteOponente - comprimentoRaquete /2 - 90;
  yRaqueteOponente += velocidadeYOponente;
}

function incluiPlacar(){
  stroke(255);
  textAlign(CENTER);
  textSize(20);
  fill(color(255, 140, 0));
  rect(230, 10, 40, 25);
  fill(255);
  text(meusPontos, 250, 30);
  fill(color(255, 140, 0));
  rect(430, 10, 40, 25);
  fill(255);
  text(pontosOponente, 450, 30);
}

function marcaPonto() {
    if (xBolinha > 690) {
        meusPontos += 1;
      ponto.play();
    }
    if (xBolinha < 10) {
        pontosOponente += 1;
      ponto.play();
    }
}