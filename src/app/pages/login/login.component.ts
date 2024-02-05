import { Component, ElementRef, ViewChild } from '@angular/core';
import { Form, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PostsService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  items: any = ["/assets/img/group-13.svg", "/assets/img/group-13.svg", "/assets/img/group-13.svg"]
  @ViewChild('switchCnt') switchCnt: ElementRef<any> | undefined;
  @ViewChild('containerA') containerA: ElementRef<any> | undefined;
  @ViewChild('containerB') containerB: ElementRef<any> | undefined;
  @ViewChild('switch1') switch1: ElementRef<any> | undefined;
  @ViewChild('switch2') switch2: ElementRef<any> | undefined;
  // @ViewChild('signUpForm') signUpForm: NgForm | undefined;

  isTxlA = false;
  isTxlB = true;
  isHiddenA = false;
  isHiddenB = true;
  error1: any = ""
  error2: any = ""
  signUpForm!: FormGroup
  loginForm!: FormGroup
  constructor(public loginService: PostsService,public router:Router) { }

  ngOnInit() {



    this.signUpForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
    })
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
    })


    this.mainF();
  }

  getButtons(e: Event) {
    e.preventDefault();
    // Implement your getButtons logic here
  }

  changeForm() {
    if (this.switchCnt) {
      this.switchCnt.nativeElement.classList.add('is-gx');

      setTimeout(() => {
        if (this.switchCnt) {
          this.switchCnt.nativeElement.classList.remove('is-gx');
        }
      }, 1500);
    }
    if (this.switchCnt) {

      this.switchCnt.nativeElement.classList.toggle('is-txr');
    }
    let switchCircle = document.querySelectorAll(".switch__circle");
    switchCircle[0].classList.toggle("is-txr");
    switchCircle[1].classList.toggle("is-txr")
    if (this.containerA) {
      this.containerA.nativeElement.classList.toggle("is-txl");
      this.containerB?.nativeElement.classList.toggle("is-txl");
      this.containerB?.nativeElement.classList.toggle("is-z200");

    }


    this.switch1?.nativeElement.classList.toggle("is-hidden");
    this.switch2?.nativeElement.classList.toggle("is-hidden");

    this.isTxlA = !this.isTxlA;
    this.isTxlB = !this.isTxlB;
    this.isHiddenA = !this.isHiddenA;
    this.isHiddenB = !this.isHiddenB;
  }

  mainF() {
    // Implement your mainF logic here
  }
  login(): any {
    this.error1 = ''


    if (this.loginForm.get('email')?.invalid) {
      return this.error1 = "please enter valid email"
    }
    if (this.loginForm.invalid) {
      return this.error1 = "please enter required values"
    }


    this.loginService.login(this.loginForm.value).subscribe({
      next: (data: any) => {
        console.log(data);
        console.log(data.status);

        if (data.status) {
          console.log("login Successfully");

          const token = localStorage.setItem("Token", (data.data.token).toString());

          this.router.navigate(["home"])

        }else{
          this.error1 = data.msg

        }
      }, error: (error) => {
        console.log(error);

      }
    })


    console.log("logedas in", this.loginForm.value);


  }
  signUp(): any {
    this.error2 = ''

    console.log('kkkkkk');


    if (this.signUpForm.get('email')?.invalid) {
      return this.error1 = "please enter valid email"
    }
    if (this.signUpForm.invalid) {
      return this.error1 = "please enter required values"
    }


    this.loginService.signUp(this.signUpForm.value).subscribe({
      next: (data: any) => {
        this.changeForm()

      }, error: (error) => {
        console.log(error);

      }
    })
  }
}
