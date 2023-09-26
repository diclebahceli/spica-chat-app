import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


interface Message {
  chatid: string,
  user:string,
  date:Date,
  content:string

}

interface Res {
  contentArray:[],
  senderid:[]
  

}

@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.scss']
})
export class ChatboxComponent {
texts: string = ''; // Property to store the typed message
  messages: string[] = [];
  apiURL: string = "https://master.spicaengine.com/api";
  contents: any;
  userid:any
   constructor(private http: HttpClient) {
  }

  // async showMessages(): Promise<string[]> {
  //   let chatid = localStorage.getItem('chatId');
  //   let user = localStorage.getItem('user');
  //   let res = await this.http.get<Res>(`${this.apiURL}/fn-execute/show?sender=${user}&chatid=${chatid}`).toPromise();
  //   console.log('Response:', res);
  //   return res.contentArray;
  // }

  async ngOnInit() {
      let chatid = localStorage.getItem('chatId');
    let user = localStorage.getItem('user');
    
    let res = this.getData<Res>(user,chatid).subscribe((response) => {
      console.log('Response:', response['senderid']);
      this.contents = response['contentArray'];
      this.userid = response['senderid'];
      console.log(this.contents);
      console.log(this.userid);
      return response['contentArray'];
    }
    );
    console.log(res+ "res");
  }
  
  // async showMessages(){
  //   let chatid = localStorage.getItem('chatId');
  //   let user = localStorage.getItem('user');
  //    let res = this.http.get<Res>(`${this.apiURL}/fn-execute/show?sender=${user}&chatid=${chatid}`).subscribe((response) => {
  //      console.log('Response:', response['contentArray']);
  //      return response['contentArray'];
  //    }, error => {
  //      console.error('Error:', error);
  //      return error;
  //    });
  //   console.log(res + "res");
  //   return "ASDAS";
     
  // }
 
  getData<T>(user: any, chatid: any): Observable<T> {
    return this.http.get(`${this.apiURL}/fn-execute/show?sender=${user}&chatid=${chatid}`) as Observable<T>;
}

  async handleMessage() {
  let chatid = localStorage.getItem('chatId');
  let user = localStorage.getItem('user');
  console.log(chatid+ 'chatid');
  console.log(user);

  if (this.texts.trim() !== '') { // Check if the message is not empty
    this.messages.push(this.texts); 

    

    this.http.post<Message>(`${this.apiURL}/fn-execute/send`, {senderid:user, sentdate:Date.UTC,  content:this.texts,  chtid:chatid, }).subscribe((response) => {
      console.log('Response:', response['chatid']);
      localStorage.setItem('chatId', response['chatid']);
      localStorage.setItem('user', response['user']);
    }, error => {
      console.error('Error:', error);
    });

    this.texts = ''; 
  }

  
}
}