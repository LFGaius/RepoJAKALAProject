import { LightningElement } from 'lwc';

export default class OrderEntry extends LightningElement {
    PreOrderFields_BASIC=['Collection__c','Channel__c'];
    PreOrderFields_CUSTOMER=['Billing__c'];
    selectedAccount='';
    selectedChannel='';
    CampaignId='';

    handleSubmitBASIC() {
        // eslint-disable-next-line no-console
        console.log('handleSubmitBASIC');
            //event.preventDefault();
    }
    
    handleSuccessBASIC() {
        // eslint-disable-next-line no-console
        console.log('handleSuccessBASIC');
            //event.preventDefault();
    }
    
    handleSubmitCUSTOMER() {
        // eslint-disable-next-line no-console
        console.log('handleSubmitCUSTOMER');
            //event.preventDefault();
            //var fields = event.getParam('fields');
            //console.log(JSON.stringify(fields));
            //component.find('myRecordForm').submit(fields);
    
    
    }
    
    handleSuccessCUSTOMER() {
        // eslint-disable-next-line no-console
        console.log('handleSuccessCUSTOMER');
            //event.preventDefault();
    }
    
    handleErrorsCUSTOMER() {
        // eslint-disable-next-line no-console
        console.log('handleErrorsCUSTOMER');
            //event.preventDefault();
    }
    
    handleValueChange() {
        // eslint-disable-next-line no-console
        console.log('handleValueChange');
        let a = this.selectedRecord;
        // eslint-disable-next-line no-console
        console.log(JSON.stringify(a));
            //event.preventDefault();
    }
}