({
	doInit: function (component, event, helper) {
	console.log('++DisplayProductsDoInit++');
	},

	handleSearch : function(component, evvent,helper) {
	console.log('++handleClick++');
	helper.getProducts(component, event);
	}
})