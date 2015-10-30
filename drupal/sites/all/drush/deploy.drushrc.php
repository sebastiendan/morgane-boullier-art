<?php

$options['application'] = 'twinings';
$options['deploy-repository'] = 'ssh://gitolite@dev.lumini.fr/twinings.git';
$options['keep-releases'] = 3;
$options['deploy-via'] = 'RemoteCache';

/**
 * @task
 */
function build($d) {
  drush_log('-- build --');
  $d->run('cd %s/drupal && drush make ../drupal.make.yml -y --no-gitinfofile', $d->latest_release());
}
$options['before']['deploy-symlink'][] = 'build';

/**
 * @task
 * link to custom robots.txt
 */
function link_robots($d){
  drush_log('-- link_robots --');
  $d->run('cd %s && rm -rf drupal/robots.txt', $d->latest_release());
  $d->run('ln -s ' . $d->deploy_to . '/shared/robots.txt %s/drupal/robots.txt', $d->latest_release());
}
$options['before']['deploy-symlink'][] = 'link_robots';

/**
 * @task
 */
function link_default($d) {
  drush_log('-- link_default --');
  $d->run('cd %s && rm -rf drupal/sites/default', $d->latest_release());
  $d->run('ln -s ' . $d->deploy_to . '/shared/default %s/drupal/sites/', $d->latest_release());
}
$options['before']['deploy-symlink'][] = 'link_default';

/**
 * @task
 */
function link_icons($d) {
  drush_log('-- link_icons --');
  $d->run('ln -s ' . $d->deploy_to . '/shared/apple-touch-icon-precomposed.png %s/drupal/apple-touch-icon.png', $d->latest_release());
  $d->run('ln -s ' . $d->deploy_to . '/shared/apple-touch-icon-precomposed.png %s/drupal/apple-touch-icon-precomposed.png', $d->latest_release());
}
//$options['before']['deploy-symlink'][] = 'link_icons';

/**
 * @task
 * Underscored to avoid namesapce conflict.
 */
function _updatedb($d) {
  drush_log('-- _updatedb --');
  $d->run('cd %s/drupal && drush updatedb -y', $d->latest_release());
}

$options['before']['deploy-symlink'][] = '_updatedb';

/**
 * @task
    */
function gulp($d) {
  global $options;
  drush_log('-- gulp --');
  $d->run('cd %s/drupal/sites/all/themes/custom/twinings && npm install && gulp sass:prod && bower install --allow-root -n', $d->latest_release(), $options['application']);
}

$options['before']['deploy-symlink'][] = 'gulp';
