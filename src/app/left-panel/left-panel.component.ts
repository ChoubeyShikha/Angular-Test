import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { DatePipe } from '@angular/common';
import { Key } from 'protractor';

@Component({
  selector: 'app-left-panel',
  templateUrl: './left-panel.component.html',
  styleUrls: ['./left-panel.component.css']
})
export class LeftPanelComponent implements OnInit {

  addedItem: any = [];
  subTotal: any;
  subQuantity: any;
  subTotalPrice: number = 0;
  totalQuantity: number = 0;
  vatPrice: number = 0;
  discountPrice: number = 0;
  totalItemPrice: number = 0;
  showRecieptBox: boolean = false;
  currentDate: any;

  constructor(private apiSrv: ApiService, private datePipe: DatePipe) {
    
  }

  ngOnInit() {
    this.apiSrv.itemsData.subscribe(response => {
      this.addedItem = response;
      this.subTotal = [];
      this.subQuantity = [];
      this.addedItem.forEach(element => {
        this.subTotal.push(element.price * element.quantity);
        this.subQuantity.push(element.quantity);
      });

      this.getTotalPrice();
    });
  }

  onClickClose(item, index) {
    this.addedItem.splice(index,1);
    this.apiSrv.setItemData(this.addedItem);
  }

  getSum(total, num) {
    return total + num;
  }

  getTotalPrice() {
    this.subTotalPrice = this.addedItem.length === 0 ? 0 : this.subTotal.reduce(this.getSum);
    this.totalQuantity = this.addedItem.length === 0 ? 0 : this.subQuantity.reduce(this.getSum);
    this.vatPrice = this.addedItem.length === 0 ? 0 : (this.subTotalPrice * 10) / 100;
    this.discountPrice = this.addedItem.length === 0 ? 0 : (this.subTotalPrice * 10) / 100;
    this.totalItemPrice = this.addedItem.length === 0 ? 0 : (this.subTotalPrice + this.vatPrice) - this.discountPrice;
  }

  onClickCancel() {
    this.addedItem.length=0;
    this.apiSrv.setItemData(this.addedItem);
  }

  onClickProcess() {
    if(this.addedItem.length !== 0){
      this.showRecieptBox = true;
    }
    let date = new Date();
    this.currentDate = this.datePipe.transform(date, "MMM d, y, h:mm:ss a");
  }

  clickClose() {
    this.showRecieptBox = false;
  }

  decreaseQuantity(item, index) {
    if(item.quantity === 1) {
      this.addedItem.splice(index,1);
    } else {
      item.quantity = item.quantity - 1;
    }
    this.apiSrv.setItemData(this.addedItem);
  }

  increaseQuantity(item) {
    item.quantity = item.quantity + 1;
    this.apiSrv.setItemData(this.addedItem);
  }

}
