<?php

/**
 * @file
 * Providing extra functionality for the NewsletterSubscriber UI via views.
 */

/**
 * Implements hook_views_data().
 */
function newsletter_subscribers_views_data_alter(&$data) {

  $data['newsletter_subscriber']['table']['join'] = array(
    'users' => array(
      'left_field' => 'uid',
      'field'      => 'uid',
    ),
  );

  $data['newsletter_subscriber']['uid'] = array(
    'title'        => t('User ID'),
    'help'         => t('The author ID'),
    'relationship' => array(
      // The name of the table to join with.
      'base'       => 'users',
      // The name of the field on the joined table.
      'base field' => 'uid',
      'handler'    => 'views_handler_relationship',
      'label'      => t('Author ID of the newsletter_subscriber (relationship)'),
      'title'      => t('Author ID'),
      'help'       => t('Author of the newsletter_subscriber (relationship)'),
    ),
    'field'        => array('handler' => 'views_handler_field_numeric', 'click sortable' => TRUE),
    'filter'       => array('handler' => 'views_handler_filter_numeric'),
    'sort'         => array('handler' => 'views_handler_sort'),
    'argument'     => array('handler' => 'views_handler_argument_numeric'),
  );

  $data['newsletter_subscriber']['link_newsletter_subscriber'] = array(
    'field' => array(
      'title'   => t('Link'),
      'help'    => t('Provide a link to the newsletter_subscriber.'),
      'handler' => 'newsletter_subscriber_handler_link_field',
    ),
  );
  $data['newsletter_subscriber']['edit_newsletter_subscriber'] = array(
    'field' => array(
      'title'   => t('Edit Link'),
      'help'    => t('Provide a link to the edit form for the newsletter_subscriber.'),
      'handler' => 'newsletter_subscriber_handler_edit_link_field',
    ),
  );
  $data['newsletter_subscriber']['delete_newsletter_subscriber'] = array(
    'field' => array(
      'title'   => t('Delete Link'),
      'help'    => t('Provide a link to delete the newsletter_subscriber.'),
      'handler' => 'newsletter_subscriber_handler_delete_link_field',
    ),
  );

  // This content of this field are decided based on the menu structure that
  // follows newsletter_subscribers/newsletter_subscriber/%newsletter_subscriber_id/op
  $data['newsletter_subscriber']['operations'] = array(
    'field' => array(
      'title'   => t('Operations links'),
      'help'    => t('Display all operations available for this newsletter_subscriber.'),
      'handler' => 'newsletter_subscriber_handler_newsletter_subscriber_operations_field',
    ),
  );

  $data['newsletter_subscriber']['created'] = array(
    'title'  => t('Created'),
    'help'   => t('Creation date'),
    'field'  => array(
      'handler'        => 'views_handler_field_date',
      'click sortable' => TRUE,
    ),
    'sort'   => array(
      'handler' => 'views_handler_sort_date',
    ),
    'filter' => array(
      'handler' => 'views_handler_filter_date',
    ),
  );

  $data['newsletter_subscriber']['changed'] = array(
    'title'  => t('Changed'),
    'help'   => t('Last modification date'),
    'field'  => array(
      'handler'        => 'views_handler_field_date',
      'click sortable' => TRUE,
    ),
    'sort'   => array(
      'handler' => 'views_handler_sort_date',
    ),
    'filter' => array(
      'handler' => 'views_handler_filter_date',
    ),
  );
}

/**
 * Implements hook_views_default_views().
 */
function newsletter_subscribers_views_default_views() {
  static $views;

  if (isset($views)) {
    return $views;
  }

  $files = file_scan_directory(drupal_get_path('module', 'newsletter_subscribers') . '/views', '/\.view$/');

  foreach ($files as $filepath => $file) {
    include $filepath;
    if (isset($view)) {
      $views[$view->name] = $view;
    }
  }

  return $views;
}
