$(function() {
  // Scripts to run for JavaScript supported browsers
  $('.nojs.notice-message').addClass('hidden');

  ////////////////////////
  // Smooth Scrolling
  ////////////////////////

  //@prepros-append scrollspy.js

  // Manage active links while scrolling
  gumshoe.init();

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
    gutter: 10,
    columnWidth: '.grid-sizer'
  });
  // layout Masonry after each image loads
  $grid.imagesLoaded().progress( function() {
    $grid.masonry();
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
        }, i * 300);
      }
    });
  }


  ////////////////////////
  // Contact section
  ////////////////////////
  $('section#contact').removeClass('nojs');
  var nameInput = $('#name');
  var emailInput = $('#email');
  var msgInput = $('#msg');
  var submitBtn = $('#submit');

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
      $('section#about .dot').removeClass('active');
    }
    // Animate Skills dots
    if (scroll > 2710) {
      animateDot($('section#about #html .dots'), 9);
      animateDot($('section#about #js .dots'), 9);
    }
    if (scroll > 2780) {
      animateDot($('section#about #webdev .dots'), 9);
      animateDot($('section#about #webdesign .dots'), 7);
    }
    if (scroll > 2850) {
      animateDot($('section#about #organization .dots'), 8);
      animateDot($('section#about #learning .dots'), 10);
    }
    if (scroll < 3320) {
      nameInput.removeClass('active');
      emailInput.removeClass('active');
      msgInput.removeClass('active');
      submitBtn.removeClass('active');
    }
    if (scroll > 3422) {
      animateInputs();
    }
    if (scroll > 3634) {
      animateMsg();
    }
    if (scroll > 3740) {
      animateBtn();
    }


  })
});
