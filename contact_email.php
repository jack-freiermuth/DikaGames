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
	$response_array['message'] = "Você esqueceu de preencher um campo."; 
	$response_array['status_code'] = "1"; 
} else {
	if ('localhost' == $_SERVER['HTTP_HOST'] || mail ($to, $subject, $body, $from)) { 
		$response_array['status'] = 'success';
		$response_array['message'] = "<strong>Sua mensagem foi enviada, entraremos em contato assim que possível"; 
		$response_array['status_code'] = "0";
	} else { 
		$response_array['status'] = 'error'; 
		$response_array['message'] = "Email não enviado."; 
		$response_array['status_code'] = "2"; 
	} 
}


echo json_encode($response_array);
