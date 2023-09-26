import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
interface RegisterResponse {
  chatid: string; 
  user:string
}
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  apiURL: string = "https://master.spicaengine.com/api";
  authIdentityId: string | undefined;
  isAuth: any;
  email='';
  psw='';

  constructor(private http: HttpClient) {
    this.isAuth = new BehaviorSubject(false);
  }
  
  handleRegister() {
    console.log("AAAAAAAAAAAA")
    console.log(this.email)
    return this.http.post<RegisterResponse>(`${this.apiURL}/fn-execute/reggisterr`, {identifier: this.email, password: this.psw}).subscribe(response => {
      
      console.log('Response:', response['user']);
      localStorage.setItem('chatId', response['chatid']);
      localStorage.setItem('user', response['user']);
    }, error => {
      console.error('Error:', error);
    });
  }

  
}
