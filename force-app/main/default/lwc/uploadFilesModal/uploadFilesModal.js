import { LightningElement, api } from 'lwc';
import { ShowToastEvent } from "lightning/platformShowToastEvent";

export default class UploadFilesModal extends LightningElement {

    @api recordId;

    // will store value of selected attachment type
    dvalue;
    
    // Limit document types --Modification
    get acceptedFormats() {
      return ['.pdf', '.docx', '.xlsx', '.csv'];
    }

    // Based on the record type populate the dropdown list with the defined values
    get options() {
            
      // Entity Key prefix decoder is supported by Salesforce.
      // List of values can be found here: https://help.salesforce.com/s/articleView?id=000385203&type=1
      // Record starts with 801 = Order. Currently will assume all others will be for the Opportunity record
      if((this.recordId).substring(0,3) == '801'){
        return [
          { label: 'choose one...', value: '' },
          { label: 'Contract - Final', value: 'CONTRACT-FINAL' },
          { label: 'Invoice Attachment', value: 'INVOICEATTACHMENT' },
          { label: 'Master Service Agreement', value: 'MSA' },
        ];
      }else{
        return [
          { label: 'choose one...', value: '' },
          { label: 'Contract - Draft', value: 'CONTRACT-DRAFT' },
          { label: 'Contract - Final', value: 'CONTRACT-FINAL' },
          { label: 'Contract - Redlined', value: 'CONTRACT-REDLINE' },
          { label: 'Contract - Support Document', value: 'CONTRACT-SUPPORT-DOCUMENT' },
        ];
      }

    }

    // Disable the ability to upload until user has selected the attachment type
    handleChange(event) {
      this.dvalue = event.detail.value;
      if(this.dvalue != ''){
          this.template.querySelector('[data-id="fileUploader"]').disabled = false;
      }else{
          this.template.querySelector('[data-id="fileUploader"]').disabled = true;
      }
      
    }


    closeModal(){
        this.dispatchEvent(new CustomEvent('selected'));
    }

    handleUploadFinished() {
        // Refresh via window.location
        this.dispatchEvent(
          new ShowToastEvent({
            title: `Success`,
            message: `File(s) have been uploaded`,
            variant: "success"
          })
        );
        this.dispatchEvent(new CustomEvent('selected'));
      }
}