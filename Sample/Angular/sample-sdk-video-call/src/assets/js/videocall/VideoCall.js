// const dev_url = "https://explorer.idg.vnpt.vn/";
const dev_url = "https://api.idg.vnpt.vn/";
const API_ROUTER = dev_url + "router-service/api/";

const UUID = "uuid";
const ROOM_INFO = "roomInfo";
const PENDING = "PENDING";
const ACCEPTED = "ACCEPTED";
const REJECTED = "REJECTED";
const FINISHED = "FINISHED";
const TIMEOUT = "TIMEOUT";
const DENIED = "DENIED";
const LEAVE = "LEAVE";
const ACCESS_TOKEN = "access_token";

const errorCode = {
    "IDG-00000000": "Thành công! - IDG-00000000",
    "IDG-20000001": "Not null! - IDG-20000001",
    "IDG-20000004": "Kích thước từ 0-255! - IDG-20000004",
    "IDG-20000003": "Kích thước từ 0-4000! - IDG-20000003",
    "IDG-20000005": "Kích thước từ 0-300! - IDG-20000005",
    "IDG-20000006": "Không thuộc định dạng devicetype! - IDG-20000006",
    "IDG-20000007": "Không thuộc định dạng statuscaller! - IDG-20000007",
    "IDG-20000008": "Không thuộc kiểu enum môi trường! - IDG-20000008",
    "IDG-20000100": "Không tìm thấy thiết bị người nhận! - IDG-20000100",
    "IDG-20000201": "Cuộc gọi đang thực hiện! - IDG-20000201",
    "IDG-20000202": "Không tìm thấy cuộc gọi! - IDG-20000202",
    "IDG-20000203": "Người nhận đang trong cuộc gọi khác! - IDG-20000203",
    "IDG-20000101": "Thiết bị người nhận và người gọi là 1! - IDG-20000101",
    "IDG-20000210": "Không tìm thấy host! - IDG-20000210",
    "IDG-20000404": "Không tìm thấy token! - IDG-20000404",
    "IDG-20000211": "Không tìm thấy room! - IDG-20000211",
    "IDG-20000213": "Không phải thiết bị nguồn! - IDG-20000213",
    "IDG-20000214": "Không phải thiết bị đích! - IDG_20000214",
    "IDG-20000215": "Không tồn tại cấu hình của token! - IDG_20000215",
    "IDG-20000216": "Đã có lỗi xảy ra! - IDG-20000216",
    "IDG-20000217":
        "Số lương thiết bị đăng ký vượt quá số lượng cho phép - IDG-20000217",
    "IDG-20000218": "Thông tin người nhận không hợp lệ - IDG-20000218",
    "IDG-20000219":
        "Không tìm thấy người gọi, nhận trong cuộc gọi - IDG-20000219",
    "IDG-20000220": "Người nhận và người gọi là một người - IDG-20000220",
    "IDG-20000420": "Cuộc gọi đã kết thúc - IDG-20000420",
    "IDG-20000421": "Cuộc gọi bị từ chối - IDG-20000421",
    "IDG-20000330": "Có lỗi xảy ra khi lấy file ghi âm - IDG-20000330",
    "IDG-20000331": "Người gọi không có quyền truy cập file - IDG-20000331",
    "IDG-20000232": "Cuộc gọi không có chế độ ghi âm, hình - IDG-20000332",
    "IDG-20003001": "Lỗi socket time out - IDG-20000216",
    "IDG-20003002": "Vui lòng kiểm tra kết nối mạng - IDG-20003002",
    "IDG-20003003": "Lỗi kết nối: không kết nối được máy chủ! - IDG-20003003",
    "IDG-20003004": "Lỗi kết nối: quá thời gian hồi đáp! - IDG-20003004",
    "IDG-20003005": "Lỗi socket với message chi tiết - IDG-20003005",
    "IDG-20003006": "Lỗi không xác định với message chi tiết - IDG-20003006",
    "IDG-20002400": "Token đã bị khoá",
    "IDG-20002401": "Bạn không có quyền truy cập",
    "IDG-20002402": "Quá số lượng cuộc gọi đồng thời cho phép",
    "IDG-20002403": "Quá thời lượng cuộc gọi cho phép",
};

const renderIframe = `<div id="meet">` + `</div>`;

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

const initModal =
    `<div class="modalSDK show" id="myModal" tabindex="-1" role="dialog">` +
    `   <div class="modal-dialog" role="document">` +
    `       <div class="modalContentSDK">` +
    `           <div class="modalBodySDK">` +
    `               <div class="row justify-content-center mb-2">` +
    `                   <img id="avatar" src="" width="200" height="200" alt="avatar" style="border-radius:50%">` +
    `               </div>` +
    `               <div class="col-12 mb-2 text-center">` +
    `                   <h4><label id="userName"></label></h4>` +
    `               </div>` +
    `               <div class="col-12 mb-2 text-center">` +
    `                   <i class="fa fa-phone" aria-hidden="true"></i>` +
    `                   <span><i>Đang gọi...</i></span>` +
    `               </div>` +
    `               <div class="col-12 mb-2 text-center">` +
    `                   <span class="text-danger"><i>Cuộc gọi sẽ được tự động ghi lại</i></span>` +
    `               </div>` +
    `               <div class="row justify-content-center">` +
    `                           <div class="ring" id="cancleCall">` +
    `                               <div class="vdc-alo-phone vdc-alo-green vdc-alo-show" >` +
    `                               <div class="vdc-alo-ph-circle"></div>` +
    `                               <div class="vdc-alo-ph-circle-fill"></div>` +
    `                               <div class="vdc-alo-ph-img-circle"></div>` +
    `                           </div>` +
    `               </div>` +
    `           </div>` +
    `       </div>` +
    `   </div>` +
    `</div>`;

const initModal2 =
    `<div class="modal" id="myModal">` +
    `       <div class="modal-content">` +
    `           <div class="modal-body">` +
    `               <div class="row justify-content-center mb-2">` +
    `                   <img id="avatar" src="" width="200" height="200" alt="avatar" style="border-radius:50%">` +
    `               </div>` +
    `               <div class="col-12 mb-2 text-center">` +
    `                   <h4><label id="userName"></label></h4>` +
    `               </div>` +
    `               <div class="col-12 mb-2 text-center">` +
    `                   <i class="fa fa-phone" aria-hidden="true"></i>` +
    `                   <span><i>Đang gọi...</i></span>` +
    `               </div>` +
    `               <div class="col-12 mb-2 text-center">` +
    `                   <span class="text-danger"><i>Cuộc gọi sẽ được tự động ghi lại</i></span>` +
    `               </div>` +
    `               <div class="row justify-content-center">` +
    `                           <div class="ring" id="cancleCall">` +
    `                               <div class="vdc-alo-phone vdc-alo-green vdc-alo-show" >` +
    `                               <div class="vdc-alo-ph-circle"></div>` +
    `                               <div class="vdc-alo-ph-circle-fill"></div>` +
    `                               <div class="vdc-alo-ph-img-circle"></div>` +
    `                           </div>` +
    `               </div>` +
    `           </div>` +
    `       </div>` +
    `</div>`;

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

const VideoCall = function () {
    let windowCall = null;
    let timeout;
    let token = null;
    let pageShow = false;
    let stompClient = null;
    let version = "2.0.8";
    let config = null;
    let urlVideoCall = null;
    let api = null;
    let returnImage = null;

    function initConfig(url, configSDK) {
        config = configSDK;
        urlVideoCall = url;
        // if (Notification.permission !== 'granted') {
        //     Notification.requestPermission();
        // }
    }
    window.addEventListener("message", function (event) {
        if (event.data.id == "capture") {
            if (returnImage) {
                returnImage(event.data.data);
            }
        }
    });

    function initComponent(callerId, image, name) {
        const rootElement = document.getElementById("root");
        if (rootElement) {
            rootElement.insertAdjacentHTML("afterbegin", initModal2);
        } else {
            document.body.insertAdjacentHTML("afterbegin", initModal2);
        }

        const modal = document.getElementById("myModal");
        const labelUserName = document.getElementById("userName");
        const avatar = document.getElementById("avatar");
        const cancleCall = document.getElementById("cancleCall");

        labelUserName.innerText = name;
        avatar.src = image
            ? image
            : "https://1sfj1635wrts49n9bz3kpi6y-wpengine.netdna-ssl.com/wp-content/uploads/2019/07/no-image-found.png";
        cancleCall.onclick = function () {
            endCall(callerId);
        };
        modal.style.display = "block";
    }

    function initRatingModal(uuidCustomer) {
        const rootElement = document.getElementById("root");
        let point;
        let reviewContent;
        if (rootElement) {
            rootElement.insertAdjacentHTML("afterbegin", initRating);
        } else {
            document.body.insertAdjacentHTML("afterbegin", initRating);
        }
        const radios = document.querySelectorAll(
            'input[type=radio][name="rating"]'
        );
        const reviewValue = document.getElementById("reviewComments");
        const form = document.getElementById("review-form");
        const modal = document.getElementById("ratingModal");
        const closeButton = document.getElementById("closeRatingButton");
        const ratingButton = document.getElementById("ratingButton");

        function changeHandler(event) {
            point = this.value;
        }

        function changeHandlerComment(event) {
            reviewContent = this.value;
        }

        reviewValue.addEventListener("change", changeHandlerComment);

        Array.prototype.forEach.call(radios, function (radio) {
            radio.addEventListener("change", changeHandler);
        });

        closeButton.onclick = function () {
            modal.style.display = "none";
        };
        ratingButton.onclick = function () {
            if (point || reviewContent) {
                submitRating(uuidCustomer, point, reviewContent);
            }
            modal.style.display = "none";
        };
        modal.style.display = "block";
    }

    function initReceivingModal(uuidUser, data) {
        const rootElement = document.getElementById("root");
        if (rootElement) {
            rootElement.insertAdjacentHTML("afterbegin", receivingCalling);
        } else {
            document.body.insertAdjacentHTML("afterbegin", receivingCalling);
        }

        const receiving = document.getElementById("receivingCalling");
        const accept = document.getElementById("acceptCall");
        const rejectBtn = document.getElementById("rejectCall");
        // if (!Notification) {
        //     alert(
        //         'Desktop notifications not available in your browser. Try Chromium.'
        //     );
        //     return;
        // }

        // if (Notification.permission !== 'granted') {
        //     Notification.requestPermission();
        // } else {
        //     var notification = new Notification('Đang có cuộc gọi đến', {
        //         icon: './end-call.png',
        //         body: 'Bạn đang có cuộc gọi đến...',
        //     });
        // }
        accept.onclick = function () {
            handleAcceptCall(uuidUser);
            receiving.style.display = "none";
        };
        rejectBtn.onclick = function () {
            rejectCall(uuidUser);
            receiving.style.display = "none";
        };
        receiving.style.display = "block";
    }

    function openMsgModal(type, message) {
        const rootElement = document.getElementById("root");
        if (rootElement) {
            rootElement.insertAdjacentHTML("afterbegin", msgModal);
        } else {
            document.body.insertAdjacentHTML("afterbegin", msgModal);
        }

        const msg = document.getElementById("errMsg");

        const iconMsg = document.getElementById("iconMsg");

        if (type === "error" && iconMsg) {
            iconMsg.className = "fas fa-exclamation-circle";
            iconMsg.style.color = "red";
        } else {
            iconMsg.className = "fas fa-check-circle";
            iconMsg.style.color = "green";
        }

        msg.innerText = message ? message : "";
        const close = document.getElementById("closeBtn");
        const modalMSG = document.getElementById("msgModal");

        modalMSG.style.display = "block";
        close.onclick = function () {
            modalMSG.style.display = "none";
        };
    }

    function setTimeoutEndcall(uuidCustomer) {
        timeout = setTimeout(function () {
            console.log("time out");
            endCall(uuidCustomer);
            windowCall && windowCall.close();
            stopTimeout();
        }, 70000);
    }

    function stopTimeout() {
        clearTimeout(timeout);
    }

    function handleReceivingMessage(uuidCustomer, message) {
        hideNoti();
        switch (message["title"]) {
            case ACCEPTED:
                console.log("ACCEPTED");
                stopTimeout();
                return;
            case PENDING:
                console.log("PENDING");
                setItem(ROOM_INFO, {
                    roomId: message.roomId,
                    token: message.token,
                    domain: message.domain,
                });
                initReceivingModal(uuidCustomer, message);
                setTimeoutEndcall(uuidCustomer);
                return;
            case REJECTED:
                console.log("REJECTED");
                handleMsg("", "", "Cuộc gọi đã bị từ chối!", "");
                windowCall && windowCall.close();
                hideModal();
                return;
            case DENIED:
                console.log("DENIED");
                hideModal();
                return;
            case FINISHED:
                console.log("FINISHED");
                handleMsg("", "", "Cuộc gọi đã kết thúc!", "");
                // initRatingModal(uuidCustomer);
                windowCall && windowCall.close();
                hideModal();
                return;
            case TIMEOUT:
                console.log("timeout");
                windowCall && windowCall.close();
                hideModal();
                return;
            default:
                return;
        }
    }

    async function initSocket(
        StompJS,
        uuidCustomer,
        successCallback,
        returnInSomething
    ) {
        try {
            await getAuthen();
            let authenToken = token.replace("Bearer ", "");
            let webSocketEndPoint = `wss://${dev_url.replace(
                "https://",
                ""
            )}router-service/websocket?access_token=${authenToken}`;

            let ws = new WebSocket(webSocketEndPoint);
            stompClient = StompJS.over(ws);
            let mysubid = getTopicUsing(uuidCustomer);
            stompClient.heartbeat = { outgoing: 0, incoming: 0 };
            stompClient.connect(
                {},
                (frame) => {
                    if (successCallback) {
                        successCallback(frame.command);
                    }

                    stompClient.subscribe(
                        "/topic/" + mysubid,
                        function (sdkEvent) {
                            const mess = JSON.parse(
                                JSON.stringify(sdkEvent.body)
                            );
                            if (returnInSomething) {
                                returnInSomething(JSON.parse(mess));
                            }

                            handleReceivingMessage(
                                uuidCustomer,
                                JSON.parse(mess)
                            );
                        },
                        { id: mysubid }
                    );
                },
                (error) => {
                    if (
                        error &&
                        Object.prototype.toString.call(error) ===
                            "[object String]" &&
                        error.lastIndexOf("Whoops! Lost connection to", 0) === 0
                    ) {
                        setTimeout(() => {
                            initSocket(
                                StompJS,
                                uuidCustomer,
                                returnInSomething
                            );
                        }, 3000);
                    }
                }
            );
            return stompClient;
        } catch (e) {}
    }

    function initVideoCall(JitsiMeetExternalAPI, uuidCustomer, width, height) {
        let roomInfo = JSON.parse(localStorage.getItem("roomInfo"));
        const options = {
            roomName: roomInfo["roomId"] ? roomInfo["roomId"] : "",
            width: width,
            height: height,
            jwt: roomInfo["token"],
            configOverwrite: { subject: " " }, // set roomName
            userInfo: {
                displayName: roomInfo["caller"],
                email: getUUID(),
            },
            parentNode: document.querySelector("#meet"),
        };
        api = new JitsiMeetExternalAPI(
            roomInfo["domain"].replace("https://", ""),
            options
        );
        api.addEventListener("readyToClose", async () => {
            await endCall(uuidCustomer);
            window.open("", "_self").close();
        });
        return api;
    }

    function capture(returnImageBase64) {
        returnImage = returnImageBase64;
        const iframe = api.getIFrame();
        const data = {
            id: "capture",
        };
        console.log("capture", data);
        iframe.contentWindow.postMessage(data, "*");

        // window.addEventListener("message", function (event) {
        //     if (event.data.id == "capture") {
        //         if (returnImage) {
        //             returnImage(event.data.data);
        //         }
        //     }
        // });
    }

    function disconnectSocket() {
        if (stompClient !== null) {
            stompClient.disconnect();
        }
    }

    function openWindowCall(callerId) {
        hideModal();
        const dualScreenLeft =
            window.screenLeft !== undefined
                ? window.screenLeft
                : window.screenX;
        const dualScreenTop =
            window.screenTop !== undefined ? window.screenTop : window.screenY;

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

        windowCall = window.open(
            urlVideoCall,
            "videocall",
            `width=1280,height=600,top=${top},left=${left},menubar=yes,location=yes,resizable=yes,scrollbars=yes,status=yesnp`
        );
        window.addEventListener("offline", () => {
            windowCall.close();
        });

        windowCall.onpageshow = (event) => {
            pageShow = true;
        };

        windowCall.onpagehide = (event) => {
            if (pageShow) {
                endCall(callerId);
                pageShow = false;
            }
        };
    }

    function hideModal() {
        const callingModal = document.getElementById("myModal");
        const receivingModal = document.getElementById("receivingCalling");
        if (callingModal) {
            callingModal.style.display = "none";
        }
        if (receivingModal) {
            receivingModal.style.display = "none";
        }
    }

    function hideNoti() {
        const modalMSG = document.getElementById("msgModal");
        if (modalMSG) {
            modalMSG.style.display = "none";
        }
    }

    function uuidv4() {
        return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
            (
                c ^
                (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
            ).toString(16)
        );
    }

    function getTopicUsing(customerId) {
        return config.token_id + "_" + customerId + "_" + getUUID();
    }

    function createUUID() {
        if (!getItem(UUID)) {
            setItem(UUID, uuidv4());
        }
        return uuidv4();
    }

    function getUUID() {
        try {
            return getItem(UUID) && getItem(UUID).replace(/"/g, "");
        } catch (e) {
            handleMsg("", "", "Lỗi không xác định", "error");
        }
    }

    async function registerDevice(deviceToken, uuidCustomer, personName) {
        const body = {
            deviceId: getUUID(),
            deviceToken: deviceToken,
            deviceTypeId: "WEB",
            idgTokenId: config.token_id,
            lastDate: new Date(),
            personIdApp: uuidCustomer,
            personName: personName,
            topicUsing: getTopicUsing(uuidCustomer),
        };
        return postData(API_ROUTER + "v2/register-device", body);
    }

    async function getDeviceIdByCustomerId(uuidCustomer) {
        return await getData(
            API_ROUTER + "get-one/" + config.token_id + "/" + uuidCustomer,
            "",
            config
        );
    }

    async function createCall(callerId, callerName = "", reciverCallers, url) {
        try {
            const paramv2 = {
                callerId: callerId,
                callerName: callerName,
                deviceId: getUUID(),
                idgTokenId: config.token_id,
                reciverCallers: reciverCallers,
            };
            const res = await postData(API_ROUTER + "v2/create-call", paramv2);
            if (res.message === "IDG-00000000") {
                setItem(ROOM_INFO, {
                    roomId: res.object.roomId,
                    token: res.object.token,
                    domain: res.object.domain,
                    caller: callerName,
                });
                openWindowCall(callerId);
                setTimeoutEndcall(callerId);
                return res;
            }
            return res;
        } catch (e) {
            endCall(callerId);
            handleMsg(
                "",
                "",
                "Vui lòng cho phép Pop-ups bật để thực hiện cuộc gọi ",
                "error"
            );
        }
    }

    async function addCall(
        callerId,
        callerName = "",
        reciverCallers,
        recevicerName = "",
        urlImage
    ) {
        try {
            const roomInfo = JSON.parse(getItem(ROOM_INFO));
            const paramv2 = {
                callerId: callerId,
                callerName: callerName,
                deviceId: getUUID(),
                idgTokenId: config.token_id,
                reciverCallers: reciverCallers,
                roomId: roomInfo.roomId,
            };
            const res = await postData(API_ROUTER + "v2/add-call", paramv2);
            return res;
        } catch (e) {
            handleMsg("", "", "Đã có lỗi xảy ra", "error");
        }
    }

    async function handleAcceptCall(uuidUser) {
        try {
            const roomInfo = JSON.parse(getItem(ROOM_INFO));
            const paramv2 = {
                callerId: uuidUser,
                deviceId: getUUID(),
                idgTokenId: config.token_id,
                roomId: roomInfo.roomId,
            };
            const res = await postData(API_ROUTER + "v2/accept-call", paramv2);
            if (res.message === "IDG-00000000") {
                openWindowCall(uuidUser);
                return res;
            } else {
                handleMsg(res, res.message, null, "error");
                return res;
            }
        } catch (e) {
            endCall(uuidUser);
            handleMsg(
                "",
                "",
                "Vui lòng cho phép Pop-ups bật để thực hiện cuộc gọi ",
                "error"
            );
        }
    }

    async function rejectCall(callerId) {
        const roomInfo = JSON.parse(getItem(ROOM_INFO));
        const paramv2 = {
            callerId: callerId,
            deviceId: getUUID(),
            idgTokenId: config.token_id,
            roomId: roomInfo.roomId,
        };
        const res = await postData(API_ROUTER + "v2/reject-call", paramv2);
        return res;
    }

    async function endCall(callerId) {
        hideModal();
        stopTimeout();
        const roomInfo = JSON.parse(getItem(ROOM_INFO));
        let res;
        if (roomInfo) {
            const param = {
                callerId: callerId,
                deviceId: getUUID(),
                idgTokenId: config.token_id,
                roomId: roomInfo.roomId,
            };
            res = await postData(API_ROUTER + "v2/end-call", param);
        }
        return res;
    }

    async function submitRating(callerId, callQuality, callComment) {
        const roomInfo = JSON.parse(getItem(ROOM_INFO));
        let res;
        if (roomInfo) {
            const param = {
                callComment: callComment,
                callQuality: callQuality,
                callerId: callerId,
                deviceId: getUUID(),
                idgTokenId: config.token_id,
                roomId: roomInfo.roomId,
            };
            res = await postData(API_ROUTER + "v2/external/rating", param);
        }
        return res;
    }

    async function removeCall(callerId) {
        const roomInfo = JSON.parse(getItem(ROOM_INFO));
        const param = {
            callerId: callerId,
            idgTokenId: config.token_id,
            roomId: roomInfo.roomId,
        };
        const res = await postData(API_ROUTER + "v2/remove-call", param);
        return res;
    }

    async function removeDevice(personIdApp) {
        const param = {
            deviceId: getUUID(),
            idgTokenId: config.token_id,
            personIdApp: personIdApp,
            deviceTypeId: "WEB",
        };
        const res = await deleteData(API_ROUTER + "v2/remove-device", param);
        localStorage.removeItem(ROOM_INFO);
        localStorage.removeItem(ACCESS_TOKEN);
        return res;
    }

    async function getFile(id) {
        try {
            const roomInfo = JSON.parse(getItem(ROOM_INFO));
            const roomId = id ? id : roomInfo.roomId;
            const res = await getData(
                API_ROUTER + "v2/external/get-file?roomId=" + roomId,
                ""
            );
            return res;
        } catch (e) {
            handleMsg("", "", "Đã có lỗi xảy ra", "error");
        }
    }

    async function getAuthen() {
        const param = {
            client_id: config.client_id,
            client_secret: config.client_secret,
            grant_type: "client_credentials",
        };
        const res = await postDataForAuthentication(
            dev_url + "auth-service/oauth/token",
            param
        );
        if (res.access_token) {
            token = "Bearer " + res.access_token;
        }
        return res.access_token;
    }

    //API method
    async function postData(url = "", data = {}) {
        try {
            if (!token) {
                await getAuthen();
            }
            const response = await fetch(url, {
                method: "POST",
                mode: "cors",
                cache: "no-cache",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json;charset=UTF-8",
                    "Token-id": config.token_id,
                    "Token-key": config.token_key,
                    "mac-address": "WEB-001",
                    Authorization: token,
                },
                redirect: "follow",
                referrerPolicy: "no-referrer",
                body: JSON.stringify(data),
            });
            if (response.ok) {
                return response.json();
            }
            const error = await response.text();
            throw JSON.parse(error);
        } catch (error) {
            if (error && error.error === "invalid_token") {
                await getAuthen();
                return postData(url, data);
            }
            handleMsg(error, error.message, null, "error");
            return error;
        }
    }

    async function postDataForAuthentication(url, data) {
        try {
            const access_token = getItem(ACCESS_TOKEN);
            const response = await fetch(url, {
                method: "POST",
                mode: "cors",
                cache: "no-cache",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json",
                },
                redirect: "follow",
                referrerPolicy: "no-referrer",
                body: JSON.stringify(data),
            });
            return response.json();
        } catch (e) {
            return e;
        }
    }

    async function getData(url = "", data = "") {
        try {
            if (!token) {
                await getAuthen();
            }
            const response = await fetch(url, {
                method: "GET",
                mode: "cors",
                withCredentials: true,
                cache: "no-cache",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json",
                    "Token-id": config.token_id,
                    "Token-key": config.token_key,
                    "mac-address": "WEB-001",
                    Authorization: token,
                },
                redirect: "follow",
                referrerPolicy: "no-referrer",
            });
            if (response.ok) {
                return response.json();
            }
            const error = await response.text();
            throw JSON.parse(error);
        } catch (error) {
            if (error && error.error === "invalid_token") {
                await getAuthen();
                return getData(url, data);
            }
            handleMsg(error, error.message, null, "error");
            return error;
        }
    }

    async function deleteData(url = "", data = {}) {
        try {
            if (!token) {
                await getAuthen();
            }
            const response = await fetch(url, {
                method: "DELETE",
                mode: "cors",
                cache: "no-cache",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json",
                    "Token-id": config.token_id,
                    "Token-key": config.token_key,
                    "mac-address": "WEB-001",
                    Authorization: token,
                },
                redirect: "follow",
                referrerPolicy: "no-referrer",
                body: JSON.stringify(data),
            });
            if (response.ok) {
                return response.json();
            }
            const error = await response.text();
            throw JSON.parse(error);
        } catch (error) {
            if (error && error.error === "invalid_token") {
                await getAuthen();
                return deleteData(url, data);
            }
            handleMsg(error, error.message, null, "error");
            return error;
        }
    }

    function handleMsg(res, errorMsg, message, type) {
        if (res.error && res.message && errorCode[res.message]) {
            openMsgModal(type, errorCode[res.message]);
        } else if (res.error && res.message && !errorCode[res.message]) {
            openMsgModal(type, "Lỗi không xác định! Vui lòng thử lại");
        } else if (message) {
            openMsgModal(type, message);
        } else if (res.message === "IDG-00000000") {
            openMsgModal(type, errorCode[res.message]);
        }
    }

    //local storage
    function setItem(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (e) {}
    }

    function getItem(key) {
        try {
            return localStorage.getItem(key);
        } catch (e) {}
    }
    return {
        getUUID,
        getTopicUsing,
        handleReceivingMessage,
        removeDevice,
        createCall,
        registerDevice,
        endCall,
        createUUID,
        getFile,
        getAuthen,
        initRatingModal,
        initSocket,
        disconnectSocket,
        version,
        initVideoCall,
        initConfig,
        capture,
    };
};
