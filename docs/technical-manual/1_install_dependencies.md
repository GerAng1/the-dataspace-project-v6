# 1: Installing Dependencies

**These instructions are for installing all the dependencies required to run an Arches instance.**  

## Linux:  

### For Ubuntu, Arches maintains an ubuntu_setup.sh script to install dependencies. It works for 18.04 and 20.04, and preliminary testing shows it be compatible with 22.04 as well.  

    wget https://raw.githubusercontent.com/archesproject/arches/stable/6.2.3/arches/install/ubuntu_setup.sh
    source ./ubuntu_setup.sh

- Follow onscreen directions

---

## MacOS:  

### Python  
- Python >= 3.7  

### PostgreSQL 12 with PostGIS 3  
- Download [Postgres App](postgresapp.com)  
- Create PostGIS template database  
    - `psql -U postgres -c "CREATE DATABASE template_postgis;"`  
    - `psql -U postgres -d template_postgis -c "CREATE EXTENSION postgis;"`

### Elasticsearch 8  
- [Download v7.4.2](https://www.elastic.co/downloads/past-releases/elasticsearch-7-4-2)  
- Unzip & save wherever you want, but better at same level as manage.py  
- Enable:  
    - `PATH/TO/DIRECTORY/bin/elasticsearch`  

### GDAL >= 2.2.x
- NOT NECESSARY ON MACOS

### Yarn  
- [https://yarnpkg.com/lang/en/docs/install](https://yarnpkg.com/lang/en/docs/install)

---

## Windows:

- **See** [https://arches.readthedocs.io/en/stable/requirements-and-dependencies/](https://arches.readthedocs.io/en/stable/requirements-and-dependencies/)



## Cantaloupe

[Download](https://github.com/cantaloupe-project/cantaloupe/releases#:~:text=cantaloupe%2D4.1.11.zip) and extract (preferrably at same level as manage.py)


---

# Links to next sections  

- To install a new, empty Arches project, [2: INSTALL CORE](2_install_core.md)  
- Instead to clone an existing Arches project from Github, [2: INSTALL FROM CLONE](2_install_from_clone.md)  

---
