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

  /**
   * This function retrieves an array of Item objects from the API by the users' ID stored in sessionStorage.
   * @returns an observable with the array.
   */
  public getItemsById(): Observable<Item[]>{
    const url = environment.apiUrl + "/items/" + sessionStorage.getItem("id")
    return this.http.get<Item[]>(url);
  }

  /**
   * This function adds an item to the items list by making a POST request to the specified url with the item data.
   * @param item
   * @returns an observable of the added item
   */
  public addItem(item: Item): Observable<Item> {
    const url = environment.apiUrl + "/items/add" + "/" + sessionStorage.getItem("id");
    return this.http.post<Item>(url, item);
  }

  /**
   * This function deletes an item from the environment based on its ID.
   * @param item 
   * @returns an observable containing the deleted item
   */
  public deleteItem(item: Item): Observable<Item> {
    console.log(item);
    const url = environment.apiUrl + "/items/delete" + "/" + item.id;
    return this.http.delete<Item>(url)
    
  }

}
