
document.addEventListener("DOMContentLoaded", (event) => {
    const contactReasonSelect = document.getElementById("contact-reason");
    const fileUploadContainer = document.getElementById("file-upload-container");
  
    contactReasonSelect.addEventListener("change", (event) => {
      if (event.target.value === "Trabajo") {
        fileUploadContainer.classList.remove("d-none");
      } else {
        fileUploadContainer.classList.add("d-none");
      }
    });
  });