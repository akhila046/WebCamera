const video = document.getElementById("webcam");
const canvas = document.getElementById("snapshot");
const captureBtn = document.getElementById("captureBtn");
const downloadBtn = document.getElementById("downloadBtn");
const clearBtn = document.getElementById("clearBtn");
const filterSelect = document.getElementById("filterSelect");
const context = canvas.getContext("2d");

// Access webcam
navigator.mediaDevices.getUserMedia({ video: true })
  .then(stream => {
    video.srcObject = stream;
  })
  .catch(error => {
    console.error("Error accessing webcam:", error);
  });

// Apply selected filter
filterSelect.addEventListener("change", () => {
  video.style.filter = filterSelect.value;
});

// Capture photo
captureBtn.addEventListener("click", () => {
  // Apply same filter to canvas
  context.filter = filterSelect.value;
  context.drawImage(video, 0, 0, canvas.width, canvas.height);
});

// Download image
downloadBtn.addEventListener("click", () => {
  const imageURL = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.href = imageURL;
  link.download = "captured_photo.png";
  link.click();
});

// Clear canvas
clearBtn.addEventListener("click", () => {
  context.clearRect(0, 0, canvas.width, canvas.height);
});
