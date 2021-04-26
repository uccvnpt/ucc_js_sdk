import { Component, OnInit } from '@angular/core';
import { ConfigVideoCall } from '../ConfigVideoCall';

declare var JitsiMeetExternalAPI: any;
declare function VideoCall(): any;
const VideoCallSDK = VideoCall();
const uuidAdmin = '9ec4f876-2fb4-4abc-8e2f-5a14caaa20c6';

@Component({
    selector: 'app-video-call',
    templateUrl: './video-call.component.html',
    styleUrls: ['./video-call.component.css'],
})
export class VideoCallComponent implements OnInit {
    api: any;
    constructor() {}
    ngOnInit(): void {
        VideoCallSDK.initConfig('call', ConfigVideoCall);
        VideoCallSDK.initVideoCall(
            JitsiMeetExternalAPI,
            localStorage.getItem('uuidAdmin').replace(/"/g, ''),
            '100%',
            590
        );
    }
}
