<?php

/**
 * @file
 * NewsletterSubscriber editing UI.
 *
 * We make very little use of the EntityAPI interface for this - preferring
 * instead to use views. That offers more flexibility to change a UI that
 * will, more often than not, be end-user facing.
 */

/**
 * UI controller.
 */
class NewsletterSubscriberUIController extends EntityDefaultUIController {

  /**
   * Overrides hook_menu() defaults. Main reason for doing this is that
   * parent class hook_menu() is optimized for entity type administration.
   */
  public function hook_menu() {

    $items = array();
    $id_count = count(explode('/', $this->path));
    $wildcard = isset($this->entityInfo['admin ui']['menu wildcard']) ? $this->entityInfo['admin ui']['menu wildcard'] : '%' . $this->entityType;

    $items[$this->path] = array(
      'title'            => 'Newsletter subscribers',
      'description'      => 'Add edit and update Newsletter subscribers.',
      'page callback'    => 'system_admin_menu_block_page',
      'access arguments' => array('access administration pages'),
      'file path'        => drupal_get_path('module', 'system'),
      'file'             => 'system.admin.inc',
    );

    // Change the overview menu type for the list of newsletter_subscribers.
    $items[$this->path]['type'] = MENU_LOCAL_TASK;

    // Change the add page menu to multiple types of entities.
    $items[$this->path . '/add'] = array(
      'title'            => 'Add a Newsletter subscriber',
      'description'      => 'Add a new Newsletter subscriber',
      'page callback'    => 'newsletter_subscriber_add_page',
      'access callback'  => 'newsletter_subscriber_access',
      'access arguments' => array('edit'),
      'type'             => MENU_NORMAL_ITEM,
      'weight'           => 20,
      'file'             => 'newsletter_subscribers_newsletter_subscriber.admin.inc',
      'file path'        => drupal_get_path('module', $this->entityInfo['module']),
    );

    // Add menu items to add each different type of entity.
    foreach (newsletter_subscriber_get_types() as $type) {
      $items[$this->path . '/add/' . $type->type] = array(
        'title'            => 'Add ' . $type->label,
        'page callback'    => 'newsletter_subscriber_form_wrapper',
        'page arguments'   => array(newsletter_subscriber_create(array('type' => $type->type))),
        'access callback'  => 'newsletter_subscriber_access',
        'access arguments' => array('edit', 'edit ' . $type->type),
        'file'             => 'newsletter_subscribers_newsletter_subscriber.admin.inc',
        'file path'        => drupal_get_path('module', $this->entityInfo['module']),
      );
    }

    // Loading and editing newsletter_subscriber entities.
    $items[$this->path . '/newsletter_subscriber/' . $wildcard] = array(
      'page callback'    => 'newsletter_subscriber_form_wrapper',
      'page arguments'   => array($id_count + 1),
      'access callback'  => 'newsletter_subscriber_access',
      'access arguments' => array('edit', $id_count + 1),
      'weight'           => 0,
      'context'          => MENU_CONTEXT_PAGE | MENU_CONTEXT_INLINE,
      'file'             => 'newsletter_subscribers_newsletter_subscriber.admin.inc',
      'file path'        => drupal_get_path('module', $this->entityInfo['module']),
    );
    $items[$this->path . '/newsletter_subscriber/' . $wildcard . '/edit'] = array(
      'title'   => 'Edit',
      'type'    => MENU_DEFAULT_LOCAL_TASK,
      'weight'  => -10,
      'context' => MENU_CONTEXT_PAGE | MENU_CONTEXT_INLINE,
    );

    $items[$this->path . '/newsletter_subscriber/' . $wildcard . '/delete'] = array(
      'title'            => 'Delete',
      'page callback'    => 'newsletter_subscriber_delete_form_wrapper',
      'page arguments'   => array($id_count + 1),
      'access callback'  => 'newsletter_subscriber_access',
      'access arguments' => array('edit', $id_count + 1),
      'type'             => MENU_LOCAL_TASK,
      'context'          => MENU_CONTEXT_INLINE,
      'weight'           => 10,
      'file'             => 'newsletter_subscribers_newsletter_subscriber.admin.inc',
      'file path'        => drupal_get_path('module', $this->entityInfo['module']),
    );

    // Menu item for viewing newsletter_subscribers.
    $items['newsletter_subscriber/' . $wildcard] = array(
      // 'title' => 'Title',
      'title callback'   => 'newsletter_subscriber_page_title',
      'title arguments'  => array(1),
      'page callback'    => 'newsletter_subscriber_page_view',
      'page arguments'   => array(1),
      'access callback'  => 'newsletter_subscriber_access',
      'access arguments' => array('view', 1),
      'type'             => MENU_CALLBACK,
    );

    return $items;
  }

  /**
   * Create the markup for the add NewsletterSubscriber Entities page within the class
   * so it can easily be extended/overriden.
   */
  public function addPage() {
    $item = menu_get_item();
    $content = system_admin_menu_block($item);

    if (count($content) == 1) {
      $item = array_shift($content);
      drupal_goto($item['href']);
    }

    return theme('newsletter_subscriber_add_list', array('content' => $content));
  }
}

/**
 * Form callback wrapper: create or edit a newsletter_subscriber.
 *
 * @param object $newsletter_subscriber
 *   The newsletter_subscriber object being edited by this form.
 *
 * @return array
 *   Form.
 *
 * @see newsletter_subscriber_edit_form()
 */
function newsletter_subscriber_form_wrapper($newsletter_subscriber) {
  // Add the breadcrumb for the form's location.
  newsletter_subscriber_set_breadcrumb();

  return drupal_get_form('newsletter_subscriber_edit_form', $newsletter_subscriber);
}

/**
 * Form callback wrapper: delete a newsletter_subscriber.
 *
 * @param object $newsletter_subscriber
 *   The newsletter_subscriber object being edited by this form.
 *
 * @return array
 *   Form.
 *
 * @see newsletter_subscriber_edit_form()
 */
function newsletter_subscriber_delete_form_wrapper($newsletter_subscriber) {
  // Add the breadcrumb for the form's location.
  // newsletter_subscriber_set_breadcrumb();
  return drupal_get_form('newsletter_subscriber_delete_form', $newsletter_subscriber);
}

/**
 * Form callback: create or edit a newsletter_subscriber.
 *
 * @param object $newsletter_subscriber
 *   The newsletter_subscriber object to edit or for a create form an empty
 *     newsletter_subscriber object with only a newsletter_subscriber type defined.
 */
function newsletter_subscriber_edit_form($form, &$form_state, $newsletter_subscriber) {
  // Add the default field elements.
  $form['name'] = array(
    '#type'          => 'textfield',
    '#title'         => t('Newsletter subscriber Name'),
    '#default_value' => isset($newsletter_subscriber->name) ? $newsletter_subscriber->name : '',
    '#maxlength'     => 255,
    '#required'      => TRUE,
    '#weight'        => -5,
  );

  // Add the field related form elements.
  $form_state['newsletter_subscriber'] = $newsletter_subscriber;
  field_attach_form('newsletter_subscriber', $newsletter_subscriber, $form, $form_state);

  $form['actions'] = array(
    '#type'       => 'container',
    '#attributes' => array('class' => array('form-actions')),
    '#weight'     => 400,
  );

  // We add the form's #submit array to this button along with the actual submit
  // handler to preserve any submit handlers added by a form callback_wrapper.
  $submit = array();

  if (!empty($form['#submit'])) {
    $submit += $form['#submit'];
  }

  $form['actions']['submit'] = array(
    '#type'   => 'submit',
    '#value'  => t('Save'),
    '#submit' => $submit + array('newsletter_subscriber_edit_form_submit'),
  );

  if (!empty($newsletter_subscriber->name)) {
    $form['actions']['delete'] = array(
      '#type'   => 'submit',
      '#value'  => t('Delete'),
      '#suffix' => l(t('Cancel'), 'admin/content/newsletter_subscribers'),
      '#submit' => $submit + array('newsletter_subscriber_form_submit_delete'),
      '#weight' => 45,
    );
  }

  // We append the validate handler to #validate in case a form callback_wrapper
  // is used to add validate handlers earlier.
  $form['#validate'][] = 'newsletter_subscriber_edit_form_validate';

  return $form;
}

/**
 * Implements hook_form_validate().
 */
function newsletter_subscriber_edit_form_validate(&$form, &$form_state) {
  $newsletter_subscriber = $form_state['newsletter_subscriber'];

  // Notify field widgets to validate their data.
  field_attach_form_validate('newsletter_subscriber', $newsletter_subscriber, $form, $form_state);
}

/**
 * Implements hook_form_submit().
 *
 * @todo remove hard-coded link
 */
function newsletter_subscriber_edit_form_submit(&$form, &$form_state) {

  $newsletter_subscriber = entity_ui_controller('newsletter_subscriber')->entityFormSubmitBuildEntity($form, $form_state);
  // Save the newsletter_subscriber and go back to the list of newsletter_subscribers.

  // Add in created and changed times.
  if ($newsletter_subscriber->is_new = isset($newsletter_subscriber->is_new) ? $newsletter_subscriber->is_new : 0) {
    $newsletter_subscriber->created = REQUEST_TIME;
  }

  $newsletter_subscriber->changed = REQUEST_TIME;

  $newsletter_subscriber->save();
  $form_state['redirect'] = 'admin/content/newsletter_subscribers';
}

/**
 * Form API submit callback for the delete button.
 * @todo Remove hard-coded path
 *
 * @param array $form
 *   Form.
 * @param array $form_state
 *   Form state.
 */
function newsletter_subscriber_form_submit_delete(&$form, &$form_state) {
  $form_state['redirect'] = 'admin/content/newsletter_subscribers/newsletter_subscriber/' . $form_state['newsletter_subscriber']->newsletter_subscriber_id . '/delete';
}

/**
 * Form callback: confirmation form for deleting a newsletter_subscriber.
 *
 * @param object $newsletter_subscriber
 *   The newsletter_subscriber to delete
 *
 * @return array
 *   Form.
 *
 * @see confirm_form()
 */
function newsletter_subscriber_delete_form($form, &$form_state, $newsletter_subscriber) {
  $form_state['newsletter_subscriber'] = $newsletter_subscriber;

  $form['#submit'][] = 'newsletter_subscriber_delete_form_submit';

  $form = confirm_form(
    $form,
    t('Are you sure you want to delete Newsletter subscriber %name?', array('%name' => $newsletter_subscriber->name)),
    'admin/content/newsletter_subscribers/newsletter_subscriber',
    '<p>' . t('This action cannot be undone.') . '</p>',
    t('Delete'),
    t('Cancel'),
    'confirm'
  );

  return $form;
}

/**
 * Implements hook_form_submit().
 */
function newsletter_subscriber_delete_form_submit($form, &$form_state) {
  $newsletter_subscriber = $form_state['newsletter_subscriber'];

  newsletter_subscriber_delete($newsletter_subscriber);

  drupal_set_message(t('The Newsletter subscriber %name has been deleted.', array('%name' => $newsletter_subscriber->name)));
  watchdog('newsletter_subscribers', 'Deleted Newsletter subscriber %name.', array('%name' => $newsletter_subscriber->name));

  $form_state['redirect'] = 'admin/content/newsletter_subscribers';
}


/**
 * Page to add NewsletterSubscriber Entities.
 * @todo Pass this through a proper theme function
 *
 * @return mixed
 *   Page.
 */
function newsletter_subscriber_add_page() {
  $controller = entity_ui_controller('newsletter_subscriber');

  return $controller->addPage();
}


/**
 * Displays the list of available newsletter_subscriber types for newsletter_subscriber creation.
 *
 * @ingroup themeable
 */
function theme_newsletter_subscriber_add_list($variables) {
  $content = $variables['content'];

  if ($content) {
    $output = '<dl class="newsletter_subscriber-type-list">';

    foreach ($content as $item) {
      $output .= '<dt>' . l($item['title'], $item['href']) . '</dt>';
      $output .= '<dd>' . filter_xss_admin($item['description']) . '</dd>';
    }
    $output .= '</dl>';
  }
  else {
    if (user_access('administer newsletter_subscriber types')) {
      $output = '<p>' . t(
          'Newsletter subscriber Entities cannot be added because you have not created any Newsletter subscriber types yet. Go to the <a href="@create-newsletter_subscriber-type">Newsletter subscriber type creation page</a> to add a new Newsletter subscriber type.',
          array('@create-newsletter_subscriber-type' => url('admin/structure/newsletter_subscriber_types/add'))
        ) . '</p>';
    }
    else {
      $output = '<p>' . t('No Newsletter subscriber types have been created yet for you to use.') . '</p>';
    }
  }

  return $output;
}

/**
 * Sets the breadcrumb for administrative newsletter_subscriber pages.
 */
function newsletter_subscriber_set_breadcrumb() {
  $breadcrumb = array(
    l(t('Home'), '<front>'),
    l(t('Administration'), 'admin'),
    l(t('Content'), 'admin/content'),
    l(t('NewsletterSubscribers'), 'admin/content/newsletter_subscribers'),
  );

  drupal_set_breadcrumb($breadcrumb);
}
