import { ManageDocumentPage } from './../manage-document/manage-document';
import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

import { DatabaseProvider } from '../../providers/database/database';
import { Items } from '../../app/Model/user';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private _COLL : string = "stagiares";
  private _DOC 	: string = "Xy76Re34SdFR1";
  private _CONTENT : Items;
  public locations : any;
  public locations1 : any ; 
  

  city='';
  counter=0;
    Airport: any;
    d:Date;
    d1: any;
  constructor(public navCtrl: NavController, private _DB : DatabaseProvider, private _ALERT  : AlertController) {
    
  }

  ionViewDidEnter() {
      this.retrieveCollection();
     // this.retrieveCollection1();
  }

filterAirport(): void {
    this._DB.getDocumentsParams(this._COLL,	this.Airport).then((data : Items[]) => {
        this.locations = data;
        this.counter=data.length;
        console.log("bbbbbbbbbbbbbbb");
    }).catch((error : any) => {
       console.log('Error', error.message);
    });
 }
 
filterDate(): void {
    console.log(this.d);
    this._DB.getDocumentsParamsDate(this._COLL,	this.d, this.d1).then((data : Items[]) => {
        this.locations = data;
        
        console.log('pffffff');
        this.counter=data.length;
        console.log("bbbbbbbbbbbbbbb");
    }).catch((error : any) => {
       console.log('Error', error.message);
    });
 }

  generateCollectionAndDocument() : void {
      this._DB.createAndPopulateDocument(this._COLL, this._DOC, this._CONTENT).then((data : Items[]) => {
         console.dir(data);
         this.counter=data.length;
      }).catch((error : any) => {
         console.dir(error);
        });
  }
/*and(StartDate.getFullYear,'==',d.getFullYear)*/ 
  
   retrieveCollection() : void {
    this._DB.getDocuments(this._COLL).then((data) => {         
       if(data.length === 0) {
          this.generateCollectionAndDocument();
          console.log("bbb");
       }else {
          this.locations = data;
          this.counter=data.length;
          console.log("aaa",data[0]);
       }
    }).catch();
    
 }



 retrieveCollection1() : void {
    this._DB.getDocuments1(this._COLL).then((data) => {         
       if(data.length === 0) {
          this.generateCollectionAndDocument();
       }else {
          this.locations = data;
          this.counter=data.length;
       }
    }).catch();
    
 }




  addDocument() : void {      
      this.navCtrl.push(ManageDocumentPage);
      console.log("pushh");
   }

  updateDocument(obj) : void {
      let params : any = {
         collection   : this._COLL,
         location     : obj
      };      
      this.navCtrl.push(ManageDocumentPage, { record : params, isEdited : true });
   }

  deleteDocument(obj) : void {
      this._DB.deleteDocument(this._COLL,	obj.id).then((data : Items) => {
         this.displayAlert('Success', 'The record ' + obj.Name+obj.Surname + ' was successfully removed');
      }).catch((error : any) => {
         this.displayAlert('Error', error.message);
      });
   }

  displayAlert(title : string, message : string) : void {
        let alert : any = this._ALERT.create({
        title     : title,
        subTitle  : message,
        buttons   : [{
                      text      : 'Got It!',
                      handler   : () => {
                          this.retrieveCollection();
                      }
                    }]
        });
     alert.present();
  }

}
