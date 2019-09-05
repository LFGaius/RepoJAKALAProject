({
	handleSubmitBASIC: function (component, event, helper) {
	console.log('handleSubmitBASIC');
		//event.preventDefault();
	},

	handleSuccessBASIC: function (component, event, helper) {
	console.log('handleSuccessBASIC');
		//event.preventDefault();
	},

	handleSubmitCUSTOMER: function (component, event, helper) {
	console.log('handleSubmitCUSTOMER');
		//event.preventDefault();
		//var fields = event.getParam('fields');
		//console.log(JSON.stringify(fields));
		//component.find('myRecordForm').submit(fields);


	},

	handleSuccessCUSTOMER: function (component, event, helper) {
	console.log('handleSuccessCUSTOMER');
		//event.preventDefault();
	},

	handleErrorsCUSTOMER: function (component, event, helper) {
	console.log('handleErrorsCUSTOMER');
		//event.preventDefault();
	},

	handleValueChange: function (component, event, helper) {
	console.log('handleValueChange');
	var a = component.get("v.selectedRecord");
	console.log(JSON.stringify(a));
		//event.preventDefault();
	}




})