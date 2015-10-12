<?php

/**
 * The class used for newsletter_subscriber entities
 *
 * Class NewsletterSubscriber
 */
class NewsletterSubscriber extends Entity {
  /**
   * Constructor.
   *
   * @param array $values
   *   Values.
   *
   * @throws \Exception
   */
  public function __construct($values = array()) {
    parent::__construct($values, 'newsletter_subscriber');
  }

  /**
   * Return newsletter_subscriber label.
   *
   * @return string
   *   Label.
   */
  protected function defaultLabel() {
    return $this->name;
  }

  /**
   * Return newsletter_subscriber URI.
   *
   * @return array
   *   Uri.
   */
  protected function defaultUri() {
    return array('path' => 'newsletter_subscriber/' . $this->newsletter_subscriber_id);
  }
}