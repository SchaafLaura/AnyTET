class Parser {
  Parse(input) {
    let instructions = this.CreateInstructions(input);
    //this.LogInstructions(instructions);
    if (!this.VerifyInstructions(instructions))
      return console.log("instructions not valid");
    
    
    this.ExecuteInstructions(instructions);
  }
  
  ExecuteInstructions(instructions){
    for (let i = 0; i < instructions.length; i++) 
      instructions[i].fn(instructions[i].inputs);
  }
  
  LogInstructions(instructions){
    console.log("instructions are:");
    for (let i = 0; i < instructions.length; i++)
      console.log(instructions[i]);
  }

  VerifyInstructions(instructions) {    
    if (!instructions) return false;
    if (instructions == []) return false;
    
    for(let i = 0; i < instructions.length; i++){
      if(instructions[i].numberOfInputs === 0)
        continue;
      else if(instructions[i].numberOfInputs !== 0 && instructions[i].inputs === undefined)
        return false;
      else if(instructions[i].numberOfInputs !== 0 && instructions[i].inputs === "")
        return false;
      else if(instructions[i].numberOfInputs !== 0 && instructions[i].inputs === [])
        return false;
    }
    return true;
  }

  CreateInstructions(input) {
    let instructions = [];
    let k = 0;
    let split = input.split(" ");
    for (let i = 0; i < split.length; i++) {
      let token = split[i];
      if (token === "") return console.log("got invalid token (empty)");
      if (!this.IsValidToken(token)) return console.log("got invalid token: " + token);
      
      if(token !== "LOOP"){
        instructions[k] = instructionSet[token].Clone();
        if (instructions[k].numberOfInputs > 0){ 
          for(let n = 0; n < instructions[k].numberOfInputs; n++)
            instructions[k].SetInput(split[++i]);
        }
      } else{
        instructions[k] = instructionSet[token].Clone();
        let loopInstructions = "";
        let j = 0;
        while((split[++i] !== "END" || j !== 0) && i < split.length){
          loopInstructions += split[i] + " ";
          if(split[i] === "LOOP")
            j++;
          else if(split[i] === "END")
            j--;
        }
        instructions[k].SetInput(loopInstructions.slice(0, -1));
      }
      k++;
    }
    return instructions;
  }

  IsValidToken(token) {
    let keys = Object.keys(instructionSet);
    return keys.includes(token);
  }
}
