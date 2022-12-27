import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Item } from '../models/item';
;


@Injectable({
  providedIn: 'root'
})
export class ItemService {


  constructor(private http: HttpClient) { }

  public getItemsById(): Observable<Item[]>{
    const url = environment.apiUrl + "/items/" + sessionStorage.getItem("id")
    return this.http.get<Item[]>(url);
  }

  public addItem(item: Item): Observable<Item> {
    const url = environment.apiUrl + "/items/add" + "/" + sessionStorage.getItem("id");
    return this.http.post<Item>(url, item);
  }

  public deleteItem(item: Item): Observable<Item> {
    console.log(item);
    const url = environment.apiUrl + "/items/delete" + "/" + item.id;
    return this.http.delete<Item>(url)
    
  }

}
