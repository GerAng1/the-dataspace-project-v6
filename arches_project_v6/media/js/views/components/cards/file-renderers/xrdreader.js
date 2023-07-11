define(['jquery',
    'knockout',
    'viewmodels/afs-instrument',
    'bindings/plotly',
    'bindings/select2-query',
], function($, ko, AfsInstrumentViewModel) {
    return ko.components.register('xrdreader', {
        viewModel: function(params) {
            AfsInstrumentViewModel.apply(this, [params]);
            this.parse = function(data, series){
                let vals;
                try {
                    vals = data.split('Energy Counts')[1].trim().split('\n').slice(2, -1);
                } catch(e) {
                    vals = data.split('\n').slice(2, -1);
                }
                vals.forEach(function(val){
                    var rec = val.trim().split(/[\s,]+/);
                    // if (Number(rec[1]) > 30 && rec[0] > 0.5) {
                        series.count.push(Number(rec[1]));
                        series.value.push(Number(rec[0]));
                    // }
                });
            };
            this.chartTitle("XRD Diffractometer");
            this.xAxisLabel("2Theta (°)");
            this.yAxisLabel("Intensity (Counts)");
        },
        template: { require: 'text!templates/views/components/cards/file-renderers/afsreader.htm' }
    });
});
