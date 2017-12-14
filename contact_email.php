<?php
header('Content-type: application/json');

$name = $_POST['name'];
$email = $_POST['email'];
$message = $_POST['message'];
$from = "From: $name"; 
$to = "dikagamess@gmail.com"; 
$subject = "ajacks.org Contact Form!";

$body = "From: $name\nE-Mail: $email\nMessage:\n$message";

if ( !$name || !$email || !$message ) {
	$response_array['status'] = 'error'; 
	$response_array['message'] = "You forgot to fill out a field."; 
	$response_array['status_code'] = "1"; 
} else {
	if ('localhost' == $_SERVER['HTTP_HOST'] || mail ($to, $subject, $body, $from)) { 
		$response_array['status'] = 'success';
		$response_array['message'] = "<strong>Your message was sent!</strong> I'll get back to you as soon as I can!"; 
		$response_array['status_code'] = "0";
	} else { 
		$response_array['status'] = 'error'; 
		$response_array['message'] = "Email didn't send."; 
		$response_array['status_code'] = "2"; 
	} 
}


echo json_encode($response_array);
