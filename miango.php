<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    


<?php
// require 'phpmailer/PHPMailerAutoload.php';
$fullName = "{$_POST['fullname']}";
$address = "{$_POST['address']}";
$radio = $_POST['category'];
$phoneNumber = "{$_POST['phone-number']}";
$email ="{$_POST['email']}";
$numberOfPersons = "{$_POST['no-of-persons']}";
$purposeOfVisit = "{$_POST['visit-purpose']}";
$dateFrom = date_create($_POST['date-from']);
$newFrom = date_format($dateFrom,"d/m/Y");
$dateTo = date_create($_POST['date-to']);
$newTo = date_format($dateTo,"d/m/Y");


$Interval = date_diff($dateFrom, $dateTo);









$Body = '<body style="margin:0; padding:0">';
$Body .= '<div style="height: 100%; width: 100%; background-color: #5a5a5a14; margin: 0; padding: 30px">';
$Body    .= '<div style="height: auto; width: 500px; padding:30px; border: 1px solid whitesmoke; border-radius:5px; background-color:white; margin: 0 auto; ">';
$Body    .= '<p style="font-size:17px"><b>Full Name:</b></p>';
$Body    .= '<p style="font-size:20px">'.$fullName.'</p>';
$Body    .= '<p style="font-size:17px"><b>Phone Number:</b></p>';
$Body    .= '<p style="font-size:20px">'.$phoneNumber.'</p>';
$Body    .= '<p style="font-size:17px"><b>Email:</b></p>';
$Body    .= '<p style="font-size:20px">'.$email.'</p>';
$Body    .= '<p style="font-size:17px"><b>Address:</b></p>';
$Body    .= '<p style="font-size:20px">'.$address.'</p>';
$Body    .= '<p style="font-size:17px"><b>Number of Persons:</b></p>';
$Body    .= '<p style="font-size:20px">'.$numberOfPersons.'</p>';
$Body    .= '<p style="font-size:17px"><b>Category:</b></p>';
$Body    .= '<p style="font-size:20px">'.$radio.'</p>';
$Body    .= '<p style="font-size:17px"><b>From:</b></p>';
$Body    .= '<p style="font-size:20px">'.$newFrom.'</p>';
$Body    .= '<p style="font-size:17px"><b>To:</b></p>';
$Body    .= '<p style="font-size:20px">'.$newTo.'</p>';
$Body    .= '<p style="font-size:17px"><b>Number of Days</b></p>';
$Body    .= '<p style="font-size:20px">'.$Interval->format('%a days').'</p>';
$Body    .= '<p style="font-size:17px"><b>Purpose of Visit:</b></p>';
$Body    .= '<p style="font-size:20px">'.$purposeOfVisit.'</p>';
$Body    .= '</div>';
$Body    .= '</div>';
$Body    .= '</body>';
// $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';


echo $Body;

echo $Interval->format('%a days');
echo $radio;



?>


</body>
</html>