var testData = {
    countElements: [100, 200, 400, 500, 1000, 1200, 1500, 1800, 2000, 2200, 2700, 3000, 5000]
};

var statistics = window.localStorage && JSON.parse(localStorage.getItem('stat')) || {};

var controls = testData.countElements.map(function (item, index) {
    return '<input name="group1" value=' + index + ' type=radio id="count' + index + '" ' + (index === 0 && 'checked') + '><label for=count' + index + '>' + item + '</label>';
})
document.querySelector('.radio').innerHTML = controls.join('<br>');

function getResult(name, time, count) {
    var resultContainer = document.querySelector('.result');
    var result = '';
    var item = time;

    if (!statistics[count]) {
        statistics[count] = [];
    }

    statistics[count].push(item);
    localStorage.setItem('stat', JSON.stringify(statistics));
    var timeSum = 0;
    statistics[count].forEach(function (item) {
        timeSum += item;
    });

    var time = timeSum / statistics[count].length;

    result += '<div class=name>Name: ' + name + '</div>';
    result += '<div class=count>Count Element: ' + count + '</div>';
    result += '<div class=time>Average time: ' + time + '</div>';
    result += '<div class=storage>localStorage: <pre>' + JSON.stringify(statistics) + '</pre></div>';

    resultContainer.innerHTML = result;
}

var getHtml = function (coutElements) {
    var html = '';
    var comment = '<div class="comment comment_level_2"><table class="g g_comment g_max g_gap_M"><tbody><tr><td class="c"><div class="image image_scale_adaptive"><img class="image__img"></div></td><td class="c"><div class="comment__top">' +
        '<table class="g g_max"><tbody><tr><td class="c c_nobr"><div class="comment__info"><div class="comment__login">gena</div><div class="comment__date">2 июля, 19:17</div></div></td><td class="c c_max"></td><td class="c c_nobr">' +
        '<div class="comment__controls"><button class="button button_size_L button_type_clear button_mode_button button_state_release button_icon-only_yes i-bem button_js_inited">' +
        '<span class="button__icon" style="background-image:url(http://guide.yandex-team.ru/i/icon/download_16.svg);"></span><span class="button__label button__label_empty_yes"></span><span class="button__ground"></span><span class="button__border">' +
        '</span><span class="button__arrow"></span></button><button class="button button_size_L button_type_clear button_mode_button button_state_release button_icon-only_yes i-bem button_js_inited">' +
        '<span class="button__icon" style="background-image:url(http://guide.yandex-team.ru/i/icon/download_16.svg);"></span><span class="button__label button__label_empty_yes"></span><span class="button__ground"></span><span class="button__border"></span>' +
        '<span class="button__arrow"></span></button><button class="button button_size_L button_type_clear button_mode_button button_state_release button_icon-only_yes i-bem button_js_inited">' +
        '<span class="button__icon" style="background-image:url(http://guide.yandex-team.ru/i/icon/download_16.svg);"></span><span class="button__label button__label_empty_yes"></span><span class="button__ground"></span><span class="button__border"></span>' +
        '<span class="button__arrow"></span></button><button class="button button_size_L button_type_clear button_mode_button button_state_release button_icon-only_yes i-bem button_js_inited" >' +
        '<span class="button__icon" style="background-image:url(http://guide.yandex-team.ru/i/icon/download_16.svg);"></span><span class="button__label button__label_empty_yes"></span><span class="button__ground"></span><span class="button__border"></span>' +
        '<span class="button__arrow"></span></button></div></td></tr></tbody></table></div><div class="comment__contents"><div class="comment__quote">Оффтопик к разработчикам данного блога: не "оставьте ВАШ комментарий, имярек", а "оставьте СВОЙ комментарий, имярек". </div>' +
        '<div class="comment__p">Вот это вы правильно заметили</div></div></td></tr></tbody></table></div>';
    for (var i = 0; i < coutElements; i++) {
        //html += '<div class="box ' + (i % 3 === 0 ? 'three' : '') + '">Box number ' + i + '</div>';
        html += comment;
    }
    return html;
}
function resetLocalStorage() {
    statistics = {};
    localStorage.removeItem('stat');
}

function insertInDom(insertHtml) {
    var timeBegin = Date.now();
    document.querySelector('.container').innerHTML = insertHtml;
    var time = Date.now() - timeBegin;
    //document.querySelector('.container').innerHTML = ''
    return time;
}

function calc(num) {
    var coutElements = testData.countElements[num];
    var insertHtml = getHtml(coutElements)

    getResult('Display: block', insertInDom(insertHtml), coutElements);
}

document.querySelector('.calc').addEventListener('click', function () {
    var num = document.querySelector('input:checked').attributes.value.value;
    calc(num);
});

document.querySelector('.reset').addEventListener('click', resetLocalStorage);

document.querySelector('.autotest').addEventListener('click', autotest);

function autotest(name) {
    resetLocalStorage();
    var countReset = 5;
    var testedData = testData.countElements.map(function (countElemens) {
        var time = 0;
        for (var i = 0; i < countReset; i++) {
            var insertHtml = getHtml(countElemens);
            time += insertInDom(insertHtml);
            console.log(insertInDom(insertHtml), i, countElemens);
        }

        return (time / countReset).toFixed(2);
    });
    var resultContainer = document.querySelector('.result');
    var result = '';
    var item = testedData;

    result += '<div class=name>Name: ' + name + '</div>';
    result += '<div class=count>Count elements: ' + JSON.stringify(testData.countElements) + '</div>';
    result += '<div class=time>Average time: ' + JSON.stringify(testedData) + '</div>';

    resultContainer.innerHTML = result;

}
