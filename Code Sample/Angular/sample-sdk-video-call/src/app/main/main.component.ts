import { Component, AfterViewInit, OnInit, OnDestroy } from '@angular/core';
import { ConfigVideoCall } from '../ConfigVideoCall';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import * as StompJS from 'stompjs';

declare function VideoCall(): any;

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit, OnDestroy {
    VideoCallSDK = VideoCall();
    stompClient: any;
    subscription;
    message;
    name: string;
    urlVideo: SafeResourceUrl;

    uuidAdmin: string = localStorage.getItem('uuidAdmin')
        ? localStorage.getItem('uuidAdmin').replace(/"/g, '')
        : this.VideoCallSDK.createUUID();
    uuidUser: string = localStorage.getItem('uuidUser')
        ? localStorage.getItem('uuidUser').replace(/"/g, '')
        : this.VideoCallSDK.createUUID();

    constructor(public sanitizer: DomSanitizer) {}

    ngOnInit() {
        this.VideoCallSDK.initConfig('call', ConfigVideoCall);
        this.VideoCallSDK.initSocket(StompJS, this.uuidAdmin);
    }

    ngOnDestroy() {
        this.VideoCallSDK.disconnectSocket();
    }

    async loginAs(role) {
        alert('login as ' + role);
        if (role === 'admin') {
            const res = await this.VideoCallSDK.registerDevice(
                this.uuidAdmin,
                this.uuidAdmin,
                'admin'
            );
            console.log(res);
        }
    }

    async callVideo() {
        const receiverCallers = [this.uuidUser];
        const res = await this.VideoCallSDK.createCall(
            this.uuidAdmin,
            'admin',
            receiverCallers
        );
        console.log('res from app', res);
    }

    setUUID(uuid, type) {
        if (type === 'admin')
            localStorage.setItem('uuidAdmin', JSON.stringify(uuid));
        else localStorage.setItem('uuidUser', JSON.stringify(uuid));
        alert(uuid);
    }

    async logout() {
        console.log('logout');
        const res = await this.VideoCallSDK.removeDevice(this.uuidAdmin);
        console.log('remove', res);
    }

    async getFile() {
        const res = await this.VideoCallSDK.getFile(null);
        if (res.object.url) {
            this.urlVideo = this.sanitizer.bypassSecurityTrustResourceUrl(
                res.object.url
            );
        }
        console.log('resssss', res);
    }

    createUUID() {
        this.VideoCallSDK.createUUID();
    }
}
