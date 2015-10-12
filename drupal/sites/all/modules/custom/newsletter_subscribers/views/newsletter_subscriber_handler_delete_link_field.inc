<?php

/**
 * @file
 * Contains a Views field handler to take care of displaying deletes links
 * as fields.
 */

/**
 * Class newsletter_subscriber_handler_delete_link_field.
 */
class newsletter_subscriber_handler_delete_link_field extends newsletter_subscriber_handler_link_field {
  /**
   * Constructor.
   */
  public function construct() {
    parent::construct();
    $this->additional_fields['type'] = 'type';
  }

  /**
   * Render link.
   *
   * @param array $values
   *   Values.
   *
   * @return string
   *   Link.
   */
  public function render($values) {
    $type = $values->{$this->aliases['type']};

    // Creating a dummy newsletter_subscriber to check access against.
    $dummy_newsletter_subscriber = (object) array('type' => $type);
    if (!newsletter_subscriber_access('edit', $dummy_newsletter_subscriber)) {
      return;
    }

    $text = !empty($this->options['text']) ? $this->options['text'] : t('delete');
    $newsletter_subscriber_id = $values->{$this->aliases['newsletter_subscriber_id']};

    return l($text, 'admin/content/newsletter_subscribers/newsletter_subscriber/' . $newsletter_subscriber_id . '/delete');
  }
}
