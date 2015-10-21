<?php

$deploy_to = '/data/www/twinings.demo.lumini.fr/deploy';
$options = array(
  'uri' => 'twinings.demo.lumini.fr',
  'root' => $deploy_to . '/current/drupal',
  'remote-host' => '10.200.33.9',
  'remote-user' => 'root',
  'path-aliases' => array(
    '%files' => 'shared/default/files'
  ),
  'databases' => array(
    'default' => array(
      'default' => array(
        'database' => 'twinings',
        'username' => 'twinings',
        'password' => 'BRNjGVeoIQE3YEA1',
        'host' => 'demo.lumini.fr',
        'port' => '',
        'driver' => 'mysql',
        'prefix' => '',
      ),
    ),
  ),
);

$command_specific = array(
  'branch' => 'demo',
  'docroot' => $deploy_to,
  'deploy-to' => $deploy_to,
);

$options['command-specific'] = array(
  'deploy' => $command_specific,
  'deploy-setup' => $command_specific,
  'deploy-rollback' => $command_specific,
  'deploy-cleanup' => $command_specific,
);
