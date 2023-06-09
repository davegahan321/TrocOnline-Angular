import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ItemsService } from 'src/app/shared/services/items.service';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css']
})
export class EditItemComponent implements OnInit {
  form!: FormGroup;
  formdata: any;
  constructor(private router: ActivatedRoute,private itemService: ItemsService,private http: HttpClient) { }
  
  

  ngOnInit(): void {
    console.log(this.router.snapshot.params['id']);
    this.itemService.getItemId(this.router.snapshot.params['id']).subscribe(
      (data)=>{
        this.formdata = data;
      }
    )

    // this,this.itemService.getItemId(this.router.snapshot.params['id']).subscribe(data =>{
    //   this.form.patchValue({
        

    //   })
    // })

    // this.itemService.getItemId(this.router.snapshot.params['id']).subscribe((result:any)=>{
    //   console.log(result);
    //   this.form.patchValue({
    //     name: result.name,
    //     value: result.value,
    //     description: result.description
    //   })
    // });
  }
  onSubmit(f: NgForm) {
    const EditItemObserver = {

      next : (x: any) => console.log('Item Updated !!'),
      error : (err: any) => console.log(err)
      
    };
    let itemId=Number(this.router.snapshot.params['id'])
    this.itemService.updateItem(itemId,f.value).subscribe(EditItemObserver);

}




}
