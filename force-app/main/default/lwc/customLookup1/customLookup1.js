
import fetchRecords from '@salesforce/apex/CustomLookupController.fetchRecords';
import { LightningElement,api,track } from 'lwc';

export default class CustomLookup extends LightningElement {
    @api objectName='';
    @api fieldName='';
    @api details;
    @api value='';
    @api recordCount=5;
    @api iconName='standard:drafts';
    @api label='';
    @track placeholder='Search..';
    @track searchString='';
    @api selectedRecord;
    @track recordsList;
    @track message='';

    @track classResultDiv='slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click slds-is-open';
    @track classSpinner='slds-hide';

    
    get classLookupPill(){
        let a='slds-pill-container ';
        if(this.selectedRecord){
            return a;
        }
        return a+'slds-hide';
    }

    get styleListBox(){
        return 'max-height:'+(8 + (this.recordCount * 40))+'px';
    }

    get labelSearchInput(){
        if(this.label!==''){
           return this.label;
        }
        
        return this.fieldName;
    }

    get classOfLookupField(){
        if(this.selectedRecord===''){
            return 'slds-show';
        }

        return 'slds-hide';
    }

    get messageEmpty(){
        return this.message==='';
    }

    get getToggleClassResultList(){
        if(this.classResultDiv.includes('slds-is-open')){
            return 'slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click';
        }
        
        return 'slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click slds-is-open';
    }

    connectedCallback(){
        this.doInit();
    }

    

    doInit() {
        this.classResultDiv=this.getToggleClassResultList;
		if(this.value) {
			this.searchRecordsHelper(this.value);
		}
    }

    // When a keyword is entered in search box
	searchRecords(event) {
        this.searchString=event.target.value;
        if(this.searchString){
            this.searchRecordsHelper(this.searchString);
        } else {
            this.classResultDiv='slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click';
        }
    }
    
    // When an item is selected
	selectItem(event) {
        // eslint-disable-next-line no-console
        console.log('Item selected!');
        if(event.currentTarget.id) {
            let recordsList = this.recordsList;
            let index = recordsList.findIndex(x => x.value===event.currentTarget.id.substring(0,event.currentTarget.id.indexOf('-')));
            for(let i=0;i<recordsList.length;i++){
                
                     // eslint-disable-next-line no-console
                     console.log(event.currentTarget.id+'\nI have a result!\nIt is this '+JSON.stringify(recordsList[i]));
                 }
            let selectedRecord;
            // eslint-disable-next-line no-console
            console.log('The index is: '+index);
            if(index!== -1) {
                selectedRecord = recordsList[index];
                this.selectedRecord=selectedRecord;
                this.value=selectedRecord.value;
            }
            
            this.classResultDiv='slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click';
        }
    }
    
    // To remove the selected item.
	removeItem(){
        this.selectedRecord='';
        this.value='';
        this.searchString='';
    }
    
    searchRecordsHelper(value) {
        // eslint-disable-next-line no-console
        console.log('In search method!');
        this.classSpinner='slds-show';
        this.message='';
        this.recordsList=null;
        // eslint-disable-next-line no-console
        console.log('Elements for search: '+this.objectName+' '+this.fieldName+' '+this.searchString+' '+this.details);
        // Calling Apex Method
        fetchRecords({objectName:this.objectName,filterField:this.fieldName,searchString:this.searchString,details:this.details})
        .then(result=>{
            // // eslint-disable-next-line no-console
            // console.log('I have a result!'+result.length);
            // for(let i=0;i<result.length;i++){
            //     // eslint-disable-next-line no-console
            //     console.log('I have a result!\nIt is this '+JSON.stringify(result));
            // }
            if(result.length > 0) {
                // To check if value attribute is prepopulated or not
                if(value) {
                    this.recordsList=result;
                }
            } else {
                this.message='No Records Found';
            }
            this.classSpinner='slds-hide';
            // eslint-disable-next-line no-console
            console.log('Until here, all is good!');
        }).catch(error=>{
            // eslint-disable-next-line no-console
            console.log('I have an error!\n'+JSON.stringify(error));
            if (error && error[0] && error[0].message) {
                this.message=error[0].message;
            }
            this.classSpinner='slds-hide';
        });
        // To open the drop down list of records
        if(value)
            this.classResultDiv='slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click slds-is-open';
        
    }
    
    // To close the dropdown if clicked outside the dropdown.
    blurEvent(){
        //this.classResultDiv='slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click';
    }

}