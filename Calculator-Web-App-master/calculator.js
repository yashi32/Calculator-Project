var buttons = document.getElementsByClassName("button");
var display = document.getElementById("display");
var operand1 = null;
var operand2 = null;
var operator = null;

function operatorHandler(opr){
  if(display.innerText.length!==0){
    if(operator==null){
      operand1 = parseFloat(display.innerText);
      display.innerText = "";
      operator = opr;
    }else{
      operand1 = eval(operand1+operator+display.innerText);
      operator = opr;
      display.innerText = "";
    }
  }else if(operand1!=null){
    operator = opr;
  }
}

function isDotePresent(s){
  for(var i=0;s.length>i;i++){
    if(s.charAt(i)=='.') return true;
  }
}

function eventHandler(){
  var key = this.getAttribute("data-value");
  if(key=="/"|| key=="*" || key=="-" || key=="+"){
    operatorHandler(key);
  }else if(key=="="){
    if(operator!=null){
      if(display.innerText==""){
        display.innerText = "Error";
      }else{
        display.innerText = eval(operand1+operator+display.innerText);
        // console.log(display.innerText);
        operator = null;
      }
    }
  }else if(key=="%"){
    display.innerText = parseFloat(display.innerText)/100;
  }else if(key=="+/-"){
    display.innerText = display.innerText*-1;
  }else if(key=="AC"){
    operand1 = null;
    operator = null;
    operand2 = null;
    display.innerText = "";
  }else{
    if(key!='.') display.innerText += key;
    else if(!isDotePresent(display.innerText)) display.innerText += key;
  }
}

for(var i=0;buttons.length>i;i++){
  buttons[i].addEventListener("click",eventHandler);
}

/*      KeyBoardHandler     */
function keyBoardHandler(event){
  var key = event.code;
  var keyValue = {Numpad0:"0",Numpad1:"1",Numpad2:"2",Numpad3:"3",Numpad4:"4",Numpad5:"5",Numpad6:"6",Numpad7:"7",Numpad8:"8",Numpad9:"9",NumpadDecimal:"."};
  if(key=="NumpadDivide"){
    operatorHandler("/");
  }else if(key=="NumpadMultiply"){
    operatorHandler("*");
  }else if(key=="NumpadSubtract"){
    operatorHandler("-");
  }else if(key=="NumpadAdd"){
    operatorHandler("+");
  }else if(key=="NumpadEnter"||key=="Equal"){
    if(operator!=null){
      if(display.innerText==""){
        display.innerText = "Error";
      }else{
        display.innerText = eval(operand1+operator+display.innerText);
        operator = null;
      }
    }
  }else if(key=="Digit5"){
    display.innerText = parseFloat(display.innerText)/100;
  }else if(key=="AltRight"||key=="AltLeft"){
    display.innerText = display.innerText*-1;
  }else if(key=="Backspace"||key=="Escape"){
    operand1 = null;
    operator = null;
    operand2 = null;
    display.innerText = "";
  }else{
    if(key!='NumpadDecimal') display.innerText += keyValue[key];
    else if(!isDotePresent(display.innerText)) display.innerText += keyValue[key];
  }
}

document.body.addEventListener("keydown",keyBoardHandler);
