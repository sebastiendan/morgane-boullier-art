<?php

/**
 * The Controller for NewsletterSubscriber entities.
 *
 * Class NewsletterSubscriberTypeController
 */
class NewsletterSubscriberTypeController extends EntityAPIControllerExportable {
  /**
   * Constructor.
   *
   * @param string $entity_type
   *   Entity type.
   */
  public function __construct($entity_type) {
    parent::__construct($entity_type);
  }

  /**
   * Create a newsletter_subscriber type - we first set up the values that are specific
   * to our newsletter_subscriber type schema but then also go through
   * the EntityAPIController function.
   *
   * @param array $values
   *   The values of the newsletter_subscriber.
   *
   * @return bool
   *   A newsletter_subscriber type object with all default fields initialized.
   */
  public function create(array $values = array()) {
    // Add values that are specific to our NewsletterSubscriber.
    $values += array(
      'id'     => '',
      'is_new' => TRUE,
    );
    $newsletter_subscriber_type = parent::create($values);

    return $newsletter_subscriber_type;
  }
}
