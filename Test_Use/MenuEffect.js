var btntrigger;

$('.CirclarBar').knob(
{
  'min':0,
  'max':100,
  'width':200,
  'height':200,
  'readOnly':true,
  'fgColor':"#2bdca8",
  draw : function () {
      // "tron" case
      if(this.$.data('skin') == 'tron') {

          this.cursorExt = 0.3;

          var a = this.arc(this.cv)  // Arc
                  , pa                   // Previous arc
                  , r = 1;

          this.g.lineWidth = this.lineWidth;

          if (this.o.displayPrevious) {
              pa = this.arc(this.v);
              this.g.beginPath();
              this.g.strokeStyle = this.pColor;
              this.g.arc(this.xy, this.xy, this.radius - this.lineWidth, pa.s, pa.e, pa.d);
              this.g.stroke();
          }

          this.g.beginPath();
          this.g.strokeStyle = r ? this.o.fgColor : this.fgColor ;
          this.g.arc(this.xy, this.xy, this.radius - this.lineWidth, a.s, a.e, a.d);
          this.g.stroke();

          this.g.lineWidth = 1;
          this.g.beginPath();
          this.g.strokeStyle = this.o.fgColor;
          this.g.arc( this.xy, this.xy, this.radius - this.lineWidth + 1 + this.lineWidth * 2 / 3, 0, 2 * Math.PI, false);
          this.g.stroke();

          return false;
      }
  },
  release:function(v) {console.log(v);}
});
$(document).ready(function(){
  var _BtnList = document.querySelectorAll('.Menu_Btn');
  //console.log(_BtnList + document.getElementsByClassName('Menu_Btn').length);

  for (var i = 0; i < _BtnList.length; i++) {
    $(_BtnList[i]).click(ButtonEvent);
  }
});
function ButtonEvent(e){
var _ChildMenu = $(this).next();

btntrigger = this;
  for (var i = 0; i <  _ChildMenu.length; i++) {
    if(containsClass(_ChildMenu,'show')){
      _ChildMenu[i].className -= 'show';
      _ChildMenu.hide();
    }
    else{
      _ChildMenu[i].className += 'show';
      _ChildMenu.slideToggle('fast');
    }
  }
}



function containsClass(targetObj, parmClass) {
    if(!targetObj || typeof parmClass !== 'string') {
        return false;
    } else if(targetObj.className && targetObj.className.trim().split(/\s+/gi).indexOf(parmClass) > -1) {
        return true;
    } else {
        return false;
    }
}
