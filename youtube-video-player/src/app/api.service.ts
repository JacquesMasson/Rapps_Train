import { HttpClient} from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Res } from 'response';
import { Subscription} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  invokeHistoryFunction= new EventEmitter;
  invokeBookFunction =new EventEmitter;
  subB!: Subscription;
  subH!: Subscription;
  constructor(private http: HttpClient) { }
  //DONE: avoir deux routes: getBookmarks et getHistory. Dans le cas présent c'est pas super important,
  //mais en général tes objets ne seront pas exactement les mêmes, et il vaut mieux séparer.
  //Avec des exceptions si on veut opti à fond mais c'est autre chose.
  getHistory(){
    return this.http.get<Res>('http://localhost:8000/displayHistory');
  }

  getBookmarks(){
    return this.http.get<Res>('http://localhost:8000/displayBookmaks');
  }

  postLink(link: string){
    return this.http.post('http://localhost:8000/addHistory',link, {responseType: 'text'});
  }

  postBookLink(link: { content: string }){
    return this.http.post('http://localhost:8000/addBook',link, {responseType: 'text'});
  }

  onResearchButtonClick(){
    this.invokeHistoryFunction.emit();
  }

  sendLink(link: string){
    this.invokeBookFunction.emit(link);
  }
}
