import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormBuilder, FormControl, FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ItemsService } from 'src/app/shared/services/items.service';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css']
})
export class EditItemComponent implements OnInit {
  form!: FormGroup;
  formdata: any;
  selectedFile!: File;
  constructor(private router: ActivatedRoute,private itemService: ItemsService,private http: HttpClient,private firestorage: AngularFireStorage) { }
  
  getImageUrl(imagepath:string):Observable<string>{
    const storageRef=this.firestorage.ref(imagepath);
    return storageRef.getDownloadURL();

  }

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

    console.log(this.selectedFile);
    if(this.selectedFile){
      console.log(this.selectedFile);
      const path = 'images/'+this.selectedFile.name;
      this.firestorage.upload(path,this.selectedFile);
      this.getImageUrl(path).subscribe((imageurl=>{
        const url ={
          imageurl:imageurl
        }
        let itemId=Number(this.router.snapshot.params['id'])
        this.itemService.updateItem(itemId,f.value,imageurl).subscribe(EditItemObserver);
      }));
      
       //const url = (await (await uploadTask).ref.getDownloadURL()).toString()
    }
    const EditItemObserver = {

      next : (x: any) => console.log('Item Updated !!'),
      error : (err: any) => console.log(err)
      
    };

  
    //let itemId=Number(this.router.snapshot.params['id'])
   // this.itemService.updateItem(itemId,f.value).subscribe(EditItemObserver);

}

onFileSelected(event:any){
  this.selectedFile = event.target.files[0];
}

onDelete(){

  const DeleteItemObserver = {

    next : (x: any) => console.log('Item Deleted !!'),
    error : (err: any) => console.log(err)
    
  };

  let itemId=this.router.snapshot.params['id'];
  console.log(itemId);
  return this.itemService.deleteItem(itemId).subscribe(DeleteItemObserver);
}


}
