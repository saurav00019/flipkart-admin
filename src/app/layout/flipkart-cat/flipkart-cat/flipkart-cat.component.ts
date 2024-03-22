import { Component, NgModuleRef, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'flipkart-cat',
  templateUrl: './flipkart-cat.component.html',
  styleUrls: ['./flipkart-cat.component.css']
})
export class FlipkartCatComponent implements OnInit {

  addCategoryForm!: FormGroup

  // addCategoryForm = new FormGroup({
  //   email: new FormControl('', [Validators.required, Validators.email]),
  //   password: new FormControl('', [Validators.required, Validators.minLength(8)])
  // })

  submitted: boolean= false

  constructor(private api: ApiService, private modalService: NgbModal,private fb: FormBuilder,
    private toster: ToastrService) { }

  ngOnInit(): void {
    this.getCategory() 

    this.addCategoryForm= this.fb.group({
      category: ['', Validators.required],
      name: ['', Validators.required],
      type: ['', Validators.required],
      image: ['', Validators.required],
    })
  }

  closeResult: any

  openSm(content: any) {
    this.addCategoryForm.reset()
		this.modalService.open(content, { size: 'lg' });
	}

  closeMd(content: any) {
    this.modalService.dismissAll(content)
  }

  // =============================================================== get category ========================================================

  categoryList: any
  getCategory() {
    this.api.get("getAllcategory").subscribe({next: (res: any)=>{
      this.categoryList= res.response.reverse()
      console.log("here is all category", this.categoryList);
      
    }, error: (err: any) =>{
      console.log("something went wrong", err);
      
    }})
  }

  // =============================================================== add category ============================================================

  addCategoty() {
    this.submitted= true
    if (this.addCategoryForm.invalid) {
      this.toster.error("Form invalid")
      return
    }
    let categoryData= this.addCategoryForm.value
    categoryData.image= this.image

    this.api.post("addCategory", categoryData).subscribe({next: (res: any) =>{
      console.log("here add category res", res);
      this.getCategory()
      this.closeMd("close")

      
    }, error: (err: any) =>{
      this.toster.error(err)
    }})
  }


  // ============================================================== block unblock ctaegory ================================================

  category: any
  categoryId: any
  getId(id: any, ev: any) {
    this.categoryId= id
    this.category= ev
    this.blockUnblock()
    console.log("here is category id", this.categoryId);
    console.log("here is evnet for category", this.category.target.checked);
    
    
  }

  blockUnblock() {
    let data ={
      _id: this.categoryId,
      is_blocked: this.category.target.checked == true ? "1" : "0"
    }
    this.api.post("blockUnblockCategory", data).subscribe({next: (res: any) =>{
      console.log("here is res", res);
      this.toster.success(res.message)
      
    }, error: (err: any) =>{
      this.toster.error(err)
    }})
 
  }


  // ====================================================================== delete category =======================================================

  get: any
  delId: any
  getdelId(id: any) {
    this.delId= id
    // this.delteCategory()
    console.log("here is delete id", this.delId);
  }

  delteCategory(val: any){
    let data={
      "_id": val
    }
    this.api.post("deleteCategory", data).subscribe({next: (res: any) =>{
      console.log("res from delete api", res);
      this.getCategory()
      this.toster.success(res.message)
    }, error: (err: any)=>{
      this.toster.error("Something went wrong", err)
    }})
  }

  // multiple1: any= []
  uploadProfileImage: any
image: any
  onFileSelected(ev: any) {
    console.log("slected file evenet", ev);
//     if (ev.target.files.length > 0) {
// const file= ev.target.files[0].name
// // this.previewImage(file)
// console.log("here is image", this.image);

//     }

  // this.multiple1 = [];
  var multipleFiles = ev.target.files;
  this.uploadProfileImage = ev.target.files[0];
  if (multipleFiles) {
    for (var file of multipleFiles) {
      var multipleReader = new FileReader();
      multipleReader.onload = (e: any) => {
        // if (type == 0) {
          this.image = e.target.result;
        // }
        // console.log(this.profile_image);
      };
      multipleReader.readAsDataURL(file);
    }
  }

    
  }

  // previewImage(file: File) {
  //   const reader= new FileReader()
  //   console.log("her is image reader", reader);
    
  //   reader.readAsDataURL(file)
  //   // reader.onload= () =>{
  //   //   this.image=reader.result
  //   //   console.log("here is image>>>>>>>>>>>>>>", this.image);
      
  //   // }

  //   reader.onload = ((e: any) => {
  //     this.image = e.target['result'];
  //   });
  // }

}
