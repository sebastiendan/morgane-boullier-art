<?php

/**
 * @file
 * Contains a Views field handler to take care of displaying links to entities
 * as fields.
 */

/**
 * Class newsletter_subscriber_handler_link_field
 */
class newsletter_subscriber_handler_link_field extends views_handler_field {
  /**
   * Constructor.
   */
  public function construct() {
    parent::construct();

    $this->additional_fields['newsletter_subscriber_id'] = 'newsletter_subscriber_id';
    $this->additional_fields['type'] = 'type';
  }

  /**
   * Get option definition.
   *
   * @return array
   *   Definition.
   */
  public function option_definition() {
    $options = parent::option_definition();

    $options['text'] = array('default' => '', 'translatable' => TRUE);

    return $options;
  }

  /**
   * Update form field.
   *
   * @param array $form
   *   Form.
   * @param array $form_state
   *   Form state.
   */
  public function options_form(&$form, &$form_state) {
    parent::options_form($form, $form_state);

    $form['text'] = array(
      '#type'          => 'textfield',
      '#title'         => t('Text to display'),
      '#default_value' => $this->options['text'],
    );
  }

  /**
   * Update query.
   */
  public function query() {
    $this->ensure_my_table();
    $this->add_additional_fields();
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
    $text = !empty($this->options['text']) ? $this->options['text'] : t('view');
    $newsletter_subscriber_id = $values->{$this->aliases['newsletter_subscriber_id']};

    return l($text, 'newsletter_subscriber/' . $newsletter_subscriber_id);
  }
}
