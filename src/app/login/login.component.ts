import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  isAuth: any;
  apiURL: string = 'https://master.spicaengine.com/api';
  email: string = '';
  pw: string = '';
  response: Observable<any> | Subscription | undefined;

  constructor(private http: HttpClient) {
    this.isAuth = new BehaviorSubject(false);
  }

  handleLogin() {
    let res = this.login(this.email, this.pw);
    if (res) {
      console.log('Logged in');
      alert('Logged in');
    } else {
      console.log('Not logged in');
      alert('Wrong password or eamil');
    }
  }

  login(email: string, pw: string): boolean {
    this.response = this.http
      .get(
        `${this.apiURL}/passport/identify?password=${pw}&identifier=${email}`
      )
      .subscribe(
        (response) => {
          console.log('Response:', response);
          return true;
        },
        (error) => {
          console.error('Error:', error);
          return false;
        }
      );
    console.log(this.response);
    return true;
  }
}
