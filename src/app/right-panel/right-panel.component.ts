import { Component, OnInit } from '@angular/core';
import { Items } from '../items';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-right-panel',
  templateUrl: './right-panel.component.html',
  styleUrls: ['./right-panel.component.css']
})
export class RightPanelComponent implements OnInit {

  items: any = [];
  addedItems: any = [];

  constructor(private apiSrv: ApiService) { }

  ngOnInit() {
    this.items = Items.prototype.getItemsData();
    // console.log(Items.prototype.getItemsData());
  }

  onClickImage(item) {
    if(this.addedItems.includes(item)) {
      item.quantity = item.quantity + 1;
    } else {
      this.addedItems.push(item);
    }
    this.apiSrv.setItemData(this.addedItems);
  }
}
