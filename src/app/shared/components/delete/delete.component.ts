import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit {

  constructor(
    private _matdialogref : MatDialogRef<DeleteComponent>
  ) { }

  ngOnInit(): void {

  }

  onconfirm(){
    this._matdialogref.close(true);
  }


  notconfirm(){
    this._matdialogref.close(false);
  }
}
