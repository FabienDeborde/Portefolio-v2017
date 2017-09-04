$(function() {
  // Scripts to run for JavaScript supported browsers
  $('.nojs.notice-message').addClass('hidden');

  // Store elements we'll use to make parallax effects
  var about = $('#about');
  var html = $('#html');
  var webdev = $('#webdev');
  var learning = $('#learning');
  var msgForm = $('#msgForm');
  var nameInput = $('#name');
  var emailInput = $('#email');
  var msgInput = $('#msg');
  var submitBtn = $('#submit');
  var scrolls = {};

  ////////////////////////
  // Smooth Scrolling
  ////////////////////////

  //@prepros-append scrollspy.js

  ////////////////////////
  // Work section
  ////////////////////////
  // Activate Masonry
  // Handle click on images, toggle class to give zoom-in effect

  // init Masonry
  var $grid = $('.grid').masonry({
    itemSelector: '.grid-item',
    percentPosition: true,
    fitWidth: true,
    gutter: 20,
    columnWidth: '.grid-sizer'
  });
  // layout Masonry after each image loads
  $grid.imagesLoaded().progress( function() {
    $grid.masonry();
  });
  // Update sections layout infos after Masonry finsihed rearranging images
  // Will update the scrolls value on each masonry update
  $grid.on( 'layoutComplete', function() {
    //console.log('layout done');
    var inView = $(window).height();
    var offset = 200;
    scrolls = {
      about : (about.offset().top) - (about.height()) + offset * 2,
      aboutEnd : (about.offset().top + about.height()) - 50,
      dot1 : (html.offset().top) - inView + offset * 0,
      dot2 : (webdev.offset().top) - inView + offset * 0,
      dot3 : (learning.offset().top) - inView + offset * 0,
      form : msgForm.offset().top - inView,
      name : nameInput.offset().top - inView + offset,
      msg : nameInput.offset().top - inView + offset + nameInput.height(),
      submit : submitBtn.offset().top - inView + offset/3,
    }
    // Manage active links while scrolling
    gumshoe.init({
      offset: 200
    });
  });

  $('.grid-item').on('click', function(){
    $('.grid-item').not(this).removeClass('active');
    $(this).toggleClass('active');
  })

  ////////////////////////
  // About me section
  ////////////////////////
  // Remove nojs class and active dots
  $('section#about').removeClass('nojs');
  $('section#about .dot').removeClass('active');
  var animateDot = function(el, number) {
      var dots = el.find('.dot');
      dots.each(function(i, el) {
        if (i < number) {
          setTimeout(function() {
            $(el).addClass('active');
          }, i * 200);
        }
      });
    }

  ////////////////////////
  // Contact section
  ////////////////////////
  $('section#contact').removeClass('nojs');
  var animateInputs = function() {
    nameInput.addClass('active');
    emailInput.addClass('active');
  }
  var animateMsg = function() {
    msgInput.addClass('active');
  }
  var animateBtn = function() {
    submitBtn.addClass('active');
  }

  ////////////////////////
  // Parallax effects
  ////////////////////////
  var parallax = function() {
    $(document).on('scroll', function(e){
      var scroll = $(this).scrollTop();
      var width = $(this).width();
      console.log(width);
      var inView = $(window).height();
      //console.log(scroll);
      //Hide Sidebar when scroll more than 100px
      if ((scroll > 100 && width > 768) || ((scroll >= inView && width <= 768) )) {
      //if (scroll > 100) {
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

      // Animate About section between 2700 and 3850 ScrollTop
      if (scroll > scrolls.about && scroll < scrolls.aboutEnd) {
        $('section#about').addClass('unwrapped');
      } else {
        $('section#about').removeClass('unwrapped');
        $('section#about .dot').removeClass('active');
      }
      // Animate Skills dots
      if (scroll > scrolls.dot1) {
        animateDot($('section#about #html .dots'), 9);
        animateDot($('section#about #js .dots'), 9);
      }
      if (scroll > scrolls.dot2) {
        animateDot($('section#about #webdev .dots'), 9);
        animateDot($('section#about #webdesign .dots'), 7);
      }
      if (scroll > scrolls.dot3) {
        animateDot($('section#about #organization .dots'), 8);
        animateDot($('section#about #learning .dots'), 10);
      }
      if (scroll < scrolls.form) {
        nameInput.removeClass('active');
        emailInput.removeClass('active');
        msgInput.removeClass('active');
        submitBtn.removeClass('active');
      }
      if (scroll > scrolls.name) {
        animateInputs();
      }
      if (scroll > scrolls.msg) {
        animateMsg();
      }
      if (scroll > scrolls.submit) {
        animateBtn();
      }
    })

    //Scrolling debug
    //console.log(scrolls);
    // $('.main-logo').on('click', function(e){
    //   e.preventDefault();
    //   $grid.masonry();
    //   console.log(gridItemWidth(2));
    //   // var offset = $('#msgForm').offset().top;
    //   // var height = $('#msgForm').height();
    //   // var inView = $(window).height();
    //   // console.log('offset: ' + offset);
    //   // console.log('height: ' + height);
    //   // console.log('offset - height: ' + (offset - inView));
    //   // console.log(($('section#about').offset().top) + (($('section#about').height()) / 2) - 100);
    // })
  }
  parallax();


  ////////////////////////
  // Form Script
  ////////////////////////

  //@prepros-append form.js
});
