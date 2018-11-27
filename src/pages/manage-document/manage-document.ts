import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AlertController, NavController, NavParams } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';

@Component({
  selector: 'page-manage-document',
  templateUrl: 'manage-document.html',
})
export class ManageDocumentPage {

  public form        : any;
  public records     : any;
  public city        : string = '';
  public population  : string = '';
  public established : string = '';
  public docID       : string = '';
  public isEditable  : boolean = false;
 
  public title 		   : string	= 'Add a new document';
  private _COLL 		 : string = "stagiares";
  private uni        : string = "university";
  public Name : string ='';
  public Surname : string ='';
  public Birth :Date;
  public ID : Number;
  public University : string ='';
  public Class : string ='';
  public Airport : string ='';
  public StartDate : Date ;
  public EndDate : Date;
  public RequestDate : Date;
  public AssignmentDate : Date;
  public TrainingCertification : Boolean;
  public Actif : Boolean = true;
  locations: any;


  constructor(public navCtrl : NavController,
              public params  : NavParams,
              private _FB 	 : FormBuilder,
              private _DB    : DatabaseProvider,
              private _ALERT : AlertController) {
               
      this.form = _FB.group({
        'Name' 		    : ['', Validators.required],
        'Surname' 	: ['', Validators.required],
        'ID'	: ['', Validators.required],
        'Birth'	: ['', Validators.required],
        'University'	: ['', Validators.required],
        'Class'	: ['', Validators.required],
        'Airport'	: ['', Validators.required],
        'StartDate'	: ['', Validators.required],
        'EndDate'	: ['', Validators.required],
        'RequestDate'	: ['', Validators.required],
        'AssignmentDate'	: ['', Validators.required],
        'TrainingCertification'	: ['',Validators.required],
        'Actif' : ['']
        

        
     });
     
     

     if(params.get('isEdited')) {
         let record 		   = params.get('record');
         this.docID = record.location.id;
         this.Name	       = record.location.Name;
         this.Surname   = record.location.Surname;
         this.Birth  = record.location.Birth;
         this.ID       = record.location.ID;
         this.University       = record.location.University;
         this.Class       = record.location.Class;
         this.Airport     = record.location.Airport;
         this.StartDate     = record.location.StartDate;
         this.EndDate       = record.location.EndDate;
         this.RequestDate      = record.location.RequestDate;
         this.AssignmentDate     = record.location.AssignmentDate;
         this.TrainingCertification      = record.location.TrainingCertification;
         this.Actif = record.location.Actif;
         this.isEditable   = true;
         console.log(record.location.id);
         this.title        = 'Update this document';
         
     }
     
  }
  

  ionViewDidEnter() {
    this.retrieveCollection();
   // this.retrieveCollection1();
}


retrieveCollection() : void {
  console.log("assa");
  this._DB.getuni('university').then((data) => {         
        this.locations = data;
        console.log("bbbbbbb",this.locations);
    
  }).catch();
  
}


  saveDocument(val : any) : void {
         let   Name : string	= this.form.controls["Name"].value,
        Surname : string	= this.form.controls["Surname"].value,
        University : string	= this.form.controls["University"].value,
        Birth : Date	= this.form.controls["Birth"].value,
         ID: number	= this.form.controls["ID"].value,
        Class : string	= this.form.controls["Class"].value,
         Airport: string	= this.form.controls["Airport"].value,
         StartDate: Date	= this.form.controls["StartDate"].value,
        EndDate : Date	= this.form.controls["EndDate"].value,
       RequestDate: Date= this.form.controls["RequestDate"].value,
       AssignmentDate : Date	= this.form.controls["AssignmentDate"].value,
       TrainingCertification : Boolean	= this.form.controls["TrainingCertification"].value,
       Actif : Boolean	= this.form.controls["Actif"].value


     // If we are editing an existing record then handle this scenario
     if(this.isEditable) {
       
        // Call the DatabaseProvider service and pass/format the data for use
        // with the updateDocument method
        this._DB.updateDocument(this._COLL, this.docID, {
                                  Name   		: Name,
                                  Surname  : Surname,
                                  Birth : Birth,
                                  ID:ID,
                                  University:University,
                                  Class:Class,
                                  Airport:Airport,
                                  StartDate:StartDate,
                                  EndDate:EndDate,
                                  RequestDate:RequestDate,
                                  AssignmentDate:AssignmentDate,
                                  TrainingCertification:TrainingCertification,
                                  Actif:Actif
                                  
                                
                              })
        .then((data) => {
           this.clearForm();
           this.displayAlert('Success', 'The document ' + Name + ' was successfully updated');
           console.log("b");
        }).catch((error) => {
           this.displayAlert('Updating document failed', error.message);
           console.log("b");
        });
        
     }
     // Otherwise we are adding a new record
     else {
        // Call the DatabaseProvider service and pass/format the data for use
        // with the addDocument method
        this._DB.addDocument(this._COLL, {
          Name   		: Name,
          Surname  : Surname,
          Birth : Birth,
          ID:ID,
          University:University,
          Class:Class,
          Airport:Airport,
          StartDate:StartDate,
          EndDate:EndDate,
          RequestDate:RequestDate,
          AssignmentDate:AssignmentDate,
          TrainingCertification:TrainingCertification,
          Actif:Actif
                          })
        .then((data) => {
           this.clearForm();
           this.displayAlert('Record added', 'The document ' +  Name + ' was successfully added');
        }).catch((error) => {
           this.displayAlert('Adding document failed', error.message);
        });
     }
  }
  
  displayAlert(title : string, message : string) : void {
     let alert    : any = this._ALERT.create({
        title     : title,
        subTitle  : message,
        buttons   : ['Got it!']
     });
     alert.present();
  }
  
  clearForm() : void {
     this.Name 			= '';
     this.Surname	= '';
     this.ID;
   }

}

  


