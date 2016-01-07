<?php

$deploy_to = '/data/www/morgane_boullier_art.dev.lumini.fr/deploy';
$options = array(
  'uri' => 'morgane_boullier_art.dev.lumini.fr',
  'root' => $deploy_to . '/current/drupal',
  'remote-host' => '10.200.33.247',
  'remote-user' => 'lumini',
  'path-aliases' => array(
    '%files' => 'sites/default/files'
  ),
  'databases' => array(
    'default' => array(
      'default' => array(
        'database' => 'morgane_boullier_art',
        'username' => 'morgane_boullier_art',
        'password' => 'BRNjGVeoIQE3YEA1',
        'host' => 'dev.lumini.fr',
        'port' => '',
        'driver' => 'mysql',
        'prefix' => '',
      ),
    ),
  ),
);

$command_specific = array(
  'branch' => 'dev',
  'docroot' => $deploy_to,
  'deploy-to' => $deploy_to,
);

$options['command-specific'] = array(
  'deploy' => $command_specific,
  'deploy-setup' => $command_specific,
  'deploy-rollback' => $command_specific,
  'deploy-cleanup' => $command_specific,
);
