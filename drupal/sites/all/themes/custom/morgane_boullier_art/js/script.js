
main = '';

(function (jQuery) {
  Drupal.behaviors.morgane_boullier_art = {
    attach: function (context, settings)
    {
      if(main == ''){
        main = new Main();
        main.init();
      }
    }
  };
}(jQuery));
