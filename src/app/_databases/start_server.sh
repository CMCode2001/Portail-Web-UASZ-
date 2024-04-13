#!/bin/bash

# Définition du chemin du répertoire des bases de données
url="/c/Site Web_UASZ/Dev/ufr-backoffice/src/app/_databases/"

# Démarrage des serveurs JSON
echo "------------- CMC ---------------"
echo "Demarrage des Servers de Données "
json-server "$url"articleDB.json --port 8001 &
json-server "$url"partenairesDB.json --port 8002 &
json-server "$url"formationsDB.json --port 8003 &
json-server "$url"departementDB.json --port 8004 &
json-server "$url"directionsDB.json --port 8008 &
