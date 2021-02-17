#!/bin/bash

DB_NAME=test
echo DB_NAME=$DB_NAME
SCRIPT_DIR=$(dirname $0)
#echo $SCRIPT_DIR/contents.json
mongoimport --db $DB_NAME --collection contents --file $SCRIPT_DIR/contents.json
#
mongoimport --db $DB_NAME --collection columns --file $SCRIPT_DIR/columns.json
# sites
mongoimport --db $DB_NAME --collection sites --file $SCRIPT_DIR/sites.json
# users
mongoimport --db $DB_NAME --collection users --file $SCRIPT_DIR/users.json
# apikeys
mongoimport --db $DB_NAME --collection apikeys --file $SCRIPT_DIR/apikeys.json
# site_settings
mongoimport --db $DB_NAME --collection site_settings --file $SCRIPT_DIR/site_settings.json
