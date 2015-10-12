<?php

/**
 * The class used for newsletter_subscriber type entities
 *
 * Class NewsletterSubscriberType
 */
class NewsletterSubscriberType extends Entity {
  /**
   * @var string
   */
  public $type;

  /**
   * @var string
   */
  public $label;

  /**
   * Constructor.
   *
   * @param array $values
   *   Values.
   *
   * @throws \Exception
   */
  public function __construct($values = array()) {
    parent::__construct($values, 'newsletter_subscriber_type');
  }
}