<?php
  require ('./settings.php');
  require ('./phpmailer/PHPMailerAutoload.php');

  // Create a new mail object
  $mail = new PHPMailer;

  // Set the SMTP settings
  $mail->SMTPDebug  = 0;  // Set to 2 for debugging message
  $mail->isSMTP();                                      // Set mailer to use SMTP
  $mail->Host = 'wwwsgls1.a2hosting.com';  // Specify main and backup SMTP servers
  $mail->SMTPAuth = true;                               // Enable SMTP authentication
  $mail->Username = $username;                 // SMTP username
  $mail->Password = $password;                           // SMTP password
  $mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
  $mail->Port = 587;                                    // TCP port to connect to

  //Set the encoding and the format of the email
  $mail->CharSet="UTF-8";
  $mail->isHTML(true);       // Set email format to HTML

  // Add this to the email header
  $mail->setFrom($username, '【Message from fabiendeborde.com】');
  $mail->addAddress($recipient, $recipient_name);     // Add a recipient (Name is optional)
  $mail->addReplyTo($email, $name);

  // Add image to the email
  $mail->AddEmbeddedImage('../assets/img/icons/Logo_white.png', 'logo');

  // Pass the message content to the mail object
  $mail->Subject = $subject;
  $mail->Body    = $email_body;
  $mail->AltBody = $plain_email_body;


  // Send the email
  $success = $mail->send();
  $error_msg = $mail->ErrorInfo;
