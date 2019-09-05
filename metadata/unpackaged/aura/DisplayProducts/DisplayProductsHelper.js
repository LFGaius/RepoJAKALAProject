({
	getProducts: function (component, event) {
		console.log('++DisplayProductsGetProductst++');
		this.showSpinner(component);
		var action = component.get("c.getProductsWithBarCode");
		var theBarcode = component.get("v.BarCode");
		console.log('theBarcode'+theBarcode);
        if (theBarcode) {
			console.log('action got');
        	action.setParams({ Barcode : theBarcode });
        	action.setCallback(this, function(response) { 
              var state = response.getState();
	           if (state === "SUCCESS") {
               var returnValue =response.getReturnValue();
                   console.log('----returned'+returnValue);
                component.set("v.AllProducts", returnValue );
				this.hideSpinner(component,event);

           		}
        	});
        	$A.enqueueAction(action);
		}
	},

	showSpinner: function(component) {
		var spinnerMain =  component.find("mySpinner");
		$A.util.removeClass(spinnerMain, "slds-hide");
	},
 
	hideSpinner : function(component) {
		var spinnerMain =  component.find("mySpinner");
		$A.util.addClass(spinnerMain, "slds-hide");
	}
})