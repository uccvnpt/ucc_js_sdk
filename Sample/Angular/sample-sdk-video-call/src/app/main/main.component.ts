import { Component, OnInit, OnDestroy } from '@angular/core';
import { ConfigVideoCall } from '../ConfigVideoCall';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import * as StompJS from 'stompjs';
import * as VideoCallSDK from 'video-call-js-sdk-v3';

declare var JitsiMeetExternalAPI: any;

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit, OnDestroy {
    name: string;
    urlVideo: SafeResourceUrl;
    uuidAdmin: string;
    uuidUser: string;
    video;
    urlComponentCall = 'call';

    constructor(public sanitizer: DomSanitizer) {}

    ngOnInit() {
        window.onbeforeunload = () => {
            this.ngOnDestroy();
        };
        this.video = VideoCallSDK.initConfig(
            this.urlComponentCall,
            ConfigVideoCall
        );

        this.uuidAdmin = localStorage.getItem('uuidAdmin')
            ? localStorage.getItem('uuidAdmin').replace(/"/g, '')
            : this.video.createUUID();
        this.uuidUser = localStorage.getItem('uuidUser')
            ? localStorage.getItem('uuidUser').replace(/"/g, '')
            : this.video.createUUID();

        this.video.initSocket(
            StompJS,
            this.uuidAdmin,
            (success) => {
                console.log(success);
            },
            (event) => {
                console.log(event);
                if (event.title === 'ACCEPTED' && !this.urlComponentCall) {
                    this.video.initVideoCall(
                        JitsiMeetExternalAPI,
                        this.uuidAdmin,
                        '100%',
                        590
                    );
                }
            },
            true
        );
    }

    ngOnDestroy() {
        this.video.disconnectSocket();
    }

    async loginAs(role) {
        alert('login as ' + role);
        if (role === 'admin') {
            const res = await this.video.registerDevice(
                this.uuidAdmin,
                'admin'
            );
            console.log(res);
        }
    }

    async callVideo() {
        const callerIdDest = this.uuidUser;
        const additionalData = {
            caller: 'smcs',
        };
        const res = await this.video.createCall(
            this.uuidAdmin,
            'admin',
            callerIdDest,
            ConfigVideoCall.token_id_app,
            additionalData
        );
        if (res.message === 'IDG-00000000' && !this.urlComponentCall) {
            this.video.initVideoCall(
                JitsiMeetExternalAPI,
                this.uuidAdmin,
                '100%',
                590
            );
        }
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
        const res = await this.video.removeDevice(this.uuidAdmin);
        console.log('remove', res);
    }

    async getFile() {
        const res = await this.video.getFile(null);
        if (res.object.url) {
            this.urlVideo = this.sanitizer.bypassSecurityTrustResourceUrl(
                res.object.url
            );
        }
        console.log('resssss', res);
    }

    createUUID() {
        this.video.createUUID();
    }
}
