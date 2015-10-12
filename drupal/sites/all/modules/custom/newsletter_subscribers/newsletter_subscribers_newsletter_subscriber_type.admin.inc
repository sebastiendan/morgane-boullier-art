<?php

/**
 * @file
 * NewsletterSubscriber type editing UI.
 */

/**
 * UI controller.
 */
class NewsletterSubscriberTypeUIController extends EntityDefaultUIController {

  /**
   * Overrides hook_menu() defaults.
   */
  public function hook_menu() {
    $items = parent::hook_menu();
    $items[$this->path]['description'] = 'Manage Newsletter subscriber entity types, including adding
		and removing fields and the display of fields.';

    return $items;
  }
}

/**
 * Generates the newsletter_subscriber type editing form.
 */
function newsletter_subscriber_type_form($form, &$form_state, $newsletter_subscriber_type, $op = 'edit') {

  if ($op == 'clone') {
    $newsletter_subscriber_type->label .= ' (cloned)';
    $newsletter_subscriber_type->type = '';
  }

  $form['label'] = array(
    '#title'         => t('Label'),
    '#type'          => 'textfield',
    '#default_value' => $newsletter_subscriber_type->label,
    '#description'   => t('The human-readable name of this Newsletter subscriber type.'),
    '#required'      => TRUE,
    '#size'          => 30,
  );
  // Machine-readable type name.
  $form['type'] = array(
    '#type'          => 'machine_name',
    '#default_value' => isset($newsletter_subscriber_type->type) ? $newsletter_subscriber_type->type : '',
    '#maxlength'     => 32,
    '#machine_name'  => array(
      'exists' => 'newsletter_subscriber_get_types',
      'source' => array('label'),
    ),
    '#description'   => t(
      'A unique machine-readable name for this Newsletter subscriber type. It must only contain lowercase letters, numbers, and underscores.'
    ),
  );

  $form['actions'] = array('#type' => 'actions');
  $form['actions']['submit'] = array(
    '#type'   => 'submit',
    '#value'  => t('Save Newsletter subscriber type'),
    '#weight' => 40,
  );

  return $form;
}

/**
 * Form API submit callback for the type form.
 */
function newsletter_subscriber_type_form_submit(&$form, &$form_state) {
  $newsletter_subscriber_type = entity_ui_form_submit_build_entity($form, $form_state);
  $newsletter_subscriber_type->save();
  $form_state['redirect'] = 'admin/structure/newsletter_subscriber_types';
}

/**
 * Form API submit callback for the delete button.
 */
function newsletter_subscriber_type_form_submit_delete(&$form, &$form_state) {
  $form_state['redirect'] = 'admin/structure/newsletter_subscriber_types/manage/' . $form_state['newsletter_subscriber_type']->type . '/delete';
}
