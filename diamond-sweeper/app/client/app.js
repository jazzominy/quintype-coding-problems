let board = null, checks = [], n = 64, diamondsRevealedCnt = 0,
    message = 'Yahoo!! You found all the diamonds. Your score is ';

global.startApp = function(container) {
  board = container;

  renderChecks();
  assignDiamonds();

  //Take advantage of event bubbling to listen for click event on parent
  //instead of attaching listener per child
  board.addEventListener('click',checkForDiamond);
}

/**
 * This function adds the checks to the board
 */
function renderChecks() {
  for(let i = 0; i < n; i++) {
    let check = createCheck();
    board.appendChild(check);
    checks.push(check);
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

/**
 * Add diamonds to the checks
 */
function assignDiamonds() {
  let indices = getDiamondIndices();

  indices.forEach((i) => {
    let check = board.children.item(i);
    if(check) {
      check.setAttribute('data-has-diamond',true);
    }
  })
}

/**
 * Randomize diamond indices
 */
function getDiamondIndices() {
  let max = n, indices = [];

  while(indices.length != 8) {
    let index = parseInt(Math.random() * max);

    //If generated index already added then continue
    if(indices.indexOf(index) != -1) {
      continue;
    }
    
    indices.push(index);
  }
  
  return indices;
}

/**
 * On check click, display the diamond if present
 * @param {*} e event object
 */
function checkForDiamond(e) {
  if(!e || e.target.tagName !== 'LI') {
    return;
  }

  let check = e.target;

  //For already open check, do nothing
  if(check.classList.length == 0) {
    return;
  }
  //Need to check the browser compatibility for classlist methods
  check.classList.remove('unknown');

  let hasDiamond = 'hasDiamond' in check.dataset;
  if(hasDiamond) {
    check.classList.add('diamond');
    diamondsRevealedCnt++;
  }

  //Maintain a count of unknown checks
  if(checks && checks.length) {
    checks.splice(checks.indexOf(check),1);
  }

  checkGameOver();
}

/**
 * Function to check if game is over or not. It displays the message accordingly
 */
function checkGameOver() {
  if(diamondsRevealedCnt == 8) {

    board.removeEventListener('click',checkForDiamond);

    let msgEl = document.querySelector('.message');
    if(msgEl) {
      msgEl.textContent = message + checks.length;
      msgEl.style.display = 'inline-block';
    }
  }
}