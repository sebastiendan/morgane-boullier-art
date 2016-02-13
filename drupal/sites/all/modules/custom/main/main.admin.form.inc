<?php

function main_admin_settings_form()
{
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

	$form['#submit'][] = 'main_admin_settings_form_submit';

	return system_settings_form($form);
}

function main_admin_settings_form_submit($form, &$form_state)
{
	$form['my_photo']['#file']->status = FILE_STATUS_PERMANENT;
	file_save($form['my_photo']['#file']);
}

