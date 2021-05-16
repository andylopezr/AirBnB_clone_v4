$(document).ready(function () {
  const amenities = {};
  $('input:checkbox').change(function () {
    if ($(this).is(':checked')) {
      amenities[$(this).data('id')] = $(this).data('name');
    } else {
      delete amenities[$(this).data('id')];
    }
    let tex = '';
    if (!(Object.values(amenities).length)) {
      $('.amenities h4').replaceWith('<h4>&nbsp;</h4>');
    } else {
      tex = Object.values(amenities).join(', ');
      $('.amenities h4').html(tex);
    }
  });
  $.getjson('http://0.0.0.0:5001/api/v1/status/', (data) => {
    if (data.status === 'OK') {
      $('DIV#api_status').addClass('available');
    }
    else {
      $('DIV#api_status').removeClass('available');
    }
  });
});