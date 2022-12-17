function createPomodoro() {
  return {
    startBtn: document.querySelector('.start'),
    timer: document.querySelector('.timer'),
    div: document.querySelector('div'),
    minutes: 25,
    seconds: 0,
    times: 0,
    timerCtrl: 0,
    pause: false,

    start() {
      this.startPomodoro();
    },

    startTimer() {
      this.timerCtrl = setInterval(() => {
        this.seconds--;

        if (this.seconds === -1) {
          this.seconds = 59;
          this.minutes--;
        };

        if (this.minutes === -1) {

          this.mainPomodoro();
          this.pause = !this.pause;

          if (this.pause && this.times == 4) {
            this.minutes = 15;
            this.seconds = 00;
            this.times = 0;
          } else if (this.pause) {
            this.minutes = 5;
            this.seconds = 00;
          } else {
            this.minutes = 25;
            this.seconds = 00;
            this.times++;
          };
        };

        this.timer.innerHTML = (`${this.minutes.toString().padStart(2, 0)}:${this.seconds.toString().padStart(2, 0)}`);

      }, 1000);

    },

    startPomodoro() {
      document.addEventListener('click', e => {
        const el = e.target;

        if (el.textContent === "Começar") {
          this.startTimer();
          this.pausePomodoro();
          return;
        };

        if (el.textContent === "Pausar") {
          this.resumePomodoro();
          return;
        };

        if (el.textContent === "Retornar") {
          this.returnPomodoro();
          return;
        };

        if (el.textContent === "Reiniciar") {
          this.restartPomodoro();
          return;
        };

      });
    },

    mainPomodoro() {
      clearInterval(this.timerCtrl);
      this.startBtn.innerHTML = "Começar";
    },

    pausePomodoro() {
      this.startBtn.innerHTML = 'Pausar';
    },

    resumePomodoro() {
      clearInterval(this.timerCtrl);

      const restartBtnText = document.createTextNode("Reiniciar");
      const restartBtn = document.createElement('button');

      restartBtn.appendChild(restartBtnText);
      restartBtn.classList.add('restart');

      this.div.appendChild(restartBtn);
      this.startBtn.innerHTML = "Retornar";
    },

    returnPomodoro() {
      this.startTimer();
      this.rmRestartBtn();
      this.pausePomodoro();
    },

    restartPomodoro() {
      this.times = 0;
      this.minutes = 25;
      this.seconds = 0;
      this.pause = false;

      this.rmRestartBtn();

      this.timer.innerHTML = "25:00";
      this.startBtn.innerHTML = "Começar";
    },

    rmRestartBtn() {
      const el = document.querySelector('.restart');
      el.remove();
    },

  };
};

const pomodoro = createPomodoro();
pomodoro.start();
