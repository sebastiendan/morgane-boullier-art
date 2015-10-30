function Stats() {
}
Stats.init = function(){
  jQuery('a.site-logo').click(function(){
    Stats.sendEvent('clic_logo');
  });

  jQuery('#block-main-main-menu-button').click(function(){
    Stats.sendEvent('clic_menu');
  });

  jQuery('.video-play-button').click(function(){
    Stats.sendEvent('clic_home_video');
  });

  jQuery('.video-play-button').click(function(){
    Stats.sendEvent('clic_home_video');
  });

  jQuery('.node--home-page .field--name-field-headline .link-wrapper a').click(function(){
    Stats.sendEvent('clic_home_visuel');
  });

  jQuery('.field--name-field-tea-image').click(function(){
    Stats.sendEvent('clic_lecture_typedethé');
  });

  jQuery('.page-node-6 fieldset.collapsible a').click(function(){
    Stats.sendEvent('clic_lecture_bienfaits');
  });

  jQuery('.node--map-country .field--name-title-field').click(function(){
    Stats.sendEvent('clic_lecture_cartemonde');
  });

  jQuery('.page-node-9 fieldset.collapsible a').click(function(){
    Stats.sendEvent('clic_lecture_preparation');
  });

  jQuery('.page-node-11 fieldset.collapsible a').click(function(){
    Stats.sendEvent('clic_lecture_teatasters');
  });

  jQuery('.page-node-12 fieldset.collapsible a').click(function(){
    Stats.sendEvent('clic_lecture_engagements');
  });

  jQuery('#bullet-button').click(function(){
    Stats.sendEvent('clic_lecture_puces');
  });

  jQuery('input#edit-submit').click(function(){
    Stats.sendEvent('clic_contact_envoyer');
  });

  jQuery('#edit-field-category-tid-wrapper label').click(function(){
    Stats.sendEvent('clic_lecture_gamme');
  });
};

Stats.sendEvent = function(eventType, label) {
  ga('send', 'event', label, 'click', label);
  ga('lumini.send', 'event', label, 'click', label);
};