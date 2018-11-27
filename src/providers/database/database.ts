import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Items } from '../../app/Model/user';

// We MUST import both the firebase AND firestore modules like so
import * as firebase from 'firebase';
import 'firebase/firestore';

@Injectable()
export class DatabaseProvider {
  
  private _DB : any;

  constructor(public http: HttpClient) {    
    this._DB = firebase.firestore();
  }

createAndPopulateDocument(collectionObj : string, docID : string, dataObj : Items) : Promise<Items[]> {  
  return new Promise((resolve, reject) =>  {    
    this._DB.collection(collectionObj).doc(docID).set(dataObj, { merge: true }).then((data : any) => {
      resolve(data);
    }).catch((error : any) => {
      reject(error);
    });
  });
}


getDocuments(collectionObj : string) : Promise<Items[]> {
    return new Promise((resolve, reject) => {
       this._DB.collection(collectionObj).orderBy('Name').get().then((querySnapshot) => {            
          let obj : any = [];
          querySnapshot.forEach((doc : any) => {
              obj.push({
                 id             : doc.id,
                       Name     : doc.data().Name,
                Surname    : doc.data().Surname,
                   Birth : doc.data().Birth,
                   ID : doc.data().ID,
                   University : doc.data().University,
                   Class : doc.data().Class,
                   Airport : doc.data().Airport,
                   StartDate : doc.data().StartDate,
                    EndDate: doc.data().EndDate,
                    RequestDate: doc.data().RequestDate,
                    AssignmentDate: doc.data().AssignmentDate,
                    TrainingCertification  : doc.data().TrainingCertification,
                    Actif :doc.data().Actif 
              });
          });
          resolve(obj);
       }).catch((error : any) => {
          reject(error);
       });
    });
 }
 
 
 getDocuments1(collectionObj : string) : Promise<Items[]> {
  return new Promise((resolve, reject) => {
     this._DB.collection(collectionObj).where('city',"==",'London').get().then((querySnapshot) => {            
        let obj : any = [];
        querySnapshot.forEach((doc : any) => {
            obj.push({
               id             : doc.id,
               city           : doc.data().city,
               population     : doc.data().population,
               established    : doc.data().established
            });
        });
        resolve(obj);
     }).catch((error : any) => {
        reject(error);
     });
  });
}




 getDocumentsParams(collectionObj : string, Airport:string) : Promise<Items[]> {
  return new Promise((resolve, reject) => {
     this._DB.collection(collectionObj).where('Airport', '==', Airport).get().then((querySnapshot) => {            
        let obj : any = [];
        querySnapshot.forEach((doc : any) => {
            obj.push({
              id             : doc.id,
                       Name     : doc.data().Name,
                Surname    : doc.data().Surname,
                   Birth : doc.data().Birth,
                   ID : doc.data().ID,
                   University : doc.data().University,
                   Class : doc.data().Class,
                   Airport : doc.data().Airport,
                   StartDate : doc.data().StartDate,
                    EndDate: doc.data().EndDate,
                    RequestDate: doc.data().RequestDate,
                    AssignmentDate: doc.data().AssignmentDate,
                    TrainingCertification  : doc.data().TrainingCertification,
                    Actif :doc.data().Actif 
            });
        });
        resolve(obj);
     }).catch((error : any) => {
        reject(error);
     });
  });
}

getDocumentsParamsDate(collectionObj : string, d:Date,d1:Date) : Promise<Items[]> {
  return new Promise((resolve, reject) => {
     this._DB.collection(collectionObj).where('StartDate',"<",'2018-08-01').where('EndDate',">",'2018-08-30').get().then((querySnapshot) => {            
        let obj : any = [];
        querySnapshot.forEach((doc : any) => {
            obj.push({
              id             : doc.id,
                  Name     : doc.data().Name,
                  Surname    : doc.data().Surname,
                   Birth : doc.data().Birth,
                   ID : doc.data().ID,
                   University : doc.data().University,
                   Class : doc.data().Class,
                   Airport : doc.data().Airport,
                   StartDate : doc.data().StartDate,
                    EndDate: doc.data().EndDate,
                    RequestDate: doc.data().RequestDate,
                    AssignmentDate: doc.data().AssignmentDate,
                    TrainingCertification  : doc.data().TrainingCertification,
                    Actif :doc.data().Actif 
            });
        });
        resolve(obj);
     }).catch((error : any) => {
        reject(error);
     });
  });
}

getuni(collectionObj : string) : Promise<Items[]> {
  return new Promise((resolve, reject) => {
     this._DB.collection(collectionObj).get().then((querySnapshot) => {            
        let obj : any = [];
        querySnapshot.forEach((doc : any) => {
            obj.push({
               id             : doc.id,
               university     : doc.data().university
            });
        });
        resolve(obj);
     }).catch((error : any) => {
        reject(error);
     });
  });
}



addDocument(collectionObj : string, dataObj : Items) : Promise<Items[]> {
      return new Promise((resolve, reject) => {
         this._DB.collection(collectionObj).add(dataObj).then((obj : any) => {
            resolve(obj);
         }).catch((error : any) => {
            reject(error);
         });
      });
   }
  
deleteDocument(collectionObj : string, docID : string) : Promise<Items> {
      return new Promise((resolve, reject) => {
         this._DB.collection(collectionObj).doc(docID).delete().then((obj : Items) => {
            resolve(obj);
         }).catch((error : any) => {
            reject(error);
         });
      });
   }
  
updateDocument(collectionObj : string, docID : string, dataObj : Items) : Promise<Items> {
      return new Promise((resolve, reject) => {
         this._DB.collection(collectionObj).doc(docID).update(dataObj).then((obj : Items) => {
            resolve(obj);
         }).catch((error : any) => {
            reject(error);
         });
      });
   }

}
