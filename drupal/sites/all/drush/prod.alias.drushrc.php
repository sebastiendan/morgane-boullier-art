<?php

$deploy_to = '/var/www/mytwinings.fr/deploy';
$options = array(
  'uri' => 'mytwinings.fr',
  'root' => $deploy_to . '/current/drupal',
  'remote-host' => '10.200.33.204',
  'remote-user' => 'root',
  'path-aliases' => array(
    '%files' => 'sites/default/files'
  ),
);

$command_specific = array(
  'branch' => 'master',
  'docroot' => $deploy_to,
  'deploy-to' => $deploy_to,
);

$options['command-specific'] = array(
  'deploy' => $command_specific,
  'deploy-setup' => $command_specific,
  'deploy-rollback' => $command_specific,
  'deploy-cleanup' => $command_specific,
);
