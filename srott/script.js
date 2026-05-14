const cutin =
  document.getElementById(
    "cutin"
  );
const symbols = [
  "7",
  "🍒",
  "🔔",
  "⭐",
  "🍉"
];

const reels = [
  document.getElementById("reel1"),
  document.getElementById("reel2"),
  document.getElementById("reel3")
];

const result =
  document.getElementById("result");

const chance =
  document.getElementById("chance");

const push =
  document.getElementById("push");

const creditText =
  document.getElementById("credit");

const stopSound =
  document.getElementById(
    "stopSound"
  );

const effects = [

  "🌈 CHANCE! 🌈",

  "⚡ 激アツ！ ⚡",

  "🔥 LONG FREEZE 🔥",

  "👑 PREMIUM 👑",

  "💎 RAINBOW BONUS 💎",

  "🎯 PUSHを押せ！ 🎯",

  "💥 BLACKOUT 💥",

  "🔇 無音演出 🔇"

];

let positions = [0, 0, 0];

let spinning = [
  false,
  false,
  false
];

let stopped = [
  false,
  false,
  false
];

let bonusFlag = false;

let effectMode = 0;

let credit = 9999;

creditText.textContent =
  "CREDIT : " + credit;

function createReel(reel){

  let html = "";

  for(let i = 0; i < 30; i++){

    const symbol =
      symbols[i % symbols.length];

    html +=
    `
    <div class="symbol">
      ${symbol}
    </div>
    `;

  }

  reel.innerHTML = html;

}

reels.forEach(createReel);

function update(){

  for(let i = 0; i < 3; i++){

    if(spinning[i]){

      positions[i] += 20;

      if(positions[i] >= 3600){

        positions[i] = 0;

      }

      reels[i].style.top =
        -positions[i] + "px";

    }

  }

  requestAnimationFrame(update);

}

update();

function startSlot(){

  if(
    spinning[0] ||
    spinning[1] ||
    spinning[2]
  ){
    return;
  }

  if(credit < 3){

    result.textContent =
      "コイン不足";

    return;

  }

  credit -= 3;

  creditText.textContent =
    "CREDIT : " + credit;

  result.textContent = "";

  chance.textContent = "";

  push.textContent = "";

  chance.className = "";

  push.className = "";

  document.body.className = "";

  stopped = [
    false,
    false,
    false
  ];

  const random =
    Math.random();

  bonusFlag = random < 0.03;

  if(bonusFlag){
    cutin.style.display =
  "block";

setTimeout(() => {

  cutin.style.display =
    "none";

}, 1000);

    const randomIndex =
      Math.floor(
        Math.random() * effects.length
      );

    const randomEffect =
      effects[randomIndex];

    chance.textContent =
      randomEffect;

    chance.classList.add(
      "chance-animation"
    );

    chance.classList.add(
      "premium"
    );

    effectMode = randomIndex;

    if(effectMode === 0){

      document.body.classList.add(
        "rainbow-background"
      );

    }

    if(effectMode === 1){

      document.body.classList.add(
        "super-flash"
      );

    }

    if(effectMode === 2){

      document.body.classList.add(
        "long-freeze"
      );

    }

    if(effectMode === 6){

      document.body.classList.add(
        "blackout"
      );

    }

    if(effectMode === 7){

      document.body.classList.add(
        "silent"
      );

    }

    if(effectMode === 5){

      push.textContent =
        "🔥 PUSH 🔥";

      push.classList.add(
        "push-animation"
      );

    }

  }

  for(let i = 0; i < 3; i++){

    spinning[i] = true;

  }

}

function stopReel(index){

  if(stopped[index]){
    return;
  }

  spinning[index] = false;

  stopped[index] = true;

  const symbolHeight = 120;

  positions[index] =
    Math.round(
      positions[index] / symbolHeight
    ) * symbolHeight;

  reels[index].style.top =
    -positions[index] + "px";

  if(
    stopped[0] &&
    stopped[1] &&
    stopped[2]
  ){

    checkResult();

  }

}

  if(
    stopped[0] &&
    stopped[1] &&
    stopped[2]
  ){

    checkResult();

  }


function getSymbol(index){

  if(bonusFlag){

    return "BONUS";

  }

  const position =
    Math.floor(
      positions[index] / 120
    );

  return symbols[
    position % symbols.length
  ];

}

function checkResult(){

  const a = getSymbol(0);

  const b = getSymbol(1);

  const c = getSymbol(2);

  if(a === b && b === c){

    result.textContent =
      "🎉 BIG BONUS 🎉";

    result.classList.add(
      "big-win"
    );

    credit += 50;

    creditText.textContent =
      "CREDIT : " + credit;

  }else{

    result.textContent =
      "ハズレ";

    result.classList.remove(
      "big-win"
    );

    document.body.classList.add(
      "shake"
    );

    setTimeout(() => {

      document.body.classList.remove(
        "shake"
      );

    }, 300);

  }

}