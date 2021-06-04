#!/bin/sh
node wait-for-it.js $1

shift

exec $@