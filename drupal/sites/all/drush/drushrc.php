<?php

$options['shell-aliases'] = array(
  'pull-files' => '!drush rsync @prod:%files/ @local:%files --mode=rltDv',
  'pull-db' => '!drush sql-sync @prod @local',
  'deploy-dev' => '!drush core-rsync @local @dev --exclude-files --delete --mode=rltDv',
);

