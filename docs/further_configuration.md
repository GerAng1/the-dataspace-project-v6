# DataSpace Further Configuration
This manual goes through some of the more advaced configurations you might want to do after setting up DataSpace.  
We suggest to first make sure that everything covered in "1_installation_and_first_run" is working correctly before working any of these configurations for an easier analysis and debugging of any problem that may come with these configurations.

Useful external resources:

- Official Arches Documentation: https://arches.readthedocs.io/en/stable/
- Arches Community: https://community.archesproject.org/

This manual is divided in the following sections:

- [DataSpace Further Configuration](#dataspace-further-configuration)
- [Setup Cantaloupe for IIIF Compatibility](#setup-cantaloupe-for-iiif-compatibility)
- [Adding New Components](#adding-new-components)
  - [Reports](#reports)
  - [Workflows](#workflows)
- [Advanced Elasticsearch settings](#advanced-elasticsearch-settings)
  - [Changing Heap Size](#changing-heap-size)
  - [Running Multiple Nodes](#running-multiple-nodes)
  - [Step by step setup example](#step-by-step-setup-example)


# Setup Cantaloupe for IIIF Compatibility
**SKIP THIS IF IMPORTING THE DATASPACE PACKAGE; THIS IS DONE AUTOMATICALLY BY THE PACKAGE**
- `cd /opt/DIGILAB/the-dataspace-project-v6`
- `wget https://github.com/cantaloupe-project/cantaloupe/releases#:~:text=cantaloupe%2D4.1.11.zip`
- `unzip `
- `mv [dddd] cantaloupe`
- `rm [cantaloupe.zip]`
- `java -Dcantaloupe.config=./cantaloupe/cantaloupe.properties -Xmx2g -jar cantaloupe-4.1.11.war`
- In command line run the following SQL query to show Image Service Manager in the left-hand navbar:
  - `sudo -i -u postgres`  
  - `psql -d arches-project-v6 -c "update plugins set config = '{"show":true}' where name = 'Image Service Manager';"`


# Adding New Components
## Reports
Please check the official arches documentation [Resource Reports section](https://arches.readthedocs.io/en/6.2/extensions/resource-reports/#resource-reports) on how to register a new Report Template.

To add "Aton" Report verify you have these files:

reports/aton.json
templates/views/report-templates/aton.htm
templates/views/components/sketchfab/sketchfab-canvas.htm
media/css/sketchfab.css
media/js/reports/aton.js
media/js/views/components/reports/sketchfab-setup.js
media/js/utils/get-query-string-parameter.js

*(IMPORTANT TO NOTE THAT HERE THERE ARE SOME ID REFERENCES THAT MAY BE BROKEN IF YOU DON'T IMPORT DE EXACT RESOURCE MODEL USED)

- `python manage.py report register -s /path/to/aton.json`

## Workflows
Please check the official arches documentation [Workflows section](https://arches.readthedocs.io/en/6.2/extensions/workflows/) on how to register new Workflows.

(STILL UNDER DEVELOPMENT)


# Advanced Elasticsearch settings
## Changing Heap Size
The default installation of Elasticsearch is configured with a 1 GB heap. For just about every deployment, this number is usually too small. If you are using the default heap values, your cluster is probably configured incorrectly.

To change the heap size in Elasticsearch, the easiest is to set an environment variable called `ES_HEAP_SIZE`. When the server process starts, it will read this environment variable and set the heap accordingly.

As an example, you can set it via the command line as follows to allocate 10GB to its heap:
- `export ES_HEAP_SIZE=10g`

  
## Running Multiple Nodes  
**Yet to be tested.** You can run multiple instances of Elasticsearch to create a cluster. This should optimize the search speed.

In production it’s advisable to have multiple Elasticsearch instances working together as nodes of a single cluster.  
To do this, you need to install a second Elasticsearch instance, and change the `config/elasticsearch.yml` file in each instance.  
Note that the cluster and node names can be whatever you want, as long as the cluster.name is the same in both instances and the node.name is unique to each one.

    **Master (Original) Node Config**

    http.port: 9200

    cluster.name: arches-app
    node.name: arches-app-node1

    node.master: true
    node.data: true


    **Secondary Node Config**

    http.port: 9201

    cluster.name: arches-app
    node.name: arches-app-node2

    node.master: false
    node.data: true

Leave all other parameters untouched.

You’ll need to start/stop each of these instances individually, but you should always have both running. When they are, the secondary node will automatically find the master node and the indices will be replicated between the two.

Nothing about your project’s settings.py should change

**Yet to be tested.** You can furthermore allocate more memory to each of the nodes' heap.  
**Yet to be confirmed.** We **suspect** allocating between 4GB and 8GB to the master node for cluster coordination and management tasks, while alocating 16GB to 32GB to the secondary (Data) node to manage Elasticsearch indices and indexing & search. 

To set a different heap size for each node, you will not be able to do it by setting the environment variable called `ES_HEAP_SIZE`. Pass in the heap size via JVM flags when starting the process:

The following example allocates 8GB to its heap and runs it as a background process:
- `ES_JAVA_OPTS="-Xms8g -Xmx8g" ./bin/elasticsearch -d`

Ensure that the min (Xms) and max (Xmx) sizes are the same to prevent the heap from resizing at runtime, a very costly process.

## Step by step setup example
The following is a step by step process on an implementation of a cluster of 2 Elasticsearch nodes; the Master node running with 8GB of heap memory and a secondary Data node running with 22GB of heap memory:

1. Download and unzip compressed installer for Elasticsearch.
   - We **think** you must download again the installer and not just copy the directory you previously unpacked because after the first run of Elasticsearch, some configuration settings are modified within the files, so to be safe and not run into some conflicts, unpack a clean installer.
   - `cd /opt/DIGILAB/the-dataspace-project-v6`
   - `wget https://artifacts.elastic.co/downloads/elasticsearch/elasticsearch-7.17.13-linux-x86_64.tar.gz`
   - `tar -zxvf elasticsearch-7.17.13-linux-x86_64.tar.gz`
   - `mv elasticsearch-7.17.13 elasticsearch-secondary`
   - `rm elasticsearch-7.17.13-linux-x86_64.tar.gz`

1. Modify current Elasticsearch instance to be "Master" node.
   - `cd /opt/DIGILAB/the-dataspace-project-v6`
   - `mv elasticsearch elasticsearch-master`
   - `nano elasticsearch-master/config/elasticsearch.yml`
     - Find the next variables and rename them. You might need to uncomment some.
     - http.port: 9200
     - cluster.name: dataspace-app
     - node.name: dataspace-app-node1
     - node.master: true
     - node.data: true

1. Modify secondary Elasticsearch instance to be "Data" node.
   - `nano elasticsearch-secondary/config/elasticsearch.yml`
     - Find the next variables and rename them. You might need to uncomment some.
     - http.port: 9201
     - cluster.name: dataspace-app
     - node.name: dataspace-app-node2
     - node.master: false
     - node.data: true
   -  Do a first run of the node for additional configuration settings to be created:
      - `./elasticsearch-secondary/bin/elasticsearch`
      - This will take a moment, some files are being created, wait until a mesage saying setup has been done appears.
      - `CTRL + C`

1. Run Master node with JVM flag.
   -  `ES_JAVA_OPTS="-Xms8g -Xmx8g" ./elasticsearch-master/bin/elasticsearch -d`

1. Run Data node with JVM flag.
   -  `ES_JAVA_OPTS="-Xms22g -Xmx22g" ./elasticsearch-secondary/bin/elasticsearch -d`

