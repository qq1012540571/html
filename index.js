document.getElementById("name").innerText = '欢迎用户:' + UrlParam.paramValues("username");


var user1Data = window.localStorage.getItem('user1Data') ? JSON.parse(window.localStorage.getItem('user1Data')) : [];

var userType = UrlParam.paramValues("username");


renderChat();
goChat(userType);


function renderChat() {

    var len = Math.max(user1Data.length);
    var listHtml = '';

    for (var i = 0; i < len; i++) {


        listHtml += getCurChat(user1Data[i]);

    }


    document.querySelector('#messages ul').innerHTML = listHtml;
    scrollDown();

}

function getCurChat(msgArr) {

    var html = '';

    if (!msgArr) return '';


    for (var i = 0; i < msgArr.length; i++) {
        html += '<li style="list-style:none">' + msgArr[i] + '</li>';
    }

    return html;

}

function goChat(userType) {

    var sendBtn = document.querySelector("#send_message");
    var msgTextIpt = userType + ":" + document.getElementById("message").value;
    var sourceData = user1Data;
    var sourceDataName = 'user1Data';
    sendBtn.addEventListener('click', function () {
        msgTextIpt = userType + ":" + document.getElementById("message").value;
        var text = msgTextIpt;
        sourceData.push([text])
        localStorage.setItem(sourceDataName, JSON.stringify(sourceData));
        renderChat();
        msgTextIpt.value = '';
    }, false);

}

//监听storage事件

window.addEventListener('storage', function (e) {


    user1Data = JSON.parse(e.newValue);

    renderChat();

})

//监听回车
window.addEventListener('keypress', function (e) {
    var sendBtn = document.querySelector('#send_message');
    var e = e || event;

    if (e.keyCode == 13) {
        sendBtn.click();
    }
})

//每次发送消息滚动条滑动到最底部
function scrollDown() {
    var innerBox = document.querySelector('#messages');
    var top = innerBox.scrollHeight - innerBox.clientHeight;

    innerBox.scrollTop = top;
}


function go() {
    window.location.href = 'html1.html';

}




