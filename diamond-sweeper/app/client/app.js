let board = null, n = 64;

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