import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/api.service';
import { EncryptService } from 'src/app/service/encrypt.service';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup
  submitted: boolean= false

  constructor(private fb: FormBuilder, private toster: ToastrService,
     private api: ApiService, private router: Router, private encrypt: EncryptService) { }

  ngOnInit(): void {
    this.loginForm= this.fb.group({
      email: ["", Validators.required],
      password: ["", Validators.required ]
    })
  }

  secretKey: any= 123
  login() {
    this.submitted= true
    if (this.loginForm.invalid) {
      console.log("invalid form");
      this.toster.error("Please enter correcty credential")
      return ;
    } 
    // let encryptPass= this.encrypt.encryptData(this.loginForm.value.password.trim(), this.secretKey)
    
    let encryptPass = CryptoJS?.AES?.encrypt(this.loginForm.value.email, this.loginForm.value.password).toString();
    console.log("encrypt data", encryptPass);

    // let decryptpass= this.encrypt.decryptData(encryptPass.trim(), this.secretKey)
    let decryptpass = CryptoJS.AES.decrypt(encryptPass, this.loginForm.value.password).toString(CryptoJS.enc.Utf8);
    console.log("here is decryptPass", decryptpass);
    
    
    let loginData= this.loginForm.value
    // loginData.password= encryptPass

    this.api.post("login", loginData).subscribe({next: (res: any) =>{
      console.log("here login api res", res);
      if (res.status == true) {
      
      localStorage.setItem("Flipkart", JSON.stringify(res))
      this.router.navigateByUrl('/flipkart-cat')
      this.toster.success(res.message)
      }
      else { (res.status == false) 
        console.log("here is status code", res.message);
        
        // this.toster.error(res.message)
      }
    }, error: (err: any)=>{
      this.toster.error("credentials not matched")
    }})

  }

}
