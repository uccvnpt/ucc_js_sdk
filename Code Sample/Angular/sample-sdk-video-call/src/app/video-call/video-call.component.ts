import { Component, OnInit } from '@angular/core';
import { ConfigVideoCall } from '../ConfigVideoCall';

declare var JitsiMeetExternalAPI: any;
declare function VideoCall(): any;
const VideoCallSDK = VideoCall();

@Component({
    selector: 'app-video-call',
    templateUrl: './video-call.component.html',
    styleUrls: ['./video-call.component.css'],
})
export class VideoCallComponent implements OnInit {
    api: any;
    imageCapture: any;

    constructor() {}
    ngOnInit(): void {
        VideoCallSDK.initConfig('call', ConfigVideoCall);
        this.api = VideoCallSDK.initVideoCall(
            JitsiMeetExternalAPI,
            localStorage.getItem('uuidAdmin').replace(/"/g, ''),
            '100%',
            590
        );
    }

    capture() {
        VideoCallSDK.capture((base64) => {
            console.log(base64);
            this.imageCapture = base64;
        });
    }
}
