/* eslint-disable  */
(function () {
    let VideoCall,
        Fetch,
        Popup,
        VideoCallSDK,
        handleMsg,
        token,
        video,
        returnImage;
    const dev_url = 'https://api.idg.vnpt.vn/';
    // const dev_url = 'https://explorer.idg.vnpt.vn/';
    const API_ROUTER = dev_url + 'router-service/api/';
    const UUID = 'uuid';
    const ROOM_INFO = 'roomInfo';
    const PENDING = 'PENDING';
    const ACCEPTED = 'ACCEPTED';
    const REJECTED = 'REJECTED';
    const FINISHED = 'FINISHED';
    const TIMEOUT = 'TIMEOUT';
    const DENIED = 'DENIED';
    const LEAVE = 'LEAVE';
    const CONNECTED = 'CONNECTED';
    const DISCONNECTED = 'DISCONNECTED';
    const errorCode = {
        'IDG-00000000': 'Thành công! - IDG-00000000',
        'IDG-20000001': 'Not null! - IDG-20000001',
        'IDG-20000004': 'Kích thước từ 0-255! - IDG-20000004',
        'IDG-20000003': 'Kích thước từ 0-4000! - IDG-20000003',
        'IDG-20000005': 'Kích thước từ 0-300! - IDG-20000005',
        'IDG-20000006': 'Không thuộc định dạng devicetype! - IDG-20000006',
        'IDG-20000007': 'Không thuộc định dạng statuscaller! - IDG-20000007',
        'IDG-20000008': 'Không thuộc kiểu enum môi trường! - IDG-20000008',
        'IDG-20000100': 'Không tìm thấy thiết bị người nhận! - IDG-20000100',
        'IDG-20000201': 'Cuộc gọi đang thực hiện! - IDG-20000201',
        'IDG-20000202': 'Không tìm thấy cuộc gọi! - IDG-20000202',
        'IDG-20000203': 'Người nhận đang trong cuộc gọi khác! - IDG-20000203',
        'IDG-20000101': 'Thiết bị người nhận và người gọi là 1! - IDG-20000101',
        'IDG-20000210': 'Không tìm thấy host! - IDG-20000210',
        'IDG-20000404': 'Không tìm thấy token! - IDG-20000404',
        'IDG-20000211': 'Không tìm thấy room! - IDG-20000211',
        'IDG-20000213': 'Không phải thiết bị nguồn! - IDG-20000213',
        'IDG-20000214': 'Không phải thiết bị đích! - IDG_20000214',
        'IDG-20000215': 'Không tồn tại cấu hình của token! - IDG_20000215',
        'IDG-20000216': 'Đã có lỗi xảy ra! - IDG-20000216',
        'IDG-20000217':
            'Số lương thiết bị đăng ký vượt quá số lượng cho phép - IDG-20000217',
        'IDG-20000218': 'Thông tin người nhận không hợp lệ - IDG-20000218',
        'IDG-20000219':
            'Không tìm thấy người gọi, nhận trong cuộc gọi - IDG-20000219',
        'IDG-20000220': 'Người nhận và người gọi là một người - IDG-20000220',
        'IDG-20000420': 'Cuộc gọi đã kết thúc - IDG-20000420',
        'IDG-20000421': 'Cuộc gọi bị từ chối - IDG-20000421',
        'IDG-20000330': 'Có lỗi xảy ra khi lấy file ghi âm - IDG-20000330',
        'IDG-20000331': 'Người gọi không có quyền truy cập file - IDG-20000331',
        'IDG-20000232': 'Cuộc gọi không có chế độ ghi âm, hình - IDG-20000332',
        'IDG-20003001': 'Lỗi socket time out - IDG-20000216',
        'IDG-20003002': 'Vui lòng kiểm tra kết nối mạng - IDG-20003002',
        'IDG-20003003':
            'Lỗi kết nối: không kết nối được máy chủ! - IDG-20003003',
        'IDG-20003004': 'Lỗi kết nối: quá thời gian hồi đáp! - IDG-20003004',
        'IDG-20003005': 'Lỗi socket với message chi tiết - IDG-20003005',
        'IDG-20003006':
            'Lỗi không xác định với message chi tiết - IDG-20003006',
        'IDG-20002400': 'Token đã bị khoá',
        'IDG-20002401': 'Bạn không có quyền truy cập',
        'IDG-20002402': 'Quá số lượng cuộc gọi đồng thời cho phép',
        'IDG-20002403': 'Quá thời lượng cuộc gọi cho phép',
    };
    window.addEventListener('message', function (event) {
        if (event.data.id == 'capture') {
            if (returnImage) {
                returnImage(event.data.data);
            }
        }
    });
    Popup = (function () {
        const initRating =
            `<div class="modalSDK" id="ratingModal" tabindex="-1" role="dialog">` +
            `       <div class="modalContentSDK">` +
            `           <div class="modalBodySDK">` +
            `               <div id="review-form-container"> ` +
            `                   <div id="review-form">` +
            `                       <label>Đánh giá chất lượng cuộc gọi</label>` +
            `                       <div class="fieldset"> ` +
            `                           <div class="star-rating">` +
            `                               <input ` +
            `                                   type="radio"` +
            `                                   name="rating"` +
            `                                   value="1"` +
            `                               /><i></i>` +
            `                               <input` +
            `                                   type="radio"` +
            `                                   name="rating"` +
            `                                   value="2" ` +
            `                               /><i></i>` +
            `                               <input` +
            `                                   type="radio"` +
            `                                   name="rating"` +
            `                                   value="3"` +
            `                               /><i></i>` +
            `                               <input` +
            `                                   type="radio"` +
            `                                   name="rating"` +
            `                                   value="4"` +
            `                               /><i></i>` +
            `                               <input` +
            `                                   type="radio"` +
            `                                   name="rating"` +
            `                                   value="5"` +
            `                               /><i></i>` +
            `                           </div>` +
            `                       </div>` +
            `                       <textarea id="reviewComments" placeholder="Đánh giá chất lượng cuộc gọi" id="reviewComments" cols="20" rows="5"></textarea>` +
            `                       <div class="fieldset right">` +
            `                           <button id="closeRatingButton" class="btn btn-outline-danger" data-dismiss="modal">Hủy</button>` +
            `                           <button id="ratingButton" class="btn btn-outline-primary" data-dismiss="modal">Gửi</button>` +
            `                       </div>` +
            `                   </div>` +
            `               </div>` +
            `           </div>` +
            `       </div>` +
            `</div>`;

        const receivingCalling =
            `<div class="modalSDK" id="receivingCalling">` +
            `       <div class="modalContentSDK">` +
            `           <div class="modalBodySDK">` +
            `               <div class="col-12 mb-2 text-center">` +
            `                   <span>Bạn có một cuộc gọi video từ admin hệ thống, Bạn có muốn nhận cuộc gọi ngay lúc này?</span>` +
            `               </div>` +
            `               <div class="row justify-content-center mx-2">` +
            `                   <button id="acceptCall" type="button" class="btnSDK btnOutlinePrimarySDK mr-2" > Đồng ý</button>` +
            `                   <button id="rejectCall" type="button" class="btnSDK btnOutlineDangerSDK" data-dismiss="modal"> Hủy</button>` +
            `                   </div>` +
            `               </div>` +
            `           </div>` +
            `       </div>` +
            `</div>`;

        const msgModal =
            `<div class="modalSDK" id="msgModal" tabindex="-1" role="dialog">` +
            `       <div class="modalContentSDK">` +
            `           <div class="modalBodySDK">` +
            `               <div class="col-12 mb-2 text-center">` +
            `                  <i id="iconMsg" class="fas fa-exclamation-circle" style="color:red;font-size: 44px;"></i>` +
            `               </div>` +
            `               <div class="col-12 mb-2 text-center">` +
            `                   <span ><b id="errMsg"></b></span>` +
            `               </div>` +
            `               <div class="row justify-content-center mx-2">` +
            `                   <button id="closeBtn" type="button" class="btnSDK btnOutlinePrimarySDK" data-dismiss="modal"> Đóng</button>` +
            `                   </div>` +
            `               </div>` +
            `           </div>` +
            `       </div>` +
            `</div>`;

        function Popup() {}

        Popup.prototype.initRatingModal = function (uuidCustomer) {
            const rootElement = document.getElementById('root');
            let point;
            let reviewContent;
            if (rootElement) {
                rootElement.insertAdjacentHTML('afterbegin', initRating);
            } else {
                document.body.insertAdjacentHTML('afterbegin', initRating);
            }
            const radios = document.querySelectorAll(
                'input[type=radio][name="rating"]'
            );
            const reviewValue = document.getElementById('reviewComments');
            const form = document.getElementById('review-form');
            const modal = document.getElementById('ratingModal');
            const closeButton = document.getElementById('closeRatingButton');
            const ratingButton = document.getElementById('ratingButton');

            function changeHandler(event) {
                point = this.value;
            }

            function changeHandlerComment(event) {
                reviewContent = this.value;
            }

            reviewValue.addEventListener('change', changeHandlerComment);

            Array.prototype.forEach.call(radios, function (radio) {
                radio.addEventListener('change', changeHandler);
            });

            closeButton.onclick = function () {
                modal.remove();
                // modal.style.display = 'none';
            };
            ratingButton.onclick = function () {
                if (point || reviewContent) {
                    video.submitRating(uuidCustomer, point, reviewContent);
                }
                modal.remove();
            };
            modal.style.display = 'block';
        };

        Popup.prototype.initReceivingModal = function (uuidUser, data) {
            const rootElement = document.getElementById('root');
            if (rootElement) {
                rootElement.insertAdjacentHTML('afterbegin', receivingCalling);
            } else {
                document.body.insertAdjacentHTML(
                    'afterbegin',
                    receivingCalling
                );
            }

            const receiving = document.getElementById('receivingCalling');
            const accept = document.getElementById('acceptCall');
            const rejectBtn = document.getElementById('rejectCall');

            accept.onclick = function () {
                if (video.status === CONNECTED) {
                    video.acceptCall(uuidUser);
                    receiving.remove();
                } else {
                    handleMsg(
                        '',
                        '',
                        'Đang kết nối lại, vui lòng chờ trong giây lát',
                        ''
                    );
                }
            };
            rejectBtn.onclick = function () {
                if (video.status === CONNECTED) {
                    video.rejectCall(uuidUser);
                    receiving.remove();
                } else {
                    handleMsg(
                        '',
                        '',
                        'Đang kết nối lại, vui lòng chờ trong giây lát',
                        ''
                    );
                }
            };
            receiving.style.display = 'block';
        };

        Popup.prototype.openMsgModal = function (type, message) {
            try {
                const rootElement = document.getElementById('root');
                if (rootElement) {
                    rootElement.insertAdjacentHTML('afterbegin', msgModal);
                } else {
                    document.body.insertAdjacentHTML('afterbegin', msgModal);
                }

                const msg = document.getElementById('errMsg');

                const iconMsg = document.getElementById('iconMsg');

                if (type === 'error' && iconMsg) {
                    iconMsg.className = 'fas fa-exclamation-circle';
                    iconMsg.style.color = 'red';
                } else {
                    iconMsg.className = 'fas fa-check-circle';
                    iconMsg.style.color = 'green';
                }

                msg.innerText = message ? message : '';
                const close = document.getElementById('closeBtn');
                const modalMSG = document.getElementById('msgModal');

                modalMSG.style.display = 'block';
                close.onclick = function () {
                    modalMSG.remove();
                };
            } catch (e) {
                console.log(e);
            }
        };

        return Popup;
    })();

    Fetch = (function () {
        function Fetch(url, body, config) {
            this.url = url;
            this.body = body;
            this.config = config;
        }

        Fetch.prototype.post = async function () {
            try {
                if (!token) {
                    await this.getAuthen();
                }
                const response = await fetch(this.url, {
                    method: 'POST',
                    mode: 'cors',
                    cache: 'no-cache',
                    credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8',
                        'Token-id': this.config.token_id,
                        'Token-key': this.config.token_key,
                        'mac-address': 'WEB-001',
                        Authorization: token,
                    },
                    redirect: 'follow',
                    referrerPolicy: 'no-referrer',
                    body: JSON.stringify(this.body),
                });
                if (response.ok) {
                    return response.json();
                }
                const error = await response.text();
                throw JSON.parse(error);
            } catch (error) {
                if (error && error.error === 'invalid_token') {
                    await this.getAuthen();
                    return this.post();
                }
                console.log(error);
                handleMsg(error, error.message, null, 'error');
                return error;
            }
        };

        Fetch.prototype.get = async function () {
            try {
                if (!token) {
                    await this.getAuthen();
                }
                const response = await fetch(this.url, {
                    method: 'GET',
                    mode: 'cors',
                    cache: 'no-cache',
                    credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8',
                        'Token-id': this.config.token_id,
                        'Token-key': this.config.token_key,
                        'mac-address': 'WEB-001',
                        Authorization: token,
                    },
                    redirect: 'follow',
                    referrerPolicy: 'no-referrer',
                });
                if (response.ok) {
                    return response.json();
                }
                const error = await response.text();
                throw JSON.parse(error);
            } catch (error) {
                if (error && error.error === 'invalid_token') {
                    await this.getAuthen();
                    return this.get();
                }
                // handleMsg(error, error.message, null, 'error');
                return error;
            }
        };

        Fetch.prototype.delete = async function () {
            try {
                if (!token) {
                    await this.getAuthen();
                }
                const response = await fetch(this.url, {
                    method: 'DELETE',
                    mode: 'cors',
                    cache: 'no-cache',
                    credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8',
                        'Token-id': this.config.token_id,
                        'Token-key': this.config.token_key,
                        'mac-address': 'WEB-001',
                        Authorization: token,
                    },
                    redirect: 'follow',
                    referrerPolicy: 'no-referrer',
                    body: JSON.stringify(this.body),
                });
                if (response.ok) {
                    return response.json();
                }
                const error = await response.text();
                throw JSON.parse(error);
            } catch (error) {
                if (error && error.error === 'invalid_token') {
                    await this.getAuthen();
                    return this.delete();
                }
                handleMsg(error, error.message, null, 'error');
                return error;
            }
        };

        Fetch.prototype.postDataForAuthentication = async function (
            url,
            param,
            config
        ) {
            try {
                const response = await fetch(url, {
                    method: 'POST',
                    mode: 'cors',
                    cache: 'no-cache',
                    credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    redirect: 'follow',
                    referrerPolicy: 'no-referrer',
                    body: JSON.stringify(param),
                });
                return response.json();
            } catch (e) {
                return e;
            }
        };

        Fetch.prototype.getAuthen = async function () {
            const param = {
                client_id: this.config.client_id,
                client_secret: this.config.client_secret,
                grant_type: 'client_credentials',
            };
            const res = await this.postDataForAuthentication(
                dev_url + 'auth-service/oauth/token',
                param,
                this.config
            );
            if (res.access_token) {
                token = 'Bearer ' + res.access_token;
            }
            return res.access_token;
        };
        return Fetch;
    })();

    // Video call sdk
    VideoCall = (function () {
        let getUUID,
            setItem,
            getItem,
            stompClient,
            hideModal,
            hideNoti,
            stopTimeout;
        let timeout = null;
        let audio = null;

        function VideoCall(url, config) {
            this.config = config;
            this.windowCall = null;
            this.pageShow = false;
            this.url = url;
            this.status = 'DISCONNECTED';
            this.api = null;
            this.timeoutRingtone = null;
        }

        VideoCall.prototype.registerDevice = async function (
            uuidCustomer,
            personName
        ) {
            const body = {
                deviceId: getUUID(),
                deviceToken: uuidCustomer,
                deviceTypeId: 'WEB',
                idgTokenId: this.config.token_id,
                lastDate: new Date(),
                personIdApp: uuidCustomer,
                personName: personName,
                topicUsing: this.getTopicUsing(uuidCustomer),
            };
            return await new Fetch(
                API_ROUTER + 'v2/register-device',
                body,
                this.config
            ).post();
        };

        VideoCall.prototype.createCall = async function (
            callerId,
            callerName,
            reciverCallers,
            additionalData
        ) {
            try {
                if (this.status === DISCONNECTED) {
                    throw 'Chưa kết nối socket, vui lòng thử lại sau!';
                }
                const body = {
                    callerId: callerId,
                    callerName: callerName,
                    deviceId: getUUID(),
                    idgTokenId: this.config.token_id,
                    reciverCallers: reciverCallers,
                    additionalData: additionalData,
                    version: '2.0.10',
                };
                const res = await new Fetch(
                    API_ROUTER + 'v2/create-call',
                    body,
                    this.config
                ).post();
                if (res.message === 'IDG-00000000') {
                    setItem(ROOM_INFO, {
                        roomId: res.object.roomId,
                        token: res.object.token,
                        domain: res.object.domain,
                        caller: callerName,
                        additionalData: additionalData,
                        version: '2.0.10',
                    });
                    if (this.url) {
                        this.openWindowCall(callerId);
                    }
                    // this.setTimeoutEndcall(callerId);
                    return res;
                }
                return res;
            } catch (e) {
                if (e) {
                    handleMsg('', '', e, 'error');
                } else {
                    handleMsg('', '', 'Đã có lỗi xảy ra', 'error');
                }
                return e;
            }
        };

        VideoCall.prototype.acceptCall = async function (callerId) {
            try {
                this.stopRingtone();
                const roomInfo = JSON.parse(getItem(ROOM_INFO));
                const paramv2 = {
                    callerId: callerId,
                    deviceId: getUUID(),
                    idgTokenId: this.config.token_id,
                    roomId: roomInfo.roomId,
                };
                const res = await new Fetch(
                    API_ROUTER + 'v2/accept-call',
                    paramv2,
                    this.config
                ).post();
                if (res.message === 'IDG-00000000') {
                    if (this.url) {
                        this.openWindowCall(callerId);
                    }
                    return res;
                }
                return res;
            } catch (e) {
                console.log(e);
                handleMsg('', '', 'Đã có lỗi xảy ra', 'error');
            }
        };

        VideoCall.prototype.endCall = async function (callerId) {
            hideModal();
            stopTimeout();
            // this.removeIframe();
            const roomInfo = JSON.parse(getItem(ROOM_INFO));
            let res;
            if (roomInfo) {
                const param = {
                    callerId: callerId,
                    deviceId: getUUID(),
                    idgTokenId: this.config.token_id,
                    roomId: roomInfo.roomId,
                };
                res = await new Fetch(
                    API_ROUTER + 'v2/end-call',
                    param,
                    this.config
                ).post();
            }
            return res;
        };

        VideoCall.prototype.rejectCall = async function (callerId) {
            stopTimeout();
            this.stopRingtone();
            const roomInfo = JSON.parse(getItem(ROOM_INFO));
            const paramv2 = {
                callerId: callerId,
                deviceId: getUUID(),
                idgTokenId: this.config.token_id,
                roomId: roomInfo.roomId,
            };
            return await new Fetch(
                API_ROUTER + 'v2/reject-call',
                paramv2,
                this.config
            ).post();
        };

        VideoCall.prototype.removeCall = async function (callerId) {
            const roomInfo = JSON.parse(getItem(ROOM_INFO));
            const param = {
                callerId: callerId,
                idgTokenId: this.config.token_id,
                roomId: roomInfo.roomId,
            };
            return await new Fetch(
                API_ROUTER + 'v2/remove-call',
                param,
                this.config
            ).post();
        };

        VideoCall.prototype.removeDevice = async function (personIdApp) {
            const param = {
                deviceId: getUUID(),
                idgTokenId: this.config.token_id,
                personIdApp: personIdApp,
                deviceTypeId: 'WEB',
            };
            localStorage.removeItem(ROOM_INFO);
            return await new Fetch(
                API_ROUTER + 'v2/remove-device',
                param,
                this.config
            ).delete();
        };

        VideoCall.prototype.getFile = async function (id) {
            try {
                const roomInfo = JSON.parse(getItem(ROOM_INFO));
                const roomId = id ? id : roomInfo.roomId;
                return await new Fetch(
                    API_ROUTER + 'v2/external/get-file?roomId=' + roomId,
                    '',
                    this.config
                ).get();
            } catch (e) {
                console.log(e);
                handleMsg('', '', 'Đã có lỗi xảy ra', 'error');
            }
        };

        VideoCall.prototype.submitRating = async function (
            callerId,
            callQuality,
            callComment
        ) {
            const roomInfo = JSON.parse(getItem(ROOM_INFO));
            let res;
            if (roomInfo) {
                const param = {
                    callComment: callComment,
                    callQuality: callQuality,
                    callerId: callerId,
                    deviceId: getUUID(),
                    idgTokenId: this.config.token_id,
                    roomId: roomInfo.roomId,
                };
                res = await new Fetch(
                    API_ROUTER + 'v2/external/rating',
                    param,
                    this.config
                ).post();
            }
            return res;
        };

        VideoCall.prototype.setTimeoutEndcall = function (callerId) {
            var _this = this;
            timeout = setTimeout(function () {
                console.log('The call is timeout');
                _this.endCall(callerId);
                _this.windowCall && _this.windowCall.close();
            }, 70000);
        };

        VideoCall.prototype.openWindowCall = function (callerId) {
            try {
                var _this = this;
                hideModal();
                const dualScreenLeft =
                    window.screenLeft !== undefined
                        ? window.screenLeft
                        : window.screenX;
                const dualScreenTop =
                    window.screenTop !== undefined
                        ? window.screenTop
                        : window.screenY;

                const width = window.innerWidth
                    ? window.innerWidth
                    : document.documentElement.clientWidth
                    ? document.documentElement.clientWidth
                    : window.screen.width;
                const height = window.innerHeight
                    ? window.innerHeight
                    : document.documentElement.clientHeight
                    ? document.documentElement.clientHeight
                    : window.screen.height;

                const systemZoom = width / window.screen.availWidth;
                const left = (width - 980) / 2 / systemZoom + dualScreenLeft;
                const top = (height - 500) / 2 / systemZoom + dualScreenTop;

                this.windowCall = window.open(
                    this.url,
                    'videocall',
                    `width=1280,height=600,top=${top},left=${left},menubar=yes,location=yes,resizable=yes,scrollbars=yes,status=yesnp`
                );
                window.addEventListener('offline', function () {
                    _this.windowCall.close();
                });

                if (!this.windowCall) {
                    throw '404-window';
                }
                this.windowCall.onpageshow = (event) => {
                    this.pageShow = true;
                };

                this.windowCall.onpagehide = (event) => {
                    if (this.pageShow) {
                        this.endCall(callerId);
                        this.pageShow = false;
                    }
                };
            } catch (e) {
                if (e === '404-window') {
                    handleMsg(
                        '',
                        '',
                        'Vui lòng cho phép Pop-ups bật để thực hiện cuộc gọi ',
                        ''
                    );
                    this.endCall(callerId);
                }
            }
        };

        VideoCall.prototype.handleReceivingMessage = function (
            uuidCustomer,
            message
        ) {
            switch (message['title']) {
                case ACCEPTED:
                    console.log('ACCEPTED');
                    stopTimeout();
                    return;
                case PENDING:
                    console.log('PENDING');
                    hideNoti();
                    setItem(ROOM_INFO, {
                        roomId: message.roomId,
                        token: message.token,
                        domain: message.domain,
                    });
                    this.startRingtone();
                    new Popup().initReceivingModal(uuidCustomer, message);
                    // this.setTimeoutEndcall(uuidCustomer);
                    return;
                case REJECTED:
                    console.log('REJECTED');
                    stopTimeout();
                    // this.removeIframe();
                    handleMsg('', '', 'Cuộc gọi đã bị từ chối!', '');
                    this.windowCall && this.windowCall.close();
                    hideModal();
                    return;
                case DENIED:
                    console.log('DENIED');
                    hideModal();
                    return;
                case FINISHED:
                    console.log('FINISHED');
                    stopTimeout();
                    this.stopRingtone();
                    handleMsg('', '', 'Cuộc gọi đã kết thúc!', '');
                    this.windowCall && this.windowCall.close();
                    // this.removeIframe();
                    if (audio) {
                        audio.pause();
                        audio.currentTime = 0;
                    }
                    hideModal();
                    return;
                case TIMEOUT:
                    console.log('timeout');
                    this.windowCall && this.windowCall.close();
                    this.stopRingtone();
                    // this.removeIframe();
                    hideModal();
                    return;
                default:
                    return;
            }
        };

        VideoCall.prototype.initSocket = async function (
            StompJS,
            uuidCustomer,
            successCallback,
            returnInSomething,
            enableHeartbeat
        ) {
            try {
                var _this = this;
                let lastMessSocket = null;
                const access_token = await new Fetch(
                    null,
                    null,
                    this.config
                ).getAuthen();
                let webSocketEndPoint = `wss://${dev_url.replace(
                    'https://',
                    ''
                )}router-service/websocket?access_token=${access_token}`;
                let ws = new WebSocket(webSocketEndPoint);
                stompClient = StompJS.over(ws);
                let mysubid = this.getTopicUsing(uuidCustomer);
                if (!enableHeartbeat) {
                    stompClient.heartbeat = { outgoing: 0, incoming: 0 };
                } else {
                    stompClient.heartbeat = { outgoing: 3000, incoming: 3000 };
                }
                stompClient.connect(
                    {},
                    function (frame) {
                        if (successCallback) {
                            successCallback(frame.command);
                        }
                        _this.status = CONNECTED;
                        stompClient.subscribe(
                            '/queue/' + mysubid,
                            function (sdkEvent) {
                                const mess = JSON.parse(
                                    JSON.stringify(sdkEvent.body)
                                );
                                const messParse = JSON.parse(mess);

                                if (
                                    lastMessSocket &&
                                    messParse.title === lastMessSocket.title &&
                                    messParse.roomId === lastMessSocket.roomId
                                ) {
                                    // console.log('duplicate');
                                    return;
                                } else {
                                    if (returnInSomething) {
                                        returnInSomething(JSON.parse(mess));
                                    }
                                    _this.handleReceivingMessage(
                                        uuidCustomer,
                                        messParse
                                    );
                                }
                                lastMessSocket = messParse;
                            },
                            { id: mysubid }
                        );
                    },
                    (error) => {
                        if (
                            error &&
                            Object.prototype.toString.call(error) ===
                                '[object String]' &&
                            error.lastIndexOf(
                                'Whoops! Lost connection to',
                                0
                            ) === 0
                        ) {
                            if (successCallback) {
                                successCallback(DISCONNECTED);
                            }
                            this.status = DISCONNECTED;
                            setTimeout(() => {
                                this.initSocket(
                                    StompJS,
                                    uuidCustomer,
                                    successCallback,
                                    returnInSomething,
                                    enableHeartbeat
                                );
                            }, 3000);
                        }
                    }
                );
                return stompClient;
            } catch (e) {
                console.log(e);
            }
        };

        VideoCall.prototype.disconnectSocket = function () {
            if (stompClient !== null) {
                stompClient.disconnect();
            }
        };

        VideoCall.prototype.removeIframe = function () {
            const meetNode = document.querySelector('#meet');
            if (meetNode && !this.url) {
                while (meetNode.firstChild) {
                    meetNode.removeChild(meetNode.firstChild);
                }
            }
        };

        VideoCall.prototype.initVideoCall = function (
            JitsiMeetExternalAPI,
            uuidCustomer,
            width,
            height
        ) {
            try {
                let roomInfo = JSON.parse(localStorage.getItem('roomInfo'));
                const meetNode = document.querySelector('#meet');
                // this.removeIframe();
                const options = {
                    roomName: roomInfo['roomId'] ? roomInfo['roomId'] : '',
                    width: width,
                    height: height,
                    jwt: roomInfo['token'],
                    configOverwrite: { subject: ' ' },
                    userInfo: {
                        displayName: roomInfo['caller'],
                        email: getUUID(),
                    },
                    parentNode: document.querySelector('#meet'),
                };
                this.api = new JitsiMeetExternalAPI(
                    roomInfo['domain'].replace('https://', ''),
                    options
                );
                this.api.addEventListener('readyToClose', async () => {
                    await this.endCall(uuidCustomer);
                    window.open('', '_self').close();
                });
                return this.api;
            } catch (e) {
                console.log(e);
            }
        };

        VideoCall.prototype.getTopicUsing = function (customerId) {
            return this.config.token_id + '_' + customerId + '_' + getUUID();
        };

        VideoCall.prototype.createUUID = function () {
            const uuidv4 = ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(
                /[018]/g,
                (c) =>
                    (
                        c ^
                        (crypto.getRandomValues(new Uint8Array(1))[0] &
                            (15 >> (c / 4)))
                    ).toString(16)
            );
            if (!getItem(UUID)) {
                setItem(UUID, uuidv4);
            }
            return uuidv4;
        };

        VideoCall.prototype.capture = function (returnImageBase64) {
            returnImage = returnImageBase64;
            console.log(this.windowCall);
            const iframe = this.api.getIFrame();
            const data = {
                id: 'capture',
            };
            console.log('capture', data);
            iframe.contentWindow.postMessage(data, '*');
        };

        VideoCall.prototype.startRingtone = function () {
            let src = 'https://ucc.vnpt.vn/assets/js/old_telephone.wav';
            audio = new Audio(src);
            audio.loop = true;
            audio.play();
            if (this.timeoutRingtone) {
                clearTimeout(this.timeoutRingtone);
                this.timeoutRingtone = null;
            }
            this.timeoutRingtone = setTimeout(() => {
                if (audio) {
                    audio.pause();
                }
            }, 70000);
        };

        VideoCall.prototype.stopRingtone = function () {
            if (audio) {
                audio.pause();
                audio.currentTime = 0;
                audio = null;
            }
            clearTimeout(this.timeoutRingtone);
            this.timeoutRingtone = null;
        };

        hideModal = function () {
            const callingModal = document.getElementById('myModal');
            const receivingModal = document.getElementById('receivingCalling');
            if (callingModal) {
                callingModal.remove();
            }
            if (receivingModal) {
                receivingModal.remove();
            }
        };

        hideNoti = function () {
            const modalMSG = document.getElementById('msgModal');
            if (modalMSG) {
                modalMSG.remove();
            }
        };

        stopTimeout = function () {
            clearTimeout(timeout);
            timeout = null;
        };

        getUUID = function () {
            try {
                return getItem(UUID) && getItem(UUID).replace(/"/g, '');
            } catch (e) {
                console.log(e);
                handleMsg('', '', 'Lỗi không xác định', 'error');
            }
        };

        setItem = function (key, value) {
            try {
                localStorage.setItem(key, JSON.stringify(value));
                return true;
            } catch (e) {
                console.log(e);
            }
        };

        getItem = function (key) {
            try {
                return localStorage.getItem(key);
            } catch (e) {}
        };

        return VideoCall;
    })();

    handleMsg = function (res, errorMsg, message, type) {
        try {
            if (res.error && res.message && errorCode[res.message]) {
                new Popup().openMsgModal(type, errorCode[res.message]);
            } else if (res.error && res.message && !errorCode[res.message]) {
                new Popup().openMsgModal(
                    type,
                    'Lỗi không xác định! Vui lòng thử lại'
                );
            } else if (message) {
                new Popup().openMsgModal(type, message);
            } else if (res.message === 'IDG-00000000') {
                new Popup().openMsgModal(type, errorCode[res.message]);
            }
        } catch (e) {
            console.log(e);
        }
    };

    VideoCallSDK = {
        initConfig: function (url, config) {
            video = new VideoCall(url, config);
            return video;
        },
    };

    if (typeof exports !== 'undefined' && exports !== null) {
        exports.VideoCallSDK = VideoCallSDK;
    }

    if (typeof window !== 'undefined' && window !== null) {
        window.VideoCallSDK = VideoCallSDK;
    } else if (!exports) {
        self.VideoCallSDK = VideoCallSDK;
    }
}.call(this));
