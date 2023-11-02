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
    - [Node 16.20.2 \& Yarn 1](#node-16202--yarn-1)
  - [3. Installing the Arches Project](#3-installing-the-arches-project)
    - [Cloning from Github repository](#cloning-from-github-repository)
      - [Step 1: Generate SSH keys](#step-1-generate-ssh-keys)
      - [Step 2: Paste text output in GitHub Settings](#step-2-paste-text-output-in-github-settings)
      - [Step 3: Clone reposiotry onto server:](#step-3-clone-reposiotry-onto-server)
    - [Setup PostgreSQL](#setup-postgresql)
    - [Download and setup Elasticsearch 7](#download-and-setup-elasticsearch-7)
    - [Create \& setup Python Virtual Environment](#create--setup-python-virtual-environment)
  - [4. Running DataSpace for the first time](#4-running-dataspace-for-the-first-time)
    - [Add node\_modules to project](#add-node_modules-to-project)
    - [Create the database](#create-the-database)
    - [Set IP address of server](#set-ip-address-of-server)
    - [Run the server](#run-the-server)
  - [5. Future DataSpace runs](#5-future-dataspace-runs)


## 1. Ubuntu Setup  
Whether you're installing the Desktop or Server version of Ubuntu. We suggest the following names when setting the initial configuration Login Details. This manual will proceed using these names:

- Your name: `dhilab-lecce`
- Your server's/computer's name: `dataspace`
- Pick a username: `dhilab-lecce`
- Choose a password: `[CREATE A PASSWORD]`

*Remember to substitute accordingly with your username.

If using a server, you will need to install `openssh-server` to be able to access the server from a remote computer:
- Select the option to "Install OpenSSH server"
- You can leave the rest of the fields empty.

Finish Setup  
The final screen of the installer shows the progress of the installer and allows viewing of the full log file. Once the install has completed and security updates installed, the installer waits for confirmation before restarting.
- Reboot

**Continue on a remote session using SSH**  
- `ssh dhilab-lecce@xxx.xxx.xxx.xxx`
  - Replace "xxx.xxx.xxx.xxx" with the corresponding IP address.


## 2. Installing DataSpace Requirements on Ubuntu Server/Desktop  
Assuming we're on a clean Ubuntu install:

- `sudo apt update`
- `sudo apt upgrade`
- `sudo apt install build-essential libssl-dev libffi-dev default-jre zip -y`
- `sudo apt install python3-dev python3-pip python3-venv -y`

### Postgres & PostGIS
- `sudo apt install postgresql-14-postgis-3 libpq-dev -y`


### Node 16.20.2 & Yarn 1
Arches recommends this version for best compatibility
1. Install nvm (Node Version Manager)  
On https://www.nvm.sh we found the latest version 0.39.5. You can enter to confirm or modify with the latest version.
   - `wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash`
   - Confirm with:
     - `command -v nvm`
       - If nothing appears, close and reopen the terminal.
   - `nvm install 16.20.2`
   - Confirm with:
   - `nvm -v`
1. Install Yarn
   - `npm install --global yarn`
   - Confirm with:
     - `yarn --version`
       - (should be 1.22.x)


## 3. Installing the Arches Project  
The first thing we'll do is setup the directory where DataSpace & its resources will be found.

It's very likely (and a good practice) for everyone who access the computer where DataSpace will be found to log in with their own user to have a better control of who makes the changes. Because of this, we are going to put everything in a directory within the /opt directory.

We like to call this directory "/opt/DIGILAB/"  
- `cd /opt`
- `sudo mkdir DIGILAB`

Because we're in a root folder, all of our commands will require `sudo`. This will eventually bring problems, particularly when creating our Python Virtual Environment and try to install packages within the venv. So we will change the owner of the DIGILAB/ directory to our username:

- `sudo chown -R dhilab-lecce:dhilab-lecce /opt/DIGILAB`

Keep in this directory everything related with DIGILAB. Inside this directory we will be cloning DataSpace.

### Cloning from Github repository  
We will be cloning the repository using SSH. It will take additional steps in the initial configuration, but will avoid extra work in the future.

#### Step 1: Generate SSH keys

- `ssh-keygen -t rsa -b 4096`
  - Leave next fields on their empty default
  - `cat ~/.ssh/id_rsa.pub`
    - Copy the text output. It should start with "ssh-rsa" and finish with the username (e.g. "dhilab-lecce@dhilab-lecce")

#### Step 2: Paste text output in GitHub Settings  
- Log in to your GitHub account.
- Follow this link https://github.com/settings/ssh/new and log into your GitHub account.
- Add a short descriptive title in the `Title` field.
  - "[USER] DataSpace SSH Public Key" is fine.
- Paste the public key in the `Key` field
- Click on the "Add SSH key" button to finalize the process.

#### Step 3: Clone reposiotry onto server:
- `cd /opt/DIGILAB`
- `git clone git@github.com:GerAng1/the-dataspace-project-v6.git`

### Setup PostgreSQL
- Set `postgres` user password:  
  - `sudo -i -u postgres`  
  - `psql`  
  - `ALTER USER postgres WITH PASSWORD 'postgis';`
    - You should eventually change this to make it more secure. See 'moving_to_production.md'.  
  
- Create postgis database & add GIS extension:  
  - `CREATE DATABASE template_postgis;`  
  - `\c template_postgis;`  
  - `CREATE EXTENSION postgis;`  

- Exit  
  - `\q`  
  - `exit`  

### Download and setup Elasticsearch 7
- `cd /opt/DIGILAB/the-dataspace-project-v6`
- `wget https://artifacts.elastic.co/downloads/elasticsearch/elasticsearch-7.17.13-linux-x86_64.tar.gz`
- `tar -zxvf elasticsearch-7.17.13-linux-x86_64.tar.gz`
- `mv elasticsearch-7.17.13 elasticsearch`
- `./elasticsearch/bin/elasticsearch`
- **This will keep running. Leave this program open and continue in a new terminal window.**

### Create & setup Python Virtual Environment  
In a new terminal we'll setup a Virtual Environment that allows us to manage the package installations for DataSpace in an isolated way.
- `cd /opt/DIGILAB/the-dataspace-project-v6`  
- `python3 -m venv ENV`  
- `source ENV/bin/activate`  
- `pip install -U pip setuptools wheel`  
- `pip install arches==6.2.5`  


## 4. Running DataSpace for the first time  
From now own, make sure you are running elasticsearch at all times in a **second terminal** with:  
- **`cd /opt/DIGILAB/the-dataspace-project-v6/elasticsearch`**  
- **`./bin/elasticsearch`**  

From now own, make sure everything is run from the (ENV) virtual environment with:  
- **`source /opt/DIGILAB/the-dataspace-project-v6/ENV/bin/activate`**

The main steps to run DataSpace the first time are:  
1. Add node_modules to project  
2. Create the database 
3. Set the IP address of the server where its running 
4. Run the server

### Add node_modules to project
- `cd /opt/DIGILAB/the-dataspace-project-v6/arches_project-v6`
- `yarn install`
  - This might take a minute or two

### Create the database
- `cd /opt/DIGILAB/the-dataspace-project-v6`  
- `python manage.py setup_db`
  - Confirm "destroy & rebuild database" with '`y`' 

### Set IP address of server
Once the `setup_db` command has finished executing with no errors, we have to add the IP address a variable in the settings file to be able to access it.

- Create a copy of settings_local.py.template & rename it to settings_local.py: 
  - `cd /opt/DIGILAB/the-dataspace-project-v6/arches-project-v6`
  - `cp settings_local.py.template settings_local.py`  
- Find your computers IP address:
  - `hostname -I`
- Replace "XXX.XXX.XXX.XXX" with your IP address and run the command:
  - `cd ../docs/config-scripts` 
  - `python add_local_ip.py ALLOWED_HOSTS.json new_ip XXX.XXX.XXX.XXX`  
    - Be sure to replace XXX.XXX.XXX.XXX with your computer's IP address!

### Run the server
DataSpace provides a local server service to run and test the platform while on a development phase. You can activate and run the server with:
- `cd /opt/DIGILAB/the-dataspace-project-v6`
- `python manage.py runserver XXX.XXX.XXX.XXX:8000`
  - Replace "XXX.XXX.XXX.XXX" with your IP address!

**DataSpace should be now running and be accesible from a browser with any computer on the same network on: `XXX.XXX.XXX.XXX:8000`**


## 5. Future DataSpace runs
After the initial setup, a reboot, or stopping all processes, running DataSpace will require at least this two things:  
1. Run elasticsearch:
   - `./opt/DIGILAB/the-dataspace-project-v6/elasticsearch/bin/elasticsearch`
  
    (You can also add the flag `-d` at the end to run as a process in the background:)
   - `./opt/DIGILAB/the-dataspace-project-v6/elasticsearch/bin/elasticsearch -d`
     - To stop the process either reboot computer or:
       - `kill [PID]`

2. Run server
   - `python manage.py runserver XXX.XXX.XXX.XXX:8000`
  - Replace "XXX.XXX.XXX.XXX" with your IP address!

