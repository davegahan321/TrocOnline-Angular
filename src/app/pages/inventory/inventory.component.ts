import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ItemsObject } from 'src/app/models/ItemModel';
import { PlayerObject } from 'src/app/models/PlayerModel';
import { ItemsService } from 'src/app/shared/services/items.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

  //editForm: FormGroup[] =[];
  constructor(private itemService: ItemsService, private router : Router) { }
  
  items = new Observable<ItemsObject[]>();
  ngOnInit(): void {
    this.items=this.itemService.getInventoryItems();
    
  }

  goToItemForm(){
    this.router.navigate(['item-form']).then(()=>window.location.reload());
  }

  
  
}
