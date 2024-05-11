import { Injectable } from "@angular/core";
import { Socket } from "ngx-socket-io";
import { map } from "rxjs";
@Injectable({ providedIn: "root" })

export class SocketService {
    constructor(private socket: Socket) {
        this.socket.connect();
     }


    sendMessage(msg: string) {
        this.socket.emit('message', msg);
    }
    getMessage(userId:any) {
        return this.socket.fromEvent(userId)
    }
}