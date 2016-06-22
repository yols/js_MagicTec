var bUsername = false;
var bPhoneNum = false;
var bEmail = false;
var bVerifyCode = false;
// 處理分業標籤頁---------------------------------
$(function() {
    // 預設顯示第一個 Tab
    var _showTab = 0;
    var $defaultLi = $('ul.tabs li').eq(_showTab).addClass('active');
    $($defaultLi.find('a').attr('href')).siblings().hide();

    // 當 li 頁籤被點擊時...
    // 若要改成滑鼠移到 li 頁籤就切換時, 把 click 改成 mouseover
    $('ul.tabs li').click(function() {
        // 找出 li 中的超連結 href(#id)
        var $this = $(this),
            _clickTab = $this.find('a').attr('href');
        // 把目前點擊到的 li 頁籤加上 .active
        // 並把兄弟元素中有 .active 的都移除 class
        $this.addClass('active').siblings('.active').removeClass('active');
        // 淡入相對應的內容並隱藏兄弟元素
        $(_clickTab).stop(false, true).fadeIn().siblings().hide();

        return false;
    }).find('a').focus(function() {
        this.blur();
    });
});

// execute the behaviors of the fileds -----------------------------------
$(function() {
    $("#_term").attr("checked", false);
    $("#_submit").attr("disabled", true);
    //account field
    $("input#_username").focus(function() { //focus on
        bUsername = false;
        $("input#_username").css("background-color", "#FFFFCC");
        $("label.show_1").css("color", "black");
        $("label.show_1").html("8-12位小写字母或数字组合。");
        //$("input#_username").val(''); //清空欄位
    });
    $("input#_username").blur(function() { //focus off
        bUsername = false;
        $("input#_username").css("background-color", "#FFFFFF");
        var _username_Length = $("input#_username").val().length;
        console.log("帳號長度：" + _username_Length);
        if (_username_Length > 7) {
            $("label.show_1").css("color", "black");
            //帳號長度正確後再進行驗證，檢查帳號是否重複
            var ajaxUrl = "../index.php?c=signup&m=checkusername";
            var username = $("input#_username").val();

            $.ajax({
                url: ajaxUrl,
                type: 'POST', //有POST、GET兩種方式
                dataType: 'HTML',
                data: { //往後台送的資料，用key : value,
                    username: username
                },
                success: function(data, textStatus, jqXHR) { //傳遞成功時執行，引數是回傳資料
                    var jsonObj = eval("(" + data + ")");
                    if (jsonObj.status === 105) { //帳號欄位OK
                        $("label.show_1").css("color", "black");
                        bUsername = true;
                        // fcheckAllFields();
                    } else {
                        $("label.show_1").css("color", "red");
                    }
                    $("label.show_1").html("後台:" + jsonObj.msg);
                }

            });

        } else if (_username_Length === 0) {
            $("label.show_1").css("color", "black");
        } else {
            $("label.show_1").css("color", "red");
            $("label.show_1").html("帐号长度不够");
        }
        // fcheckAllFields();
    });

    //cellphone field
    $("input#_phoneNum").focus(function() { //focus on
        bPhoneNum = false;
        $("input#_phoneNum").css("background-color", "#FFFFCC");
        $("label.show_2").css("color", "black");
        $("label.show_2").html("手机号码为取款确认的唯一凭证，请正确填写。");
    });
    $("input#_phoneNum").blur(function() { //focus off
        $("input#_phoneNum").css("background-color", "#FFFFFF");
        var _phoneNum_Length = $("input#_phoneNum").val().length;
        while (_phoneNum_Length > 0) {
            if (_phoneNum_Length < 11) {
                $("label.show_2").css("color", "red");
                $("label.show_2").html("手机号码未滿11碼!!");
            } else if (!fverifyPhone()) {
                $("label.show_2").css("color", "red");
                $("label.show_2").html("手机号码有误!!");

            } else { //手機欄位OK
                bPhoneNum = true;
                // fcheckAllFields();
                $("label.show_2").css("color", "black");
                $("label.show_2").html("手机号码可以");
            }
            break;
        }
        fcheckAllFields();
    });

    //email field
    $("input#_email").focus(function() { //focus on
        bEmail = false;
        $("input#_email").css("background-color", "#FFFFCC");
        $("label.show_3").css("color", "black");
        $("label.show_3").html("请填写真实邮箱，确保优惠活动能发送到您的邮箱。");
    });
    $("input#_email").blur(function() { //focus off
        $("input#_email").css("background-color", "#FFFFFF");
        var _email_Length = $("input#_email").val().length;
        if (_email_Length > 0) {
            if (fverifyEmail()) { //mail is available
                bEmail = true;
                // fcheckAllFields();
                $("label.show_3").css("color", "black");
                $("label.show_3").html("邮箱地址可以");
            } else {
                $("label.show_3").css("color", "red");
                $("label.show_3").html("邮箱地址有误");
            }
        }
        fcheckAllFields();
    });

    //validation number field
    $("input#_valiNum").focus(function() { //focus on
        bVerifyCode = false;
        $("input#_valiNum").css("background-color", "#FFFFCC");
        $("label.show_4").css("color", "black");
        $("label.show_4").html("请填写验证码。");
    });
    $("input#_valiNum").blur(function() { //focus off
        $("input#_valiNum").css("background-color", "#FFFFFF");
        var _valiNumLength = $("input#_valiNum").val().length;
        while (_valiNumLength > 0) {
            if (_valiNumLength < 4) { //validation code is wrong
                $("label.show_4").css("color", "red");
                $("label.show_4").html("验证码有误");
            } else {
                bVerifyCode = true;
                $("label.show_4").css("color", "black");
                $("label.show_4").html("验证码可以");
            }
            break;
        }
        fcheckAllFields();
    });

    //Update the picture of validation
    $("img#vali_Pic").click(function() {
        //.click() .mouseover()
        $("img#vali_Pic").attr("src", "../index.php?c=verifiedCode&m=verify&qq=" + new Date());
        console.log("點圖");
    });

    $("#_term").click(function() {

        if ($("input#_term").prop("checked")) {
            // fcheckAllFields();
            console.log("checkbox:" + $("input#_term").prop("checked"));
        } else {
            console.log("checkbox:" + $("input#_term").prop("checked"));
        }

    });

    $("#_test").click(function() {
        console.log("bUsername:" + bUsername);
        console.log("bPhoneNum:" + bPhoneNum);
        console.log("bEmail:" + bEmail);
        console.log("bVerifyCode:" + bVerifyCode);
        console.log("Terms是否打勾:" + $("#_term").prop("checked"));

        if (bUsername && bPhoneNum && bEmail && bVerifyCode && $("#_term").prop("checked")) {
            $("#_submit").removeAttr("disabled"); //enable "submit" button
            console.log("All is OK");
        } else {
            $("#_submit").attr("disabled", true);
        }
    });

    // function fcheckAllFields() {
    //     // var status = false;
    //     if (bUsername && bPhoneNum && bEmail && bVerifyCode && $("#_term").prop("checked")) {
    //         // $("#_submit").removeAttr("disabled");
    //         document.getElementById('_submit').disabled = false; //enable "submit" button
    //         console.log("All is OK");
    //         // status = true;
    //     } else {
    //         // $("#_submit").attr("disabled", true);
    //         document.getElementById('_submit').disabled = true; //disable "submit" button
    //         console.log("尚有欄位未填寫完成");
    //     }
    //     // return status;
    // }

});
// all fields is ready check
function fcheckAllFields() {
    // var status = false;
    if (bUsername && bPhoneNum && bEmail && bVerifyCode && $("#_term").prop("checked")) {
        // $("#_submit").removeAttr("disabled");
        document.getElementById('_submit').disabled = false; //enable "submit" button
        console.log("All is OK");
        // status = true;
    } else {
        // $("#_submit").attr("disabled", true);
        document.getElementById('_submit').disabled = true; //disable "submit" button
        console.log("尚有欄位未填寫完成");
    }
    // return status;
}

//當checkbox id="_term"改變時
// function fcheckboxChecked() {
//     if ($("input#_term").prop("checked")) {
//         console.log("已勾選");
//     } else {
//         console.log("未勾選");
//     }
// }
//account includes the alphabet and number
function fverifyAccount() {
    var status = false;
    var accountRegEx = /^(?=^.{8,12}$)((?=.*[0-9])(?=.*[a-z|A-Z]))^.*$/i;
    if ($("input#_username").val().search(accountRegEx) == -1) {
        console.log("Account format is wrong");
    } else {
        console.log("Account format is correct");
        status = true;
    }
    return status;
}

//phone number format check
function fverifyPhone() {
    var status = false;
    var phoneRegEx = /^1[3|4|5|8][0-9]\d{4,8}$/i;
    if ($("input#_phoneNum").val().search(phoneRegEx) == -1) {
        console.log("Phone Number format is wrong");
    } else {
        status = true;
    }
    return status;
}
//mail address check
function fverifyEmail() {
    var status = false;
    var emailRegEx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if ($("input#_email").val().search(emailRegEx) == -1) {
        console.log("email format is wrong");
    } else {
        status = true;
    }
    return status;
}
//input number only check
function fverifyNumber(e, pnumber) {
    if (!/^\d+$/.test(pnumber)) {
        e.value = /^\d+/.exec(e.value);
    }
    return false;
}
