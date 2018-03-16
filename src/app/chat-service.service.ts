import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ChatServiceService {

    private url = 'http://localhost:8081';
    private socket;

    constructor() {
        this.socket = io(this.url);
    }
    public sendMessage(message) {

        this.socket.emit('new-message', message);
        console.log("sent");
    }

    public getMessages = () =>
    {
        return Observable.create((observer) => {
            this.socket.on('new-message', (message) => {
                observer.next(message);
            });
        });
    }

}
