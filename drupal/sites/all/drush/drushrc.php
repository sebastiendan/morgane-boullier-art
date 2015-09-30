<?php

$options['shell-aliases'] = array(
  'pull-files' => '!drush rsync @dev:%files/ @local:%files --mode=rltDv',
  'pull-db' => '!drush sql-sync @dev @local',
  'deploy-dev' => '!drush core-rsync @local @dev --exclude-files --delete --mode=rltDv',
);

