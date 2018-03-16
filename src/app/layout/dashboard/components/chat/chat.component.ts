import { Component, OnInit } from '@angular/core';
import  {ChatServiceService} from '../../../../chat-service.service';
import {forEach} from "@angular/router/src/utils/collection";



@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
    private msg:string="";
    private name:string="";
    private open:boolean=false;
    private arr: Array<{name: string, text: string,min:number}> = [];

    increaseTime()
    {
        for(let i=0;i<this.arr.length;i++)
         this.arr[i]['min']++;
    }
    constructor(public chatService:ChatServiceService ) {}
    ngOnInit() {
        this.chatService
            .getMessages()
            .subscribe((message: string) => {
                let x = message.split("*");
                message="";
                for (let i=1;i<x.length;i++) {
                    message += x[i];
                    if(!(i==1&&i==x.length-1)&&i!=x.length-1)message+='*';
                }
                this.arr.push({name:x[0],text:message,min:0});
            });

        setInterval(() => {
            this.increaseTime();
            },60000);

    }
    send()
    {
      this.chatService.sendMessage(this.name+"*"+this.msg);
        this.arr.push({name:'me',text:this.msg,min:0});
      this.msg="";

    }
    toggleOpen()
    {
        this.open=!this.open;
        console.log(this.open);
    }

}
