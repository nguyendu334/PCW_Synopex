var url = 'http://10.100.203.78:3011/data/1';
var db;

var MQTT_CLIENT_ID = 'iot_web_temp' + Math.floor((1 + Math.random()) * 0x10000000000).toString(16);
var reconnect = false;
// Create a MQTT client instance
var MQTT_CLIENT = new Paho.MQTT.Client('broker.hivemq.com', 8000, MQTT_CLIENT_ID);

// Tell the client instance to connect to the MQTT broker
MQTT_CLIENT.connect({ onSuccess: myClientConnected });
// Tell MQTT_CLIENT to call myMessageArrived(message) each time a new message arrives

MQTT_CLIENT.onMessageArrived = myMessageArrived;
// set callback handlers
MQTT_CLIENT.onConnectionLost = onConnectionLost;

var mqtt_isconnected = false;

// This is the function which handles subscribing to topics after a connection is made
function myClientConnected() {
    MQTT_CLIENT.subscribe('SYNOPEXVINA2/IIOT/MQTT/PWC');
    mqtt_isconnected = true;
}

// called when the client loses its connection
function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
        // console.log("onConnectionLost:"+responseObject.errorMessage);
        mqtt_isconnected = false;
    }
}

// This is the function which handles received messages
function myMessageArrived(message) {
    db = JSON.parse(message.payloadString);
}

// setInterval(() => {
//     read();
// }, 1000);

// var connect = document.getElementById('connect');
// const read = async () => {
//     try {
//         const response = await axios.get('data.json');
//         connect.classList.add('green');
//         db = response.data;
//     } catch (error) {
//         console.log(error);
//     }
// };

setInterval(rd, 1000);
function rd() {
    var connect = document.getElementById('connect');
    connect.classList.add('green');
    // show data
    let levelWater = (db.mực_nước.hotpress / 100) * 242;
    document.getElementById('btn1').style.height = `${levelWater}px`;
    document.getElementById('hotpress_level').textContent = db.mực_nước.hotpress.toFixed(2) + ' %';
    document.getElementById('hotpress_temp').textContent = db.nhiệt_độ.hotpress.toFixed(1) + ' °C';

    let levelWaterWetline = (db.mực_nước.wetline / 100) * 242;
    document.getElementById('btn2').style.height = `${levelWaterWetline}px`;
    document.getElementById('wetline_level').textContent = db.mực_nước.wetline.toFixed(2) + ' %';
    document.getElementById('wetline_temp').textContent = db.nhiệt_độ.wetline.toFixed(1) + ' °C';

    document.getElementById('chiller4').textContent = db.nhiệt_độ.chiller4.toFixed(1) - 8.2 + ' °C';
    document.getElementById('chiller5').textContent = db.nhiệt_độ.chiller5.toFixed(1) - 9.4 + ' °C';
    document.getElementById('chiller6').textContent =
        db.nhiệt_độ.chiller6.toFixed(1) - 11.2 + ' °C';
    document.getElementById('chiller7').textContent = db.nhiệt_độ.chiller7.toFixed(1) - 9.5 + ' °C';
    document.getElementById('hotpress_machine1').textContent =
        db.nhiệt_độ.nước_về.hotpress_machine_1.toFixed(1) + ' °C';
    document.getElementById('hotpress_machine2').textContent =
        db.nhiệt_độ.nước_về.hotpress_machine_2.toFixed(1) + ' °C';
    document.getElementById('copper_line1').textContent =
        db.nhiệt_độ.nước_về.copper_line_1.toFixed(1) + ' °C';
    document.getElementById('copper_line2').textContent =
        db.nhiệt_độ.nước_về.copper_line_2.toFixed(1) + ' °C';

    // // add css
    // document
    //     .getElementById('left-wapper')
    //     .getSVGDocument()
    //     .getElementById('style1190')
    //     .append('@import url(../css/styleSvg.css)');

    // check van
    if (db.van_chính.hotpress == true) {
        document
            .getElementById('left-wapper')
            .getSVGDocument()
            .getElementById('hotpress').style.opacity = 0;
        document.getElementById('water_hotpress').style.opacity = 1;
        document
            .getElementById('left-wapper')
            .getSVGDocument()
            .getElementById('path15').style.animation = 'animate 70s linear infinite';
    }
    if (db.van_chính.hotpress == false) {
        document
            .getElementById('left-wapper')
            .getSVGDocument()
            .getElementById('hotpress').style.opacity = 1;
        document.getElementById('water_hotpress').style.opacity = 0;
        document
            .getElementById('left-wapper')
            .getSVGDocument()
            .getElementById('path15').style.animation = '';
    }
    if (db.van_chính.wetline == true) {
        document
            .getElementById('left-wapper')
            .getSVGDocument()
            .getElementById('wetline').style.opacity = 0;
        document.getElementById('water_wetline').style.opacity = 1;
        document
            .getElementById('left-wapper')
            .getSVGDocument()
            .getElementById('path16').style.animation = 'animate 70s linear infinite';
    }
    if (db.van_chính.wetline == false) {
        document
            .getElementById('left-wapper')
            .getSVGDocument()
            .getElementById('wetline').style.opacity = 1;
        document.getElementById('water_wetline').style.opacity = 0;
        document
            .getElementById('left-wapper')
            .getSVGDocument()
            .getElementById('path16').style.animation = '';
    }

    // check pump
    for (var i = 1; i < 15; i++) {
        if (db.pump[i] == true) {
            document
                .getElementById('left-wapper')
                .getSVGDocument()
                .getElementById('pump' + i).style.fill = '#00CD00';
            document
                .getElementById('left-wapper')
                .getSVGDocument()
                .getElementById('pump' + i).style.animation = 'fanRotate 1s linear infinite';
            document
                .getElementById('left-wapper')
                .getSVGDocument()
                .getElementById('pump' + i).style.transformOrigin = 'center';
            document
                .getElementById('left-wapper')
                .getSVGDocument()
                .getElementById('pump' + i).style.transformBox = 'fill-box';
            document
                .getElementById('left-wapper')
                .getSVGDocument()
                .getElementById('path' + i).style.animation = ' animate 70s linear infinite';
            document
                .getElementById('left-wapper')
                .getSVGDocument()
                .getElementById('p' + i).style.opacity = '0';
        } else {
            // document
            //     .getElementById('left-wapper')
            //     .getSVGDocument()
            //     .getElementById('pump' + i).style.fill = '#ff0000';
            document
                .getElementById('left-wapper')
                .getSVGDocument()
                .getElementById('pump' + i).style.animation = '';
            document
                .getElementById('left-wapper')
                .getSVGDocument()
                .getElementById('pump' + i).style.transformOrigin = 'center';
            document
                .getElementById('left-wapper')
                .getSVGDocument()
                .getElementById('pump' + i).style.transformBox = 'fill-box';
            document
                .getElementById('left-wapper')
                .getSVGDocument()
                .getElementById('p' + i).style.opacity = '1';
        }
    }

    // check fan chiller
    // chiller4
    for (var i = 1; i < 3; i++) {
        if (db.chill.chill4.comp[i] == true) {
            document
                .getElementById('left-wapper')
                .getSVGDocument()
                .getElementById('chiller4_comp_' + i).style.fill = '#00CD00';
            document
                .getElementById('left-wapper')
                .getSVGDocument()
                .getElementById('chiller4_comp_' + i).style.animation =
                'fanRotate 1s linear infinite';
            document
                .getElementById('left-wapper')
                .getSVGDocument()
                .getElementById('chiller4_comp_' + i).style.transformOrigin = 'center';
            document
                .getElementById('left-wapper')
                .getSVGDocument()
                .getElementById('chiller4_comp_' + i).style.transformBox = 'fill-box';
        } else {
            // document
            //     .getElementById('left-wapper')
            //     .getSVGDocument()
            //     .getElementById('chiller4_comp_' + i).style.fill = '#ff0000';
            document
                .getElementById('left-wapper')
                .getSVGDocument()
                .getElementById('chiller4_comp_' + i).style.animation = '';
        }
    }

    // chiller5
    for (var i = 1; i < 4; i++) {
        if (db.chill.chill5.comp[i] == true) {
            document
                .getElementById('left-wapper')
                .getSVGDocument()
                .getElementById('chiller5_comp_' + i).style.fill = '#00CD00';
            document
                .getElementById('left-wapper')
                .getSVGDocument()
                .getElementById('chiller5_comp_' + i).style.animation =
                'fanRotate 1s linear infinite';
            document
                .getElementById('left-wapper')
                .getSVGDocument()
                .getElementById('chiller5_comp_' + i).style.transformOrigin = 'center';
            document
                .getElementById('left-wapper')
                .getSVGDocument()
                .getElementById('chiller5_comp_' + i).style.transformBox = 'fill-box';
        } else {
            document
                .getElementById('left-wapper')
                .getSVGDocument()
                .getElementById('chiller5_comp_' + i).style.animation = '';
        }
    }

    // chiller6
    for (var i = 1; i < 3; i++) {
        if (db.chill.chill6.comp[i] == true) {
            document
                .getElementById('left-wapper')
                .getSVGDocument()
                .getElementById('chiller6_comp_' + i).style.fill = '#00CD00';
            document
                .getElementById('left-wapper')
                .getSVGDocument()
                .getElementById('chiller6_comp_' + i).style.animation =
                'fanRotate 1s linear infinite';
            document
                .getElementById('left-wapper')
                .getSVGDocument()
                .getElementById('chiller6_comp_' + i).style.transformOrigin = 'center';
            document
                .getElementById('left-wapper')
                .getSVGDocument()
                .getElementById('chiller6_comp_' + i).style.transformBox = 'fill-box';
        } else {
            // document
            //     .getElementById('left-wapper')
            //     .getSVGDocument()
            //     .getElementById('chiller6_comp_' + i).style.fill = '#ff0000';
            document
                .getElementById('left-wapper')
                .getSVGDocument()
                .getElementById('chiller6_comp_' + i).style.animation = '';
        }
    }

    // chiller7
    for (var i = 1; i < 3; i++) {
        if (db.chill.chill7.comp[i] == true) {
            document
                .getElementById('left-wapper')
                .getSVGDocument()
                .getElementById('chiller7_comp_' + i).style.fill = '#00CD00';
            document
                .getElementById('left-wapper')
                .getSVGDocument()
                .getElementById('chiller7_comp_' + i).style.animation =
                'fanRotate 1s linear infinite';
            document
                .getElementById('left-wapper')
                .getSVGDocument()
                .getElementById('chiller7_comp_' + i).style.transformOrigin = 'center';
            document
                .getElementById('left-wapper')
                .getSVGDocument()
                .getElementById('chiller7_comp_' + i).style.transformBox = 'fill-box';
        } else {
            // document
            //     .getElementById('left-wapper')
            //     .getSVGDocument()
            //     .getElementById('chiller7_comp_' + i).style.fill = '#ff0000';
            document
                .getElementById('left-wapper')
                .getSVGDocument()
                .getElementById('chiller7_comp_' + i).style.animation = '';
        }
    }

    // check cooling
    // chiller4
    for (var i = 1; i < 9; i++) {
        if (db.chill.chill4.cooling1[i] == true) {
            document
                .getElementById('left-wapper')
                .getSVGDocument()
                .getElementById('chiller4_comp1_fan' + i).style.fill = '#00CD00';
            document
                .getElementById('left-wapper')
                .getSVGDocument()
                .getElementById('chiller4_comp1_fan' + i).style.animation =
                'fanRotate 1s linear infinite';
            document
                .getElementById('left-wapper')
                .getSVGDocument()
                .getElementById('chiller4_comp1_fan' + i).style.transformOrigin = 'center';
            document
                .getElementById('left-wapper')
                .getSVGDocument()
                .getElementById('chiller4_comp1_fan' + i).style.transformBox = 'fill-box';
        }
        if (db.chill.chill4.cooling1[i] == false) {
            document
                .getElementById('left-wapper')
                .getSVGDocument()
                .getElementById('chiller4_comp1_fan' + i).style.animation = '';
        }
        if (db.chill.chill4.cooling2[i] == true) {
            document
                .getElementById('left-wapper')
                .getSVGDocument()
                .getElementById('chiller4_comp2_fan' + i).style.fill = '#00CD00';
            document
                .getElementById('left-wapper')
                .getSVGDocument()
                .getElementById('chiller4_comp2_fan' + i).style.animation =
                'fanRotate 1s linear infinite';
            document
                .getElementById('left-wapper')
                .getSVGDocument()
                .getElementById('chiller4_comp2_fan' + i).style.transformOrigin = 'center';
            document
                .getElementById('left-wapper')
                .getSVGDocument()
                .getElementById('chiller4_comp2_fan' + i).style.transformBox = 'fill-box';
        }

        if (db.chill.chill4.cooling2[i] == false) {
            document
                .getElementById('left-wapper')
                .getSVGDocument()
                .getElementById('chiller4_comp2_fan' + i).style.animation = '';
        }
    }

    // chiller5
    for (var i = 1; i < 9; i++) {
        if (db.chill.chill5.cooling1[i] == true) {
            document
                .getElementById('left-wapper')
                .getSVGDocument()
                .getElementById('chiller5_comp1_fan' + i).style.fill = '#00CD00';
            document
                .getElementById('left-wapper')
                .getSVGDocument()
                .getElementById('chiller5_comp1_fan' + i).style.animation =
                'fanRotate 1s linear infinite';
            document
                .getElementById('left-wapper')
                .getSVGDocument()
                .getElementById('chiller5_comp1_fan' + i).style.transformOrigin = 'center';
            document
                .getElementById('left-wapper')
                .getSVGDocument()
                .getElementById('chiller5_comp1_fan' + i).style.transformBox = 'fill-box';
        }
        if (db.chill.chill5.cooling1[i] == false) {
            document
                .getElementById('left-wapper')
                .getSVGDocument()
                .getElementById('chiller5_comp1_fan' + i).style.animation = '';
        }
        if (db.chill.chill5.cooling2[i] == true) {
            document
                .getElementById('left-wapper')
                .getSVGDocument()
                .getElementById('chiller5_comp2_fan' + i).style.fill = '#00CD00';
            document
                .getElementById('left-wapper')
                .getSVGDocument()
                .getElementById('chiller5_comp2_fan' + i).style.animation =
                'fanRotate 1s linear infinite';
            document
                .getElementById('left-wapper')
                .getSVGDocument()
                .getElementById('chiller5_comp2_fan' + i).style.transformOrigin = 'center';
            document
                .getElementById('left-wapper')
                .getSVGDocument()
                .getElementById('chiller5_comp2_fan' + i).style.transformBox = 'fill-box';
        }
        if (db.chill.chill5.cooling2[i] == false) {
            document
                .getElementById('left-wapper')
                .getSVGDocument()
                .getElementById('chiller5_comp2_fan' + i).style.animation = '';
        }
        // if (db.chill.chill5.cooling3[i] == true) {
        //     document
        //         .getElementById('left-wapper')
        //         .getSVGDocument()
        //         .getElementById('chiller5_comp2_fan' + i).style.fill = '#00CD00';
        //     document
        //         .getElementById('left-wapper')
        //         .getSVGDocument()
        //         .getElementById('chiller5_comp2_fan' + i).style.animation = 'fanRotate 1s linear infinite';
        //     document
        //         .getElementById('left-wapper')
        //         .getSVGDocument()
        //         .getElementById('chiller5_comp2_fan' + i).style.transformOrigin = 'center';
        //     document
        //         .getElementById('left-wapper')
        //         .getSVGDocument()
        //         .getElementById('chiller5_comp2_fan' + i).style.transformBox = 'fill-box';
        // }
        // if (db.chill.chill5.cooling3[i] == false) {
        //     document
        //         .getElementById('left-wapper')
        //         .getSVGDocument()
        //         .getElementById('chiller5_comp2_fan' + i).style.animation = '';
        // }
    }

    // chiller6
    for (var i = 1; i < 5; i++) {
        if (db.chill.chill6.cooling1[i] == true) {
            document
                .getElementById('left-wapper')
                .getSVGDocument()
                .getElementById('chiller6_comp1_fan' + i).style.fill = '#00CD00';
            document
                .getElementById('left-wapper')
                .getSVGDocument()
                .getElementById('chiller6_comp1_fan' + i).style.animation =
                'fanRotate 1s linear infinite';
            document
                .getElementById('left-wapper')
                .getSVGDocument()
                .getElementById('chiller6_comp1_fan' + i).style.transformOrigin = 'center';
            document
                .getElementById('left-wapper')
                .getSVGDocument()
                .getElementById('chiller6_comp1_fan' + i).style.transformBox = 'fill-box';
        }
        if (db.chill.chill6.cooling1[i] == false) {
            document
                .getElementById('left-wapper')
                .getSVGDocument()
                .getElementById('chiller6_comp1_fan' + i).style.animation = '';
        }
        if (db.chill.chill6.cooling2[i] == true) {
            document
                .getElementById('left-wapper')
                .getSVGDocument()
                .getElementById('chiller6_comp2_fan' + i).style.fill = '#00CD00';
            document
                .getElementById('left-wapper')
                .getSVGDocument()
                .getElementById('chiller6_comp2_fan' + i).style.animation =
                'fanRotate 1s linear infinite';
            document
                .getElementById('left-wapper')
                .getSVGDocument()
                .getElementById('chiller6_comp2_fan' + i).style.transformOrigin = 'center';
            document
                .getElementById('left-wapper')
                .getSVGDocument()
                .getElementById('chiller6_comp2_fan' + i).style.transformBox = 'fill-box';
        }
        if (db.chill.chill6.cooling2[i] == false) {
            document
                .getElementById('left-wapper')
                .getSVGDocument()
                .getElementById('chiller6_comp2_fan' + i).style.animation = '';
        }
    }

    // chiller7
    for (var i = 1; i < 5; i++) {
        if (db.chill.chill7.cooling1[i] == true) {
            document
                .getElementById('left-wapper')
                .getSVGDocument()
                .getElementById('chiller7_comp1_fan' + i).style.fill = '#00CD00';
            document
                .getElementById('left-wapper')
                .getSVGDocument()
                .getElementById('chiller7_comp1_fan' + i).style.animation =
                'fanRotate 1s linear infinite';
            document
                .getElementById('left-wapper')
                .getSVGDocument()
                .getElementById('chiller7_comp1_fan' + i).style.transformOrigin = 'center';
            document
                .getElementById('left-wapper')
                .getSVGDocument()
                .getElementById('chiller7_comp1_fan' + i).style.transformBox = 'fill-box';
        }
        if (db.chill.chill7.cooling1[i] == false) {
            document
                .getElementById('left-wapper')
                .getSVGDocument()
                .getElementById('chiller7_comp1_fan' + i).style.animation = '';
        }
        if (db.chill.chill5.cooling2[i] == true) {
            document
                .getElementById('left-wapper')
                .getSVGDocument()
                .getElementById('chiller7_comp2_fan' + i).style.fill = '#00CD00';
            document
                .getElementById('left-wapper')
                .getSVGDocument()
                .getElementById('chiller7_comp2_fan' + i).style.animation =
                'fanRotate 1s linear infinite';
            document
                .getElementById('left-wapper')
                .getSVGDocument()
                .getElementById('chiller7_comp2_fan' + i).style.transformOrigin = 'center';
            document
                .getElementById('left-wapper')
                .getSVGDocument()
                .getElementById('chiller7_comp2_fan' + i).style.transformBox = 'fill-box';
        }
        if (db.chill.chill5.cooling2[i] == false) {
            document
                .getElementById('left-wapper')
                .getSVGDocument()
                .getElementById('chiller7_comp2_fan' + i).style.animation = '';
        }
    }

    // check spec
    // wetline
    // if (db.nhiệt_độ.wetline > 23 || db.nhiệt_độ.wetline < 20) {
    //     document.getElementById('wetline_temp').style.backgroundColor = '#d40000';
    // }

    // // hotpress
    // if (db.nhiệt_độ.hotpress > 23 || db.nhiệt_độ.hotpress < 22) {
    //     document.getElementById('hotpress_temp').style.backgroundColor = '#d40000';
    // }

    // // chiller
    // for (var i = 4; i < 8; i++) {
    //     if (
    //         document.getElementById(`chiller${i}`).textContent.slice(0, 2) > 23 ||
    //         document.getElementById(`chiller${i}`).textContent.slice(0, 2) < 20
    //     ) {
    //         document.getElementById(`chiller${i}`).style.backgroundColor = '#d40000';
    //     }
    // }

    // for (i = 1; i < 3; i++) {
    //     if (
    //         document.getElementById(`hotpress_machine${i}`).textContent.slice(0, 2) > 15 ||
    //         document.getElementById(`hotpress_machine${i}`).textContent.slice(0, 2) < 10
    //     ) {
    //         document.getElementById(`hotpress_machine${i}`).style.backgroundColor = '#d40000';
    //     }
    //     if (
    //         document.getElementById(`copper_line${i}`).textContent.slice(0, 2) > 15 ||
    //         document.getElementById(`copper_line${i}`).textContent.slice(0, 2) < 10
    //     ) {
    //         document.getElementById(`copper_line${i}`).style.backgroundColor = '#d40000';
    //     }
    // }

    // Mực nước
    const ctx = document.getElementById('myChart').getContext('2d');
    const data = {
        datasets: [
            {
                label: 'Nhiệt độ Hot Press Tanker',
                borderWidth: 1, // độ dày
                borderColor: 'rgb(255, 99, 132)', // màu line
                pointRadius: 0, // điển chấm data trên line
                tension: 0.5, //độ uốn của line
                backgroundColor: 'rgb(255, 99, 132)',
            },
        ],
    };
    $('.chartjs-size-monitor').each(function () {
        $(this).remove();
    });
    new Chart(ctx, {
        type: 'line',
        data: data,
        options: {
            scales: {
                x: {
                    type: 'realtime',
                    grid: {
                        display: true, //kẻ dóng hàng dọc
                    },
                    realtime: {
                        duration: 1 * 60 * 1000, //hiển thị 2 phut data
                        delay: 1000, // lùi data hiển thị về sau 1s
                    },
                },
                y: {
                    beginAtZero: true,
                },
            },
        },
    });

    // Nhiệt độ nước
    const ctx1 = document.getElementById('myChart1').getContext('2d');
    const data1 = {
        datasets: [
            {
                label: 'Nhiệt độ Wet Line Tanker',
                borderWidth: 1, // độ dày
                borderColor: 'rgb(255, 159, 64)', // màu line
                pointRadius: 0, // điển chấm data trên line
                tension: 0.5, //độ uốn của line,
                backgroundColor: 'rgb(255, 159, 64)',
            },
        ],
    };

    setInterval(() => {
        data.datasets[0].data.push({
            x: Date.now(),
            y: db.nhiệt_độ.hotpress,
        });
        data1.datasets[0].data.push({
            x: Date.now(),
            y: db.nhiệt_độ.wetline,
        });
    }, 1000);

    new Chart(ctx1, {
        type: 'line',
        data: data1,
        options: {
            scales: {
                x: {
                    type: 'realtime',
                    grid: {
                        display: true, //kẻ dóng hàng dọc
                    },
                    realtime: {
                        duration: 1 * 60 * 1000, //hiển thị 2 phut data
                        delay: 1000, // lùi data hiển thị về sau 1s
                    },
                },
                y: {
                    beginAtZero: true,
                    type: 'linear',
                },
            },
        },
    });
}
