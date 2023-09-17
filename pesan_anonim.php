<?php
//menyimpan text
if (isset($_POST["message"])) {
  $message = $_POST["message"];
  $folder = "./data/mess/";
  if (!file_exists($folder)) {
    mkdir($folder, 0777, true);
  }
  date_default_timezone_set('Asia/Jakarta'); // Mengatur zona waktu ke Asia/Jakarta
  $timestamp = date("Y-m-d_H-i-s");
  $file = $folder . "/" . $timestamp . ".txt";
  file_put_contents($file, $message);
  echo "Pesan berhasil disimpan.";
} else {
  echo "Tidak ada pesan yang dikirim.";
}
?>