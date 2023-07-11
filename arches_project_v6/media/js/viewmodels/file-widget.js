define([
    'jquery',
    'arches',
    'knockout',
    'underscore',
    'dropzone',
    'uuid',
    'viewmodels/widget',
    'Plotly',
    'bindings/dropzone'
], function($, arches, ko, _, Dropzone, uuid, WidgetViewModel, Plotly) {
    /**
     * A viewmodel used for domain widgets
     *
     * @constructor
     * @name FileWidgetViewModel
     *
     * @param  {string} params - a configuration object
     */
    var FileWidgetViewModel = function(params) {
        var self = this;
        params.configKeys = ['acceptedFiles', 'maxFilesize', 'maxFiles'];

        WidgetViewModel.apply(this, [params]);

        this.uploadMulti = ko.observable(true);
        this.filesForUpload = ko.observableArray();
        this.uploadedFiles = ko.observableArray();
        this.unsupportedImageTypes = ['tif', 'tiff', 'vnd.adobe.photoshop'];
        this.validFormats = {
            'XRF': ["mca", "mcb"],
            'XRD': ["xy", "xyz"],
            'MIR': ["dpt", "dpu"]
        };


        if (this.form) {
            this.form.on('after-update', function(req, tile) {
                var hasdata = _.filter(tile.data, function(val, key) {
                    val = ko.unwrap(val);
                    if (val) {
                        return val;
                    }
                });
                if (tile.isParent === true || hasdata.length === 0){
                    if (self.dropzone) {
                        self.dropzone.removeAllFiles(true);
                    }
                } else if ((self.tile === tile || _.contains(tile.tiles, self.tile)) && req.status === 200) {
                    if (self.filesForUpload().length > 0) {
                        self.filesForUpload.removeAll();
                    }
                    var data = req.responseJSON.data[self.node.nodeid];
                    if (Array.isArray(data)) {
                        self.uploadedFiles(data);
                    }
                    if (self.dropzone) {
                        self.dropzone.removeAllFiles(true);
                    }
                    self.formData.delete('file-list_' + self.node.nodeid);
                }
            });
            this.form.on('tile-reset', function(tile) {
                if ((self.tile === tile || _.contains(tile.tiles, self.tile))) {
                    if (self.filesForUpload().length > 0) {
                        self.filesForUpload.removeAll();
                    }
                    if (Array.isArray(self.value())) {
                        var uploaded = _.filter(self.value(), function(val) {
                            return ko.unwrap(val.status) === 'uploaded';
                        });
                        self.uploadedFiles(uploaded);
                    }
                    if (self.dropzone) {
                        self.dropzone.removeAllFiles(true);
                        self.formData.delete('file-list_' + self.node.nodeid);
                    }
                }
            });
        }
        this.acceptedFiles.subscribe(function(val) {
            if (self.dropzone) {
                self.dropzone.hiddenFileInput.setAttribute("accept", val);
            }
        });
        this.maxFilesize.subscribe(function(val) {
            if (self.dropzone) {
                self.dropzone.options.maxFilesize = val;
            }
        });

        this.formatSize = function(file) {
            var bytes = ko.unwrap(file.size);
            if(bytes == 0) return '0 Byte';
            var k = 1024;
            var dm = 2;
            var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
            var i = Math.floor(Math.log(bytes) / Math.log(k));
            return '<span>' + parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + '</span> ' + sizes[i];
        };

        this.filesJSON = ko.computed(function() {
            var filesForUpload = self.filesForUpload();
            var uploadedFiles = self.uploadedFiles();
            return ko.toJS(uploadedFiles.concat(
                _.map(filesForUpload, function(file, i) {
                    return {
                        name: file.name,
                        accepted: file.accepted,
                        height: file.height,
                        lastModified: file.lastModified,
                        size: file.size,
                        status: file.status,
                        type: file.type,
                        width: file.width,
                        url: null,
                        file_id: null,
                        index: i,
                        content: URL.createObjectURL(file),
                        error: file.error
                    };
                })
            ));
        }).extend({throttle: 100});

        this.filesJSON.subscribe(function(value) {
            if (self.formData) {
                if (_.contains(self.formData.keys(), 'file-list_' + self.node.nodeid)) {
                    self.formData.delete('file-list_' + self.node.nodeid);
                }
            }
            if (value.length > 1 && self.selectedFile() == undefined) { self.selectedFile(value[0]); }
            _.each(self.filesForUpload(), function(file) {
                if (file.accepted) {
                    self.formData.append('file-list_' + self.node.nodeid, file, file.name);
                }
            });
            if (ko.unwrap(self.value) !== null || self.filesForUpload().length !== 0 || self.uploadedFiles().length !== 0) {
                self.value(
                    value.filter(function(file) {
                        return file.accepted;
                    })
                );
            }
        });

        this.getFileUrl = function(url){
            url = ko.unwrap(url);
            var httpRegex = /^https?:\/\//;
            // test whether the url is external (starts with http(s), if it is just return it)
            if (httpRegex.test(url)){
                return url;
            }else{
                return (arches.urls.url_subpath + url).replace('//', '/');
            }

        };

        if (Array.isArray(self.value())) {
            this.uploadedFiles(self.value());
        }
        this.filter = ko.observable("");
        this.filteredList = ko.computed(function() {
            var arr = [], lowerName = "", filter = self.filter().toLowerCase();
            if(filter) {
                self.filesJSON().forEach(function(f, i) {
                    lowerName = f.name.toLowerCase();
                    if(lowerName.includes(filter)) { arr.push(self.filesJSON()[i]); }
                });
            }
            return arr;
        });

        this.selectedFile = ko.observable(self.filesJSON()[0]);
        this.selectFile = function(sFile) { self.selectedFile(sFile); };

        this.removeFile = function(file) {
            var filePosition;
            self.filesJSON().forEach(function(f, i) { if (f.file_id === file.file_id) { filePosition = i; } });
            var newfilePosition = filePosition === 0 ? 1 : filePosition - 1;
            var filesForUpload = self.filesForUpload();
            var uploadedFiles = self.uploadedFiles();
            if (file.file_id) {
                file = _.find(uploadedFiles, function(uploadedFile) {
                    return file.file_id ===  ko.unwrap(uploadedFile.file_id);
                });
                self.uploadedFiles.remove(file);
            } else {
                file = filesForUpload[file.index];
                self.filesForUpload.remove(file);
            }
            if (self.filesJSON().length > 0) { self.selectedFile(self.filesJSON()[newfilePosition]); }
        };
        
        this.pageCt = ko.observable(5);
        this.pageCtReached = ko.computed(function() {
            return (self.filesJSON().length > self.pageCt() ? 'visible' : 'hidden');
        });

        this.pagedList = function(list) {
            var arr = [], i = 0;
            if(list.length > self.pageCt()) {
                while(arr.length < self.pageCt()) { arr.push(list[i++]); }
                return arr;
            }
            return list;
        };

        this.unique_id = uuid.generate();
        this.uniqueidClass = ko.computed(function() {
            return "unique_id_" + self.unique_id;
        });

        this.dropzoneOptions = {
            url: "arches.urls.root",
            dictDefaultMessage: '',
            autoProcessQueue: false,
            previewTemplate: $("template#file-widget-dz-preview").html(),
            autoQueue: false,
            previewsContainer: ".dz-previews." + this.uniqueidClass(),
            clickable: ".fileinput-button." + this.uniqueidClass(),
            acceptedFiles: this.acceptedFiles(),
            maxFilesize: this.maxFilesize(),
            uploadMultiple: self.uploadMulti(),
            // maxFiles: Number(this.maxFiles()),
            init: function() {
                self.dropzone = this;

                this.on("addedfile", function(file) {
                    self.filesForUpload.push(file);
                });

                this.on("error", function(file, error) {
                    file.error = error;
                    self.filesForUpload.valueHasMutated();
                });

                this.on("removedfile", function(file) {
                    self.filesForUpload.remove(file);
                });
            }
        };

        this.reset = function() {
            if (self.dropzone) {
                self.dropzone.removeAllFiles(true);
                self.uploadedFiles.removeAll();
                self.filesForUpload.removeAll();
            }
        };

        this.displayValue = ko.computed(function() {
            return self.uploadedFiles().length === 1 ? ko.unwrap(self.uploadedFiles()[0].name) : self.uploadedFiles().length; 
        });

        this.findKey = function(str,dict) {
            for (const key in dict) {
                if (dict[key].includes(str)) {
                    return key;
                }
            }
            return null;
        };

        this.reportFiles = ko.computed(function() {
            return self.uploadedFiles().filter(function(file) {
                var fileType = ko.unwrap(file.type);
                if (fileType) {
                    var ext = fileType.split('/').pop();
                    
                    console.log("file:" + ko.unwrap(file.name));
                    console.log(fileType.indexOf('image') < 0 || self.unsupportedImageTypes.indexOf(ext) > -1);
                    
                    return fileType.indexOf('image') < 0 || self.unsupportedImageTypes.indexOf(ext) > -1;
                }
                const fileName = ko.unwrap(file.name);
                const lastPeriodIndex = fileName.lastIndexOf(".");
                const fileExt = fileName.substring(lastPeriodIndex + 1);
                const fileIsPlottable = self.findKey(fileExt, self.validFormats);
                return !fileIsPlottable;
            });
        });

        this.reportImages = ko.computed(function() {
            return self.uploadedFiles().filter(function(file) {
                var fileType = ko.unwrap(file.type);
                if (fileType) {
                    var ext = fileType.split('/').pop();
                    
                    console.log("image:" + ko.unwrap(file.name));
                    console.log(fileType.indexOf('image') >= 0 && self.unsupportedImageTypes.indexOf(ext) <= 0);

                    
                    return fileType.indexOf('image') >= 0 && self.unsupportedImageTypes.indexOf(ext) <= 0;
                }
                return false;
            });
        });

        this.reportGraphs = ko.computed(function() {          
            // Define the color change function for button
            function changeColor(fileID, data, layout) {
                const letters = '0123456789ABCDEF';
                let color = '#';
                for (let i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
                }

                const updatedData = {...data, line: {color}};
                Plotly.react(fileID, [updatedData], layout);
            }

            // Opens plot data in new tab as raw text instead of downloading
            function openFileInNewTab(fileUrl) {
                fetch(fileUrl)
                  .then(response => response.text())
                  .then(text => {
                    const newTab = window.open();
                    newTab.document.write(`<pre>${text}</pre>`);
                    newTab.document.close();
                  })
                  .catch(error => console.error(error));
            }
              
            return self.uploadedFiles().filter(function(file) {
                // for (const key in file) {
                //     if (file.hasOwnProperty(key)) {
                //       console.log(key + ": " + ko.unwrap(file[file.key]));
                //     }
                // }

                const fileName = ko.unwrap(file.name);
                const fileID = ko.unwrap(file.file_id);
                const fileURL = self.getFileUrl(file.url);

                const lastPeriodIndex = fileName.lastIndexOf(".");
                const fileExt = fileName.substring(lastPeriodIndex + 1);

                const fileIsPlottable = self.findKey(fileExt, self.validFormats);

                if (!fileIsPlottable) {
                    console.log(`'${fileExt}' not found in dictionary`);
                    return false;
                }
                
                fetch(fileURL)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.text();
                })
                .then(responseData => {
                    const graphData = responseData;
                    const x = [];
                    const y = [];
                    const sep = graphData.includes('\r') ? '\r': '\n';
                    let axes = graphData.split(sep);
                    
                    if (fileIsPlottable === 'XRF') {
                        xAxisTitle = 'Energy (keV)';
                        yAxisTitle = 'Intensity (Counts)';

                        axes = axes.slice(19,-1);

                        axes.forEach((val, index) => {
                            x.push(index);
                            y.push(val);
                        });

                    } else if (fileIsPlottable === 'XRD') {
                        xAxisTitle = '2Theta (°)';
                        yAxisTitle = 'Intensity (Counts)';

                        for (let i = 0; i < axes.length; i++) {
                            const values = axes[i].split(" ");
                            x.push(parseFloat(values[0]));
                            y.push(parseFloat(values[1]));
                        }

                    } else if (fileIsPlottable === 'MIR') { 
                        xAxisTitle = 'x axis';
                        yAxisTitle = 'y axis';

                        for (let i = 0; i < axes.length; i++) {
                            const values = axes[i].split(" ");
                            x.push(parseFloat(values[0]));
                            y.push(parseFloat(values[1]));
                        }

                    } else {
                        console.log(`'${fileExt}' not found in dictionary`);
                        return false;
                    }

                    const data = {
                        x: x,
                        y: y,
                        type: 'scatter',
                    };
    
                    const layout = {
                        hovermode: 'closest',
                        title: `${fileIsPlottable} Spectrum`,
                        xaxis: {
                            title: xAxisTitle
                        },
                        yaxis: {
                            title: yAxisTitle
                        }
                    };

                    Plotly.newPlot(fileID, [data], layout);
                    
                    // Attach click event listeners to color buttons
                    document.getElementById('btn-' + fileID).addEventListener('click', () => {
                        changeColor(fileID, data, layout);
                    });
                    // Attach click event listeners to open file in new tab
                    document.getElementById('raw-' + fileID).addEventListener('click', () => {
                        openFileInNewTab(fileURL);
                    });
                })
                .catch(error => {
                    console.log(`Fetch error: ${error}`);
                });

                return true;
            });
        });    
    };

    return FileWidgetViewModel;
});
