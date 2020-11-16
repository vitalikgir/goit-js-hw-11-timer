class CountdownTimer {
  constructor({ timerID, targetDate, onTick }) {
    //получаем номер таймера, целевую дату и функцию для отрисовки UI
    this.onTickUI = onTick; // получаем ссылкуна внешнюю функцию
    this.targetDate = new Date(targetDate); //целевая дата в мс
    this.timerEl = document.querySelector(timerID); // находим таймер на странице
    this.runTimer(); //запускам таймер
  }

  pad(value) {
    //преобразуем число в строку и добавляем 0 перед числом, если оно из одного символа
    return String(value).padStart(2, "0");
  }

  runTimer() {
    this.timerCounter(); // сразу выполняем подсчет таймера и отображем его на странице, т.к. следующее выполнение будет только через секунду
    setInterval(() => {
      this.timerCounter();
    }, 1000);
  }

  timerCounter() {
    this.dateEventCalculated = this.targetDate - Date.now(); //получаем разницу дат
    this.dateNowCalculated = this.timerSeparator(this.dateEventCalculated); //получаем объект в котором отделены дним, часы, минуты и секунды
    this.onTickUI(this.dateNowCalculated, this.timerEl); //UI отрисовка таймера
  }

  timerSeparator(time) {
    if (time <= 0) {
      return { days: "00", hours: "00", mins: "00", secs: "00" };
    }
    /*
     * Оставшиеся дни: делим значение UTC на 1000 * 60 * 60 * 24, количество
     * миллисекунд в одном дне (миллисекунды * секунды * минуты * часы)
     */
    const days = Math.floor(time / (1000 * 60 * 60 * 24));

    /*
     * Оставшиеся часы: получаем остаток от предыдущего расчета с помощью оператора
     * остатка % и делим его на количество миллисекунд в одном часе
     * (1000 * 60 * 60 = миллисекунды * минуты * секунды)
     */
    const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    /*
     * Оставшиеся минуты: получаем оставшиеся минуты и делим их на количество
     * миллисекунд в одной минуте (1000 * 60 = миллисекунды * секунды)
     */
    const mins = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));

    /*
     * Оставшиеся секунды: получаем оставшиеся секунды и делим их на количество
     * миллисекунд в одной секунде (1000)
     */
    const secs = Math.floor((time % (1000 * 60)) / 1000);

    return {
      days: this.pad(days),
      hours: this.pad(hours),
      mins: this.pad(mins),
      secs: this.pad(secs),
    };
  }
}

function uptadeTimerUI({ days, hours, mins, secs }, timerEl) {
  const refs = {
    days: timerEl.querySelector('[data-value="days"]'),
    hours: timerEl.querySelector('[data-value="hours"]'),
    mins: timerEl.querySelector('[data-value="mins"]'),
    secs: timerEl.querySelector('[data-value="secs"]'),
  };

  refs.days.innerHTML = days;
  refs.hours.innerHTML = hours;
  refs.mins.innerHTML = mins;
  refs.secs.innerHTML = secs;
}

new CountdownTimer({
  timerID: "#timer-1",
  targetDate: new Date("Jan 1, 2021"),
  onTick: uptadeTimerUI,
});

new CountdownTimer({
  timerID: "#timer-2",
  targetDate: new Date("Jun 20, 2099"),
  onTick: uptadeTimerUI,
});

new CountdownTimer({
  timerID: "#timer-3",
  targetDate: new Date("Sept 5, 2021"),
  onTick: uptadeTimerUI,
});
