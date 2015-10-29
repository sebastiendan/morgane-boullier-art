function Stats() {
}
Stats.init = function(){
  jQuery('a.site-logo').click(function(){
    Stats.sendEvent('clic_logo');
  });

  jQuery('block-main-main-menu-button').click(function(){
    Stats.sendEvent('clic_menu');
  });
};

Stats.sendEvent = function(eventType, label) {
  ga('send', 'event', 'Click', 'click', label);
};