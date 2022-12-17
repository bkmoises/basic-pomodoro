const timerEl = document.querySelector('.timer');
const startBtn = document.querySelector('.start');
let timer;
let minutes = 0
let seconds = 10;
let times = 0;
let pause = false;

function startPomodoro() {
  timer = setInterval(function() {

    seconds--;

    if (!minutes && !seconds) {
      clearInterval(timer);
      pause = !pause;

      if (pause && times == 4) {
        minutes = 24;
        seconds = 59;
        times = 0;
        timerEl.innerHTML = "00:00"
        startBtn.innerText = "Começar";
        return;
      } else if (pause) {
        minutes = 4
        seconds = 59;
        timerEl.innerHTML = "00:00"
        startBtn.innerText = "Começar";
        return;
      } else {
        minutes = 14;
        seconds = 59;
        times++;
        timerEl.innerHTML = "00:00"
        startBtn.innerText = "Começar";
        return;
      };

    };

    if (!seconds) {
      seconds = 59;
      minutes--;
      };

    timerEl.innerHTML = (`${minutes.toString().padStart(2, 0)}:${seconds.toString().padStart(2, 0)}`)


  }, 1000);

};

document.addEventListener('click', function(e) {
  const el = e.target;

  if (el.textContent === "Começar") {
    clearInterval(timer);
    startBtn.innerText = 'Pausar';
    const elm = document.createElement("button")
    const elmText = document.createTextNode("Pausar");
    elm.appendChild(elmText);

    const body = document.querySelector("div");
    body.appendChild(elm);

    elm2 = document.createElement('button');
    const elmText2 = document.createTextNode("Reiniciar");
    elm2.appendChild(elmText2);

    body.appendChild(elm2);

    startPomodoro();
  };

  if (el.classList.contains('pause')) {
    clearInterval(timer);
  }



});
