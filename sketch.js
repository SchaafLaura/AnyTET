let canv;
let margin = 10;
let theme = defaultTheme;
let myButton;

let darkThemeButton;
let lightThemeButton;

let count = 0;

function setup() {
  canv = createCanvas(windowWidth - 2 * margin, windowHeight - 2 * margin);
  ResizeWindow();
  
  darkThemeButton = new Button({
    x: 50, y: 50, width: 50, height: 50,
    content: 'dark',
    on_press(){
      theme = defaultTheme
    }
  });
  
  lightThemeButton = new Button({
    x: windowWidth, y: 50, width: 50, height: 50,
    content: 'light',
    on_press(){
      theme = lightTheme
    }
  });
  
  myButton = new Button({
    x: width/2, y: height/2,
    width: 100, height: 50,
    align_x: 0, align_y: 0,
    content: 'Clicks: 0',
    on_press() {
      count++;
      myButton.text( 'Clicks: '+count );
    }
  });
  
  
}

function draw() {
  DrawBackground();
  DrawButtons();
  
  
  
}

function DrawButtons(){
  myButton.place(width/2, height/2);
  
  
  myButton.draw();
  darkThemeButton.draw();
  lightThemeButton.draw();
}

function DrawBackground() {
  let c = theme[0];
  background(c);
}

function windowResized() {
  ResizeWindow();
}

function ResizeWindow() {
  resizeCanvas(windowWidth - 2 * margin, windowHeight - 2 * margin);
  canv.position(margin, margin, "fixed");
}
