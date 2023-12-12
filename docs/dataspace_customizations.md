# DataSpace Customizations

<!-- This Modifications add the logic to display spectra. -->
## Display Spectra
### Critical Files:
media/js/bindings/plotly.js
media/js/viewmodels/afs-instrument.js
media/js/viewmodels/file-widget.js
media/js/views/components/cards/file-renderers/mirreader.js
media/js/views/components/cards/file-renderers/xrdreader.js
media/js/views/components/cards/file-renderers/xrfreader.js
media/js/views/components/cards/file-viewer.js
templates/javascript.htm
templates/views/components/cards/file-renderers/afsreader.htm
templates/views/components/widgets/file.htm


#### media/js/viewmodels/file-widget.js
##### Modify this file to keep adding logic for different types of spectra.
- Here Gerry added the logic that renders the spectra within the report of an instance.
    - Basically everything after `this.reportGraphs = ko.computed(function() {` (around line 300) was added by Gerry
    - At the top (around line 30) the variable was declared and initialized:
    
    this.validFormats = {
            'XRF': ["mca", "mcb"],
            'XRD': ["xy", "xyz"],
            'MIR': ["dpt", "dpu"]
        };

- this.validFormats facilitates the function to identify how to render the spectrum based on its file extension.
- IMPORTANT: DON'T confuse this file for the one responsible to render the spectra in EDIT MODE. Those are found in media/js/views/components/cards/file-renderers/*

#### media/js/views/components/cards/file-renderers/mirreader.js
##### Modify this file in case the MIR raw data logic changes.
- This renders the spectra in edit mode. This is useful for all the analysis that we're able to do, like putting many spectra one atop another.
- The few files we've analyzed of MIR analyses all begin directly with numbers and have the following structure:
    
    ```
    7497.44841	1.56906
    7496.03086	1.58547
    7494.61330	1.59587
    7493.19575	1.59409
    ```

- You might want to modify this file if you recieve a MIR file which doesn't follow this logic, in that case you will have to add more instruction to extract correctly the values for the plot to work.


#### media/js/views/components/cards/file-renderers/xrdreader.js
##### Modify this file in case the XRD raw data logic changes.
- This renders the spectra in edit mode. This is useful for all the analysis that we're able to do, like putting many spectra one atop another.
- The few files we've analyzed of XRD analyses have two formats:
  - The first one (seen on Marmora Phrygiae) begin directly with numbers and have the following structure:
    
    ```
    3.013355630 1591.0
    3.030066899 1560.0
    3.046778168 1513.0
    ```

  - The second one (seen on Perugia) have 7 lines of metadata before the numbers begin:
  
    ```
    #InstrumentID: Duetto-222
    #DatasetName: A47_91v_XD_01_verde
    #SampleInfo: 
    #AcquisitionDate: 10/05/11 06:54:35
    #IntegrationTime: 1510 seconds
    #GeometryParams: axisX = 2209.18 axisY = 135 axisZ = 2863.07 sensorAngle1 = 54.9761 sensorAngle3 = 0
    #EnergyParams: splitThreshold = 4 CuKaPeak = 572 kBFilterIn = 1
    20	41.2506
    20.05	40.4097
    ```

- You might want to modify this file if you recieve a XRD file which doesn't follow this logic, in that case you will have to add more instruction to extract correctly the values for the plot to work.


#### media/js/views/components/cards/file-renderers/xrfreader.js
##### Modify this file in case the XRF raw data logic changes.
- This renders the spectra in edit mode. This is useful for all the analysis that we're able to do, like putting many spectra one atop another.
- The few files we've analyzed of XRF analyses all begin with 18 lines of metadata before the numbers begin:
    
    ```
    <<PMCA SPECTRUM>>
    TAG - live_data
    DESCRIPTION - 
    GAIN - 3
    THRESHOLD - 10
    LIVE_MODE - 0
    PRESET_TIME - 120
    LIVE_TIME - 109.680000
    REAL_TIME - 120.000000
    START_TIME - 10/03/2011 10:16:08
    SERIAL_NUMBER - 1668
    <<CALIBRATION>>
    LABEL - Channel
    0 0
    600 10.549
    720 12.611
    1439 25.27
    <<DATA>>
    0
    0
    0
    0
    0
    0
    0
    0
    10
    ```

- You might want to modify this file if you recieve a XRF file which doesn't follow this logic, in that case you will have to add more instruction to extract correctly the values for the plot to work.

<!-- This adds an IIIF visualizer component to view manifests in manuscripts reports & add a button to link to mirador app. -->
## IIIF Viewer Component in report (TIFY) + Mirador Link
### Crititcal Files
templates/base.htm

#### templates/base.htm
##### Many templates are extended from this "base"
- The most important change is that we added a <script> that applies the TIFY component + button to Mirador for the reports that contain a manifest.
  - THIS IS WRONG
  - The correct procedure should be to create a widget (see Arches docs), register it, and apply it within the Arches Designer of the Resource Model.
    - Gerry wasn't able to get it working :(
- Gerry also added here some extra <link rel="stylesheet"> to add css files because **the <head> tag is here**


<!-- Added views & templates to render two new cover pages to present projects. -->
## Home Page + Projects' Pages
### Critical Files
templates/index.htm
templates/projects/marmora.htm
templates/projects/.htm
views/projects.py

#### templates/projects/*
##### Cover pages for the projects accessible through the home page.
- Gerry created this directory and files for this special sites that present the projects.
- TO BE ABLE TO VIEW THIS TEMPLATES A BASIC DJANGO DEVELOPMENT IS NECESSARY:
  - Gerry created views/projects.py
    - Added the corresponding Django views and variables.
    - Update urls.py
      - Importing the views
      - Appending the urls with the correct syntax.


#### views/projects.py
##### Add logic to show in templates*.
- *In the marmora and molab cover pages templates.
- If you want to display dynamic infromation on the site, the code logic is set here, and the variable with the value is passed to the template which will be displayed.


<!-- Added component & template to view Aton Models within reports. -->
## Aton Visualization in report
### Critical Files
reports/aton.json
templates/views/report-templates/aton.htm
templates/views/components/sketchfab/sketchfab-canvas.htm
media/css/sketchfab.css
media/js/reports/aton.js
media/js/views/components/reports/sketchfab-setup.js
media/js/utils/get-query-string-parameter.js


<!-- General UI Modifications to Reports -->
## Report Template Modifications
### Critical Files
arches_project_v6/templates/views/report-templates/default.htm
arches_project_v6/templates/views/report-templates/ds_side_image.htm
arches_project_v6/templates/views/components/cards/default.htm

