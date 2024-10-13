import { Injectable } from "@angular/core";
import { Socket } from "ngx-socket-io";
import { map } from "rxjs";
@Injectable({ providedIn: "root" })

export class SocketService {
    constructor(private socket: Socket) {
        console.log("SOCKET CONNECTING>>>");
        
        this.socket.connect((err)=>{
            if(err){
                console.log("SOCKET CON ERROR" + err);
                return
            }

        });
        this.socket.on("connect", () => {
            console.log("SOCKET CONNECTED");
        });

        // Handle connection errors
        this.socket.on("connect_error", (error: any) => {
            console.log("SOCKET CONNECTION ERROR:", error);
        });
     }


    sendMessage(msg: string) {
        this.socket.emit('message', msg);
    }

    getUploadStatus(userId:any){
        return this.socket.fromEvent(userId)
    }
}