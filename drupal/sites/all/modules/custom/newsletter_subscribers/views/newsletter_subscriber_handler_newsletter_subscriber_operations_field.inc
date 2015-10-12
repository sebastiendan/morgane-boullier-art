<?php

/**
 * @file
 * This field handler aggregates operations that can be done on a newsletter_subscriber
 * under a single field providing a more flexible way to present them in a view
 */

/**
 * Class newsletter_subscriber_handler_newsletter_subscriber_operations_field.
 */
class newsletter_subscriber_handler_newsletter_subscriber_operations_field extends views_handler_field {
  /**
   * Constructor.
   */
  public function construct() {
    parent::construct();

    $this->additional_fields['newsletter_subscriber_id'] = 'newsletter_subscriber_id';
  }

  /**
   * Update query.
   */
  public function query() {
    $this->ensure_my_table();
    $this->add_additional_fields();
  }

  /**
   * Build link.
   *
   * @param array $values
   *   Values.
   *
   * @return string
   *   Link.
   *
   * @throws \Exception
   */
  public function render($values) {
    $links = menu_contextual_links(
      'newsletter_subscriber',
      'admin/content/newsletter_subscribers/newsletter_subscriber',
      array($this->get_value($values, 'newsletter_subscriber_id'))
    );

    if (!empty($links)) {
      return theme(
        'links',
        array(
          'links' => $links,
          'attributes' => array(
            'class' => array('links', 'inline', 'operations'),
          ),
        )
      );
    }
  }
}
