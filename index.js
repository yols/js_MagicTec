'use strict';


//Variables for register page.
MagicianTec.oIndexPage = {};

MagicianTec.oIndexPage.oSelectors = {
  $BannerAdCarousel: undefined,
  $ArticleSmallAdCarousel: undefined,

  $ArticleGameListTab:undefined,
  $ArticleRealityGameTab:undefined,
  $ArticleDigitalGameTab:undefined,
  $ArticleCardGameTab:undefined,

  $BannerNotLogin : undefined
};

//******************* Init *******************

MagicianTec.oIndexPage.fInitAllSelectors = function () {
  //Init index page self.
  MagicianTec.oIndexPage.oSelectors.$BannerAdCarousel = $('#Banner_Div_Carousel');
  MagicianTec.oIndexPage.oSelectors.$ArticleSmallAdCarousel = $('#Article_Div_SmallCarousel');

  MagicianTec.oIndexPage.oSelectors.$ArticleGameListTab = $('#Article_Div_GameList');
  MagicianTec.oIndexPage.oSelectors.$ArticleRealityGameTab = $('#Article_Div_RealityGame');
  MagicianTec.oIndexPage.oSelectors.$ArticleDigitalGameTab = $('#Article_Div_DigitalGame');
  MagicianTec.oIndexPage.oSelectors.$ArticleCardGameTab = $('#Article_Div_CardGame');

  MagicianTec.oIndexPage.oSelectors.$BannerNotLogin = $('#Article_Div_RegisterExample');
};

//******************* Ad slider section *******************

MagicianTec.oIndexPage.fAdCarouselRequest = function (SuccessCallback) {
  $.get( '../index.php?c=advertisement&m=banner', SuccessCallback, 'json').fail(MagicianTec.Tools.fAjaxResponseFail);
};

//******************* Carousel display section *******************

MagicianTec.oIndexPage.fShowAdCarousel = function () {
  MagicianTec.oIndexPage.oSelectors.$BannerAdCarousel.owlCarousel({
    items:1,//顯示張數
    center:true,//中央
    autoplayTimeout: 5000,//5秒換張滑動速度
    margin:0,//距離
    autoplay: true, // 自動撥放
    dots:true,//點
    loop:true,//循環
  });
};

MagicianTec.oIndexPage.fShowSmallCarousel = function () {
  MagicianTec.oIndexPage.oSelectors.$ArticleSmallAdCarousel.owlCarousel({
    items:1,
    center:true,
    autoplayTimeout: 5000, //5秒換張滑動速度
    margin:0,
    autoplay: true, // 自動撥放
    autoWidth:false,
    responsive:false,
    dots:true,
    loop:true
  });
};

MagicianTec.oIndexPage.fInitTabs = function (){
  MagicianTec.oIndexPage.oSelectors.$ArticleGameListTab.tabs();
  MagicianTec.oIndexPage.oSelectors.$ArticleRealityGameTab.tabs({
      event: "mouseover"
    });
  MagicianTec.oIndexPage.oSelectors.$ArticleDigitalGameTab.tabs({
      event: "mouseover"
    });
  MagicianTec.oIndexPage.oSelectors.$ArticleCardGameTab.tabs({
      event: "mouseover"
    });
};

//******************* Inherited functions **************************

MagicianTec.CommonStructure.fCustomPageLoginedDisplay = function () {
  MagicianTec.oIndexPage.oSelectors.$BannerNotLogin.hide();
  MagicianTec.oIndexPage.oSelectors.$ArticleGameListTab.show();
};

MagicianTec.CommonStructure.fCustomPageNotLoginDisplay = function () {
  MagicianTec.oIndexPage.oSelectors.$BannerNotLogin.show();
  MagicianTec.oIndexPage.oSelectors.$ArticleGameListTab.hide();
};

//****************** Main Function *************************

$(function() {

  //Init all selectors
  MagicianTec.oIndexPage.fInitAllSelectors();

  MagicianTec.oIndexPage.fShowAdCarousel();
  MagicianTec.oIndexPage.fShowSmallCarousel();

  MagicianTec.oIndexPage.fInitTabs();

  /*
  $('#Header_Div_Marquee').marquee({
    duration: 5000
  }); */
});
