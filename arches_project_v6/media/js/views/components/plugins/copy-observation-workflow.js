define([
    'knockout',
    'jquery',
    'arches',
    'viewmodels/workflow',
    'views/components/workflows/copy-observation-workflow/select-observation-step',
    'views/components/workflows/final-step'
], function(ko, $, arches, Workflow) {
    return ko.components.register('copy-observation-workflow', {
        viewModel: function(params) {
            this.componentName = 'copy-observation-workflow';
            this.quitUrl = "/init-workflow";
            this.stepConfig = [
                {
                    title: 'Select Observation',
                    name: 'select-observation', /* unique to workflow */
                    workflowstepclass: 'select-observation-step',
                    required: true,
                    layoutSections: [
                        {
                            componentConfigs: [
                                { 
                                    componentName: 'select-observation-step',
                                    uniqueInstanceName: 'select-observation-step', /* unique to step */
                                    tilesManaged: 'none',
                                    parameters: {},
                                },
                            ], 
                        },
                    ],
                },
                {
                    title: 'New Observation Name',
                    name: 'rename-observation', /* unique to workflow */
                    required: true,
                    informationboxdata: {
                        heading: 'Rename created Observation',
                        text: 'Give the copy of the Observation a new name.',
                    },
                    layoutSections: [
                        {
                            componentConfigs: [
                                {
                                    componentName: 'default-card',
                                    uniqueInstanceName: 'rename-observation-step', /* unique to step */
                                    tilesManaged: 'one',
                                    parameters: {
                                        graphid: 'ce9f1790-9d40-42aa-b41a-6647fabab2cc',
                                        nodegroupid: 'b0d4a2bc-256f-11ee-a6bd-8b9ca09c0fce',
                                        resourceid: "['select-observation']['select-observation-step']",
                                    },
                                },
                            ], 
                        },
                    ],
                },
                {
                    title: 'Finish',
                    name: 'copy-resource-complete',  /* unique to workflow */
                    description: 'Finish the resource copy',
                    layoutSections: [
                        {
                            componentConfigs: [
                                { 
                                    componentName: 'final-step',
                                    uniqueInstanceName: 'create-resource-final',
                                    tilesManaged: 'none',
                                    parameters: {
                                        // resourceid: "['create-resource']['add-name-step'][0]['resourceInstanceId']",
                                    },
                                },
                            ], 
                        },
                    ],
                }
            ];
            Workflow.apply(this, [params]);
            this.quitUrl = arches.urls.plugin('init-workflow');
            
        },
        template: { require: 'text!templates/views/components/plugins/copy-observation-workflow.htm' }
    });
});