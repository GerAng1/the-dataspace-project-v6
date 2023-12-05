define(['jquery',
    'knockout',
    'viewmodels/afs-instrument',
    'bindings/plotly',
    'bindings/select2-query',
], function($, ko, AfsInstrumentViewModel) {
    return ko.components.register('mirreader', {
        viewModel: function(params) {
            AfsInstrumentViewModel.apply(this, [params]);
            this.parse = function(data, series){
                // MIR dpt files from MOLAB MOVIDA directly begin with numbers
                const vals = data.split('\n');
                
                vals.forEach(function(val){
                    var rec = val.trim().split(/[\s,]+/);
                    series.count.push(Number(rec[1]));
                    series.value.push(Number(rec[0]));
                });
            };
            this.chartTitle("FT-MIR Spectrum");
            this.xAxisLabel("Wavenumber / cm-1");
            this.yAxisLabel("log 1 / R");
        },
        template: { require: 'text!templates/views/components/cards/file-renderers/afsreader.htm' }
    });
});
