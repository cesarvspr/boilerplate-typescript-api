#!/bin/bash

docker exec -t mysql_databse sh -c 'mysqladmin -u root -p$MYSQL_PASSWORD --force drop database'
docker exec -t mysql_databse sh -c 'mysqladmin -u root -p$MYSQL_PASSWORD --force create database'
docker exec -t mongo-web-express sh -c "mongo --quiet --eval 'db.getMongo().getDBNames().forEach(function(i){db.getSiblingDB(i).dropDatabase()})'"
sleep 2
docker exec -t app sh -c 'npm run migration'
