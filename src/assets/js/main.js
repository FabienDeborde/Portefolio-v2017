$(function() {

    ////////////////////////////
    //  トップへ　スクリプト
    ///////////////////////////

  // $('a.top-button').on('click', function(e){
  //   e.preventDefault();
  //   (function () {
  //      $("body,html").animate({"scrollTop": "0px"}, 1000);
  //   }());
  // })


  // init Masonry
  var $grid = $('.grid').masonry({
    itemSelector: '.grid-item',
    percentPosition: true,
    fitWidth: true,
    gutter: 10,
    columnWidth: '.grid-sizer'
  });
  // layout Masonry after each image loads
  $grid.imagesLoaded().progress( function() {
    $grid.masonry();
  });

  $('.nojs.notice-message').addClass('hidden');


});
