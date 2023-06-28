# 3: Missing imports  

## To anyone recreating/reimporting Dataspace:

## (At the time this was written) `load_package` does **not** import the following:

- From /admin site
    - Map markers
    - Map layers
- Within Arches' UI "Map Layer Manager":
    - Basemaps settings
    - Overlays settings

These must be setup after each time you setup the database.

---

## /admin site

### Map markers  

These add an icon to the map. The next example adds a 'pin' icon.  

- Steps to add map marker:
    - Within the /admin site, go to "Map markers" > "ADD MAP MARKER"
    - Under *name*, type: `marker-vase`
    - Under *Url*, type: `media/img/icons/marker-vase.png`

### Map layers  

The add an overlay to the map on the Search page. The next example add an overlay that only higlights the objects on the search results panel.  
\*This layer uses the previously created *marker-vase* marker. If not created, the layer will still work properly, but the pin icon won't be displayed.  

- Steps to add map layer:  
	- Within the /admin site, go to "Map layers" > "ADD MAP LAYER"  
	- Under *Maplayerid*, type or paste: `397fc256-ae24-940e-08fb-09cec4f85eee`  
	- Under *Name*, type or paste: `Search Results`  
	- Under *Layerdefinitions*, paste the following code:  		
	```
	[{"id":"bullseye-4","type":"circle","paint":{"circle-color":"#98EACC","circle-radius":9},"source":"search-results-points"},{"id":"bullseye-3","type":"circle","paint":{"circle-color":"#428959","circle-radius":8},"source":"search-results-points"},{"id":"bullseye-2","type":"circle","paint":{"circle-color":"#3FB288","circle-radius":4},"source":"search-results-points"},{"id":"bullseye-1","type":"circle","paint":{"circle-color":"#50E6AF","circle-radius":2},"source":"search-results-points"},{"id":"object-point-marker","type":"symbol","layout":{"icon-size":0.45,"icon-image":"marker-vase","icon-offset":[0,-89],"icon-allow-overlap":true},"source":"search-results-points"}]  
	```
	- Under *Isoverlay*, check the box **active**  
	- Under *Activated*, check the box **active**  
	- Under *Icon*, type: `ion-search`  
	- Under *Addtomap*, check the box **active**  
	- Under *Centerx*, leave **empty**  
	- Under *Centery*, leave **empty**  
	- Under *Zoom*, leave **empty**  
	- Under *Legend*, leave **empty**  
	- Under *Searchonly*, check the box **active**  

---

## Arches' UI "Map Layer Manager"  

### Basemaps  

Within the Basemaps Tab you can make the "satellite" basemap the Default basemap:  

- Select "satellite" basemap  
- Find "Default basemap" toggle & activate  
- Click on **"Save Edits"**!  
- **IMPORTANT**: this modifies the "street" basemap, removing it as default, so it it important to select that basemap & click **"Save Edits"**!  

---

# Links to other sections  

- [0: Best Practices](0_best_practices.md)  
- [1: Install Dependencies](0_install_dependencies.md)  
- [2: Install Clean](1_install_core.md)  
- [2: Install from Clone](1_install_from_clone.md)  
- [Arches' Thesauri](arches_thesauri.md)

---

# Advanced Styling Backups  

These Advanced Styling codes are from the Resource Layers. *The should be already loaded with the load_package, becaise they are svaed withing the Resource Model json.* I'm leaving them here just in case (require formatting for better reading):  

**Note:** It'd be important to update these codes in case updated from Arches' UI

### Geographical Context M.P.  

	[{"id":"geocontext-polygon-fill","type":"fill","source":"resources-0a0eb0c0-9083-11ed-8aba-8c85907a3f93","source-layer":"0a0eb0c0-9083-11ed-8aba-8c85907a3f93","layout":{"visibility":"visible"},"filter":["all",["==","$type","Polygon"],["==","total",1]],"paint":{"fill-color":["case",["boolean",["feature-state","hover"],false],"rgba(18,138,120,0.7)","rgba(140,25,25,0.7)"]}},{"id":"geocontext-polygon-outline","type":"line","source":"resources-0a0eb0c0-9083-11ed-8aba-8c85907a3f93","source-layer":"0a0eb0c0-9083-11ed-8aba-8c85907a3f93","layout":{"visibility":"visible"},"filter":["all",["==","$type","Polygon"],["==","total",1]],"paint":{"line-width":2,"line-color":["case",["boolean",["feature-state","hover"],false],"rgba(17,217,187,0.5)","rgba(214,50,50,0.5)"]}},{"id":"geocontext-line-halo","type":"line","source":"resources-0a0eb0c0-9083-11ed-8aba-8c85907a3f93","source-layer":"0a0eb0c0-9083-11ed-8aba-8c85907a3f93","layout":{"visibility":"visible"},"filter":["all",["==","$type","LineString"],["==","total",1]],"paint":{"line-width":4,"line-color":["case",["boolean",["feature-state","hover"],false],"rgba(17,217,187,0.5)","rgba(214,50,50,0.5)"]}},{"id":"geocontext-line-fill","type":"line","source":"resources-0a0eb0c0-9083-11ed-8aba-8c85907a3f93","source-layer":"0a0eb0c0-9083-11ed-8aba-8c85907a3f93","layout":{"visibility":"visible"},"filter":["all",["==","$type","LineString"],["==","total",1]],"paint":{"line-width":2,"line-color":["case",["boolean",["feature-state","hover"],false],"rgba(18,138,120,0.7)","rgba(140,25,25,0.7)"]}},{"id":"geocontext-point-halo","type":"circle","source":"resources-0a0eb0c0-9083-11ed-8aba-8c85907a3f93","source-layer":"0a0eb0c0-9083-11ed-8aba-8c85907a3f93","layout":{"visibility":"visible"},"filter":["all",["==","$type","Point"],["==","total",1]],"paint":{"circle-radius":["case",["boolean",["feature-state","hover"],false],7,4],"circle-color":["case",["boolean",["feature-state","hover"],false],"rgba(17,217,187,0.5)","rgba(214,50,50,0.5)"]}},{"id":"geocontext-point-fill","type":"circle","source":"resources-0a0eb0c0-9083-11ed-8aba-8c85907a3f93","source-layer":"0a0eb0c0-9083-11ed-8aba-8c85907a3f93","layout":{"visibility":"visible"},"filter":["all",["==","$type","Point"],["==","total",1]],"paint":{"circle-radius":["case",["boolean",["feature-state","hover"],false],5,2],"circle-color":["case",["boolean",["feature-state","hover"],false],"rgba(18,138,120,0.7)","rgba(140,25,25,0.7)"]}},{"id":"geocontext-cluster-halo","type":"circle","source":"resources-0a0eb0c0-9083-11ed-8aba-8c85907a3f93","source-layer":"0a0eb0c0-9083-11ed-8aba-8c85907a3f93","layout":{"visibility":"visible"},"filter":["all",["==","$type","Point"],[">","total",1]],"paint":{"circle-radius":{"property":"total","stops":[[0,22],[50,24],[100,26],[200,28],[400,30],[800,32],[1200,34],[1600,36],[2000,38],[2500,40],[3000,42],[4000,44],[5000,46]]},"circle-color":"rgba(214,50,50,0.5)"}},{"id":"geocontext-cluster-fill","type":"circle","source":"resources-0a0eb0c0-9083-11ed-8aba-8c85907a3f93","source-layer":"0a0eb0c0-9083-11ed-8aba-8c85907a3f93","layout":{"visibility":"visible"},"filter":["all",["==","$type","Point"],[">","total",1]],"paint":{"circle-radius":{"property":"total","type":"exponential","stops":[[0,12],[50,14],[100,16],[200,18],[400,20],[800,22],[1200,24],[1600,26],[2000,28],[2500,30],[3000,32],[4000,34],[5000,36]]},"circle-color":"rgba(140,25,25,0.7)"}},{"id":"geocontext-cluster-text","type":"symbol","source":"resources-0a0eb0c0-9083-11ed-8aba-8c85907a3f93","source-layer":"0a0eb0c0-9083-11ed-8aba-8c85907a3f93","layout":{"text-field":"{total}","text-size":10},"paint":{"text-color":"#fff"},"filter":["all",[">","total",1]]}]  

### Object M.P.  

	[{"id":"object-polygon-fill","type":"fill","source":"resources-3826a11e-9517-11ed-b0aa-8c85907a3f93","source-layer":"3826a11e-9517-11ed-b0aa-8c85907a3f93","layout":{"visibility":"visible"},"filter":["all",["==","$type","Polygon"],["==","total",1]],"paint":{"fill-color":["case",["boolean",["feature-state","hover"],false],"rgba(93,53,140,0.7)","rgba(114,216,60,0.7)"]}},{"id":"object-polygon-outline","type":"line","source":"resources-3826a11e-9517-11ed-b0aa-8c85907a3f93","source-layer":"3826a11e-9517-11ed-b0aa-8c85907a3f93","layout":{"visibility":"visible"},"filter":["all",["==","$type","Polygon"],["==","total",1]],"paint":{"line-width":2,"line-color":["case",["boolean",["feature-state","hover"],false],"rgba(137,72,217,1)","rgba(221,231,51,1)"]}},{"id":"object-line-halo","type":"line","source":"resources-3826a11e-9517-11ed-b0aa-8c85907a3f93","source-layer":"3826a11e-9517-11ed-b0aa-8c85907a3f93","layout":{"visibility":"visible"},"filter":["all",["==","$type","LineString"],["==","total",1]],"paint":{"line-width":4,"line-color":["case",["boolean",["feature-state","hover"],false],"rgba(137,72,217,1)","rgba(221,231,51,1)"]}},{"id":"object-line-fill","type":"line","source":"resources-3826a11e-9517-11ed-b0aa-8c85907a3f93","source-layer":"3826a11e-9517-11ed-b0aa-8c85907a3f93","layout":{"visibility":"visible"},"filter":["all",["==","$type","LineString"],["==","total",1]],"paint":{"line-width":2,"line-color":["case",["boolean",["feature-state","hover"],false],"rgba(93,53,140,0.7)","rgba(114,216,60,0.7)"]}},{"id":"object-point-halo","type":"circle","source":"resources-3826a11e-9517-11ed-b0aa-8c85907a3f93","source-layer":"3826a11e-9517-11ed-b0aa-8c85907a3f93","layout":{"visibility":"visible"},"filter":["all",["==","$type","Point"],["==","total",1]],"paint":{"circle-radius":["case",["boolean",["feature-state","hover"],false],7,4],"circle-color":["case",["boolean",["feature-state","hover"],false],"rgba(137,72,217,1)","rgba(221,231,51,1)"]}},{"id":"object-point-fill","type":"circle","source":"resources-3826a11e-9517-11ed-b0aa-8c85907a3f93","source-layer":"3826a11e-9517-11ed-b0aa-8c85907a3f93","layout":{"visibility":"visible"},"filter":["all",["==","$type","Point"],["==","total",1]],"paint":{"circle-radius":["case",["boolean",["feature-state","hover"],false],5,2],"circle-color":["case",["boolean",["feature-state","hover"],false],"rgba(93,53,140,0.7)","rgba(114,216,60,0.7)"]}},{"id":"object-cluster-halo","type":"circle","source":"resources-3826a11e-9517-11ed-b0aa-8c85907a3f93","source-layer":"3826a11e-9517-11ed-b0aa-8c85907a3f93","layout":{"visibility":"visible"},"filter":["all",["==","$type","Point"],[">","total",1]],"paint":{"circle-radius":{"property":"total","stops":[[0,22],[50,24],[100,26],[200,28],[400,30],[800,32],[1200,34],[1600,36],[2000,38],[2500,40],[3000,42],[4000,44],[5000,46]]},"circle-color":"rgba(221,231,51,1)"}},{"id":"object-cluster-fill","type":"circle","source":"resources-3826a11e-9517-11ed-b0aa-8c85907a3f93","source-layer":"3826a11e-9517-11ed-b0aa-8c85907a3f93","layout":{"visibility":"visible"},"filter":["all",["==","$type","Point"],[">","total",1]],"paint":{"circle-radius":{"property":"total","type":"exponential","stops":[[0,12],[50,14],[100,16],[200,18],[400,20],[800,22],[1200,24],[1600,26],[2000,28],[2500,30],[3000,32],[4000,34],[5000,36]]},"circle-color":"rgba(114,216,60,0.7)"}},{"id":"object-cluster-number","type":"symbol","source":"resources-3826a11e-9517-11ed-b0aa-8c85907a3f93","source-layer":"3826a11e-9517-11ed-b0aa-8c85907a3f93","layout":{"text-field":"{total}","text-size":10},"paint":{"text-color":"#fff"},"filter":["all",[">","total",1]]}]

### Physical Thing  

	[{"id":"physical-thing-polygon-fill","type":"fill","source":"resources-d80e5eaa-32ea-11ec-a2aa-024e0d439fdb","source-layer":"d80e5eaa-32ea-11ec-a2aa-024e0d439fdb","layout":{"visibility":"visible"},"filter":["all",["==","$type","Polygon"],["==","total",1]],"paint":{"fill-color":["case",["boolean",["feature-state","hover"],false],"rgba(171,162,29,0.65)","rgba(48,126,217,0.65)"]}},{"id":"physical-thing-polygon-outline","type":"line","source":"resources-d80e5eaa-32ea-11ec-a2aa-024e0d439fdb","source-layer":"d80e5eaa-32ea-11ec-a2aa-024e0d439fdb","layout":{"visibility":"visible"},"filter":["all",["==","$type","Polygon"],["==","total",1]],"paint":{"line-width":3,"line-color":["case",["boolean",["feature-state","hover"],false],"rgba(188,217,26,0.7)","rgba(55,195,248,0.7)"]}},{"id":"physical-thing-line-halo","type":"line","source":"resources-d80e5eaa-32ea-11ec-a2aa-024e0d439fdb","source-layer":"d80e5eaa-32ea-11ec-a2aa-024e0d439fdb","layout":{"visibility":"visible"},"filter":["all",["==","$type","LineString"],["==","total",1]],"paint":{"line-width":4,"line-color":["case",["boolean",["feature-state","hover"],false],"rgba(188,217,26,0.7)","rgba(55,195,248,0.7)"]}},{"id":"physical-thing-line-fill","type":"line","source":"resources-d80e5eaa-32ea-11ec-a2aa-024e0d439fdb","source-layer":"d80e5eaa-32ea-11ec-a2aa-024e0d439fdb","layout":{"visibility":"visible"},"filter":["all",["==","$type","LineString"],["==","total",1]],"paint":{"line-width":2,"line-color":["case",["boolean",["feature-state","hover"],false],"rgba(171,162,29,0.65)","rgba(48,126,217,0.65)"]}},{"id":"physical-thing-point-halo","type":"circle","source":"resources-d80e5eaa-32ea-11ec-a2aa-024e0d439fdb","source-layer":"d80e5eaa-32ea-11ec-a2aa-024e0d439fdb","layout":{"visibility":"visible"},"filter":["all",["==","$type","Point"],["==","total",1]],"paint":{"circle-radius":10,"circle-color":["case",["boolean",["feature-state","hover"],false],"rgba(188,217,26,0.7)","rgba(55,195,248,0.7)"]}},{"id":"physical-thing-point-fill","type":"circle","source":"resources-d80e5eaa-32ea-11ec-a2aa-024e0d439fdb","source-layer":"d80e5eaa-32ea-11ec-a2aa-024e0d439fdb","layout":{"visibility":"visible"},"filter":["all",["==","$type","Point"],["==","total",1]],"paint":{"circle-radius":6,"circle-color":["case",["boolean",["feature-state","hover"],false],"rgba(171,162,29,0.65)","rgba(48,126,217,0.65)"]}},{"id":"physical-thing-cluster-halo","type":"circle","source":"resources-d80e5eaa-32ea-11ec-a2aa-024e0d439fdb","source-layer":"d80e5eaa-32ea-11ec-a2aa-024e0d439fdb","layout":{"visibility":"visible"},"filter":["all",["==","$type","Point"],[">","total",1]],"paint":{"circle-radius":{"property":"total","stops":[[0,22],[50,24],[100,26],[200,28],[400,30],[800,32],[1200,34],[1600,36],[2000,38],[2500,40],[3000,42],[4000,44],[5000,46]]},"circle-color":"rgba(55,195,248,0.7)"}},{"id":"physical-thing-cluster-fill","type":"circle","source":"resources-d80e5eaa-32ea-11ec-a2aa-024e0d439fdb","source-layer":"d80e5eaa-32ea-11ec-a2aa-024e0d439fdb","layout":{"visibility":"visible"},"filter":["all",["==","$type","Point"],[">","total",1]],"paint":{"circle-radius":{"property":"total","type":"exponential","stops":[[0,12],[50,14],[100,16],[200,18],[400,20],[800,22],[1200,24],[1600,26],[2000,28],[2500,30],[3000,32],[4000,34],[5000,36]]},"circle-color":"rgba(48,126,217,0.65)"}},{"id":"physical-thing-cluster-text","type":"symbol","source":"resources-d80e5eaa-32ea-11ec-a2aa-024e0d439fdb","source-layer":"d80e5eaa-32ea-11ec-a2aa-024e0d439fdb","layout":{"text-field":"{total}","text-size":10},"paint":{"text-color":"#fff"},"filter":["all",[">","total",1]]}]

### Place  

	[{"id":"place-polygon-fill","type":"fill","source":"resources-6c874bcf-c071-11e9-9605-a4d18cec433a","source-layer":"6c874bcf-c071-11e9-9605-a4d18cec433a","layout":{"visibility":"visible"},"filter":["all",["==","$type","Polygon"],["==","total",1]],"paint":{"fill-color":["case",["boolean",["feature-state","hover"],false],"rgba(63,171,81,0.65)","rgba(171,81,55,0.65)"]}},{"id":"place-polygon-outline","type":"line","source":"resources-6c874bcf-c071-11e9-9605-a4d18cec433a","source-layer":"6c874bcf-c071-11e9-9605-a4d18cec433a","layout":{"visibility":"visible"},"filter":["all",["==","$type","Polygon"],["==","total",1]],"paint":{"line-width":2,"line-color":["case",["boolean",["feature-state","hover"],false],"rgba(104,247,124,0.7)","rgba(247,108,67,0.7)"]}},{"id":"place-line-halo","type":"line","source":"resources-6c874bcf-c071-11e9-9605-a4d18cec433a","source-layer":"6c874bcf-c071-11e9-9605-a4d18cec433a","layout":{"visibility":"visible"},"filter":["all",["==","$type","LineString"],["==","total",1]],"paint":{"line-width":4,"line-color":["case",["boolean",["feature-state","hover"],false],"rgba(104,247,124,0.7)","rgba(247,108,67,0.7)"]}},{"id":"place-line-fill","type":"line","source":"resources-6c874bcf-c071-11e9-9605-a4d18cec433a","source-layer":"6c874bcf-c071-11e9-9605-a4d18cec433a","layout":{"visibility":"visible"},"filter":["all",["==","$type","LineString"],["==","total",1]],"paint":{"line-width":2,"line-color":["case",["boolean",["feature-state","hover"],false],"rgba(63,171,81,0.65)","rgba(171,81,55,0.65)"]}},{"id":"place-point-halo","type":"circle","source":"resources-6c874bcf-c071-11e9-9605-a4d18cec433a","source-layer":"6c874bcf-c071-11e9-9605-a4d18cec433a","layout":{"visibility":"visible"},"filter":["all",["==","$type","Point"],["==","total",1]],"paint":{"circle-radius":["case",["boolean",["feature-state","hover"],false],10,8],"circle-color":["case",["boolean",["feature-state","hover"],false],"rgba(104,247,124,0.7)","rgba(247,108,67,0.7)"]}},{"id":"place-point-fill","type":"circle","source":"resources-6c874bcf-c071-11e9-9605-a4d18cec433a","source-layer":"6c874bcf-c071-11e9-9605-a4d18cec433a","layout":{"visibility":"visible"},"filter":["all",["==","$type","Point"],["==","total",1]],"paint":{"circle-radius":["case",["boolean",["feature-state","hover"],false],8,6],"circle-color":["case",["boolean",["feature-state","hover"],false],"rgba(63,171,81,0.65)","rgba(171,81,55,0.65)"]}},{"id":"place-cluster-halo","type":"circle","source":"resources-6c874bcf-c071-11e9-9605-a4d18cec433a","source-layer":"6c874bcf-c071-11e9-9605-a4d18cec433a","layout":{"visibility":"visible"},"filter":["all",["==","$type","Point"],[">","total",1]],"paint":{"circle-radius":{"property":"total","stops":[[0,22],[50,24],[100,26],[200,28],[400,30],[800,32],[1200,34],[1600,36],[2000,38],[2500,40],[3000,42],[4000,44],[5000,46]]},"circle-color":["case",["boolean",["feature-state","hover"],false],"rgba(104,247,124,0.7)","rgba(247,108,67,0.7)"]}},{"id":"place-cluster-fill","type":"circle","source":"resources-6c874bcf-c071-11e9-9605-a4d18cec433a","source-layer":"6c874bcf-c071-11e9-9605-a4d18cec433a","layout":{"visibility":"visible"},"filter":["all",["==","$type","Point"],[">","total",1]],"paint":{"circle-radius":{"property":"total","type":"exponential","stops":[[0,12],[50,14],[100,16],[200,18],[400,20],[800,22],[1200,24],[1600,26],[2000,28],[2500,30],[3000,32],[4000,34],[5000,36]]},"circle-color":["case",["boolean",["feature-state","hover"],false],"rgba(63,171,81,0.65)","rgba(171,81,55,0.65)"]}},{"id":"place-cluster-text","type":"symbol","source":"resources-6c874bcf-c071-11e9-9605-a4d18cec433a","source-layer":"6c874bcf-c071-11e9-9605-a4d18cec433a","layout":{"text-field":"{total}","text-size":10},"paint":{"text-color":"#fff"},"filter":["all",[">","total",1]]}]
