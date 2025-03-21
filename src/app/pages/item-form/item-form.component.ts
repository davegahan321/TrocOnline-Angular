import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ItemsService } from 'src/app/shared/services/items.service';

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.css']
})
export class ItemFormComponent implements OnInit {
  selectedFile!: File;
  urlpath!:string
  constructor(private itemsservice :ItemsService,private firestorage: AngularFireStorage,private router:Router) { }


  ngOnInit(): void {
  }

  onFileSelected(event:any){
    this.selectedFile = event.target.files[0];
   
  }

  
  
  async uploadImage(){
    
    console.log(this.selectedFile);
    if(this.selectedFile){
      console.log(this.selectedFile);
      const path = 'images/'+this.selectedFile.name;
      const uploadTask = await this.firestorage.upload(path,this.selectedFile);
      const url = this.getImageUrl(path).subscribe();
      
       
       console.log(url);
       return url;
    }
    else return console.log('no file uploaded')
    
  }
  
  
  getImageUrl(imagepath:string):Observable<string>{
    const storageRef=this.firestorage.ref(imagepath);
    return storageRef.getDownloadURL();

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
        this.itemsservice.AddItem(f.value,imageurl).subscribe(AddItemObserver);
        this.router.navigate(['inventory']).then(()=>window.location.reload());
      }));
      
      
    }
    else return console.log('no file uploaded')

    
    const AddItemObserver = {

      next : (x: any) => console.log('Item Added !!'),
      error : (err: any) => console.log(err)
      
    };

       //this.itemsservice.AddItem(f.value,img).subscribe(AddItemObserver);

    
}

}
