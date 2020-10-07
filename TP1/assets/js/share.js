$(document).ready(function(){
  $('#shareForm').submit(function(e){
    var subject = this.subject.value;
    var to = this.receipt.value;
    var message = this.message.value;

    var newLine = '%0D';
    var body = `producto: blalba${newLine}Mensaje: ${message}`;

    this.action = `mailto:${to}?subject=${subject}&body=${body}`;
  });
});