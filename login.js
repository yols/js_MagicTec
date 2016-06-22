'use strict';

//Variables for register page.
MagicianTec.oLoginPage = {
    sAccountErrorText: '账号格式不符，必须是英数字字符'
};

MagicianTec.oLoginPage.fLoginSend = function(Fromdata, SuccessCallback, FailCallback) {
    $.post('../index.php?c=login&m=login', Fromdata, SuccessCallback, 'json').fail(FailCallback);
};

MagicianTec.oLoginPage.fLoginResponse = function(Data) {
  console.log(Data);
};

MagicianTec.oLoginPage.fResponseFail = function(jqXHR) {
  console.log(jqXHR);
};


/************** Page Executor **********************/
$(function() {

    var _oRegisterForm = $('#Content_Form_Login');

    MagicianTec.Tools.fRequestVerifyCode("#refreshCode","#CodeImage");

    //******************* Extend check rules for register ********************
    $.validator.addMethod('account', function(value) {
        if (/[^A-Za-z0-9]/.test(value)) {
            return false;
        } else {
            return true;
        }
    }, MagicianTec.oLoginPage.sAccountErrorText);

    //******************* Extend check rules for register END ********************

    //Validate form
    _oRegisterForm.validate({
        rules: {
            'account': {
                required: true,
                rangelength: [8, 12],
                account: true
            },
            'password': {
                required: true
            },
            'code': {
                required: true,
                digits: true
            },
        },
        submitHandler: function(form, event) {
            event.preventDefault();
            var _aFromContent = $(form).serializeArray();
            MagicianTec.oLoginPage.fLoginSend(_aFromContent, MagicianTec.oLoginPage.fLoginResponse, MagicianTec.oLoginPage.fResponseFail);
        }
    });
});
