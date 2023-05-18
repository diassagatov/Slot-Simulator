let userBalance = 5000;

let depositSound = new Audio('sound/deposit.wav');
let reelSound = new Audio('sound/reel-click.wav');


const updateBalance = () => {
  let balance = document.querySelector("#balance");
  balance.innerHTML = "$ " + userBalance;
}

updateBalance();

const openModal = (form) => {
    form.showModal();
}

const closeModal = (form) => {
    form.close();
}

// user deposits money
const getDeposit = () => {
    let depAmount = parseFloat(document.querySelector('#depAmount').value);
    console.log(depAmount);
    if(!(isNaN(depAmount) || depAmount <= 0)){
        depositSound.play();  
        userBalance += depAmount;
        updateBalance();
        closeModal(document.getElementById('deposit-form'));
    }else{
        alert("You sure that represents amount of money??");
    }
}

const getWithdrawal = () => {
    let drawAmount = parseFloat(document.querySelector('#drawAmount').value);
    if(!(isNaN(drawAmount) || drawAmount > userBalance)){
        userBalance -= drawAmount;
        updateBalance();
        closeModal(document.getElementById('withdraw-form'));
    }else{
        alert("No money , no honey bruh");
    }
}

  
(function () {
  const items = [
    '👻',
    '💵',  
    '🦖',
    '👑',
    '🎄',  
    '👻',
    '💵',  
    '🦖',
    '👑',
    '🎄', 
    '🧲',
    '🧲'
  ];
  const doors = document.querySelectorAll('.door');
  
  document.querySelector('#spinner').addEventListener('click', spin);

  function init(firstInit = true, groups = 1, duration = 1) {
    for (const door of doors) {
      if (firstInit) {
        door.dataset.spinned = '0';
      } else if (door.dataset.spinned === '1') {
        return;
      }

      const boxes = door.querySelector('.boxes');
      const boxesClone = boxes.cloneNode(false);
      const pool = ['❓'];

      if (!firstInit) {
        const arr = [];
        for (let n = 0; n < (groups > 0 ? groups : 1); n++) {
          arr.push(...items);
        }
        pool.push(...shuffle(arr));

        boxesClone.addEventListener(
          'transitionstart',
          function () {
            door.dataset.spinned = '1';
            this.querySelectorAll('.box').forEach((box) => {
              box.style.filter = 'blur(1px)';
            });
          },
          { once: true }
        );

        boxesClone.addEventListener(
          'transitionend',
          function () {
            this.querySelectorAll('.box').forEach((box, index) => {
              box.style.filter = 'blur(0)';
              if (index > 0) this.removeChild(box);
            });
          },
          { once: true }
        );
      }

      for (let i = pool.length - 1; i >= 0; i--) {
        const box = document.createElement('div');
        box.classList.add('box');
        box.style.width = door.clientWidth + 'px';
        box.style.height = door.clientHeight + 'px';
        box.textContent = pool[i];
        boxesClone.appendChild(box);
      }
      boxesClone.style.transitionDuration = `${duration > 0 ? duration : 1}s`;
      boxesClone.style.transform = `translateY(-${door.clientHeight * (pool.length - 1)}px)`;
      door.replaceChild(boxesClone, boxes);
    }
  }

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async function check(){

    var x = 0;
    while(x!=6){ 
      reelSound.cloneNode(true).play();
      await sleep(x*50);
      x++;
    }

    if(doors[0].querySelector('.boxes').querySelector('.box').innerHTML == doors[1].querySelector('.boxes').querySelector('.box').innerHTML && doors[1].querySelector('.boxes').querySelector('.box').innerHTML == doors[2].querySelector('.boxes').querySelector('.box').innerHTML){
      console.log("helloo");
      userBalance += 100000;
      updateBalance();
    }
  }

  

  async function spin() {
    userBalance -= 1000;
    updateBalance();
    init();
    init(false, 0, 1);
    
    for (const door of doors){
      const boxes = door.querySelector('.boxes');
      const duration = parseInt(boxes.style.transitionDuration);
      boxes.style.transform = 'translateY(0)';
      await new Promise((resolve) => setTimeout(resolve, duration * 50));
      }

    check();
  }

  function shuffle([...arr]) {
    let m = arr.length;
    while (m) {
      const i = Math.floor(Math.random() * m--);
      [arr[m], arr[i]] = [arr[i], arr[m]];
    }
    return arr;
  }

  init();
})();
