import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PostService } from '../../services/post.service';
import { Subscription } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from '../../services/snacbar.service';
import { Ipost } from '../../models/ipost';

@Component({
  selector: 'app-postform',
  templateUrl: './postform.component.html',
  styleUrls: ['./postform.component.scss']
})
export class PostformComponent implements OnInit, OnDestroy {


  postsubscription !: Subscription;
  postform !: FormGroup;
  postobj !: Ipost;
  isinEditMode : boolean = false;
  
  
  constructor(
    private _pstsvc : PostService,
    private _snackbar : SnackbarService,
    @Inject(MAT_DIALOG_DATA) postdata : any,
    private _matdialogref : MatDialogRef<PostformComponent>
  ) {
    
    this.onCreateform();
    
    if(postdata){
      this.postobj = postdata;
      this.postform.patchValue(this.postobj);
      this.isinEditMode = true;
    }else{
      this.isinEditMode = false;
    }
    
   }

  ngOnInit(): void {
    
    
  }

  onCreateform(){
    this.postform = new FormGroup({
      title : new FormControl(null, Validators.required),
      body : new FormControl(null, Validators.required),
      userId : new FormControl(null, Validators.required),
    })
  }

  onAddPost(){
    if(this.postform.valid){
      let newpost = this.postform.value;
      
     this.postsubscription = this._pstsvc.addnewpost(newpost)
        .subscribe(res => {
          newpost.id = res.name; 
          this.postform.reset();
          this._matdialogref.close(newpost);
          this._snackbar.opensnackbar(`The Post ${newpost.title} is added successfully !!!`)
          
          
          
          //added id geting from response in newpost
          // we need to send data through subject if there is no dialog
          //with the help of dialog we can send data from one component to another
        })
    }
  }

  onUpdatepost(){
    if(this.postform.valid){
      let updtdobj = {...this.postform.value, id : this.postobj.id};


      this.postsubscription = this._pstsvc.updatepost(updtdobj)
                                  .subscribe(res => {
                                    this.postform.reset();
                                    // this._pstsvc.sendupdatepost = res;
                                    this._matdialogref.close(res);
                                    this._snackbar.opensnackbar(`The Post ${updtdobj.title} is updated Successfully !!!`)
                                  })
    }
  }





  ngOnDestroy(): void {
    this.postsubscription.unsubscribe()
  }

}
