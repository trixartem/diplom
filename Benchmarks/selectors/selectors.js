function createBoxes() {
    var container = document.querySelector('.container');
    var count = 10000;
    for (var i = 0; i < count; i++) {
        var box = document.createElement('div');
        box.classList.add('box');
        if (i === count - 1) {
            box.classList.add('box__last');
        }
        if (i === count / 2) {
            box.classList.add('box__middle');
        }
        box.innerHTML = '<div id=' + i + ' class="box__header"><span class="box__span">Span</span><a class="box__link" href="#link-f">link</a><button>button</button></div>';
        box.innerHTML += '<h2 class="box__h2"></h2>';
        if ((Math.random() * 10) > 4) {
            box.innerHTML += '<div class="box__footer"><span class="box__footer-span">SPAN</span><a class="box__footer-link" href="#link-a">LINK</a><input value="input" class="input"></div>';
        }
        container.appendChild(box);
    }
}
createBoxes();

var selectors = [
    "#box2001",
    "* #box1992",
    ".box__middle div  h2",
    ".container > .box__footer > .box__footer-span",
    ".container .box__footer .box__footer-span",
    ".box.box__last:after",
    "a",
    "button",
    ".box:first-child",
    ".box__last .title",
    ".box:last-child",
    "div > div > input",
    "span:nth-last-child(-n+1)",
    "div div div.box.box__last div  h3",
    ".box__footer-span + .box__footer-link + .input",
    "div", "div.box:not(:empty)",
    "div.box:not(.box__middle)",
    "span:not(.box__footer-span)",
    "* span", "box__footer-span ~ a",
    "a:link",
    "* div",
    "div  div  span",
    "[href^='#li']",
    "div div span + a + input",
    ".box span:only-child",
    "div div span + a",
    "div > div > span",
    "div:last-child",
    "[href='#link-f']",
    "[href*='li']",
    "div * ",
    "a:hover",
    "div:nth-child(-n+1)",
    "div:nth-child(200)",
    "div:nth-last-child(-n+1)",
    "div:nth-of-type(200)"
];

function getAverageTime(arr) {
    var sum = arr.reduce(function (sum, current) {
        return sum + current
    });
    return {
        sum: sum,
        aver: (sum / arr.length).toFixed(2)
    };
}

var table = document.querySelector('table');
var row = '';
var SelectorObject = localStorage.getItem('selector') ? JSON.parse(localStorage.getItem('selector')) : {};
var average = [];
selectors.forEach(function (s) {
    SelectorObject[s] = SelectorObject[s] || [];
    var time;
    var g = Date.now();

    document.querySelectorAll(s);

    time = Date.now() - g;
    SelectorObject[s].push(time);

    var averageTime = getAverageTime(SelectorObject[s]);

    average.push(averageTime.aver);
    row += '<tr><td>' + s + '</td><td>' + averageTime.aver + '</td></tr>';
});

table.innerHTML = row;

function joinAndSorted(arr1, arr2) {
    var result = arr1.map(function (item, index) {
        return {
            name: item,
            val: arr2[index]
        }
    });
    return _.sortBy(result, 'val')
}

localStorage.setItem('selector', JSON.stringify(SelectorObject));

var el = document.createElement('pre');
el.innerText = average.join() + JSON.stringify(SelectorObject);

console.log(average.join());
document.getElementById('json').appendChild(el);
console.log(SelectorObject);

function change() {
    var cont = document.querySelector('.container');
    console.time('styles');
    cont.classList.add('color');
    console.timeEnd('styles');
};
