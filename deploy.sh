#!/bin/bash
#---------------------------------------------------------
# written by: Lawrence McDaniel
#             lpm0073@gmail.com
#             lawrencemcdaniel.com
#
# date:       May-2020
#
# usage:      deploy prouduction build of lawrencemcdaniel.com ReactJ
#             app to AWS S3 bucket.
#---------------------------------------------------------
aws s3 sync ./site/build/ s3://reactjs.lawrencemcdaniel.com --acl public-read
aws s3 cp ./site/build/index.html s3://reactjs.lawrencemcdaniel.com --acl public-read --cache-control "no cache"