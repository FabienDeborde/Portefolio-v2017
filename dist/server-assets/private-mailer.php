<?php
    //Display errors
    // ini_set('display_errors','on');
    // error_reporting(E_ALL);

    // Check for bots function
    function isBot() {
      	$bots = array("Indy", "Blaiz", "Java", "libwww-perl", "Python", "OutfoxBot", "User-Agent", "PycURL", "AlphaServer", "T8Abot", "Syntryx", "WinHttp", "WebBandit", "nicebot", "Teoma", "alexa", "froogle", "inktomi", "looksmart", "URL_Spider_SQL", "Firefly", "NationalDirectory", "Ask Jeeves", "TECNOSEEK", "InfoSeek", "WebFindBot", "girafabot", "crawler", "www.galaxy.com", "Googlebot", "Scooter", "Slurp", "appie", "FAST", "WebBug", "Spade", "ZyBorg", "rabaz");

      	foreach ($bots as $bot)
        		if (stripos($_SERVER['HTTP_USER_AGENT'], $bot) !== false)
        			return true;

      	if (empty($_SERVER['HTTP_USER_AGENT']) || $_SERVER['HTTP_USER_AGENT'] == " ")
      		  return true;

      	return false;
    }

    // Only process POST reqeusts.
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        // Check for bots
        if (isBot() !== false) {
            http_response_code(400);
            echo "No bots please! UA reported as: ".$_SERVER['HTTP_USER_AGENT'];
            exit;
        }

        // Function to clean the data it is passed
        function sanitize_input($data) {
          $data = trim($data);
          $data = stripslashes($data);
          $data = htmlspecialchars($data);
          $data = str_replace(array('\r', '\n', '\r\n', "\r", "\n", "\r\n", '%0A', "%0A", '/', '.php'), "", $data);
          return $data;
        }

        // Get the form fields and remove whitespace.
        $name = sanitize_input(filter_input(INPUT_POST, "name", FILTER_SANITIZE_STRING));
				$email = sanitize_input(filter_input(INPUT_POST, "email", FILTER_SANITIZE_EMAIL));
        $message = sanitize_input(filter_input(INPUT_POST, "msg", FILTER_SANITIZE_STRING));
        $phone = sanitize_input(filter_input(INPUT_POST, "phone", FILTER_SANITIZE_STRING));

        // Check that data was sent to the mailer.
        if ( empty($name) OR empty($message) OR !filter_var($email, FILTER_VALIDATE_EMAIL)) {
            // Set a 400 (bad request) response code and exit.
            http_response_code(400);
            echo "Oops! There was a problem with your submission. Please complete the form and try again. <br>";
            echo "<small>(Error: at least one required field is empty)</small>";
            exit;
        }

        // Check if a robot is trying to send the form
        // (The username input is a Honeypot trap here,so it should be empty when a human send the form)
        if (!empty($_POST["phone"])) {
          http_response_code(400);
          echo "Oops! There was a problem with your submission. Please complete the form and try again.";
          exit;
        }

        // Set the recipient name and email address.
        $recipient_name = 'Fabien Deborde';
        $recipient = 'fabien.webdev@gmail.com';

        //Set the timezone and get the time of sending
        date_default_timezone_set('Asia/Tokyo');
        $date = date("l jS \of F Y, \a\\t H:i:s");

        // Create the email
        // Set the email subject.
        $subject = "【You got a message】 From: " . $name;

        // Set the email body
        include './email_body.php';


        //Include the mailer script
        include './phpmailer.php';

        if(!$success) {
          //If there is an error during the sending
            // Set a 500 (internal server error) response code.
            http_response_code(500);
            echo "Oops! Something went wrong and we couldn't send your message.";
            echo "Mailer Error: " . $error_msg;// The syntax for getting the error message here
        } else {
            // Set a 200 (okay) response code.
            http_response_code(200);
            echo "Thank You! Your message has been sent.";
        }
    } else {
        // Not a POST request, set a 403 (forbidden) response code.
        http_response_code(403);
        echo "There was a problem with your submission, please try again.";
    }
