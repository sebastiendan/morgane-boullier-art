#!/bin/bash

drush dis overlay -y
drush dis color -y
drush dis comment -y
drush dis toolbar -y

drush en admin_menu -y
drush en admin_theme -y
drush en admin_views -y
drush en backup_migrate -y
drush en bulk_export -y
drush en module_filter -y
drush en views_ui -y
