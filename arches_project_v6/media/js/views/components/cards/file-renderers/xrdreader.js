define(['jquery',
    'knockout',
    'viewmodels/afs-instrument',
    'bindings/plotly',
    'bindings/select2-query',
], function($, ko, AfsInstrumentViewModel) {
    return ko.components.register('xrdreader', {
        viewModel: function(params) {
            AfsInstrumentViewModel.apply(this, [params]);
            this.parse = function(data, series) {
                // XRD txt files from MOLAB MOVIDA have 7 lines of metadata
                const vals = data.split('\n').slice(8, -1);
                
                vals.forEach(function(val){
                    var rec = val.trim().split(/[\s,]+/);
                    series.count.push(Number(rec[1]));
                    series.value.push(Number(rec[0]));
                });
            };
            this.chartTitle("XRD Diffractometer");
            this.xAxisLabel("2Theta (°)");
            this.yAxisLabel("Intensity (Counts)");
        },
        template: { require: 'text!templates/views/components/cards/file-renderers/afsreader.htm' }
    });
});
