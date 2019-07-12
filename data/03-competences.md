# Compétences

## Web

### Python

Développement d'un url-shortener en python avec le framework **django** disponible sur [github](https://github.com/luxifer/UrliZr).

### Golang

Je suis plutôt novice dans ce langage, j'ai tout de même développé un worker qui s'occupe de générer les vignettes d'images qui sont postées sur le site Kozikaza. Je suis aussi en train de développer un système d'intégration continue qui exploite la puissance de **docker**. Pour cela j'utilise le microframework **martini**.

Développement d'une [plateforme de routing](https://github.com/luxifer/pingroll) de notifications basé sur un calendrier iCal. Pour celà j'ai implémenter un [parser](https://github.com/luxifer/ical) du format iCal basé sur la [RFC 5545](https://tools.ietf.org/html/rfc5545).

Développement d'une [plateforme de déploiement](https://github.com/luxifer/deployer) continue basée sur l'API _Deployment_ de GitHub et **ansible**.

## Asynchrone

### RabbitMq

J'ai utilisé ce système de messagerie asynchrone sur Kozikaza pour la gestion de l'envoi des mails et le redimensinnement d'image via un worker que j'ai écrit en **golang**. Actuellement je l'utilise dans un projet de lecture de mail et d'extraction de données, ainsi que dans un projet de synchronisation de données vers différentes plateforme.

## Base de données

### SQL

Je connais les principales bases de données avec des compétences sur **MySQL** et **PostgreSQL**. Je fais beaucoup d'administration de base de données pour le site Kozikaza, qui est un site qui grandit très rapidement et pour lequel il faut constamment adapter le modèle de données.

## Moteurs de recherche

### Elasticsearch

Utilisation du moteur de recherche Elasticsearch dans la stack ELK pour la centralisation des logs. Tuning fin de la configuration du moteur suite a des problématiques de gros volumes (environ 1Go de logs par heure).

## Systèmes d'exploitation

### Linux

Maitrise des distributions basées sur **Debian** / Ubuntu, **Archlinux** et Fedora / RedHat. Je fais beaucoup d'administration système sur debian pour le site Kozikaza. J'utilise de plus en plus **Docker** pour déployer mes applications, tester mes développements, ou mettre en place un environnement de développement.

### Cloud

Utilisation cloud Azure de Microsoft à Xotelia pour le stockage des images, des assets et de certaines données client. J'ai aussi un cluster ELK (Elasticsearch Logstash Kibana) pour centraliser et analyser les logs de production.

Utilisation des services AWS comme EC2, Route53, SES, S3, SQS et RDS pour la mise en production des clients chez Wizaplace.

Utilisation de Kubernetes _managé_ chez Azure pour la mise en production de clients chez Wizaplace et pour notre tooling interne.

## Développement en équipe

### Intégration continue

J'utilise couramment **Jenkins** CI pour contrôler la qualité du code et exécuter des batteries de test sur différents environnements au sein de mon entreprise. Pour mes projets personnels j'utilise **Travis** CI. Jenkins me sert également à déployer automatiquement mes projets. Pour la mise en production de mes projets j'utilise **Capifony**.

J'ai développé un projet en **Go** qui permet de déployer un projet avec **Ansible**, lancé depuis un évènement de déploiement GitHub.

J'utilise aussi **Terraform** pour décrire l'infrastructure nécessaire pour un projet en code, la déployer et l'automatiser.

### Gestion de projet

J'utilise **Redmine** pour la gestion de mes projets en entreprise. Pour mes projets personnels j’utilise soit le système d'issues de **GitHub** si le projet est open source, soit une installation personnelle de **GitLab**. J'utilise aussi beaucoup **Trello** pour la gestion de mes projets personnels ainsi que certains projets professionnels.
