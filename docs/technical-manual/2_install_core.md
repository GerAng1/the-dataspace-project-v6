# 3: Creating a new, empty Arches project

**NOTE: You need to have all dependencies installed. Make sure you've read first the ["install_dependencies"](2_install_dependencies.md) file.**  

- These instructions are to create a new Arches project.  
- For instructions on how to setup an Arches instance from the "dataspace7" repository, read [2: INSTALL FROM CLONE](2_install_from_clone.md).  

## The following links lead to the official Documentation on how to install a clean version of core Arches.

### Choose the according version:

- ### Arches v6.2  

    - [https://arches.readthedocs.io/en/6.2/installation/](https://arches.readthedocs.io/en/6.2/installation/)  

---

# Links to other sections:

- [Previous Section: 1 - Install Dependencies](1_install_dependencies.md)  
- [Next Section: 3 - Missing Imports](3_missing_imports.md)  

---

# Troubleshooting  

Arches uses "postgis" as its password for the postgres user in the DB. If you create the user using a different password, make sure to modify around line 85* in `settings.py`.

- (snippet from `settings.py`):  

        "OPTIONS": {},  
        "PASSWORD": "postgis", # <-- MODIFY HERE  
        "PORT": "5432",  
        "POSTGIS_TEMPLATE": "template_postgis",  


# How I did it

`$ python3 -m venv ENV`  
`$ source ENV/bin/activate`  
`(ENV)$ pip install -U pip setuptools wheel`  
`(ENV)$ pip install arches==6.2.3`  
`(ENV)$ arches-project create arches_project`  
`(ENV)$ cd arches_project`  

[On another terminal window run elasticsearch]  
`$ ./elasticsearch`  

On visual studio you may need to change postgres' password to postgres if you manually created the postgres user in psql  

`(ENV)$ python manage.py setup_db`  
`(ENV)$ python manage.py runserver`  
# DONE  
  
  
Copy urls.py            to root  
Copy settings_local.py  to root  
  
Copy projects.py        to views/  
  
Copy base.htm           to templates/ OR NOT???????  
Copy index.htm          to templates/  
Copy main-base.htm      to templates/  
Copy javascript.html    to templates/  
  
Copy projects/          to templates/projects  
Copy file.htm           to templates/views/components/widgets/  file.htm
Copy default.htm        to templates/views/report-templates/  default.htm
  
Copy file-renderers/    to templates/views/components/cards  
Copy file-renderers/    to media/js/views/components/cards  
  
Copy img/*              to media/img/  
Copy index.css          to media/css/  
Copy project.css        to media/css/  
Copy viewmodels/        to media/js/  
  
Copy search.js/        to media/js/views/search.js  

To add "Aton" Report:  
reports/aton.json  
templates/views/report-templates/aton.htm  
templates/views/components/sketchfab/sketchfab-canvas.htm  
media/css/sketchfab.css  
media/js/reports/aton.js  
*(IMPORTANT TO NOTE THAT HERE THERE ARE SOME ID REFERENCES THAT   MAY BE BROKEN IF YOU DON'T IMPORT DE EXACT RESOURCE MODEL USED)
  
media/js/views/components/reports/sketchfab-setup.js  
media/js/utils/get-query-string-parameter.js  
  
(ENV)$ python manage.py report register -s ./arches_project/  reports/aton.json
  


  ## Yarn Packages

- `yarn add plotly.js-dist`
    - This is for the spectra
