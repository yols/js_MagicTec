var target;
var target2;
var target3;
$(document).ready(function() {
    $.get("SubB.html", function(data) { //初始將a.html include div#iframe
        $("#iframe").html(data);
        MagicianTec.Tools.fReSetLayout();
    });
    target = document.getElementById('Header');
    target2 = document.getElementById('Body');
    target3 = document.getElementById('Footer');

    $(function() {
        var tmp = $('.MenuCont .HrefBtn');
        // console.log(tmp);
        $(tmp).click(MagicianTec.Tools.fIfameHarfBtn);
    })
});

function RegHarf() {
    // 找出 li 中的超連結 href(#id)
    var $this = $(this),
        _clickTab = $this.find('a').attr('href'); // 找到連結a中的href標籤值
    console.log(_clickTab);
    if ("-1" !== _clickTab.search("http://")) { //不為http://執行下列程式

        $.get(_clickTab, function(data) {
             $("#iframe").html(data);
            // document.getElementById('iframe').html(data);
            MagicianTec.Tools.fReSetLayout();
        });
        return false;
    }
}

function SetHigh() {

    //document.getElementById('Body').style.top='15.5%';
    //document.getElementById('Footer').style.top='85%';
    target2.style.top = target.scrollHeight.toString() + 'px';
    target3.style.top = target2.scrollHeight.toString() + 'px';
    //target2.style.top = target.scrollHeight;
    //target3.style.top = target2.scrollHeight + target.scrollHeight;
    // var target2 = document.getElementById('Footer');
    // var high= target.scrollHeight;
    // $(target).css('height:'+high.toString()+'px;') ;
    console.log(target2.style.top + ',' + target3.style.top);
}

// function resizeIframe() {
//     //获取对象
//     var head = document.getElementById("head");
//     var middle = document.getElementById("middle");
//     var foot = document.getElementById("foot");
//
//     //中间页面中id为mian的DIV
//     var middleMainDiv = middle.contentWindow.document.getElementById("main");
//     try {
//         //根据实际页面大小调整高度
//         head.height = head.contentWindow.document.body.scrollHeight;
//         foot.height = foot.contentWindow.document.body.scrollHeight;
//         middle.height = middle.contentWindow.document.body.scrollHeight;
//
//         //alert(middle.contentWindow.document.body.scrollHeight);
//
//         if (middle.contentWindow.document.body.scrollHeight < 720) //准确值为713
//         {
//             //调整DIV的高度
//             if (middleMainDiv.style.height < 580) {
//                 middleMainDiv.style.height = 580;
//             }
//         }
//     } catch (ex) {}
// }
// //定时执函数（经过测试，这样做对CPU利用率的影响几乎为零）
// window.setInterval("resizeIframe()", 200);
