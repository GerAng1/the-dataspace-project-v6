define([
    'underscore',
    'knockout',     
    'views/components/reports/sketchfab-setup',
    'arches',
	'viewmodels/report',
	'knockstrap',
    'bindings/chosen',
],
function (_, ko, sketchfabSetup, arches,ReportViewModel, ) {
    return ko.components.register('aton-report', {
        viewModel: function (params) {
            var self = this;
            params.configKeys = ['nodes'];
            ReportViewModel.apply(this, [params]);

            self.sketchfabUrl = ko.observable();

            if (self.report.get('tiles')) {
                let sketchfabUrl;
                self.report.get('tiles').forEach(function (tile) {
                    if (tile.nodegroup_id == '039dcb14-ac5a-11ed-8e89-f4463762b1b3'){
                        if ('229d3e0e-ac5a-11ed-910e-f4463762b1b3' in tile.data){
                            sketchfabUrl = tile.data['229d3e0e-ac5a-11ed-910e-f4463762b1b3'];
                        }
                    }
                }, self);

                if (sketchfabUrl) {
                    self.sketchfabUrl(sketchfabUrl);
                    let embedUrl = sketchfabUrl

                    sketchfabSetup.setupSketchfab(embedUrl)
                }
            }

            var widgets = [];
            var getCardWidgets = function (card) {
                widgets = widgets.concat(card.model.get('widgets')());
                card.cards().forEach(function (card) {
                    getCardWidgets(card);
                });
            };
            ko.unwrap(self.report.cards).forEach(getCardWidgets);

            this.nodeOptions = ko.observableArray(
                widgets.map(function (widget) {
                    return widget.node
                }).filter(function (node) {
                    return ko.unwrap(node.datatype) === 'file-list';
                })
            );
        },
        template: {
            require: 'text!report-templates/aton'
        }
    });
});