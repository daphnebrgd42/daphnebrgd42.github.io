const gameMsgModel = document.getElementById("game_modal");
const el_ul = document.querySelector("ul");
let answer = 0;
let aNum;
let bNum;

window.addEventListener("load", function () {
  setBtnStatus(1);
});

document.querySelector(".guessBtn").addEventListener("click", () => {
  guess();
});

document.querySelector("#StartBtn").addEventListener("click", () => {
  answer = getAnswerNum().join("");
  setBtnStatus(0);
});

document.querySelector("#ansBtn").addEventListener("click", () => {
  gameMsgModel.querySelector(".modal-title").textContent = "Answer is";
  showGameText(answer);
});

document.querySelector("#reBtn").addEventListener("click", () => {
  delLog();
  gameMsgModel.querySelector(".modal-title").textContent = "重來";
  showGameText(`請按下"開始"遊玩新的一局遊戲`);
  setBtnStatus(1);
});

function showLog() {
  const userInputText = document.querySelector("input").value.trim();
  const cr_li = document.createElement("li");
  const cr_span = document.createElement("span");
  const cr_p = document.createElement("p");

  cr_li.classList.add("d-flex");
  cr_li.classList.add("align-items-center");
  cr_li.classList.add("list-group-item");
  cr_span.classList.add("badge");
  cr_span.classList.add("rounded-pill");
  if (aNum === 4) {
    cr_span.classList.add("text-bg-success");
  } else {
    cr_span.classList.add("text-bg-danger");
  }
  cr_p.classList.add("mb-0");
  cr_p.classList.add("mx-2");

  cr_p.textContent = userInputText;
  cr_span.textContent = `${aNum}A${bNum}B`;

  cr_li.appendChild(cr_span);
  cr_li.appendChild(cr_p);
  el_ul.appendChild(cr_li);
}

function delLog() {
  el_ul.replaceChildren();
}

function getAnswerNum() {
  const numArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  for (let i = 0; i < numArr.length; i++) {
    let rdNum = getRandomInt();
    let temp = numArr[i];
    numArr[i] = numArr[rdNum];
    numArr[rdNum] = temp;
  }
  const newArr = numArr.slice(0, 4);
  return newArr;
}

function getRandomInt() {
  const min = 0;
  const max = 10;
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  const x = Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
  return x;
}

function showGameText(msg = "") {
  gameMsgModel.querySelector(".modal-body").textContent = msg;
  const model = bootstrap.Modal.getOrCreateInstance(gameMsgModel);
  model.show();
}

function guess() {
  const userInputText = document.querySelector("input").value.trim();
  aNum = 0;
  bNum = 0;

  if (userInputText == "") {
    gameMsgModel.querySelector(".modal-title").textContent = "輸入有誤";
    showGameText("文字框未輸入數字");
    return;
  }
  if (
    document.querySelector("input").value.length > 4 ||
    new Set(userInputText).size != 4
  ) {
    gameMsgModel.querySelector(".modal-title").textContent = "輸入有誤";
    showGameText("請輸入4個不重複的數字");
    return;
  }

  if (isNaN(userInputText)) {
    gameMsgModel.querySelector(".modal-title").textContent = "輸入有誤";
    showGameText("輸入含有非數字文字");
    return;
  }

  for (let i = 0; i < answer.length; i++) {
    if (userInputText[i] === answer[i]) {
      aNum++;
    } else if (answer.includes(userInputText[i])) {
      bNum++;
    }
  }
  // console.log(aNum);
  // console.log(bNum);
  showLog();
  if (aNum === 4) {
    gameMsgModel.querySelector(".modal-title").textContent =
      "Congratulations!!!";
    showGameText(`猜對答案: ${userInputText}，請按下"重新一局"開始新遊戲`);
    document.getElementById("us_input").disabled = true;
    document.getElementById("guess_Btn").disabled = true;
  }
  document.querySelector("input").value = "";
}

function setBtnStatus(num) {
  document.getElementById("StartBtn").disabled = !num;
  document.getElementById("us_input").disabled = num;
  document.getElementById("guess_Btn").disabled = num;
  document.getElementById("ansBtn").disabled = num;
  document.getElementById("reBtn").disabled = num;
}
