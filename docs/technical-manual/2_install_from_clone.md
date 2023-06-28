# 1: Clone an existing Arches project from Github

**These instructions are to setup an Arches instance from the "the-dataspace-project-v6" repository.  
For instructions on how to setup a brand new Arches instance, read [2: INSTALL CORE](2_install_core.md).**  

**Important notes**  

- The this project has particular files from the Arches for Science project which won't make it compatible with most other projects.  

- We are assuming that:  
    - Postgres setup has been made  
    - template_postgis has been created  
    - postgres user password is "********"  
    - windows useres have specified geo/gis path in settings_local.py  

These configurations can be found in the ["install_dependencies"](0_install_dependencies.md) file.  

---

# Installation Steps

## 1: File preparations
1. Clone `the-dataspace-project-v6`
1. Duplicate `dataspace/settings_local.py.sample`
1. Rename to `dataspace/settings_local.py`
    - It's important to duplicate and not just rename so that your future git pushes don't remove the .sample files

## 2: Virtual env
1. At same level where manage.py is found:
    - `python3 -m venv ENV`
    - LINUX/MAC: `source ENV/bin/activate`  
    - WINDOWS: `ENV\Scripts\activate.bat`  
1. "(ENV)" should now appear  
    - `pip install -U pip setuptools wheel`  
    - `pip install arches==6.2.3`  

## 3: Package installation via yarn
1. `cd arches_project`
    - You should be at same level as "package.json" (confirm with `ls`)
1. `yarn`

## 4: Have elasticsearch running as another process
1. Either in another window, or as a background process/service

## 5: Setup database & packages
1. At same level as "manage.py" (confirm with `ls`)
    - `python manage.py setup_db`
    <!-- - `python manage.py packages -o load_package -s pkg-dataspace-afs-20230214 -y` -->
    - `python manage.py runserver`

## 

---

# Links to other sections:

- [Previous Section: 1 - Install Dependencies](0_install_dependencies.md)  
- [Next Section: 3 - Missing Imports](3_missing_imports.md)  

---

