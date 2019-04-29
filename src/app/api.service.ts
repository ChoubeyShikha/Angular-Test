import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() { }

  private itemList = new BehaviorSubject([]);
  itemsData = this.itemList.asObservable();

  setItemData(items: any) {
    this.itemList.next(items);
  }
}
