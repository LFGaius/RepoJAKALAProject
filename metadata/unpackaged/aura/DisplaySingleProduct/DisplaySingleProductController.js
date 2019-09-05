({
    doInit : function(component, event, helper) {
        console.log('++DisplaySingleProductInit++');

        var d = component.get("v.Product");
        console.log('++d++'+d);

        if (!d) {//Initialise default blank values for display
			component.set("v.hasProduct","false");//no product passed
            component.set("v.Product",
							{
                              'sobjectType':'ProductCollection__c',
                              'Name': '--',
							  'Id': ''
							}
                         );
        } else {
            //The attribute was passed
        }
        /*
		component.find('notifLib').showNotice({
            "variant": "error",
            "header": "Something has gone wrong!",
            "message": "Unfortunately, there was a problem updating the record.",
            closeCallback: function() {
                alert('You closed the alert!');
            }
        });
        */
        
		/*var toastEvent = $A.get("e.force:showToast");
    	toastEvent.setParams(
            {
       			mode: 'sticky',
        		message: 'This is a required message',
        		messageTemplate: 'Record {0} created! See it {1}!',
        		messageTemplateData: ['Salesforce', {
            		url: 'http://www.salesforce.com/',
            		label: 'here',
            	}
        		]
    		});
    	toastEvent.fire();
        */
       
    },
})