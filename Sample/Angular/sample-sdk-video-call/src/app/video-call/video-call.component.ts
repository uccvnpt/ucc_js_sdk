import { Component, OnInit } from '@angular/core';
import { ConfigVideoCall } from '../ConfigVideoCall';
import * as VideoCallSDK from 'video-call-js-sdk';

declare var JitsiMeetExternalAPI: any;

@Component({
    selector: 'app-video-call',
    templateUrl: './video-call.component.html',
    styleUrls: ['./video-call.component.css'],
})
export class VideoCallComponent implements OnInit {
    api: any;
    imageCapture: any;
    video;

    constructor() {}
    ngOnInit(): void {
        this.video = VideoCallSDK.initConfig('call', ConfigVideoCall);
        this.api = this.video.initVideoCall(
            JitsiMeetExternalAPI,
            localStorage.getItem('uuidAdmin').replace(/"/g, ''),
            '100%',
            590
        );
    }

    capture() {
        this.video.capture((base64) => {
            console.log(base64);
            this.imageCapture = base64;
        });
    }
}
