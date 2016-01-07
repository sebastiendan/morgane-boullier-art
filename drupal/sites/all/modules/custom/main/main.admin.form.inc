<?php

function main_admin_settings_form(){
  $form['my_photo'] = array(
      '#type' => 'managed_file',
      '#title' => t('My photo'),
      '#size' => 40,
      '#upload_location' => 'public://',
      '#default_value' => variable_get('my_photo'),
  );
  $form['contact_mail'] = array(
    '#title' => t('Contact mail'),
    '#type' => 'textfield',
    '#default_value' => variable_get('contact_mail'),
  );

  return system_settings_form($form);
}

