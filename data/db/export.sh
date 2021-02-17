#!/bin/bash


DB_NAME=hcms
echo DB_NAME=$DB_NAME
SCRIPT_DIR=$(dirname $0)
#echo $SCRIPT_DIR/contents.json
mongoexport --db $DB_NAME --collection contents --out $SCRIPT_DIR/contents.json
#
mongoexport --db $DB_NAME --collection columns --out $SCRIPT_DIR/columns.json
# sites
mongoexport --db $DB_NAME --collection sites --out $SCRIPT_DIR/sites.json
# users
mongoexport --db $DB_NAME --collection users --out $SCRIPT_DIR/users.json
# apikeys
mongoexport --db $DB_NAME --collection apikeys --out $SCRIPT_DIR/apikeys.json
# site_settings
mongoexport --db $DB_NAME --collection site_settings --out $SCRIPT_DIR/site_settings.json
