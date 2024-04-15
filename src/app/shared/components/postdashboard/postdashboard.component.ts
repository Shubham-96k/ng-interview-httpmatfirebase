import { Component, OnDestroy, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Subscription } from 'rxjs';
import { Ipost } from '../../models/ipost';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PostformComponent } from '../postform/postform.component';

@Component({
  selector: 'app-postdashboard',
  templateUrl: './postdashboard.component.html',
  styleUrls: ['./postdashboard.component.scss']
})
export class PostdashboardComponent implements OnInit, OnDestroy {

  postsubscription !: Subscription;
  postarr !: Array<Ipost>;
  constructor(
    private _postsvc : PostService,
    private _dialog : MatDialog
  ) { }

  ngOnInit(): void {
   this.getallpost();
   this.getupdatepost();
    this.removepost();
  }

  getallpost(){
    this.postsubscription = this._postsvc.fetchAllposts()
      .subscribe(res => {
        this.postarr = res
      })
  }

  onaddpost(){
    let dialogconf = new MatDialogConfig; // to modify/customise dialog box
    dialogconf.width = '600px'

    const dialogref = this._dialog.open(PostformComponent, dialogconf);
    //here we store _dialog in declaration for purpose to transfer/get data from one component 
    //to another component which is given by dialog

    dialogref.afterClosed() 
      .subscribe(res => {
        this.postarr.unshift(res);
      })
    
    //afterclose method>> when dialog closed with the help of matdialogref we can get data which
    //is transfered from there if there is no dialog with the help of subject we can transfer.

    
  }


  getupdatepost(){
   this.postsubscription =  this._postsvc.updatepostobservable$
            .subscribe(res => {
              let getindex = this.postarr.findIndex(ele => ele.id === res.id);
              this.postarr[getindex] = res;
            })
  }


  removepost(){
    this.postsubscription = this._postsvc.deletepostobservable$
                                    .subscribe(res => {
                                      this.postarr.splice(this.postarr.findIndex(ele => ele.id === res), 1)
                                    })
  }





  ngOnDestroy(): void {
    this.postsubscription.unsubscribe();
  }



}
