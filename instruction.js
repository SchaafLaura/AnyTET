class Instruction{
  constructor(fn, numberOfInputs){
    this.fn = fn;
    this.numberOfInputs = numberOfInputs;
    this.inputIndex = 0;
    this.inputs = [];
  }
  
  SetInput(value){
    if(this.numberOfInputs === 0){
      console.log("tried to set Input on something, that didn't need it.");
      return;
    }
    this.inputs[this.inputIndex++] = value;
  }
  
  Clone(){
    return new Instruction(this.fn, this.numberOfInputs);
  }
  
}

//"INSTR" : new Instruction(FunctionName,   numOfArgs)
let instructionSet = {
  "F"     : new Instruction(Forward,        1),
  "B"     : new Instruction(Backward,       1),
  "T"     : new Instruction(Turn,           1),
  "PEN"   : new Instruction(SwitchPenState, 0),
  "HEX"   : new Instruction(Hexagon,        1),
  "PENT"  : new Instruction(Pentagon,       1),
  "LOOP"  : new Instruction(Repeat,         1),
  "HUE"   : new Instruction(ChangeHue,      1),
  "!"     : new Instruction(Push,           0),
  "?"     : new Instruction(Pop,            0),
  "A"     : new Instruction(ChangeAlpha,    1),
  "TXT"   : new Instruction(Text,           1),
  "NGON"  : new Instruction(NGon,           2)
};

function NGon(inputs){
  let n = MaybeRandom(inputs[0]);
  let size = [MaybeRandom(inputs[1])];
  
  let a = [360.0 / n];
  
  for(let i = 0; i < n; i++){
    Forward(size);
    Turn(a);
  }
}

function Text(value){
  fill(turtle.hue, 255, 255);
  noStroke();
  text(value[0], 0, 0);
  textSize(20);
  SwitchPenState();
  Forward([textWidth(value[0])]);
  SwitchPenState();
}

function ChangeAlpha(value){
  let val = MaybeRandom(value[0]);
  let newAlpha = int(turtle.alpha) + int(val);
  
  while(newAlpha > 255)
    newAlpha -= 255;
  
  while(newAlpha < 0)
    newAlpha += 255;

  turtle.alpha = newAlpha;
}

function Push(){
  push();
}

function Pop(){
  pop();
}

function ChangeHue(value){
  let val = MaybeRandom(value[0]);
  let newHue = int(turtle.hue) + int(val);
  
  while(newHue > 255)
    newHue -= 255;
  
  while(newHue < 0)
    newHue += 255;

  turtle.hue = newHue;
}

function Repeat(instructions){
  let k = instructions[0].indexOf(' ');
  let counter = int(instructions[0].slice(0, k));
  let rest = instructions[0].slice(k+1, instructions[0].length);
  let newParser = new Parser();
  for(let i = 0; i < counter; i++)
    newParser.Parse(rest);
}

function Pentagon(value){
  let val = MaybeRandom(value[0]);
  Forward([val]);
  Turn([72]);
  Forward([val]);
  Turn([72]);
  Forward([val]);
  Turn([72]);
  Forward([val]);
  Turn([72]);
  Forward([val]);
  Turn([72]);
}

function Hexagon(value){
  let val = MaybeRandom(value[0]);
  Forward([val]);
  Turn([60]);
  Forward([val]);
  Turn([60]);
  Forward([val]);
  Turn([60]);
  Forward([val]);
  Turn([60]);
  Forward([val]);
  Turn([60]);
  Forward([val]);
  Turn([60]);
}
function SwitchPenState(){
  turtle.penState = !turtle.penState;
}
function Turn(value){
  let val = MaybeRandom(value[0]);
  turtle.Turn(val)
}
function Forward(value){
  let val = MaybeRandom(value[0]);
  turtle.Move(val);
}
function Backward(value){
  let val = MaybeRandom(value[0]);
  Forward([-val]);
}