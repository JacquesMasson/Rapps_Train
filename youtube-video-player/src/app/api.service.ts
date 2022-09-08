import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  getList(){
    return this.http.get<Res>('http://localhost:8000/display');
  }

  postLink(link: string){
    return this.http.post('http://localhost:8000/add',link, {responseType: 'text'});
  }

  postBookLink(link: string){
    return this.http.post('http://localhost:8000/addBook',link, {responseType: 'text'});
  }

  onResearchButtonClick(){
    this.invokeHistoryFunction.emit();
  }

  sendLink(link: string){
    this.invokeBookFunction.emit(link);
  }
}
