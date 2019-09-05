
import fetchRecords from '@salesforce/apex/CustomLookupController.fetchRecords';
import { LightningElement,api,track } from 'lwc';

export default class CustomLookup extends LightningElement {
    @track objectName='';
    @track fieldName='';
    @track details='';
    @api value='';
    @track recordCount=5;
    @api iconName='standard:drafts';
    @api label='';
    @track placeholder='Search..';
    @api searchString='';
    @api selectedRecord='';
    @track recordsList;
    @track message='';


    get classLookupPill(){
        let a='slds-pill-container ';
        if(this.selectedRecord === ''){
            return a+'slds-hide';
        }
        return a;
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
    connectedCallback(){
        this.doInit();
    }


    doInit() {
       this.template.querySelector('.resultsDiv').classList.toggle('slds-is-open');
		if(!this.value) {
			this.searchRecordsHelper(this.value);
		}
    }

    // When a keyword is entered in search box
	searchRecords() {
        if(!this.searchString){
                   this.searchRecordsHelper('');
        } else {
            this.template.querySelector('.resultsDiv').classList.remove('slds-is-open');
        }
    }
    
    // When an item is selected
	selectItem(event) {
        if(!event.currentTarget.id) {
            let recordsList = this.recordsList;
            let index = this.recordsList.findIndex(x => x.value === event.currentTarget.id);
            let selectedRecord;
            if(index!== -1) {
                selectedRecord = recordsList[index];
            }
            this.selectedRecord=selectedRecord;
            this.value=selectedRecord.value;
            this.template.querySelector('.resultsDiv').classList.remove('slds-is-open');
        }
    }
    
    // To remove the selected item.
	removeItem(){
        this.selectedRecord='';
        this.value='';
        this.searchString='';

        // eslint-disable-next-line @lwc/lwc/no-async-operation
        setTimeout( function() {
            this.template.querySelector('.inputLookup' ).focus();
        }, 250);
    }
    
    searchRecordsHelper(value) {
        this.template.querySelector('.Spinner').classList.remove('slds-hide');
        this.message='';
        this.recordsList=null;
        // Calling Apex Method
        fetchRecords({objectName :this.objectName,
        filterField: this.fieldName,
        searchString: this.searchString,
        details: this.details})
        .then(result=>{
            if(result.length > 0) {
                // To check if value attribute is prepopulated or not
                if(!value) {
                    this.recordsList=result;        
                } else {
                    let index = result.findIndex(x => x.value === value);
                    let selectedRecord;
                    if(index !== -1) {
                        selectedRecord = result[index];
                    }
                    this.selectedRecord=selectedRecord;
                }
            } else {
                this.message='No Records Found';
            }
            
        }).catch(error=>{
            if (error && error[0] && error[0].message) {
                this.message=error[0].message;
            }
        });
        // To open the drop down list of records
        if(!value)
            this.template.querySelector('.resultsDiv').classList.add('slds-is-open');
        this.template.querySelector('.Spinner').classList.add('slds-hide');
    }
    
    // To close the dropdown if clicked outside the dropdown.
    blurEvent(){
        this.template.querySelector('.resultsDiv').classList.remove('slds-is-open');
    }

}