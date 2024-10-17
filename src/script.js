let wordList = ["ABOUT","BOUND","CRANE","DEPTH","EXACT","FRAUD","GLOBE","HOUSE","INPUT","JOINT","KNOWN","LEGAL","STAIN"];

//test commit!

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

//KEYBOARD ROW 1
let q_key = document.getElementById("q-key");
q_key.addEventListener('click', () => {
    const event = new KeyboardEvent('keyup', {'key': 'q'});
    document.dispatchEvent(event);
});

let w_key = document.getElementById("w-key");
w_key.addEventListener('click', () => {
    const event = new KeyboardEvent('keyup', {'key': 'w'});
    document.dispatchEvent(event);
});

let e_key = document.getElementById("e-key");
e_key.addEventListener('click', () => {
    const event = new KeyboardEvent('keyup', {'key': 'e'});
    document.dispatchEvent(event);
});

let r_key = document.getElementById("r-key");
r_key.addEventListener('click', () => {
    const event = new KeyboardEvent('keyup', {'key': 'r'});
    document.dispatchEvent(event);
});

let t_key = document.getElementById("t-key");
t_key.addEventListener('click', () => {
    const event = new KeyboardEvent('keyup', {'key': 't'});
    document.dispatchEvent(event);
});

let y_key = document.getElementById("y-key");
y_key.addEventListener('click', () => {
    const event = new KeyboardEvent('keyup', {'key': 'y'});
    document.dispatchEvent(event);
});

let u_key = document.getElementById("u-key");
u_key.addEventListener('click', () => {
    const event = new KeyboardEvent('keyup', {'key': 'u'});
    document.dispatchEvent(event);
});

let i_key = document.getElementById("i-key");
i_key.addEventListener('click', () => {
    const event = new KeyboardEvent('keyup', {'key': 'i'});
    document.dispatchEvent(event);
});

let o_key = document.getElementById("o-key");
o_key.addEventListener('click', () => {
    const event = new KeyboardEvent('keyup', {'key': 'o'});
    document.dispatchEvent(event);
});

let p_key = document.getElementById("p-key");
p_key.addEventListener('click', () => {
    const event = new KeyboardEvent('keyup', {'key': 'p'});
    document.dispatchEvent(event);
});

//KEYBOARD ROW 2
let a_key = document.getElementById("a-key");
a_key.addEventListener('click', () => {
    const event = new KeyboardEvent('keyup', {'key': 'a'});
    document.dispatchEvent(event);
});

let s_key = document.getElementById("s-key");
s_key.addEventListener('click', () => {
    const event = new KeyboardEvent('keyup', {'key': 's'});
    document.dispatchEvent(event);
});

let d_key = document.getElementById("d-key");
d_key.addEventListener('click', () => {
    const event = new KeyboardEvent('keyup', {'key': 'd'});
    document.dispatchEvent(event);
});

let f_key = document.getElementById("f-key");
f_key.addEventListener('click', () => {
    const event = new KeyboardEvent('keyup', {'key': 'f'});
    document.dispatchEvent(event);
});

let g_key = document.getElementById("g-key");
g_key.addEventListener('click', () => {
    const event = new KeyboardEvent('keyup', {'key': 'g'});
    document.dispatchEvent(event);
});

let h_key = document.getElementById("h-key");
h_key.addEventListener('click', () => {
    const event = new KeyboardEvent('keyup', {'key': 'h'});
    document.dispatchEvent(event);
});

let j_key = document.getElementById("j-key");
j_key.addEventListener('click', () => {
    const event = new KeyboardEvent('keyup', {'key': 'j'});
    document.dispatchEvent(event);
});

let k_key = document.getElementById("k-key");
k_key.addEventListener('click', () => {
    const event = new KeyboardEvent('keyup', {'key': 'k'});
    document.dispatchEvent(event);
});

let l_key = document.getElementById("l-key");
l_key.addEventListener('click', () => {
    const event = new KeyboardEvent('keyup', {'key': 'l'});
    document.dispatchEvent(event);
});

//KEYBOARD ROW 3
let enter_key = document.getElementById("enter-key");
enter_key.addEventListener('click', () => {
    const event = new KeyboardEvent('keyup', {'key': 'Enter'});
    document.dispatchEvent(event);
});

let z_key = document.getElementById("z-key");
z_key.addEventListener('click', () => {
    const event = new KeyboardEvent('keyup', {'key': 'z'});
    document.dispatchEvent(event);
});

let x_key = document.getElementById("x-key");
x_key.addEventListener('click', () => {
    const event = new KeyboardEvent('keyup', {'key': 'x'});
    document.dispatchEvent(event);
});

let c_key = document.getElementById("c-key");
c_key.addEventListener('click', () => {
    const event = new KeyboardEvent('keyup', {'key': 'c'});
    document.dispatchEvent(event);
});

let v_key = document.getElementById("v-key");
v_key.addEventListener('click', () => {
    const event = new KeyboardEvent('keyup', {'key': 'v'});
    document.dispatchEvent(event);
});

let b_key = document.getElementById("b-key");
b_key.addEventListener('click', () => {
    const event = new KeyboardEvent('keyup', {'key': 'b'});
    document.dispatchEvent(event);
});

let n_key = document.getElementById("n-key");
n_key.addEventListener('click', () => {
    const event = new KeyboardEvent('keyup', {'key': 'n'});
    document.dispatchEvent(event);
});

let m_key = document.getElementById("m-key");
m_key.addEventListener('click', () => {
    const event = new KeyboardEvent('keyup', {'key': 'm'});
    document.dispatchEvent(event);
});

let back_key = document.getElementById("back-key");
back_key.addEventListener('click', () => {
    const event = new KeyboardEvent('keyup', {'key': 'Backspace'});
    document.dispatchEvent(event);
});

