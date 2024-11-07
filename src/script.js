//This is my test of branches/merging

let wordList = ["ABOUT","BOUND","CRANE","DEPTH","EXACT","FRAUD","GLOBE","HOUSE","INPUT","JOINT","KNOWN","LEGAL","STAIN"];

let sampleWord = wordList[Math.floor(Math.random() * wordList.length)].split("", 5);
console.log(sampleWord);
let letterArr = ["", "", "", "", ""];
let cur = 0;
let cur_word = 1;
let cont = true;

let copyable_result = "";
let copyable = [];

let word = document.querySelectorAll("#w1 .letter");
let keys = document.querySelectorAll('.key');

let share = document.getElementById("share")
share.onclick = function(){
  navigator.clipboard.writeText(copyable_result);
}

let reset = document.querySelector("#reset");
reset.onclick = function(){
  letterArr = ["", "", "", "", ""];
  cur = 0;
  cur_word = 1;
  
  for(let i = 0; i < keys.length; i++){
    keys[i].classList.remove("excluded");
    keys[i].classList.remove("outplace");
    keys[i].classList.remove("inplace");
  }
  
  for(let j = 1; j < 7; j++){
    word = document.querySelectorAll("#w" + j + " .letter");
    
    for(let i = 0; i < word.length; i++){
      word[i].innerText = letterArr[i];
      word[i].classList.remove("yellow");
      word[i].classList.remove("green");
      word[i].classList.remove("entered");
      word[i].classList.remove("filled");
    }
    
  }
  cont = true;
  word = document.querySelectorAll("#w1 .letter");
  sampleWord = wordList[Math.floor(Math.random() * wordList.length)].split("", 5);
  let endscreen = document.querySelector("#endscreen");
  endscreen.classList.remove("visible");
  let copyable_result = "";
  copyable = [];
}

document.addEventListener("keyup", (e) => {
  let pressedKey = String(e.key);
  
  if(pressedKey == "Backspace" && cur > 0 && cont){
    cur--;
    letterArr[cur] = "";
  } else if (cur < 5 && pressedKey.match(/[a-zA-Z]/) && pressedKey.length == 1){
    letterArr[cur] = pressedKey.toUpperCase();
    cur++;
  } else if(pressedKey == 'Enter' && cur == 5){
    enterWord();
  }
  
  for(let i = 0; i < word.length; i++){
    word[i].innerText = letterArr[i];
    
    if (letterArr[i] != ""){
      word[i].classList.add("filled");
    } else {
      word[i].classList.remove("filled");
    }
  }
});

function enterWord() {
  cont = false;
  let copyable_line = [];
  for(let i = 0; i < word.length; i++){
    if(sampleWord[i] == letterArr[i]) {
      setTimeout(() => { word[i].classList.add("green");
}, i * 500);
      let cur_key = document.getElementById(letterArr[i].toLowerCase() + "-key");
      cur_key.classList.remove("outplace");
      cur_key.classList.add("inplace");
      copyable_line.push("🟩");
    } else if(sampleWord.includes(letterArr[i])){
      setTimeout(() => { word[i].classList.add("yellow");
}, i * 500);
      let cur_key = document.getElementById(letterArr[i].toLowerCase() + "-key");
      if(!(cur_key.classList.contains("inplace"))) {
        cur_key.classList.add("outplace");
      }
      copyable_line.push("🟨");
    } else {
      setTimeout(() => { word[i].classList.add("entered");
}, i * 500);
      let cur_key = document.getElementById(letterArr[i].toLowerCase() + "-key");
      cur_key.classList.add("excluded");
      copyable_line.push("⬛");
    }
  }
  copyable.push(copyable_line);
  
  setTimeout(() => { 
  cont = true;
  cur_word++;
  if(cur_word < 7 && letterArr.toString() != sampleWord.toString()) {
    word = document.querySelectorAll("#w" + cur_word + " .letter");
    letterArr = ["", "", "", "", ""];
    cur = 0;
  } else {
    finishGame();
  }
  }, 500 * word.length
            )
}

function finishGame(){
  cont = false;
  let endscreen = document.querySelector("#endscreen");
  let endscreenText = document.querySelector("#endscreen h1");
  let endscreenBox = document.querySelector("#endbox");
  if(letterArr.toString() == sampleWord.toString()){
    endscreenBox.classList.remove("lost");
    endscreenText.innerText = "Congratulations!";
    copyable_result += (cur_word - 1) + "/6 \n";
  } else {
    endscreenBox.classList.add("lost");
    endscreenText.innerText = "Thanks for playing!";
    copyable_result += "X/6 \n";
  }
  endscreen.classList.add("visible");
  for(let i = 0; i < copyable.length; i++){
    for(let j = 0; j < copyable[i].length; j++){
      copyable_result += copyable[i][j];
    }
    copyable_result += "\n";
  }
  console.log(copyable_result);
}

class KeyButton {
  constructor(key_name){
    this.key_name = key_name;
    
    const element = document.getElementById(this.key_name + "-key");
    element.addEventListener('click', () => {
      const event = new KeyboardEvent('keyup', {'key': this.key_name});
      document.dispatchEvent(event);
    });
  }
  
}

let key_button_arr = []
for (let i = 97; i <= 122; i++) {
  let letter = String.fromCharCode(i);
  const key_button = new KeyButton(letter);
}
const enter_button = new KeyButton("Enter");
const backspace_button = new KeyButton("Backspace");