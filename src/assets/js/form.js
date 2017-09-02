$(function() {

  function formFunction(){
    // Get the form
    const form = $('#msgForm');

    $(form).on('submit', function(e){
      e.preventDefault();
       $('#submit').prop('disabled', true);
      // Prepare the AJAX request
      const formData = $(form).serialize();

      $.ajax({
          method: 'POST',
          url: 'server-assets/private-mailer.php',
          data: formData
      }).done(function(response) {
        console.log('message sent');
        $("#submit-success").toggleClass('hidden');
        form.fadeOut();

        // Clear the form.
        $('#name').val('');
        $('#email').val('');
        $('#msg').val('');
        $('#submit').prop('disabled', false);
      }).fail(function(data) {
        //console.log('Error: the message couldn\'t be delivered. (' + data.responseText + ')');
        $("#submit-error").html(data.responseText);
        $("#submit-error").toggleClass('hidden');
      });
    })
  }

  formFunction();
});
