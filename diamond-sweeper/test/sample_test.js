const jsdom = require('jsdom').jsdom;

//Use jsdom (https://github.com/jsdom/jsdom) for testing without a browser
let document = jsdom('');
/* let window = document.defaultView;
window.console = global.console; */

const assert = require('assert');
const app = require('../app/client/app');

describe("A Simple Test", () => {
  it("works", () => {
    assert(true);
  })
});

describe("startApp()", () => {
  let ul = null;

  //Create new ul before each test
  beforeEach(() => {
    ul = document.createElement('ul');
  })

  it("should call with no error", () => {
    startApp(ul);
    assert.ok(true);
  });

  it("should create 64 checks", () => {
    startApp(ul);
    assert.equal(ul.children.length,64,'no. of checks not matching');
  })

  it("should have all the checks with a question mark", () => {
    let result = true;
    startApp(ul);

    for(let i = 0; i < ul.children.length; i++) {
      let el = ul.children.item(i);
      result = result && el.classList.contains('unknown');
    }

    assert.equal(result,true,'All the checks does not have a question mark');
  })

  it("should create checks with exactly 8 hidden diamonds", () => {
    let count = 0;
    startApp(ul);
    
    for(let i = 0; i < ul.children.length; i++) {
      let el = ul.children.item(i);
      
      if(el.getAttribute('data-has-diamond')) {
        count++;
      }
    }

    assert.equal(count,8,`There are ${count} diamonds hidded instead of 8`);
  })
})