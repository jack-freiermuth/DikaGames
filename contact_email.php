<?php
file_put_contents('C:\wamp64\www\debug_file.txt', "\n\n" ."_POST: " . print_r($_POST, true));
header('Content-type: application/json');

require_once "recaptchalib.php";
// your secret key
$secret = "6LdH3CIUAAAAAKPMs_EAcCpivrSNsNCknK8UX5qI";
 
// empty response
$response = null;
 
// check secret key
$reCaptcha = new ReCaptcha($secret);


// if submitted check response
if ($_POST["g-recaptcha-response"]) {
    $response = $reCaptcha->verifyResponse(
        $_SERVER["REMOTE_ADDR"],
        $_POST["g-recaptcha-response"]
    );
}

$name = $_POST['name'];
$email = $_POST['email'];
$message = $_POST['message'];
$from = "From: $name"; 
$to = "dikagamess@gmail.com"; 
$subject = "ajacks.org Contact Form!";
// $human = $_POST['human'];

$body = "From: $name\nE-Mail: $email\nMessage:\n$message";

if ( !$name || !$email || !$message ) {
	$response_array['status'] = 'error'; 
	$response_array['message'] = "You forgot to fill out a field."; 
	$response_array['status_code'] = "1"; 
} else {
	if ( $response != null && $response->success ) {		
		if ('localhost' == $_SERVER['HTTP_HOST'] || mail ($to, $subject, $body, $from)) { 
			$response_array['status'] = 'success';
			$response_array['message'] = "<strong>Your message was sent!</strong> I'll get back to you as soon as I can!"; 
			$response_array['status_code'] = "0";
		} else { 
			$response_array['status'] = 'error'; 
			$response_array['message'] = "Email didn't send."; 
			$response_array['status_code'] = "2"; 
		} 
	} else {
		$response_array['status'] = 'error'; 
		$response_array['message'] = "You didn't pass the reCAPTCHA Verification."; 
		$response_array['status_code'] = "3"; 
	}
}


echo json_encode($response_array);
