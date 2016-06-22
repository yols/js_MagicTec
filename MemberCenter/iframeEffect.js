'use strict';
//
MagicianTec.MemberCenterIfamePageEffect={};
MagicianTec.MemberCenterIfamePageEffect.GlobalParameter={
  _oCarouselBlock : null,
  _oMyAllFavoriteBlock : null,
};
MagicianTec.MemberCenterIfamePageEffect.fInit = function (){
    MagicianTec.MemberCenterIfamePageEffect.GameListInit();
}

MagicianTec.MemberCenterIfamePageEffect.GameListInit = function(){
  var OpenBtn = document.getElementById('OpenMyAllFavorite'),
        CloseBtn = document.getElementById('CloseMyAllFavorite');
  MagicianTec.MemberCenterIfamePageEffect.GlobalParameter._oCarouselBlock = document.getElementById('_oCarouselBlock');
  MagicianTec.MemberCenterIfamePageEffect.GlobalParameter._oMyAllFavoriteBlock = document.getElementById('_oMyAllFavoriteBlock');
  $(MagicianTec.MemberCenterIfamePageEffect.GlobalParameter._oCarouselBlock).show();
  $(MagicianTec.MemberCenterIfamePageEffect.GlobalParameter._oMyAllFavoriteBlock).hide();
  //register btn
  $(OpenBtn).click(MagicianTec.MemberCenterIfamePageEffect._fGameListBtnEvent);
  $(CloseBtn).click(MagicianTec.MemberCenterIfamePageEffect._fGameListBtnEvent);

};

MagicianTec.MemberCenterIfamePageEffect._fGameListBtnEvent = function(){
  switch (this.id) {
    case 'CloseMyAllFavorite':
      $(MagicianTec.MemberCenterIfamePageEffect.GlobalParameter._oCarouselBlock).show();
      $(MagicianTec.MemberCenterIfamePageEffect.GlobalParameter._oMyAllFavoriteBlock).hide();
    break;
    case 'OpenMyAllFavorite':
      $(MagicianTec.MemberCenterIfamePageEffect.GlobalParameter._oCarouselBlock).hide();
      $(MagicianTec.MemberCenterIfamePageEffect.GlobalParameter._oMyAllFavoriteBlock).show();
    break;
    default:

  }
};


$(document).ready(function(){
  MagicianTec.MemberCenterIfamePageEffect.fInit();
});
//Draw Circle Process by Canvas
$('.CirclarBar').knob(
{
  'min':0,
  'max':100,
  'width':150,
  'height':150,
  'readOnly':true,
  'fgColor':"#2bdca8",
  draw : function () {
      // "tron" case
      if(this.$.data('skin') === 'tron') {
          this.cursorExt = 0.3;
          var  aArc = this.arc(this.cv)  // Arc
                  , aPreArc                   // Previous arc
                  , aStrokeStyle =1;

          this.g.lineWidth = this.lineWidth;

          if (this.o.displayPrevious) {
              aPreArc = this.arc(this.v);
              this.g.beginPath();
              this.g.strokeStyle = this.pColor;
              this.g.arc(this.xy, this.xy, this.radius - this.lineWidth, aPreArc.s, aPreArc.e, aPreArc.d);
              this.g.stroke();
          }

          this.g.beginPath();
          this.g.strokeStyle = aStrokeStyle ? this.o.fgColor : this.fgColor ;
          this.g.arc(this.xy, this.xy, this.radius - this.lineWidth, aArc.s, aArc.e, aArc.d);
          this.g.stroke();

          this.g.lineWidth = 2;
          this.g.beginPath();
          this.g.strokeStyle = this.o.fgColor;
          this.g.arc( this.xy, this.xy, this.radius - this.lineWidth + 1 + this.lineWidth * 2 / 3, 0, 2 * Math.PI, false);
          this.g.stroke();

          return false;
      }
  }
});
