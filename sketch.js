let instructionInput;
let parser;
let turtle;
let toReplace;
let replaceWith;
function setup() {
  createCanvas(800, 800);
  angleMode(DEGREES);
  colorMode(HSB, 255);
  strokeWeight(3);
  stroke(0, 255, 255, 255);
  
  toReplace = "SPIKERING";
  let toReplaceInput = createInput(toReplace);
  toReplaceInput.size(100);
  toReplaceInput.style("font-size", "20px");
  toReplaceInput.position(5, 1250);
  toReplaceInput.input(ToReplaceInputChangedEvent);
  
  replaceWith = "! LOOP 20 F 3 T 18 ! T 90 B 10 ? HUE 13 END ?";
  let replaceWithInput = createInput(replaceWith);
  replaceWithInput.size(800);
  replaceWithInput.style("font-size", "20px");
  replaceWithInput.position(120, 1250);
  replaceWithInput.input(ReplaceWithInputChangedEvent);
  
  parser = new Parser();
  turtle = new Turtle();
  
  background(0);
  CreateCodeArea();
  codeArea.input(CodeUpdatedEvent);
  code = "LOOP 6\n";
  code += "  !\n";
  code += "  PEN T -90 F 300 T 90 B 30 PEN\n"; 
  code += "  LOOP 36\n";
  code += "    A 100\n"; 
  code += "    SPIKERING\n";
  code += "    PEN F 20 PEN\n";
  code += "    HUE 6\n"; 
  code += "    T 10\n"; 
  code += "    END\n";
  code += "  ?\n";
  code += "  PEN F 20 T 60 PEN\n";
  code += "END";
  
  code = code.replaceAll("\n", " ");
  code = code.replaceAll("\t", "");
  while(code.indexOf("  ") !== -1)
    code = code.replaceAll("  ", " ");
  
  
  ParseInput();
}

function ReplaceWithInputChangedEvent(){
  replaceWith = this.value();
}

function ToReplaceInputChangedEvent(){
  toReplace = this.value();
}


function draw() {

}

function MyInputChangedEvent() {
  turtle = new Turtle();
  instructionInput = this.value();
  instructionInput = instructionInput.replaceAll(toReplace, replaceWith);
  ParseInput();
}

function ParseInput() {
  if (!code) return;
  if (code === "") return;
  ReplaceStuff();
  
  turtle = new Turtle();
  translate(width/2, height/2);
  background(0);
  parser.Parse(code);
}

function MaybeRandom(value){
  if(value === "0")
    return int(random(-300, 300));
  return value;
}

function ReplaceStuff(){
  code = code.replaceAll(toReplace, replaceWith);
}

let codeArea;
function CreateCodeArea(){
  codeArea = createDiv('');
  
  let innerHtml = '<textarea id="multiliner" name="multiliner" style="width: 800px; float:left; height:400px; background:white">';
  
  innerHtml += "LOOP 6\n";
  innerHtml += "  !\n";
  innerHtml += "  PEN T -90 F 300 T 90 B 30 PEN\n"; 
  innerHtml += "  LOOP 36\n";
  innerHtml += "    A 100\n"; 
  innerHtml += "    SPIKERING\n";
  innerHtml += "    PEN F 20 PEN\n";
  innerHtml += "    HUE 6\n"; 
  innerHtml += "    T 10\n"; 
  innerHtml += "    END\n";
  innerHtml += "  ?\n";
  innerHtml += "  PEN F 20 T 60 PEN\n";
  innerHtml += "END";
  
  innerHtml += '</textarea>';
  
  codeArea.html(innerHtml);
  codeArea = select("#multiliner");
}

let code;
function CodeUpdatedEvent(){
  code = codeArea.value();
  
  code = code.replaceAll("\n", " ");
  code = code.replaceAll("\t", "");
  while(code.indexOf("  ") !== -1)
    code = code.replaceAll("  ", " ");
  ParseInput();
}
