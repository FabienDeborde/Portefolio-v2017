$(function() {
  // Scripts to run for JavaScript supported browsers
  $('.nojs.notice-message').addClass('hidden');

  // Scrolling effect on the whole page
  $(document).on('scroll', function(e){
    var scroll = $(this).scrollTop();
    console.log(scroll);
    //Hide Sidebar when scroll more than 100px
    if (scroll > 100) {
      $('#sidebar').addClass('retracted');
      // $('#sidebar').on('mouseenter', function(){
      //   $('#sidebar').removeClass('retracted');
      // })
      //
      // $('#sidebar').on('mouseleave', function(){
      //   $('#sidebar').addClass('retracted');
      // })
    } else {
      // Show Sidebar when top of the page
      $('#sidebar').removeClass('retracted');
    }

    // Animate About section between 2700 and 3650 ScrollTop
    if (scroll > 2700 && scroll < 3650) {
      $('section#about').addClass('unwrapped');

    } else {
      $('section#about').removeClass('unwrapped');
    }

  })

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

  ////////////////////////
  // Smooth Scrolling
  ////////////////////////

  //@prepros-append scrollspy.js

  // Manage active links while scrolling
  gumshoe.init();

  ////////////////////////
  // Work section (Handle click on images, toggle class to give zoom-in effect)
  ////////////////////////
  $('.grid-item').on('click', function(){
    $('.grid-item').not(this).removeClass('active');
    $(this).toggleClass('active');
  })

  ////////////////////////
  // About me section
  ////////////////////////
  $('section#about').removeClass('nojs');

});
