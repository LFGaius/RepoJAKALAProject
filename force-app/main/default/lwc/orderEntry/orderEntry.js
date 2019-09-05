import { LightningElement } from 'lwc';

export default class OrderEntry extends LightningElement {
    PreOrderFields_BASIC=['Collection__c','Channel__c'];
    PreOrderFields_CUSTOMER=['Billing__c'];
    selectedAccount='';
    selectedChannel='';
    CampaignId='';
}