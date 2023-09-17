<?php
// Mendapatkan data gambar dari permintaan
$imageData = $_POST['image'];

// Membuat nama unik untuk file gambar
$fileName = uniqid() . '.jpeg';

// Menyimpan gambar ke folder "img"
$savePath = './data/img/' . $fileName;
file_put_contents($savePath, base64_decode(preg_replace('#^data:image/\w+;base64,#i', '', $imageData)));
// Mengirim respons dengan nama file gambar
echo $fileName;
?>