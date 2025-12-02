#!/bin/bash

cd /var/www
. .venv/bin/activate

cd telecloud

hypercorn main:app --bind 127.0.0.1:4090 --workers 6 --graceful-timeout 130