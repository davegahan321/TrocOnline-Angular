import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemsObject } from 'src/app/models/ItemModel';
import { RiverComponent } from 'src/app/pages/river/river.component';
import { ItemsService } from '../../services/items.service';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
  changeDetection :ChangeDetectionStrategy.OnPush
})
export class CardComponent {

  constructor(private http: HttpClient,private router : Router,private actRouter :ActivatedRoute,private itemService: ItemsService) { }
 
  @Input() Items! : ItemsObject
  ItemsUrl= "https://localhost:44330/api/Items/";
  imageurl!:string 
  

  IsinInventory(){
    return this.router.url.includes('inventory');
  }

  EditItem(model:any){
    var ItemId= this.Items.id;
    return this.http.post(this.ItemsUrl +ItemId,model);

  }

  goToItemEdit(){
    var ItemId= this.Items.id;
    this.router.navigate(['/edit-item/',ItemId]).then(()=>window.location.reload());
  }

  

  

}
