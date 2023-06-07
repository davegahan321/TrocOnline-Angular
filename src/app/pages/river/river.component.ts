import { Component, OnInit } from '@angular/core';
import { Observable, observable } from 'rxjs';
import { ItemsObject } from 'src/app/models/ItemModel';
import { ItemsService } from 'src/app/shared/services/items.service';
@Component({
  selector: 'app-river',
  templateUrl: './river.component.html',
  styleUrls: ['./river.component.css']
})
export class RiverComponent implements OnInit {

  constructor(private itemService: ItemsService) { }
  items = new Observable<ItemsObject[]>();

  ngOnInit(): void {
    //this.itemService.getItems()
    //this.itemService.getAllItems();
    this.items = this.itemService.getAllSaledItems();
  }

}
