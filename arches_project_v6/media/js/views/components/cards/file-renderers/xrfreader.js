define(['jquery',
    'knockout',
    'viewmodels/afs-instrument',
    'bindings/plotly',
    'bindings/select2-query',
], function($, ko, AfsInstrumentViewModel) {
    return ko.components.register('xrfreader', {
        viewModel: function(params) {
            AfsInstrumentViewModel.apply(this, [params]);
            this.parse = function(data, series){
                let vals;
                try {
                    vals = data.split('Energy Counts')[1].trim().split('\n').slice(19, -1);
                } catch(e) {
                    vals = data.split('\n').slice(19, -1);
                }
                vals.forEach(function(val,index){
					
                    if (val > 0.5) {
                        series.count.push(Number(val));
                        series.value.push(index);
                    }
					
                });
            };
            this.chartTitle("XRF Spectrometer");
            this.xAxisLabel("Energy (keV)");
            this.yAxisLabel("Intensity (Counts)");
        },
        template: { require: 'text!templates/views/components/cards/file-renderers/afsreader.htm' }
    });
});
