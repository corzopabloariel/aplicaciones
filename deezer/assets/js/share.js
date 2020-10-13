$(document).ready(function () {
  $(".cancel").click(function () {
    $("#modal-background").fadeOut();
    $("#modal").fadeOut();
  });

  $('#sendMail').click(function () {
    $('#shareForm').submit();
  });
  $('#shareForm').submit(function (e) {
    resetFormMessages(this);

    let valid = true;
    var requiredFields = this.getElementsByClassName("required");

    for (field of requiredFields) {
      if (field.value.trim() === '' || (field.nodeName === 'SELECT' && field.selectedIndex === 0)) {
        field.style.border = '1px solid red';
        let message = createRequiredMessage();
        field.after(message);
        valid &&= false;
      }
    }

    if (!validateEmail(this.receipt) && this.receipt.value.length > 0) {
      let message = createEmailMessage();
      this.receipt.after(message);
      valid &&= false;
    }

    if (!valid) return false;

    var subject = this.subject.value;
    var to = this.receipt.value;
    var message = this.message.value;

    var newLine = '%0D';
    var track = `Título: ${$('#track-title').text()}`;
    var duration = `Duración: ${$('#track-duration').text()}`;
    var artist = `Artista: ${$('#track-artist').text()}`;
    var album = `Album: ${$('#track-album').text()}`;
    var body = `${track}${newLine}${duration}${newLine}${artist}${newLine}${album}${newLine}Mensaje: ${message}`;

    this.action = `mailto:${to}?subject=${subject}&body=${body}`;
  });
});