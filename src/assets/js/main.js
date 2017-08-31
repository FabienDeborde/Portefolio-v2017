$(function() {

    ////////////////////////////
    //  トップへ　スクリプト
    ///////////////////////////

  $('a.top-button').on('click', function(e){
    e.preventDefault();
    (function () {
       $("body,html").animate({"scrollTop": "0px"}, 1000);
    }());
  })

  

});
