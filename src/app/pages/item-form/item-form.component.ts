import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ItemsService } from 'src/app/shared/services/items.service';

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.css']
})
export class ItemFormComponent implements OnInit {

  constructor(private itemsservice :ItemsService) { }

  ngOnInit(): void {
  }

  onSubmit(f: NgForm) {
    const AddItemObserver = {

      next : (x: any) => console.log('Item Added !!'),
      error : (err: any) => console.log(err)
      
    };
    this.itemsservice.AddItem(f.value).subscribe(AddItemObserver);
}

}
