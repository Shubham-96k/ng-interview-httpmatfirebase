import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Ipost } from '../../models/ipost';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PostformComponent } from '../postform/postform.component';
import { PostService } from '../../services/post.service';
import { DeleteComponent } from '../delete/delete.component';
import { Subscription } from 'rxjs';
import { SnackbarService } from '../../services/snacbar.service';

@Component({
  selector: 'app-postcard',
  templateUrl: './postcard.component.html',
  styleUrls: ['./postcard.component.scss']
})
export class PostcardComponent implements OnInit{


  @Input() postobj !: Ipost;
  postsubscription !: Subscription;
  constructor(
    private _matdialog : MatDialog,
    private _pstsvc : PostService,
    private _snackbar : SnackbarService
  ) { }

  ngOnInit(): void {
    
  }

  onEditpost(){

    let dialogconf = new MatDialogConfig();
    dialogconf.width = '600px';
    dialogconf.data = this.postobj; //here with the help of dialogconfig we transfer data and need to get
    //this.data in form component and patch it

    const matdialogref = this._matdialog.open(PostformComponent, dialogconf)

    matdialogref.afterClosed()
      .subscribe(res => {
        this._pstsvc.sendupdatepost = res;
        
      })
  }

  onRemovePost(){
    let matdialg = this._matdialog.open(DeleteComponent);

    matdialg.afterClosed()
      .subscribe(res => {
        if(res){ //here we get data from delete component by dialogref
        this.postsubscription =  this._pstsvc.onRemovePost(this.postobj.id)
                                    .subscribe(res => {
                                      this._pstsvc.deletepost = this.postobj.id;
                                      this._snackbar.opensnackbar(`The post ${this.postobj.title} has removed successfully !!!`)
                                    })
        }
      })

  }

  // ngOnDestroy(): void {
  //   this.postsubscription.unsubscribe();
  // }

}
