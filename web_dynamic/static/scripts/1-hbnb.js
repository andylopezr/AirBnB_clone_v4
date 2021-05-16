  $(function () {
    const amenities = {};
  
    $('input:checkbox').change(
      function () {
        if ($(this).is(':checked')) {
          amenities[($(this).attr('data-id'))] = $(this).attr('data-name');
        } else {
          delete amenities[($(this).attr('data-id'))];
        }
        $('div.amenities h4').html(Object.values(amenities).join(', ') || '&nbsp;');
      });
  });