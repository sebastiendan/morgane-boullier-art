
main = '';

(function (jQuery) {
  Drupal.behaviors.twinings = {
    attach: function (context, settings)
    {
      if(main == ''){
        main = new Main();
        main.init();
      }
    }
  };
}(jQuery));
