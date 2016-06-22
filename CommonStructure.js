'use strict';

MagicianTec.CommonStructure = {};
MagicianTec.CommonStructure.Variables = {
  $Form : undefined,
  $CodeDiv : undefined,
  $CodeImage : undefined,
  $AsideContact : undefined,
  $LogoutSpan: undefined,

  $HeaderTime: undefined,
  $HeaderNotLogin : undefined,
  $HeaderLogined : undefined,
  $LoadingDiv : undefined,

  $HeaderAccountName: undefined,
  $HeaderMoney: undefined,

  $HeaderMoneyDisplay : undefined,
  $MarqueeSelector: undefined,

  bFloatWindowTriger : true,
  bIsHideMoney : false,
  nMoneyAmount : 0,
  sAPErrorText: '账号或密码输入错误，请重新输入！',
  sCodeErrorText:'验证码输入错误，请重新输入！',
  nTimeOutDuration: 500,
  nMarqueeDuration: 8000
};


//*********************** Login Related ******************

MagicianTec.CommonStructure.fClearForm = function () {
    MagicianTec.CommonStructure.Variables.$Form.find('input[type=text], input[type=password]').val('');
};

MagicianTec.CommonStructure.fAddCodeClickListener = function() {
    MagicianTec.CommonStructure.Variables.$CodeDiv.on('click', MagicianTec.CommonStructure.fRequestVerifyCode);
};

MagicianTec.CommonStructure.fRequestVerifyCode = function() {
    MagicianTec.CommonStructure.Variables.$CodeImage.attr( 'src', '../index.php?c=verifiedCode&m=verify&ts=' + new Date().getTime());
};


MagicianTec.CommonStructure.fCheckisLogin = function (CheckCallback) {
    $.get( '../index.php?c=login&m=check', CheckCallback , 'json').fail(MagicianTec.Tools.fAjaxResponseFail);
};

MagicianTec.CommonStructure.fLoginValidateAndSend = function () {
  $.validator.addMethod('username', function(value) {
      if (/[^A-Za-z0-9]/.test(value)) {
          return false;
      } else {
          return true;
      }
  }, MagicianTec.CommonStructure.Variables.sAPErrorText);

  //Validate form
  MagicianTec.CommonStructure.Variables.$Form.validate({
      onfocusout : false ,
      onkeyup : false ,
      rules: {
          'username': {
              required: true,
              maxlength: 12,
              username: true
          },
          'password':{
              required: true,
              maxlength: 16
          },
          'code':{
              required: true,
              maxlength: 4,
              digits:true
          }
      },
      messages: {
        username: {
          required: MagicianTec.CommonStructure.Variables.sAPErrorText,
          maxlength: MagicianTec.CommonStructure.Variables.sAPErrorText
        },
        password: {
          required: MagicianTec.CommonStructure.Variables.sAPErrorText,
          maxlength: MagicianTec.CommonStructure.Variables.sAPErrorText
        },
        code: {
          required: MagicianTec.CommonStructure.Variables.sCodeErrorText,
          maxlength: MagicianTec.CommonStructure.Variables.sCodeErrorText,
          digits: MagicianTec.CommonStructure.Variables.sCodeErrorText
        }
      },
      showErrors: function (errorMap, errorList) {
        if(errorList.length > 0){
          window.alert(errorList[0].message);
        }
      },
      submitHandler: function(form, event) {
          event.preventDefault();
          var _aFromContent = $(form).serializeArray();
          MagicianTec.CommonStructure.fLoginSend(_aFromContent);
      }
  });
};

MagicianTec.CommonStructure.fLoginSend = function(Fromdata) {
    MagicianTec.CommonStructure.fLoginLoading();
    //MagicianTec.CommonStructure.Variables.$LoadingDiv.show();

    window.setTimeout(function () {
      $.post('../index.php?c=login&m=login', Fromdata, MagicianTec.CommonStructure.fLoginResponse , 'json').fail(MagicianTec.Tools.fAjaxResponseFail);
    }, MagicianTec.CommonStructure.Variables.nTimeOutDuration);
};

MagicianTec.CommonStructure.fLoginResponse = function(Data) {
  console.log('Login Code:' +  Data.status + Data.msg);

  //MagicianTec.CommonStructure.Variables.$LoadingDiv.hide();

  console.log(Data);

  if(Data.status !== 0){

    MagicianTec.CommonStructure.fNotLoginDoing();

    //Refresh verify image.
    MagicianTec.CommonStructure.fRequestVerifyCode();

    window.alert(Data.msg);
  }
  else {
    MagicianTec.CommonStructure.fLoginSuccess();
  }

  MagicianTec.CommonStructure.fClearForm();
};

//******************* Contact sidebar ***********************************

MagicianTec.CommonStructure.fSideContact = function(){

  MagicianTec.CommonStructure.Variables.$AsideContact.on('click', function(e) {

    var _ParentContainer = $('aside');

    if( MagicianTec.CommonStructure.Variables.bFloatWindowTriger === true){
      _ParentContainer.animate({ 'right': '-=200px' }, "slow" );
      MagicianTec.CommonStructure.Variables.bFloatWindowTriger = false;
    }
    else {
      _ParentContainer.animate({ 'right': '+=200px' }, "slow" );
      MagicianTec.CommonStructure.Variables.bFloatWindowTriger = true;
    }
  });
};

//*********************** Time display **********************************

MagicianTec.CommonStructure.fShowTime = function () {
  MagicianTec.CommonStructure.Variables.$HeaderTime.text(MagicianTec.Tools.fGetBeijingDate('seconds'));
};

//******************* Init ******************************************

MagicianTec.CommonStructure.fInitAllSelectors = function () {
  MagicianTec.CommonStructure.Variables.$Form = $('#Header_Form_Login');
  MagicianTec.CommonStructure.Variables.$CodeDiv = $('#Header_Div_Code');
  MagicianTec.CommonStructure.Variables.$CodeImage = $('#Header_Img_Code');
  MagicianTec.CommonStructure.Variables.$LogoutSpan = $('#Header_A_Logout');
  MagicianTec.CommonStructure.Variables.$AsideContact = $('#Aside_Btn_Fold');

  MagicianTec.CommonStructure.Variables.$LoadingDiv = $('#Header_Div_Logining');
  MagicianTec.CommonStructure.Variables.$HeaderNotLogin = $('#Header_Div_NotLogin');
  MagicianTec.CommonStructure.Variables.$HeaderLogined = $('#Header_Div_Logined');

  MagicianTec.CommonStructure.Variables.$HeaderAccountName = $('#Header_P_AccountName');
  MagicianTec.CommonStructure.Variables.$HeaderMoney = $('#Header_Div_MoneyAmount');

  MagicianTec.CommonStructure.Variables.$HeaderMoneyDisplay = $('#Header_Div_DisplayMoney');

  MagicianTec.CommonStructure.Variables.$HeaderTime = $('#Header_Span_Time');

  MagicianTec.CommonStructure.Variables.$MarqueeSelector = $('#Header_Div_Marquee');
};

//************************** CallBack Functions **************************

MagicianTec.CommonStructure.fLoginStatusDisplay = function (LoginStatus) {
  if(LoginStatus === 'logined'){
    MagicianTec.CommonStructure.Variables.$HeaderNotLogin.hide();
    MagicianTec.CommonStructure.Variables.$HeaderLogined.show();

    if(MagicianTec.CommonStructure.fCustomPageLoginedDisplay !== undefined){
      MagicianTec.CommonStructure.fCustomPageLoginedDisplay();
    }
  }
  else if(LoginStatus === 'notlogin'){
    MagicianTec.CommonStructure.Variables.$HeaderNotLogin.show();
    MagicianTec.CommonStructure.Variables.$HeaderLogined.hide();

    if(MagicianTec.CommonStructure.fCustomPageNotLoginDisplay !== undefined){
      MagicianTec.CommonStructure.fCustomPageNotLoginDisplay();
    }
  }
};

MagicianTec.CommonStructure.fAddShowHideMoneyListender = function () {
  MagicianTec.CommonStructure.Variables.$HeaderMoneyDisplay.on('click', function() {
    if(MagicianTec.CommonStructure.Variables.bIsHideMoney === false){
      MagicianTec.CommonStructure.Variables.nMoneyAmount = MagicianTec.CommonStructure.Variables.$HeaderMoney.text();
      MagicianTec.CommonStructure.Variables.$HeaderMoneyDisplay.html('<a>显示</a>');
      MagicianTec.CommonStructure.Variables.$HeaderMoney.text('*******');
      MagicianTec.CommonStructure.Variables.bIsHideMoney = true;
    }
    else {
      MagicianTec.CommonStructure.Variables.$HeaderMoney.text(MagicianTec.CommonStructure.Variables.nMoneyAmount);
      MagicianTec.CommonStructure.Variables.nMoneyAmount = 0;
      MagicianTec.CommonStructure.Variables.$HeaderMoneyDisplay.html('<a>隐藏</a>');
      MagicianTec.CommonStructure.Variables.bIsHideMoney = false;
    }
  });
};

MagicianTec.CommonStructure.fLoginedDoing = function () {
  MagicianTec.CommonStructure.fLoginStatusDisplay('logined');

  MagicianTec.CommonStructure.fGetAccountAndMoney(function (Data) {
    if(Data.status === 0){
      MagicianTec.CommonStructure.Variables.$HeaderAccountName.text(Data.msg.username);
      MagicianTec.CommonStructure.Variables.$HeaderMoney.text(Data.msg.money);
    }
    console.log('Get Account Code: ' + Data.status);
  });

  MagicianTec.CommonStructure.fAddShowHideMoneyListender();

  MagicianTec.CommonStructure.fLogoutSend();
};

MagicianTec.CommonStructure.fNotLoginDoing = function () {
  MagicianTec.CommonStructure.fLoginStatusDisplay('notlogin');

  MagicianTec.CommonStructure.fLoginValidateAndSend();

  MagicianTec.CommonStructure.fAddCodeClickListener();
};

//******************** Loged/Logout Related *****************************

MagicianTec.CommonStructure.fGetAccountAndMoney = function (SuccessCallback) {
  $.get( '../index.php?c=member&m=getUserInfo', SuccessCallback , 'json').fail(MagicianTec.Tools.fAjaxResponseFail);
};

MagicianTec.CommonStructure.fLogoutSend = function () {
  MagicianTec.CommonStructure.Variables.$LogoutSpan.on('click', function() {

    //MagicianTec.CommonStructure.Variables.$LoadingDiv.show();
    MagicianTec.CommonStructure.fLogoutLoading();
    window.setTimeout(function () {
      $.get( '../index.php?c=login&m=logout', MagicianTec.CommonStructure.fLogoutSuccess).fail(MagicianTec.Tools.fAjaxResponseFail);
    } , MagicianTec.CommonStructure.Variables.nTimeOutDuration);

  });
};

//******************* Marquee show Section *******************

MagicianTec.CommonStructure.fRequestMarquee = function () {
  $.get( '../index.php?c=notice&m=getData', MagicianTec.CommonStructure.fMarqueeDataSuccess , 'json').fail(MagicianTec.Tools.fAjaxResponseFail);
};

MagicianTec.CommonStructure.fMarqueeDataSuccess = function (Data) {
  if(Data.status === 0){
    MagicianTec.CommonStructure.Variables.$MarqueeSelector.text(Data.msg.nt_title + ' ： ' + Data.msg.nt_content).marquee({
      duration: MagicianTec.CommonStructure.Variables.nMarqueeDuration,
      pauseOnHover:true
    });
  }
};

//****************** Main Function *************************

$(function() {

  //Set placeholer for ie8
  $('input, textarea').placeholder();

  MagicianTec.CommonStructure.fInitAllSelectors();

  MagicianTec.CommonStructure.fSideContact();

  MagicianTec.CommonStructure.fRequestMarquee();

  //Set Beijing Timer
  window.setInterval(MagicianTec.CommonStructure.fShowTime , 1000);

  MagicianTec.CommonStructure.fCheckisLogin(function (Data) {
    if(Data.status === 0){
      MagicianTec.CommonStructure.fLoginedDoing();
    }
    else {
      MagicianTec.CommonStructure.fNotLoginDoing();
    }

    console.log('Check Login Code: ' + Data.status + Data.msg);
  });

  MagicianTec.CommonStructure.fLoginLoading = function () {
    MagicianTec.CommonStructure.Variables.$LoadingDiv.show();
    MagicianTec.CommonStructure.Variables.$HeaderNotLogin.hide();
  };

  MagicianTec.CommonStructure.fLoginSuccess = function () {
    MagicianTec.CommonStructure.Variables.$LoadingDiv.hide();
    MagicianTec.CommonStructure.fLoginedDoing();
  };

  MagicianTec.CommonStructure.fLogoutLoading = function () {
    MagicianTec.CommonStructure.Variables.$LoadingDiv.show();
    MagicianTec.CommonStructure.Variables.$HeaderLogined.hide();
  };

  MagicianTec.CommonStructure.fLogoutSuccess = function () {
    MagicianTec.CommonStructure.Variables.$LoadingDiv.hide();
    MagicianTec.CommonStructure.fNotLoginDoing();
  };
});
