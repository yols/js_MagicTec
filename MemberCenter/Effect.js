'use strict';
//
MagicianTec.MemberCenterPageEffect={};
MagicianTec.MemberCenterPageEffect.GlobalParameter={
  _sBtnClassName : '.Menu_Btn',
  _sSubMenuName:'SubMenu',
  _oCarouselBlock : null,
  _oMyAllFavoriteBlock : null,
};

MagicianTec.MemberCenterPageEffect.fInit = function (){
  MagicianTec.MemberCenterPageEffect.LayoutInit ();
  MagicianTec.MemberCenterPageEffect.MenuBtnInit ();

};
MagicianTec.MemberCenterPageEffect.LayoutInit =function(){
  $.get("Mygamelist_0620.html", function(data) { //初始將a.html include div#iframe
      $("#iframe").html(data);
  });
};

MagicianTec.MemberCenterPageEffect.MenuBtnInit = function(){
  var _BtnList = document.querySelectorAll(MagicianTec.MemberCenterPageEffect.GlobalParameter._sBtnClassName);
  for (var i = 0; i < _BtnList.length; i++) {
    if($(_BtnList[i]).next() !== 'undefined' ){
      var _aTmp =  $(_BtnList[i]).next();
      for(var nTmp_i=0 ;nTmp_i < _aTmp.length; nTmp_i++){
        if(_aTmp[nTmp_i].className.search('SubMenu')>-1){
          $(_BtnList[i]).click(MagicianTec.MemberCenterPageEffect._fMenuButtonEvent);
          MagicianTec.MemberCenterPageEffect._fShowObject( _aTmp[nTmp_i], 'Self', 'fast');
          MagicianTec.MemberCenterPageEffect._fHideObject( _aTmp[nTmp_i], 'Self');
        }
      }
    }
  }
  MagicianTec.MemberCenterPageEffect.fSetIframe();
};

MagicianTec.MemberCenterPageEffect.fSetIframe=function() {
    var tmp = $('.Member_nav a');
     $( $(tmp).parent()).click(MagicianTec.Tools.fIfameHarfBtn);
};


MagicianTec.MemberCenterPageEffect._fMenuButtonEvent= function (){
  var _ChildMenu = $(this).next();
    for (var i = 0; i <  _ChildMenu.length; i++) {
      if(_ChildMenu[i].className.search('SubMenu')!==-1){
        if(MagicianTec.MemberCenterPageEffect._fContainsClass(_ChildMenu[i],' show')){
          MagicianTec.MemberCenterPageEffect._fHideObject(  _ChildMenu[i],'Self');
        } else{
          MagicianTec.MemberCenterPageEffect._fShowObject( _ChildMenu[i], 'Self', 'fast');
        }
      }
    }
};

MagicianTec.MemberCenterPageEffect._fHideObject= function(_oTarget, _sCase ){
  switch (_sCase) {
    case 'AllChildObject':
    var _ChildMenu = $(_oTarget).next();
      for (var i = 0; i <  _ChildMenu.length; i++) {
        if(MagicianTec.MemberCenterPageEffect._fContainsClass(_ChildMenu[i],' show')){
          _ChildMenu[i].className = _ChildMenu[i].className.substr(0, _ChildMenu[i].className.length - ' show'.length);
          $(_ChildMenu[i]).hide();
        }
      }
      break;
    case  'Self':
      if(MagicianTec.MemberCenterPageEffect._fContainsClass(_oTarget,' show')){
        _oTarget.className = _oTarget.className.substr(0, _oTarget.className.length - ' show'.length);
        $(_oTarget).hide();
      }
    break;
    default:
    MagicianTec.MemberCenterPageEffect._fHideObject(_oTarget, 'AllChildObject');
    MagicianTec.MemberCenterPageEffect._fHideObject(_oTarget, 'Self');
  }
};

MagicianTec.MemberCenterPageEffect._fShowObject= function (_oTarget, _sCase,  _sVelocity){
  switch (_sCase) {
    case 'AllChildObject':
    var _ChildMenu = $(_oTarget).next();
      for (var i = 0; i <  _ChildMenu.length; i++) {
          _ChildMenu[i].className+= ' show';
          $(_ChildMenu[i]).slideToggle(_sVelocity);
      }
      break;
    case  'Self':
      _oTarget.className += ' show';
      $(_oTarget).slideToggle(_sVelocity);
    break;
    default:
    MagicianTec.MemberCenterPageEffect._fShowObject(_oTarget, 'AllChildObject', _sVelocity);
    MagicianTec.MemberCenterPageEffect._fShowObject(_oTarget, 'Self', _sVelocity);
  }
};

MagicianTec.MemberCenterPageEffect._fContainsClass= function  (targetObj, parmClass) {
    if(!targetObj || typeof parmClass !== 'string') {
        return false;
    }
    if(targetObj.className.search(parmClass) > -1){
        return true;
    } else {
        return false;
    }
  };


$(document).ready(function(){
  MagicianTec.MemberCenterPageEffect.fInit();
});
