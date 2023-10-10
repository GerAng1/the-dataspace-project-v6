# DataSpace Installation
This manual goes through the installation process of a DataSpace instance.

We recommend to install on Ubuntu. The version of Ubuntu shouldn't matter if following this manual. The Arches official documentation provides a Ubuntu script that installs all dependencies, however, that script has only been tested in Ubuntu 18.04 and 20.04. 

For a cleaner install and better control and knowledge of what's being installed and configured, we recommend to follow this manual and manually install the dependencies.

**For the sake of simplicity we will not cover the installation process on Windows and Mac devices.**

Useful external resources:

- Official Arches Documentation: https://arches.readthedocs.io/en/stable/
- Arches Community: https://community.archesproject.org/

This manual is divided in the following sections:

- [DataSpace Installation](#dataspace-installation)
- [1. Ubuntu Setup](#1-ubuntu-setup)
- [2. Installing DataSpace Requirements on Ubuntu Server/Desktop](#2-installing-dataspace-requirements-on-ubuntu-serverdesktop)
  - [Postgres \& PostGIS](#postgres--postgis)
  - [SSH (for Ubuntu Server)](#ssh-for-ubuntu-server)
  - [Node 16.20.2 \& Yarn 1](#node-16202--yarn-1)
- [3. Installing the Arches Project](#3-installing-the-arches-project)
  - [Cloning from Github repository](#cloning-from-github-repository)
  - [Setup PostgreSQL](#setup-postgresql)
  - [Download and setup Elasticsearch 7](#download-and-setup-elasticsearch-7)
  - [Create \& setup Python Virtual Environment](#create--setup-python-virtual-environment)
- [4. Running DataSpace for the first time](#4-running-dataspace-for-the-first-time)
  - [Add node\_modules to project](#add-node_modules-to-project)
  - [Create the database](#create-the-database)
- [5. Future DataSpace runs](#5-future-dataspace-runs)


# 1. Ubuntu Setup  
Whether you're installing the Desktop or Server version of Ubuntu. We suggest the following names when setting the initial configuration Login Details. This manual will proceed using these names:

- Your name: dhilab-lecce
- Your server's/computer's name: dataspace
- Pick a username: dhilab-lecce
- Choose a password: [CREATE A PASSWORD]


# 2. Installing DataSpace Requirements on Ubuntu Server/Desktop  
Assuming we're on a clean Ubuntu install:

- `sudo apt install build-essential lbssl-dev libffi-dev zip -y`
- `sudo apt install python3-dev python3-pip python3-venv -y`

## Postgres & PostGIS
- `sudo apt install postgresql-14-postgis-3 libpq-dev -y`

## SSH (for Ubuntu Server)
- `sudo apt install openssh-server -y`

## Node 16.20.2 & Yarn 1
Arches recommends this version for best compatibility
1. Install nvm (Node Version Manager)  
On https://www.nvm.sh we found the latest version 0.39.5. You can enert to confirm or modify with the latest version.
   - `wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash`
   - Confirm with:
     - `command -v nvm`
       - If it doesn't work, close and reopen the terminal.
   - `nvm install 16.20.2`
   - Confirm with:
   - `nvm -v`
1. Install Yarn
   - `npm install --global yarn`
   - Confirm with:
     - `yarn --version`
       - (should be 1.x.x)


# 3. Installing the Arches Project  
The first thing we'll do is setup the directory where DataSpace & its resources will be found.

It's very likely (and a good practice) for everyone who access the computer where DataSpace will be found to log in with their own user to have a better control of who makes the changes. Because of this, we are going to put everything in a directory within the /opt directory.

We like to call this directory "/opt/DIGILAB/"  
- `cd /opt`
- `sudo mkdir DIGILAB`

Because we're in a root folder, all of our commands will require `sudo`. This will eventually bring problems, particularly when creating our Python Virtual Environment and try to install packages within the venv. So we will change the owner of the DIGILAB/ directory:

- `sudo chown -R dhilab-lecce:dhilab-lecce /opt/DIGILAB`

Keep in this directory everything related with DIGILAB. Inside this directory we will be cloning DataSpace.

## Cloning from Github repository  
We will be cloning the repository using SSH. It will take additional steps in the initial configuration, but will avoid extra work in the future.

- `ssh-keygen -t rsa -b 4096`
  - leave next fields on their default
  - **You will need to insert public key in the allowed SSH Keys in Github.**
    - `cat ~/.ssh/id_rsa.pub`
    - Log in to your GitHub account.
    - Navigate to “Settings”.
    - Click on “SSH and GPG keys” in the left menu
    - Click on the “New SSH key” button.
    - Or directly follow this link https://github.com/settings/ssh/new.
    - Add a short descriptive title in the Title field.
    - Paste the public key in the Key field
    - Click on the "Add SSH key" button to finalize the process.
- `cd /opt/DIGILAB`
- `git clone git@github.com:GerAng1/the-dataspace-project-v6.git`

## Setup PostgreSQL
- Set `postgres` user password:  
  - `sudo -i -u postgres`  
  - `psql`  
  - `ALTER USER postgres WITH PASSWORD 'postgis';`  
  
- Create postgis database:  
  - `CREATE DATABASE template_postgis;`  
  - `\c template_postgis;`  
  - `CREATE EXTENSION postgis;`  

- Exit  
  - `\q`  
  - `exit`  

## Download and setup Elasticsearch 7
Note that the manual specifies version 7.4, but this is because that was the current version of elasticsearch when the documentation was created and the documentation cannot be modified. 
- `cd /opt/DIGILAB/the-dataspace-project-v6`
- `wget https://artifacts.elastic.co/downloads/elasticsearch/elasticsearch-7.17.13-linux-x86_64.tar.gz`
- `tar -zxvf elasticsearch-7.17.13-linux-x86_64.tar.gz`
- `mv elasticsearch-7.17.13 elasticsearch`
- `rm elasticsearch-7.17.13-linux-x86_64.tar.gz`
- `./elasticsearch/bin/elasticsearch`
  - This will take a moment, some files are being created, wait until a mesage saying setup has been done appears.
- `CTRL + C`

## Create & setup Python Virtual Environment  
- `cd /opt/DIGILAB/the-dataspace-project-v6`  
- `python3 -m venv ENV`  
- `source ENV/bin/activate`  
- `pip install -U pip setuptools wheel`  
- `pip install arches==6.2.5`  


# 4. Running DataSpace for the first time  
The main steps to run DataSpace the first time are:  
- Add node_modules to project  
- Create the database  

**From now own, make sure everything is run from the (ENV) virtual environment with:**  
- **`source /opt/DIGILAB/the-dataspace-project-v6/ENV/bin/activate`**

**From now own, make sure you are running elasticsearch at all times in a second terminal with:**  
- **`cd /opt/DIGILAB/the-dataspace-project-v6/elasticsearch`**  
- **`./bin/elasticsearch`**  

## Add node_modules to project
- `cd /opt/DIGILAB/the-dataspace-project-v6/arches_project`
- `yarn install`
  - This might take a minute or two

## Create the database
- `cd /opt/DIGILAB/the-dataspace-project-v6`  
- `python manage.py setup_db`
  - Confirm with `y`

Once the command has finished executing with no errors, run the server:
- `python manage.py runserver`  

**DataSpace should be now running and be accesible from a browser at: `127.0.0.1:8000`**


# 5. Future DataSpace runs
After the initial setup, a reboot, or stopping all processes, running DataSpace will require at least this two things:  
1. Run elasticsearch:
   - `./opt/DIGILAB/the-dataspace-project-v6/elasticsearch/bin/elasticsearch`
  
    (You can also add the flag `-d` at the end to run as a process in the background:)
   - `./opt/DIGILAB/the-dataspace-project-v6/elasticsearch/bin/elasticsearch -d`
     - To stop the process either reboot computer or:
       - `kill [PID]`

2. Run server
   - `python manage.py runserver`

