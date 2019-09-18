import { LightningElement,track} from 'lwc';
import getOrderingCustomer from '@salesforce/apex/PreOrderController.getOrderingCustomer';
import getNameById from '@salesforce/apex/PreOrderController.getNameById';

export default class PreOrder extends LightningElement {

    //begin tab1
    @track orderingCustomers;//accounts
    @track optionsOrderingCustomer;
    @track selectedOrderingCustomer;
    @track parentSelectedOrderingCustomer;//the parent of the selected account (for Statistical Customer )
    @track error;
    //end tab1

    //begin operations tab1
    handleSelectedOrderingCustomer(event){
        this.selectedOrderingCustomer=event.detail;
        let ind=this.orderingCustomers.findIndex(x => x.Id===this.selectedOrderingCustomer);//we get the index of the selected object (from the combobox) in the global list of Accounts retrieved from the DB 
        if(ind>=0){
            let iid=this.orderingCustomers[ind].ParentId;//we get his parent
            getNameById({id:iid})//to get the name of the parent account of which we passed the id(iid)
            .then(result=>{
                this.parentSelectedOrderingCustomer=result.Name;
            })
            .catch(error=>{
                this.parentSelectedOrderingCustomer=undefined;
                this.error=error;
            })
        }else{
            this.parentSelectedOrderingCustomer=undefined;
        }
        // eslint-disable-next-line no-console
        console.log('index '+ind);
    }
    //end operations tab1

    connectedCallback(){
        // eslint-disable-next-line no-console
        console.log('here i am!');
        getOrderingCustomer()
        .then(result=>{
            // eslint-disable-next-line no-console
            console.log('resssul '+result);
            let opt=[];
            this.orderingCustomers=result;
            for(let i=0;i<result.length;i++){
                // eslint-disable-next-line no-console
                console.log('hello    '+JSON.stringify(result[i]));
                opt.push({label:result[i].Name,value:result[i].Id});//label reference the Object Name and value reference the object id
            }

            this.optionsOrderingCustomer=opt;
        }).catch(error=>{
            this.error=error;
            // eslint-disable-next-line no-console
            console.log('errrreor '+JSON.stringify(error));
        });
    }



}