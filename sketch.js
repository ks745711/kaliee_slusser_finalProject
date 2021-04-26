// sound code https://p5js.org/reference/#/p5.Oscillator\
//grow and shrink code https://editor.p5js.org/amcc/sketches/3ZLqytY_4


let osc, playing, freq, amp;

let dia = 50;
let growAmount = 1;
let grow = true;


function setup() {
  let cnv = createCanvas(windowWidth, windowHeight);
  cnv.mousePressed(playOscillator);
  osc = new p5.Oscillator('sine');

  gui = new Gui();
  let gui_setup = new dat.GUI();
  gui_setup.add(gui, 'show_introduction').onChange(introduction);
  gui_setup.addColor(gui, "background");
  gui_setup.add(gui, "mantra");
  gui_setup.add(gui, "mantra_size", 10, 30);


  intro = select('.div-block');
  intro.position(windowWidth / 4, windowHeight / 4);
  
  introduction();

  document.getElementsByClassName('close-button')[0].click();
}


function draw() {
  background(gui.background);
  noStroke();
  fill(255, 255, 255, 255);

  textFont('Rufina', 40);
  textAlign(CENTER);
  text("Focal Point", windowWidth / 2, 90);

  textFont('Rufina', 16);
  text("Mindfulness Training App", windowWidth / 2, 115);

  textFont('Rufina', 16);
  text("Press on inhale | Release on exhale | Focus on the breath ", windowWidth / 2, windowHeight - 40);

  circle(windowWidth / 2, windowHeight / 2 +20, dia);
  fill(255, 255, 255, 200);
  circle(windowWidth / 2, windowHeight / 2 +20, dia + 25);
  fill(255, 255, 255, 100);
  circle(windowWidth / 2, windowHeight / 2 +20, dia + 50);


  if (mouseIsPressed) {
    grow = true
  } else {
    grow = false
  }

  if (dia > 49 && dia < 301) {
    if (grow == true && dia < 300) {
      dia += growAmount
    } else {
      if (dia > 50) {
        dia -= growAmount
      }
    }
  }


  freq = constrain(dia / 2, 50, 300);
  amp = constrain(dia, 0, 1);


  if (playing) {
    // smooth the transitions by 0.1 seconds
    osc.freq(freq, 0.1);
    osc.amp(amp, 0.1);
  }

  if (dia < 101) {
    osc.stop(45);
  }

  fill(0);
  textFont("Rufina");
  textSize(gui.mantra_size);
  text(gui.mantra, windowWidth / 2, windowHeight / 2+20 + gui.mantra_size / 2);
}



function playOscillator() {
  // starting an oscillator on a user gesture will enable audio
  // in browsers that have a strict autoplay policy.
  // See also: userStartAudio();
  osc.start();
  playing = true;
}

function Gui() {
  this.show_introduction = false;
  this.background = "#068ca1";
  this.mantra = '';
  this.mantra_size = 14;
}

function introduction() {
  if (gui.show_introduction == true) {
    intro.style('display', 'block');
  } else if (gui.show_introduction == false) {
    intro.style('display', 'none');

  }
  
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  intro.position(windowWidth / 4, windowHeight / 4);
}