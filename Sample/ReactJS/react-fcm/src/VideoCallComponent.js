import React, { useEffect, useState, useRef } from 'react';
import { ConfigVideoCall } from './ConfigVideoCall';
import * as VideoCall from 'video-call-js-sdk';

const VideoCallComponent = (props) => {
    const video = VideoCall.initConfig('call', ConfigVideoCall);
    const [imageCapture, setImageCapture] = useState(null);

    useEffect(() => {
        video.initVideoCall(
            window.JitsiMeetExternalAPI,
            localStorage.getItem('uuidAdmin').replace(/"/g, ''),
            '100%',
            590
        );
    }, []);

    function capture() {
        video.capture((base64) => {
            console.log(base64);
            setImageCapture(base64);
        });
    }
    return (
        <div>
            <div id="meet"></div>
            <button
                width="100%"
                class="btn btn-primary d-inline-flex"
                onClick={() => capture()}
            >
                Chụp màn hình
            </button>
            <div class="images mt-2">
                <div>
                    <img src={imageCapture} width="100%" alt="" />
                </div>
            </div>
        </div>
    );
};

export default VideoCallComponent;
