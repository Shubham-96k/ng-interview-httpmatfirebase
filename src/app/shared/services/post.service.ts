import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Ipost, Ires } from '../models/ipost';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  postUrl : string = `${environment.baseUrl}/posts.json`


  private updatepostsub$ : Subject<Ipost> = new Subject();
  updatepostobservable$ : Observable<Ipost> = this.updatepostsub$.asObservable()
  // here subject used as observable to get data only.

  private deletepostsub$ : Subject<string>= new Subject();
  deletepostobservable$ : Observable<string> = this.deletepostsub$.asObservable()


  constructor(
    private _http : HttpClient
  ) { }

  set sendupdatepost(post : Ipost){
    this.updatepostsub$.next(post);
  }

  set deletepost(id : string){
    this.deletepostsub$.next(id);
  }

  fetchAllposts() : Observable<Array<Ipost>>{
    return this._http.get<Array<Ipost>>(this.postUrl)
      .pipe(
        map((res : any) => {
          let postArr : Array<Ipost> = [];
          for (const key in res) {
            postArr.unshift({...res[key], id : key})
          }
          return postArr
        })
      )
  }

  addnewpost(post : Ipost): Observable<any>{
    return this._http.post<Ipost>(this.postUrl, post);
  }

  updatepost(updtdobj : Ipost): Observable<Ipost>{
    let updturl = `${environment.baseUrl}/posts/${updtdobj.id}.json`;
    return this._http.patch<Ipost>(updturl, updtdobj);
  }

  onRemovePost(id : string): Observable<null>{
    let deleteUrl = `${environment.baseUrl}/posts/${id}.json`;
    return this._http.delete<null>(deleteUrl);
  }
  
}
