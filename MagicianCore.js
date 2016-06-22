'use strict';

var MagicianTec = {};

MagicianTec.Tools = {};
MagicianTec.CommonVariables = {};

/************************ Tool Functions *************************/

MagicianTec.Tools.RedirectPage = function() {
    window.location.assign("/html/index.html");
};

MagicianTec.Tools.fAjaxResponseFail = function(jqXHR) {
  console.log(jqXHR);
  if(jqXHR !== undefined){
    window.alert('Ajax Error!');
  }
};

//取得北京時間
MagicianTec.Tools.fGetBeijingDate = function(bShowSeconds) {

  var _toDay , _localOffset , _destOffset , _Offset , _BeijingDate;
  var _ResultString;

  _toDay = new Date();
  _localOffset = -(_toDay.getTimezoneOffset()/60);
  _destOffset = 8;
  _Offset = _destOffset - _localOffset;
  _BeijingDate = new Date( _toDay.getTime() + _Offset * 3600 * 1000);

  _ResultString = "北京时间 " +
                  [ _BeijingDate.getFullYear(),
                    MagicianTec.Tools._fPadZero(_BeijingDate.getMonth()+1),
                    MagicianTec.Tools._fPadZero(_BeijingDate.getDate()),].join('/') +
                    MagicianTec.Tools._fAMPMDetect(_BeijingDate , bShowSeconds);

  return _ResultString;
};

MagicianTec.Tools._fPadZero = function (Num) {
  return Num < 10 ? '0' + Num : Num;
};

MagicianTec.Tools._fAMPMDetect = function (date , bShowSeconds) {

  var _Hour  , _Minutes , _AMPM , _Seconds;

  _Hour = date.getHours();
  _Minutes = date.getMinutes();

  _AMPM = _Hour >= 12 ? '下午' : '上午';
  _Hour = _Hour % 12;
  _Hour = _Hour ? _Hour : 12; // the hour '0' should be '12'
  _Hour = _Hour < 10 ? '0'+ _Hour : _Hour;
  _Minutes = _Minutes < 10 ? '0'+ _Minutes : _Minutes;

  if(bShowSeconds === 'seconds')
  {
    _Seconds = date.getSeconds();
    _Seconds = _Seconds < 10 ? '0'+ _Seconds : _Seconds;

    return ' ' + _AMPM + ' ' + _Hour + ':' + _Minutes + ':' + _Seconds;
  }
  else if (bShowSeconds === 'minutes')
  {
    return ' ' + _AMPM + ' ' + _Hour + ':' + _Minutes;
  }

};

MagicianTec.Tools.MoneyDisplayType = function (_sSource, _sFloatFlag) {
  var Result = null;
  var nInt = parseInt(_sSource);
  for(var i =0; nInt/1000>=1;i++){
    if(Result===null){
      Result=','+_sSource.substr((_sSource.length-(i+1)*3),3);
    } else{
      Result=','+_sSource.substr((_sSource.length-(i+1)*3),3)+Result;
    }
    nInt =Math.floor(nInt/1000);
  }
  if(_sFloatFlag ==='DeciPer'){
    return nInt.toString()+Result+'.00';
  }
  else{
    return nInt.toString()+Result;
  }
};
//for html4
MagicianTec.Tools.fReSetLayout = function(){
  // var oHeader = document.getElementById('Header'),
  //       oBody = document.getElementById('Body'),
  //       oFooter = document.getElementById('Footer');
  var oHeader =$.find('header'),
        oBody = $.find('article'),
        oFooter = $.find('header');
  oBody.style.top = oHeader.scrollHeight.toString() + 'px' ;
  oFooter.style.top = oBody.scrollHeight.toString() + 'px' ;
};



MagicianTec.Tools.fIfameHarfBtn =function() {
    // 找出 li 中的超連結 href(#id)
    var $this = $(this),
        _clickTag = $this.find('a').attr('href'); // 找到連結a中的href標籤值
    if ("-1" !== _clickTag.search("http://")) { //不為http://執行下列程式
        $.get(_clickTag, function(data) {
            $("#iframe").html(data);
            //MagicianTec.Tools.fReSetLayout();
        });
        return false;
    }
};
