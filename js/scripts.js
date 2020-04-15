
function tinySliderInit () {
  var slider = tns({
    container: '.carousel__inner',
    items: 1,
    slideBy: 'page',
    autoplay: false,
    nav: false,
    controls: false
  });
  
  document.querySelector('.prev').addEventListener('click', function(){ slider.goTo('prev') });
  document.querySelector('.next').addEventListener('click', function(){ slider.goTo('next') });
}

function toggleContentClass(item){
  $(item).each(function(i) {
    $(this).on('click', function(e) {
      e.preventDefault();
      $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
      $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
    })
  });
}

function validationForm(selector) {
  $(selector).validate({
    rules: {
      name: {
        required: true
      },
      phone: {
        required: true        
      },
      email: {
        required: true//,
        //url: true
      }
    }
  });
}

$(document).ready(function(){
  tinySliderInit();
  $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
    $(this)
      .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
      .closest('.catalog>.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
  });

  toggleContentClass('.catalog-item__link');
  toggleContentClass('.catalog-item__back');

  //Modal
  $('[data-modal=consultation]').on('click', function () {
      $('.overlay, #consultation').fadeIn('slow');
  });

  $('.modal__close').on('click', function() {
    $('.overlay, #consultation, #thanks, #order').fadeOut('slow');
  });

  $('.button_mini').each(function(i) {
    $(this).on('click', function() {
      $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
      $('.overlay, #order').fadeIn('slow');
    });
  });

  // Validation
  validationForm('#consultSection');
  validationForm('#consultation .feed-form');
  validationForm('#order .feed-form');

  $('input[name=phone]').mask("+3(999) 999-99-99");

  $('form').submit(function(e) {
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: "mailer/smart.php",
      data: $(this).serialize()
    }).done(function() {
      $(this).find("input").val("");
      $('#consultation, #order').fadeOut();
      $('.overlay, #thanks').fadeIn();
      $('form').trigger('resrt');
    });
    return false;
  });

  // smooth scroll and page up
  $(window).scroll(function() {
    if ($(this).scrollTop() > 1600) {
      $('.pageup').fadeIn();
    }
    else {
      $('.pageup').fadeOut();
    }
  });
  $("a[href^='#up']").click(function() {
    const _href = $(this).attr("href");
    $("html, body").animate({ scrollTop: $(_href).offset().top+"px" });
    return false;
  });

  // animations
  new WOW().init();
});
