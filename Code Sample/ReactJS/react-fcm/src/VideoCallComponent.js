import React, { useEffect, useState, useRef } from 'react';
import { ConfigVideoCall } from './ConfigVideoCall';
import VideoCall from './assets/js/videocall/VideoCall';

var VideoCallSDK = VideoCall();

const VideoCallComponent = (props) => {
    useEffect(() => {
        VideoCallSDK.initConfig('call', ConfigVideoCall);
        VideoCallSDK.initVideoCall(
            window.JitsiMeetExternalAPI,
            localStorage.getItem('uuidAdmin').replace(/"/g, ''),
            '100%',
            590
        );
    }, []);

    return <div id="meet"></div>;
};

export default VideoCallComponent;
