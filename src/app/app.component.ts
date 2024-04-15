import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoaderService } from './shared/services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'myproject';

  isLoading !: boolean;

  constructor(
    private _loader : LoaderService
  ){

  }

  ngOnInit(): void {
     this._loader.loadingspiner$
                        .subscribe(res => {
                          this.isLoading = res;
                        })
  }

  
  ngOnDestroy(): void {
    this._loader.loadingspiner$.unsubscribe()
  }
}
