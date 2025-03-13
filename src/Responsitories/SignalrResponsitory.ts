/* eslint-disable @typescript-eslint/no-explicit-any */
import * as signalR from "@microsoft/signalr";

class SignalRService {
    private connection: signalR.HubConnection;

    constructor() {
        this.connection = new signalR.HubConnectionBuilder()
            .withUrl("http://localhost:5255/orderHub") // API SignalR
            .withAutomaticReconnect()
            .build();
    }

    async startConnection() {
        if(this.connection.state !== signalR.HubConnectionState.Disconnected){
            console.warn("SignalR đã kết nối hoặc đang kết nối, không cần start lại.");
            return;
        }
        try {
            await this.connection.start();
            console.log("Kết nối SignalR thành công!");
        } catch (error) {
            console.error("Lỗi kết nối SignalR:", error);
            setTimeout(() => this.startConnection(), 5000);
        }
    }

    stopConnection() {
        this.connection.stop();
    }

    listenForNotifications(callback: (data: any) => void) {
        this.connection.on("ReceiveOrder", callback);
    }

    removeListener() {
        this.connection.off("ReceiveOrder");
    }
}

export const signalRService = new SignalRService();
