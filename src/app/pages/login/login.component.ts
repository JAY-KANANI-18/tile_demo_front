import { Component, ElementRef, ViewChild } from '@angular/core';
import { Form, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PostsService } from 'src/app/services/login.service';
declare var google: any
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
  policy:boolean = false

  constructor(public loginService: PostsService, public router: Router,    private ngbService: NgbModal,
  ) { }

  ngOnInit() {


    google.accounts.id.initialize({
      client_id: '599245019741-mgja8rohs1jscc4ee1rjmmpq2mv4so9a.apps.googleusercontent.com',
      callback: (res: any) => {
    
      }
    });
    google.accounts.id.renderButton(
      document.getElementById("google-btn"),
      { locale: "en" }
    );
    // google.accounts.id.prompt();

    // google.accounts.id.renderButton(document.getElementById('google-btn'));


    // setTimeout(() => {
      
      this.signUpForm = new FormGroup({
        email: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, [Validators.required]),
      })
      this.loginForm = new FormGroup({
        email: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, [Validators.required]),
      })
    // }, 500);
      

    this.mainF();
  }

  getButtons(e: Event) {
    e.preventDefault();
    // Implement your getButtons logic here
  }

  changeForm() {

    this.loginForm?.reset()
    this.signUpForm?.reset()

    this.error1 = ''
    this.error2 = ''
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


    if (this.loginForm?.get('email')?.invalid) {
      return this.error1 = "please enter valid email"
    }
    if (this.loginForm?.invalid) {
      return this.error1 = "please enter required values"
    }


    this.loginService.login(this.loginForm.value).subscribe({
      next: (data: any) => {
       

        if (data.status) {
          this.loginForm?.reset()

          const token = localStorage.setItem("Token", (data.data.token).toString());
          const user = localStorage.setItem("User", (data.data.user).toString());

          this.router.navigate(["Home"])

        } else {
          this.error1 = data.msg

        }
      }, error: (error) => {
        console.log(error);

      }
    })




  }
  signUp(): any {
    this.error2 = ''
let policy = document.getElementById("policy") as HTMLInputElement
console.log(policy.checked);

  

    if (this.signUpForm.get('email')?.invalid) {
      return this.error2 = "please enter valid email"
    }
    if (this.signUpForm.invalid) {
      return this.error2 = "please enter required values"
    }
    if(!policy.checked){
      return this.error2 = "Accept privacy policy to moving forward"

    }


    this.loginService.signUp(this.signUpForm.value).subscribe({
      next: (data: any) => {

        if (data.status) {

          this.signUpForm?.reset()

          this.changeForm()
        } else {
          this.error2 = data.msg
        }

      }, error: (error) => {
        console.log(error);

      }
    })
  }
  privacyModel(content:any){
    this.ngbService.open(content,{size:"xl"})

  }
  isScrolledToBottom = false;

  handleScroll(event: Event) {
    const textarea = event.target as HTMLTextAreaElement;

    // Calculate the scroll position and dimensions
    const scrollHeight = textarea.scrollHeight;
    const clientHeight = textarea.clientHeight;
    const scrollTop = textarea.scrollTop;

    // Check if the scroll position is at the bottom
    this.isScrolledToBottom = scrollHeight - clientHeight <= scrollTop + 1;
  }
  submitPolicy(){
    this.policy = true
  }
}
