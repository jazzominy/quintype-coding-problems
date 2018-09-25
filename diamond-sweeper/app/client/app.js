import '../stylesheets/style.scss';

let board = null, n = 64;
global.startApp = function(container) {
  board = container;
  renderChecks();
  assignDiamonds();

  board.addEventListener('click',checkForDiamond);
}

/**
 * This function adds the checks to the board
 */
function renderChecks() {
  for(let i = 0; i < n; i++) {
    let check = createCheck();
    board.appendChild(check);
  }
}

/**
 * Function to create instance of a check which displays a question mark by default
 */
function createCheck() {
  let el = document.createElement('li');
  el.className = 'unknown';
  return el;
}

function assignDiamonds() {
  let indexes = [1,5,60,45,34,53,22,19];

  indexes.forEach((i) => {
    let check = board.children.item(i);
    if(check) {
      check.setAttribute('data-has-diamond',true);
    }
  })
}

function getDiamondIndex() {
  let min = 0, max = n;
  let index = parseInt(Math.random() * n);
  return index;
}

function checkForDiamond(e) {
  if(!e || e.target.tagName !== 'LI') {
    return;
  }

  let check = e.target;
  //Need to check the browser compatibility for classlist methods
  check.classList.remove('unknown');

  let hasDiamond = 'hasDiamond' in check.dataset;
  if(hasDiamond) {
    check.classList.add('diamond');
  }
}