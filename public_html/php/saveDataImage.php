<?php

// http://j-query.blogspot.ie/2011/02/save-base64-encoded-canvas-image-to-png.html
define('UPLOAD_DIR', '../uploads/');
$img = $_POST['imgBase64'];
$image_name = $_POST["name"];
$img = str_replace('data:image/png;base64,', '', $img);
$img = str_replace(' ', '+', $img);
$data = base64_decode($img);
$file = UPLOAD_DIR . $image_name . '.png';
$success = file_put_contents($file, $data);
echo 'uploaded';
print $success ? $file : 'Unable to save the file.';

?>