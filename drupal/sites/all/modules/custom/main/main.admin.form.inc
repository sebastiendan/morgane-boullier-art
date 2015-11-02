<?php

function main_admin_settings_form(){
  $form['is_home_an_event'] = array(
    '#title' => t('Home is an event'),
    '#type' => 'checkbox',
    '#default_value' => variable_get('is_home_an_event'),
  );
  $form['contact_mail'] = array(
    '#title' => t('Contact mail'),
    '#type' => 'textfield',
    '#default_value' => variable_get('contact_mail'),
  );

  return system_settings_form($form);
}

