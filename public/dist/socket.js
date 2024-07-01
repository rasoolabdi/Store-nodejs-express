const socket = io("http://localhost:5001")
let namespaceSocket;
function stringToHtml(str) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(str , "text/html");
    return doc.body.firstChild;
}


function initNamespaceConnection(endpoint) {
    if(namespaceSocket) namespaceSocket.close();
    namespaceSocket = io(`http://localhost:5001/${endpoint}`)
    namespaceSocket.on("connect" , () => {
        namespaceSocket.on("roomList" , (rooms) => {
            getRoomInfo(rooms[0]?.name);
            const roomElement = document.querySelector("#contacts ul");
            roomElement.innerHTML = "";
            for(const room of rooms) {
                const html = stringToHtml(`
                    <li class="contact" roomName="${room.name}">
                        <div class="wrap">
                            <img src="${room.image}" height="40px" />
                            <div class="meta">
                                <p class="name">${room.name}</p>
                                <p class="preview>${room.description}</p>
                            </div>
                        </div>
                    </li>
                `)
                roomElement.appendChild(html);
            }
            const roomNodes = document.querySelectorAll("ul li.contact");
            for(const room of roomNodes) {
                room.addEventListener("click" , () => {
                    const roomName = room.getAttribute("roomName");
                    getRoomInfo(endpoint , roomName);
                })
            }
        })
    })
}

function getRoomInfo(endpoint,roomName) {
    document.querySelector("#roomName h3").setAttribute("roomName" , roomName);
    document.querySelector("#roomName h3").setAttribute("endpoint" , endpoint);
    namespaceSocket.emit("joinRoom" , roomName);
    namespaceSocket.on("roomInfo" , roomInfo => {
        document.querySelector("#roomName h3").innerText = roomInfo.description;
    }); 
    namespaceSocket.on("countOfOnlineUsers" , (count) => {
        console.log(count);
        document.getElementById("onlineCount").innerHTML = count;
    })
}

function sendMessage() {
    const roomName = document.querySelector("#roomName h3").getAttribute("roomName");
    const endpoint = document.querySelector("#roomName h3").getAttribute("endpoint")
    let message = document.querySelector(".message-input input#messageInput").value;
    if(message.trim() == "") {
        return alert("input message can not be empty");
    }
    namespaceSocket.emit("newMessage" , {
        message,
        roomName,
        endpoint
    })

    namespaceSocket.on("confirmMessage" , (data) => {
        console.log(data);
    })

    const li = stringToHtml(`
        <li class="sent">
            <img src="https://media-exp1.licdn.com/dms/image/C5603AQE3g9gHNfxGrQ/profile-displayphoto-shrink_200_200/0/1645507738281?e=1659571200&v=beta&t=wtwELdT1gp6ICp3UigC2EgutGAQgDP2sZKUx0mjCTwI"
                alt="" />
            <p>${message}</p>
        </li>
    `);

    document.querySelector(".messages ul").appendChild(li);
    document.querySelector(".message-input input#messageInput").value = "";
    const messagesElement = document.querySelector("div.messages");
    messagesElement.scrollTo(0, messagesElement.scrollHeight);
}


socket.on("connect" , () => {
    socket.on("namespacesList" , (namespacesList) => {
        const namespacesElement = document.getElementById("namespaces");
        namespacesElement.innerHTML = "";
        initNamespaceConnection(namespacesList[0].endpoint);
        for(const namespace of namespacesList) {
            const li = document.createElement("li");
            const p = document.createElement("p");
            p.setAttribute("class" , "namespacesTitle");
            p.setAttribute("endpoint" , namespace.endpoint);
            p.innerText = namespace.title;
            li.appendChild(p);
            namespacesElement.appendChild(li);
        }
        const namespaceNodes = document.querySelectorAll("#namespaces li p.namespacesTitle");
        for(const namespace of namespaceNodes) {
            namespace.addEventListener("click" , () => {
                const endpoint = namespace.getAttribute("endpoint");
                initNamespaceConnection(endpoint);
            })
        }
    })
    window.addEventListener("keydown" , (e) => {
        if(e.code === "Enter") {
            sendMessage();
        }
    });
    document.querySelector("button.submit").addEventListener("click" , () => {
        sendMessage();
    })
})

