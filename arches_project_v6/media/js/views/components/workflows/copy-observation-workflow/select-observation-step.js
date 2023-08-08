define([
    'jquery',
    'arches',
    'uuid',
    'knockout',
    'viewmodels/card',
], function($, arches, uuid, ko) {

    function viewModel(params) {
        var self = this;

        self.resourceinstance_id = ko.observable();
        var self = this;

        this.dataLoaded = ko.observable(false);

        self.copyResourceInstance = function() {
            // AJAX request to the custom endpoint on the server
            $.ajax({
                url: `${arches.urls.root}resource_copy`,
                method: 'POST',
                data: {
                    resourceinstance_id: self.resourceinstance_id()
                },
                success: function(response) {
                    console.log('Copy operation successful');
                    self.dataLoaded(true);
                },
                error: function(xhr, status, error) {
                    console.error('Error occurred:', status, error);
                }
            });
            
        };
    }

    ko.components.register('select-observation-step', {
        viewModel: viewModel,
        template: {
            require: 'text!templates/views/components/workflows/copy-observation-workflow/select-observation-step.htm'
        }
    });

    return viewModel;
});

