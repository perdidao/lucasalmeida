#!/bin/bash
if [ $1 == 'prod' ] ; then
    rsync -avzPp ./dist/ hostgator:/home2/lucas079/lucasalmeida.dev
    rsync -avzPp ./dist/ hostgator:/home/lucas079/public_html
    exit;
fi
