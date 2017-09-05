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
    var inView = $(window).height();
    var offset = 200;
    // update the offset value of the main elements after each masonry update
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

  // Function to reset the grid active state
  var resetGrid = function(item) {
    var gridArray = $('.grid-item');
    gridArray.not(item).removeClass('active');
    var imgArr = $('.grid-item img');
    $.each(imgArr, function(i){
      var src = $(imgArr[i]).attr("src");
      src = src.replace('large', 'small');
      $(imgArr[i]).attr('src', src);
    })
  }

  // Reset the grid if click outside the grid items
  $(document).on('click', function(e){
    if ($(event.target).closest('.grid-item').length < 1) {
      resetGrid();
    }
  })

  // Handle the active state of the grid item
  $('.grid-item').on('click', function(){
    var src = $(this).find('img').attr("src");
    resetGrid($(this));
    $(this).toggleClass('active');
    // Update the src image to the large version when active
    if ($(this).hasClass('active')) {
      src = src.replace('small', 'large');
    } else {
      src = src.replace('large', 'small');
    }
    $(this).find('img').attr("src", src);
  })

  ////////////////////////
  // About me section
  ////////////////////////
  // Remove nojs class and active dots
  $('section#about').removeClass('nojs');
  $('section#about .dot').removeClass('active');
  // Activate the skills dots progressively, until the passed number is reached
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
  // Handle the toggle of custom classes for the form parallax effects
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
      // Get the scroll from the top value, the width of the document and the window height
      var scroll = $(this).scrollTop();
      var width = $(this).width();
      var inView = $(window).height();
      //Hide Sidebar when scroll more than 100px
      if ((scroll > 100 && width > 768) || ((scroll >= inView && width <= 768) )) {
        $('#sidebar').addClass('retracted');
      } else {
        // Show Sidebar when top of the page
        $('#sidebar').removeClass('retracted');
      }

      // Animate About section
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
      // Reset form parallax effect when form is out of view
      if (scroll < scrolls.form) {
        nameInput.removeClass('active');
        emailInput.removeClass('active');
        msgInput.removeClass('active');
        submitBtn.removeClass('active');
      }
      // Animate the form inputs
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
  };
  parallax();


  ////////////////////////
  // Form Script
  ////////////////////////

  //@prepros-append form.js
});
