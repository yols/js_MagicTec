'use strict'
MagicianTec.MemberCenterPageSetField={};

MagicianTec.MemberCenterPageSetField.GlobalParameter={
//Money Field
  oTotalMoney:null,
  oAG_MoneyField:null,
  oEA_MoneyField:null,
  oGD_MoneyField:null,
  oPT_MoneyField:null,
  oUnSpentMoneyField:null,
  oSpentMoneyField:null,

  //user Field
  oLoginTimeDate:null,
  oTopUsernameField:null,

};

MagicianTec.MemberCenterPageSetField.fGetAllField = function(){
  //Money Field
    MagicianTec.MemberCenterPageSetField.GlobalParameter.oTotalMoney=document.getElementById('TotalMoney');
    MagicianTec.MemberCenterPageSetField.GlobalParameter.oUnSpentMoneyField=document.getElementById('UnSpentMoneyField');
    MagicianTec.MemberCenterPageSetField.GlobalParameter.oSpentMoneyField=document.getElementById('SpentMoneyField');
    MagicianTec.MemberCenterPageSetField.GlobalParameter.oAG_MoneyField=document.getElementById('AG_MoneyField');
    MagicianTec.MemberCenterPageSetField.GlobalParameter.oEA_MoneyField=document.getElementById('EA_MoneyField');
    MagicianTec.MemberCenterPageSetField.GlobalParameter.oGD_MoneyField=document.getElementById('GD_MoneyField');
    MagicianTec.MemberCenterPageSetField.GlobalParameter.oPT_MoneyField=document.getElementById('PT_MoneyField');
    //user Field
    MagicianTec.MemberCenterPageSetField.GlobalParameter.oLoginTimeDate=document.getElementById('LoginTimeDate');
    MagicianTec.MemberCenterPageSetField.GlobalParameter.oTopUsernameField=document.getElementById('TopUsernameField');
};

MagicianTec.MemberCenterPageSetField.fSetUserField = function(){
  $(MagicianTec.MemberCenterPageSetField.GlobalParameter.oTopUsernameField).text(MagicianTec.MemberCenterPageDynamicInfo.GlobalParameter._aMemberData[0]);
  $(MagicianTec.MemberCenterPageSetField.GlobalParameter.oLoginTimeDate).text(MagicianTec.MemberCenterPageSetField._fChangeTimeType(MagicianTec.MemberCenterPageDynamicInfo.GlobalParameter._aMemberData[2]));
  console.log('fskjdfklsjf');
};

MagicianTec.MemberCenterPageSetField.fSetMoneyField = function(){
  $(MagicianTec.MemberCenterPageSetField.GlobalParameter.oTotalMoney).text(MagicianTec.MemberCenterPageDynamicInfo.GlobalParameter._aAccountMoneyData[0]);
  $(MagicianTec.MemberCenterPageSetField.GlobalParameter.oUnSpentMoneyField).text(MagicianTec.MemberCenterPageDynamicInfo.GlobalParameter._aAccountMoneyData[1]);
  $(MagicianTec.MemberCenterPageSetField.GlobalParameter.oSpentMoneyField).text(MagicianTec.MemberCenterPageDynamicInfo.GlobalParameter._aAccountMoneyData[2]);
  $(MagicianTec.MemberCenterPageSetField.GlobalParameter.oAG_MoneyField).text(MagicianTec.MemberCenterPageDynamicInfo.GlobalParameter._aAccountMoneyData[3]);
  $(MagicianTec.MemberCenterPageSetField.GlobalParameter.oEA_MoneyField).text(MagicianTec.MemberCenterPageDynamicInfo.GlobalParameter._aAccountMoneyData[4]);
  $(MagicianTec.MemberCenterPageSetField.GlobalParameter.oGD_MoneyField).text(MagicianTec.MemberCenterPageDynamicInfo.GlobalParameter._aAccountMoneyData[5]);
  $(MagicianTec.MemberCenterPageSetField.GlobalParameter.oPT_MoneyField).text(MagicianTec.MemberCenterPageDynamicInfo.GlobalParameter._aAccountMoneyData[6]);
};

MagicianTec.MemberCenterPageSetField._fChangeTimeType = function(_sSource){
  var Time =new Date(_sSource);
  console.log(Time);
  return [ Time.getFullYear(),  MagicianTec.Tools._fPadZero(Time.getMonth()+1),  MagicianTec.Tools._fPadZero(Time.getDate()),].join('/') +   MagicianTec.Tools._fAMPMDetect(Time , 'seconds');
};

$(document).ready(function(){
    MagicianTec.MemberCenterPageSetField.fGetAllField();
});


$(window).load(function(){
    MagicianTec.MemberCenterPageSetField.fSetUserField();
    MagicianTec.MemberCenterPageSetField.fSetMoneyField();
});
