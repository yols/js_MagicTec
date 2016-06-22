'use strict';

MagicianTec.MemberCenterPageDynamicInfo={};
MagicianTec.MemberCenterPageDynamicInfo.GlobalParameter={
  _sPhpAdress:'../index.php?',
  _sMemberConect:'member',
  _sMemberInfoFun:'getUserInfo',
  _sCashInfoFun:'getUserCashInfo',
  _nErrorNum:300,

  _aMemberData:['','',''],
  _aAccountMoneyData:[0,0,0,0,0,0,0],
  _bConecSuccess:true
};
MagicianTec.MemberCenterPageDynamicInfo._fPHPAddress=function(_sConect, _sFunctionName ) {
  var _sTmp;
  _sTmp = MagicianTec.MemberCenterPageDynamicInfo.GlobalParameter._sPhpAdress+'c='+_sConect+'&m='+_sFunctionName;
  return _sTmp;
};

MagicianTec.MemberCenterPageDynamicInfo.fInit = function(){
  console.log(MagicianTec.MemberCenterPageDynamicInfo._fPHPAddress(MagicianTec.MemberCenterPageDynamicInfo.GlobalParameter._sMemberConect,MagicianTec.MemberCenterPageDynamicInfo.GlobalParameter._sMemberInfoFun ));
  var _sUserAddr =MagicianTec.MemberCenterPageDynamicInfo._fPHPAddress(MagicianTec.MemberCenterPageDynamicInfo.GlobalParameter._sMemberConect,MagicianTec.MemberCenterPageDynamicInfo.GlobalParameter._sMemberInfoFun ),
        _sCashAddr =MagicianTec.MemberCenterPageDynamicInfo._fPHPAddress(MagicianTec.MemberCenterPageDynamicInfo.GlobalParameter._sMemberConect,MagicianTec.MemberCenterPageDynamicInfo.GlobalParameter._sCashInfoFun ),
      _TmpData;
  MagicianTec.MemberCenterPageDynamicInfo.fGetData(_sUserAddr, _TmpData, MagicianTec.MemberCenterPageDynamicInfo. UserSlipData, MagicianTec.Tools.fAjaxResponseFail ());
  MagicianTec.MemberCenterPageDynamicInfo.fGetData(_sCashAddr, _TmpData, MagicianTec.MemberCenterPageDynamicInfo. CashSlipData, MagicianTec.Tools.fAjaxResponseFail());
};



MagicianTec.MemberCenterPageDynamicInfo.fGetData = function(_sPHPAddr,Fromdata, SuccessCallback, FailCallback){
   $.post(_sPHPAddr, Fromdata, SuccessCallback, 'json').fail(FailCallback);
};

MagicianTec.MemberCenterPageDynamicInfo.UserSlipData=function(_sData){
  if(typeof(_sData) !== 'undefined' && _sData.status === 0){
     MagicianTec.MemberCenterPageDynamicInfo.GlobalParameter._aMemberData =[_sData.msg.username, _sData.msg.phone, _sData.msg.lastlogin];
     MagicianTec.MemberCenterPageDynamicInfo.GlobalParameter._aMemberData =[_sData.msg.username, _sData.msg.phone, _sData.msg.lastlogin];
     MagicianTec.MemberCenterPageDynamicInfo.GlobalParameter._aAccountMoneyData[0] = MagicianTec.Tools.MoneyDisplayType(_sData.msg.money, 'DeciPer');
    //  MagicianTec.MemberCenter_GameListPageSetField.fSetUserField();
    //  MagicianTec.MemberCenterPageSetField.fSetUserField();
   }
   else {
     MagicianTec.MemberCenterPageDynamicInfo.GlobalParameter._bConecSuccess = false;
     window.location.assign("../index.html");
   }
};

MagicianTec.MemberCenterPageDynamicInfo.CashSlipData=function(_sData){
  if(typeof(_sData) !== 'undefined' && _sData.status === 0){
    console.log(_sData);
     MagicianTec.MemberCenterPageDynamicInfo.GlobalParameter._aAccountMoneyData[1] = MagicianTec.Tools.MoneyDisplayType(_sData.msg.mc_main, 'DeciPer');
     MagicianTec.MemberCenterPageDynamicInfo.GlobalParameter._aAccountMoneyData[2] = MagicianTec.Tools.MoneyDisplayType(_sData.msg.mc_reserved, 'DeciPer');
     MagicianTec.MemberCenterPageDynamicInfo.GlobalParameter._aAccountMoneyData[3] = MagicianTec.Tools.MoneyDisplayType(_sData.msg.mc_AG, 'DeciPer');
     MagicianTec.MemberCenterPageDynamicInfo.GlobalParameter._aAccountMoneyData[4] = MagicianTec.Tools.MoneyDisplayType(_sData.msg.mc_EA, 'DeciPer');
     MagicianTec.MemberCenterPageDynamicInfo.GlobalParameter._aAccountMoneyData[5] = MagicianTec.Tools.MoneyDisplayType(_sData.msg.mc_GD, 'DeciPer');
     MagicianTec.MemberCenterPageDynamicInfo.GlobalParameter._aAccountMoneyData[6] = MagicianTec.Tools.MoneyDisplayType(_sData.msg.mc_PT, 'DeciPer');
    // MagicianTec.MemberCenterPageSetField.fSetMoneyField();
   }
   else if (_sData.status ===302) {
     MagicianTec.MemberCenterPageDynamicInfo.GlobalParameter._aAccountMoneyData[1] = MagicianTec.Tools.MoneyDisplayType(0, 'DeciPer');
     MagicianTec.MemberCenterPageDynamicInfo.GlobalParameter._aAccountMoneyData[2] = MagicianTec.Tools.MoneyDisplayType(0, 'DeciPer');
     MagicianTec.MemberCenterPageDynamicInfo.GlobalParameter._aAccountMoneyData[3] = MagicianTec.Tools.MoneyDisplayType(0, 'DeciPer');
     MagicianTec.MemberCenterPageDynamicInfo.GlobalParameter._aAccountMoneyData[4] = MagicianTec.Tools.MoneyDisplayType(0, 'DeciPer');
     MagicianTec.MemberCenterPageDynamicInfo.GlobalParameter._aAccountMoneyData[5] = MagicianTec.Tools.MoneyDisplayType(0, 'DeciPer');
     MagicianTec.MemberCenterPageDynamicInfo.GlobalParameter._aAccountMoneyData[6] = MagicianTec.Tools.MoneyDisplayType(0, 'DeciPer');
   }
   else {
     MagicianTec.MemberCenterPageDynamicInfo.GlobalParameter._bConecSuccess = false;
     window.location.assign("../index.html");
   }
};

$(document).ready(function(){
  var Flag = document.getElementById('NoServer');
  if(Flag === null){
      console.log('ServerMode');
      MagicianTec.MemberCenterPageDynamicInfo.fInit();
  }
  else{
    alert('NoServerMode');
    MagicianTec.MemberCenterPageDynamicInfo.GlobalParameter._bConecSuccess = false;
    console.log('NoServerMode');
  }
});
