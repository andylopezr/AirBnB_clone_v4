const $ = window.$;
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
  $.getJSON('http://127.0.0.1:5001/api/v1/status/', (data) => {
    if (data.status === 'OK') {
      $('DIV#api_status').addClass('available');
    } else {
      $('DIV#api_status').removeClass('available');
    }
  });
});

function getPlaces () {
  $.ajax({
    url: 'http://127.0.0.1:5001/api/v1/places_search/:',
    type: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: JSON.stringify({}),
    success: function (data) {
      for (const item of data) {
        const article = ['<article>',
          '<div class="title_box">',
                    `<h2>${item.name}</h2>`,
                    `<div class="price_by_night">$${item.price_by_night}</div>`,
                    '</div>',
                    '<div class="information">',
                    `<div class="max_guest">${item.max_guest} Guest(s)</div>`,
                    `<div class="number_rooms">${item.number_rooms} Bedroom(s)</div>`,
                    `<div class="number_bathrooms">${item.number_bathrooms} Bathroom(s)</div>`,
                    '</div>',
                    '<div class="description">',
                    `${item.description}`,
                    '</div>',
                    '</article>'];
        $('.places').append(article.join(''));
      }
    },
    error: (error) => console.log(error)
  });
}
