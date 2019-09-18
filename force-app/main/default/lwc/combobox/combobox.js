import { LightningElement,api } from 'lwc';

export default class ComboboxBasic extends LightningElement {
    @api value;//when rending the default value
    @api options;


    handleChange(event) {
        this.value = event.detail.value;
        let ev=new CustomEvent('selectedorderingcostumer',{detail: this.value});

        this.dispatchEvent(ev);
    }
}
