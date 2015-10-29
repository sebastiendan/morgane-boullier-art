<?php

/**
 * Implements hook_preprocess_page().
 */
function twinings_preprocess_page(&$variables) {
  // You can use preprocess hooks to modify the variables before they are passed
  // to the theme function or template file.
  drupal_add_js('document.getElementsByTagName("html")[0].style.opacity = 0',
    array('type' => 'inline', 'scope' => 'header')
  );
}
