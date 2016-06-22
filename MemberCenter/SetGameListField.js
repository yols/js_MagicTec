'use strict'
MagicianTec.MemberCenter_GameListPageSetField={};

MagicianTec.MemberCenter_GameListPageSetField.GlobalParameter={
  //user Field
  oUsernameField:null,
  oPhoneNumberField:null,
};

MagicianTec.MemberCenter_GameListPageSetField.fGetAllField = function(){
    MagicianTec.MemberCenter_GameListPageSetField.GlobalParameter.oUsernameField=document.getElementById('UsernameField');
    MagicianTec.MemberCenter_GameListPageSetField.GlobalParameter.oPhoneNumberField=document.getElementById('PhoneNumberField');
};

MagicianTec.MemberCenter_GameListPageSetField.fSetUserField = function(){
  console.log('dfsfs');
//  $(MagicianTec.MemberCenter_GameListPageSetField.GlobalParameter.oUsernameField).text(MagicianTec.MemberCenterPageDynamicInfo.GlobalParameter._aMemberData[0]);
//  $(MagicianTec.MemberCenter_GameListPageSetField.GlobalParameter.oPhoneNumberField).text(MagicianTec.MemberCenter_GameListPageSetField._fChanePhone(MagicianTec.MemberCenterPageDynamicInfo.GlobalParameter._aMemberData[1]));
};

MagicianTec.MemberCenter_GameListPageSetField._fChanePhone = function( _sSource){
  var sTmp =_sSource.substring(0,1);
  for(var i=0; i<_sSource.length-2;i++ ){
    sTmp =sTmp+'*';
  }
  sTmp =sTmp + _sSource.substring(_sSource.length-1,_sSource.length);
  return sTmp;
};


$(document).ready(function(){
    MagicianTec.MemberCenter_GameListPageSetField.fGetAllField();
});
