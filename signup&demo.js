MagicianTec.signup = {
    bUsername: false,
    bPhoneNum: false,
    bEmail: false,
    bVerifyCode: false,
    bVerifyCode2: false
};

$(function() {
    //Tabs分頁功能
    $("#tabs").tabs();
    // for IE8
    // $("input").placeholder();
});

// execute the behaviors of the fileds -----------------------------------
$(function() {

    $("#_fileItem").attr("checked", false); //checkbox is unchecked
    $("#_fileItem").prop("checked");
    // $("#_submit").attr("disabled", true);
    // console.log("SUBMIT鍵的disabled狀態:" + $("#_submit").prop("disabled"));


    //account field
    $("#_username").focus(function() {
        $("#_username").css("color", "white");
        $(".check-container-01 span").css("color", "#c3c3c3");
        $("#_username").attr("placeholder", "");
        $(".check-container-01 span").html("需为8~12位数的数字或字母组合");
        $(".check-container-01").css("background-image", "url(../img/signup&demo/none.png)");

    });
    $("#_username").blur(function() {
        $("#_username").attr("placeholder", "登入账号");
        var _username_Length = $("#_username").val().length;
        // console.log("帳號長度：" + _username_Length);
        if (_username_Length > 7) {
            $(".check-container-01 span").css("color", "#c3c3c3");
            $(".check-container-01 span").html("OK");
            $(".check-container-01").css("background-image", "url(../img/signup&demo/check.png)");
            //帳號長度正確後再進行驗證，檢查帳號是否重複
            var ajaxUrl = "../index.php?c=signup&m=checkusername";
            var username = $("#_username").val();

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
                        $(".check-container-01 span").css("color", "#c3c3c3");
                        $(".check-container-01 span").html();
                        $(".check-container-01").css("background-image", "url(../img/signup&demo/check.png)");
                        MagicianTec.signup.bUsername = true;
                        MagicianTec.signup.fcheckAllFields();
                    } else {
                        $(".check-container-01 span").css("color", "red");
                        $(".check-container-01").css("background-image", "url(../img/signup&demo/cross.png)");
                        MagicianTec.signup.bUsername = false;
                    }
                    $(".check-container-01 span").html("From PHP Respond:" + jsonObj.msg);
                }
            });
        } else if (_username_Length === 0) {
            $(".check-container-01 span").css("color", "#c3c3c3");
            $(".check-container-01").css("background-image", "url(../img/signup&demo/none.png)");
            MagicianTec.signup.bUsername = false;
        } else {
            $(".check-container-01 span").css("color", "red");
            $(".check-container-01 span").html("帐号长度不够");
            $(".check-container-01").css("background-image", "url(../img/signup&demo/cross.png)");
            MagicianTec.signup.bUsername = false;
        }
        MagicianTec.signup.fcheckAllFields();
    });
    //cellphone field
    $("#_phoneNum").focus(function() { //focus on
        MagicianTec.signup.bPhoneNum = false;
        $("#_phoneNum").css("color", "white");
        $("#_phoneNum").attr("placeholder", "");
        $(".check-container-02").css("background-image", "url(../img/signup&demo/none.png)");
        $(".check-container-02 span").css("color", "#c3c3c3");
        $(".check-container-02 span").html("填写错误将无法接受确认信息");
    });
    $("#_phoneNum").blur(function() { //focus off
        $("#_phoneNum").attr("placeholder", "手机");
        var _phoneNum_Length = $("input#_phoneNum").val().length;
        while (_phoneNum_Length > 0) {
            if (_phoneNum_Length < 11) {
                $(".check-container-02").css("background-image", "url(../img/signup&demo/cross.png)");
                $(".check-container-02 span").css("color", "red");
                $(".check-container-02 span").html("手机号码未滿11碼!!");
            } else if (!MagicianTec.signup.fverifyPhone()) {
                $(".check-container-02").css("background-image", "url(../img/signup&demo/cross.png)");
                $(".check-container-02 span").css("color", "red");
                $(".check-container-02 span").html("手机号码有误!!");

            } else { //phoneNumber is OK
                MagicianTec.signup.bPhoneNum = true;
                $(".check-container-02").css("background-image", "url(../img/signup&demo/check.png)");
                $(".check-container-02 span").css("color", "#c3c3c3");
                $(".check-container-02 span").html("手机号码可以");
            }
            break;
        }
        MagicianTec.signup.fcheckAllFields();
    });


    //email field
    $("#_email").focus(function() { //focus on
        MagicianTec.signup.bEmail = false;
        $("#_email").css("color", "white");
        $("#_email").attr("placeholder", "");
        $(".check-container-03").css("background-image", "url(../img/signup&demo/none.png)");
        $(".check-container-03 span").css("color", "#c3c3c3");
        $(".check-container-03 span").html("请填写常用邮箱地址以便接受最新优惠");
    });
    $("#_email").blur(function() { //focus off
        $("#_email").attr("placeholder", "邮箱地址");
        var _email_Length = $("#_email").val().length;
        while (_email_Length > 0) {
            if (MagicianTec.signup.fverifyEmail()) { //mail is available
                MagicianTec.signup.bEmail = true;
                $(".check-container-03").css("background-image", "url(../img/signup&demo/check.png)");
                $(".check-container-03 span").css("color", "#c3c3c3");
                $(".check-container-03 span").html("邮箱地址可以");
            } else {
                $(".check-container-03").css("background-image", "url(../img/signup&demo/cross.png)");
                $(".check-container-03 span").css("color", "red");
                $(".check-container-03 span").html("邮箱地址有误");
            }
            break;
        }
        MagicianTec.signup.fcheckAllFields();
    });

    //validation number field
    $("#_valiNum").focus(function() { //focus on
        MagicianTec.signup.bVerifyCode = false;
        $("#_valiNum").attr("placeholder", "");
        $("#_valiNum").css("color", "white");
        $(".check-container-04").css("background-image", "url(../img/signup&demo/none.png)");
        $(".check-container-04 span").css("color", "#c3c3c3");
        $(".check-container-04 span").html("请填写验证码");
    });
    $("#_valiNum").blur(function() { //focus off
        $("#_valiNum").attr("placeholder", "验证码");
        var _valiNumLength = $("#_valiNum").val().length;
        while (_valiNumLength > 0) {
            if (_valiNumLength < 4) { //validation code is wrong
                $(".check-container-04").css("background-image", "url(../img/signup&demo/cross.png)");
                $(".check-container-04 span").css("color", "red");
                $(".check-container-04 span").html("验证码有误");
            } else {
                MagicianTec.signup.bVerifyCode = true;
                $(".check-container-04").css("background-image", "url(../img/signup&demo/check.png)");
                $(".check-container-04 span").css("color", "#c3c3c3");
                $(".check-container-04 span").html("验证码可以");
            }
            break;
        }
        MagicianTec.signup.fcheckAllFields();
    });　
    //變換圖形
    $("img#vali_Pic").click(function() { //.click() .mouseover()
        $("img#vali_Pic").attr("src", "../index.php?c=verifiedCode&m=verify&qq=" + new Date());
        // To add "new Date()" is for the validate picture updated.
    });
    //TERMS checked
    $("#_fileItem").click(function() {
        MagicianTec.signup.fcheckAllFields();
    });
    //for Tab-2
    $("#_valiNum2").focus(function() { //focus on
        MagicianTec.signup.bVerifyCode2 = false;
        $("#_valiNum2").attr("placeholder", "");
        $("#_valiNum2").css("color", "white");
        $(".check-container-05").css("background-image", "url(../img/signup&demo/none.png)");
        $(".check-container-05 span").css("color", "#c3c3c3");
        $(".check-container-05 span").html("请填写验证码");
    });
    $("#_valiNum2").blur(function() { //focus off
        $("#_valiNum2").attr("placeholder", "验证码");
        var _valiNumLength = $("#_valiNum2").val().length;
        while (_valiNumLength > 0) {
            if (_valiNumLength < 4) { //validation code is wrong
                $(".check-container-05").css("background-image", "url(../img/signup&demo/cross.png)");
                $(".check-container-05 span").css("color", "red");
                $(".check-container-05 span").html("验证码有误");
            } else {
                MagicianTec.signup.bVerifyCode2 = true;
                $(".check-container-05").css("background-image", "url(../img/signup&demo/check.png)");
                $(".check-container-05 span").css("color", "#c3c3c3");
                $(".check-container-05 span").html("验证码可以");
            }
            break;

        }
        console.log("驗證碼欄位有4碼:" + MagicianTec.signup.bVerifyCode2);
        MagicianTec.signup.fcheckAllFieldsTab2();
    });
    $("img#vali_Pic2").click(function() { //.click() .mouseover()
        $("img#vali_Pic2").attr("src", "../index.php?c=verifiedCode&m=verify&qq=" + new Date());
        // To add "new Date()" is for the validate picture updated.
    });


    $("#_fileItem2").click(function() {
        MagicianTec.signup.fcheckAllFieldsTab2();
    });
    $("#_test").click(function() {
        // console.log("bUsername:" + MagicianTec.signup.bUsername);
        // console.log("bPhoneNum:" + MagicianTec.signup.bPhoneNum);
        // console.log("bEmail:" + MagicianTec.signup.bEmail);
        // console.log("bVerifyCode:" + MagicianTec.signup.bVerifyCode);
        // console.log("Terms是否打勾:" + $("#_fileItem").prop("checked"));
        // console.log("SUBMIT鍵的disabled狀態:" + $("#_submit").prop("disabled"));
        console.log("Terms是否打勾:" + $("#_fileItem2").prop("checked"));
        console.log("SUBMIT鍵的disabled狀態:" + $("#_submit2").prop("disabled"));
        // if (MagicianTec.signup.bUsername &&
        //     MagicianTec.signup.bPhoneNum &&
        //     MagicianTec.signup.bEmail &&
        //     MagicianTec.signup.bVerifyCode &&
        //     $("#_fileItem").prop("checked")) {
        //     $("#_submit").attr("disabled", false); //enable "submit" button
        //     $(".demo-submit input[type='submit']").css("background-image", "url(../img/signup&demo/submit-button-up.png)");
        //     console.log("所有欄位都填了");
        // } else {
        //     $("#_submit").attr("disabled", true);
        //     $(".demo-submit input[type='submit']").css("background-image", "url(../img/signup&demo/submit-button-off.png)");
        // }
    });
    // ----------------------------------------------------------
    //Submit button for Tab-1
    $("#_submit").click(function() {
        $.ajax({
            url: "../index.php?c=signup&m=signup",
            type: 'POST',
            dataType: 'json',
            data: {
                username: $("#_username").val(),
                phone_Num: $("#_phoneNum").val(),
                email: $("#_email").val(),
                code: $("#_valiNum").val()
            },
            success: function(data, textStatus, jqXHR) { //傳遞成功時執行，引數是回傳資料
                console.log(data);
                if (data.status === 0) {
                    alert("註冊成功!!");
                    document.location.href="../index.html";

                } else {
                    alert("驗證碼錯誤!!");
                }

            }
        });
    });


    //Submit button for Tab-2
    $("#_submit2").click(function() {
        console.log("Button is available");

        $.ajax({
            url: "../index.php?c=signup&m=checkverify",
            type: 'POST',
            dataType: 'json',
            data: {
                code: $("#_valiNum2").val()
            },
            success: function(data, textStatus, jqXHR) { //傳遞成功時執行，引數是回傳資料
                if (data.status === 0) {
                    alert("免費試玩維護中!!!!");
                } else {
                    alert("驗證碼錯誤!!");
                }

            }

        });
    });

});
// all fields is ready check
MagicianTec.signup.fcheckAllFields = function() {
    if (MagicianTec.signup.bUsername &&
        MagicianTec.signup.bPhoneNum &&
        MagicianTec.signup.bEmail &&
        MagicianTec.signup.bVerifyCode &&
        $("#_fileItem").prop("checked")) {
        $(".login-submit button[type='button']").css("background-image", "url(../img/signup&demo/submit-button-up.png)");
        $("#_submit").attr("disabled", false);
        console.log("All is OK");
    } else {
        $(".login-submit button[type='button']").css("background-image", "url(../img/signup&demo/submit-button-off.png)");
        $("#_submit").attr("disabled", true);
        console.log("尚有欄位未填寫完成");
    }

};
MagicianTec.signup.fcheckAllFieldsTab2 = function() {
    if (MagicianTec.signup.bVerifyCode2 && $("#_fileItem2").prop("checked")) {
        $(".demo-submit button[type='button']").css("background-image", "url(../img/signup&demo/submit-button-up.png)");
        // $("#_submit2").attr("disabled", false);
        $("#_submit2").removeAttr("disabled");
        console.log("All is OK");
    } else {
        $(".demo-submit button[type='button']").css("background-image", "url(../img/signup&demo/submit-button-off.png)");
        $("#_submit2").attr("disabled", true);
        console.log("尚有欄位未填寫完成");
    }

};
//account includes the alphabet and number
MagicianTec.signup.fverifyAccount = function() {
    var status = false;
    var accountRegEx = /^(?=^.{8,12}$)((?=.*[0-9])(?=.*[a-z|A-Z]))^.*$/i;
    if ($("#_username").val().search(accountRegEx) == -1) {
        console.log("Account format is wrong");
    } else {
        console.log("Account format is correct");
        status = true;
    }
    return status;
};

//phone number format check
MagicianTec.signup.fverifyPhone = function() {
    var status = false;
    var phoneRegEx = /^1[3|4|5|8][0-9]\d{4,8}$/i;
    if ($("input#_phoneNum").val().search(phoneRegEx) == -1) {
        console.log("Phone Number format is wrong");
    } else {
        status = true;
    }
    return status;
};
//mail address check
MagicianTec.signup.fverifyEmail = function() {
    var status = false;
    var emailRegEx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if ($("input#_email").val().search(emailRegEx) == -1) {
        console.log("email format is wrong");
    } else {
        status = true;
    }
    return status;
};
//input number only check
MagicianTec.signup.fverifyNumber = function(e, pnumber) {
    if (!/^\d+$/.test(pnumber)) {
        e.value = /^\d+/.exec(e.value);
    }
    return false;
};
