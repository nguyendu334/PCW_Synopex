setInterval(() => {
    read();
}, 1000);

var connect = document.getElementById('connect');
const read = async () => {
    try {
        const response = await axios.get('http://localhost:3000/db');
        connect.classList.add('green');
        connectAll(response.data);
        readData(response.data);
    } catch (error) {
        console.log(error);
    }
};

const connectAll = (db) => {
    var dt = new Date();
    var month = dt.getMonth() + 1;
    var year = dt.getFullYear();

    var daysInMonth = new Date(year, month, 0).getDate();
    const labels = [];

    for (let i = 1; i <= daysInMonth; ++i) {
        labels.push(i.toString());
    }

    // Mực nước
    const ctx = document.getElementById('myChart');
    const data = {
        labels: labels,
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
    const ctx1 = document.getElementById('myChart1');
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
            y: Object.values(db.nhiệt_độ.hotpress)[Object.values(db.nhiệt_độ.hotpress).length - 1],
        });
        data1.datasets[0].data.push({
            x: Date.now(),
            y: Object.values(db.nhiệt_độ.wetline)[Object.values(db.nhiệt_độ.wetline).length - 1],
        });
    }, 100);

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
};

const readData = (db) => {
    document.getElementById('left-wapper').getSVGDocument().getElementById('hotpress_level').textContent =
        Object.values(db.mực_nước.hotpress)[Object.values(db.mực_nước.hotpress).length - 1].toFixed(1);
    document.getElementById('left-wapper').getSVGDocument().getElementById('hotpress_temp').textContent = Object.values(
        db.nhiệt_độ.hotpress,
    )[Object.values(db.nhiệt_độ.hotpress).length - 1].toFixed(1);
    document.getElementById('left-wapper').getSVGDocument().getElementById('wetline_level').textContent = Object.values(
        db.mực_nước.wetline,
    )[Object.values(db.mực_nước.wetline).length - 1].toFixed(1);
    document.getElementById('left-wapper').getSVGDocument().getElementById('wetline_temp').textContent = Object.values(
        db.nhiệt_độ.wetline,
    )[Object.values(db.nhiệt_độ.wetline).length - 1].toFixed(1);
    document.getElementById('left-wapper').getSVGDocument().getElementById('chiller4').textContent = Object.values(
        db.nhiệt_độ.chiller4,
    )[Object.values(db.nhiệt_độ.hotpress).length - 1].toFixed(1);
    document.getElementById('left-wapper').getSVGDocument().getElementById('chiller5').textContent = Object.values(
        db.nhiệt_độ.chiller5,
    )[Object.values(db.nhiệt_độ.wetline).length - 1].toFixed(1);
    document.getElementById('left-wapper').getSVGDocument().getElementById('chiller6').textContent = Object.values(
        db.nhiệt_độ.chiller6,
    )[Object.values(db.nhiệt_độ.wetline).length - 1].toFixed(1);
    document.getElementById('left-wapper').getSVGDocument().getElementById('chiller7').textContent = Object.values(
        db.nhiệt_độ.chiller7,
    )[Object.values(db.nhiệt_độ.wetline).length - 1].toFixed(1);
    document.getElementById('left-wapper').getSVGDocument().getElementById('hotpress_machine1').textContent =
        db.nhiệt_độ.nước_về.hotpress_machine_1.toFixed(1);
    document.getElementById('left-wapper').getSVGDocument().getElementById('hotpress_machine2').textContent =
        db.nhiệt_độ.nước_về.hotpress_machine_2.toFixed(1);
    document.getElementById('left-wapper').getSVGDocument().getElementById('copper_line1').textContent =
        db.nhiệt_độ.nước_về.copper_line_1.toFixed(1);
    document.getElementById('left-wapper').getSVGDocument().getElementById('copper_line2').textContent =
        db.nhiệt_độ.nước_về.copper_line_2.toFixed(1);

    // add css
    if (db) {
        document
            .getElementById('left-wapper')
            .getSVGDocument()
            .getElementById('style1190')
            .append('@import url(../css/styleSvg.css)');
    }

    // check van
    if (db.van_chính.hotpress === 1) {
        document.getElementById('left-wapper').getSVGDocument().getElementById('path30537').style.animation =
            'animate 70s linear infinite';
        document.getElementById('left-wapper').getSVGDocument().getElementById('path30134').style.animation =
            'animate 70s linear infinite';
        document.getElementById('left-wapper').getSVGDocument().getElementById('hotpress').style.opacity = 0;
    }
    if (db.van_chính.wetline === 1) {
        document.getElementById('left-wapper').getSVGDocument().getElementById('path30134').style.animation =
            'animate 70s linear infinite';
        document.getElementById('left-wapper').getSVGDocument().getElementById('path30535').style.animation =
            'animate 70s linear infinite';
        document.getElementById('left-wapper').getSVGDocument().getElementById('wetline').style.opacity = 0;
    } else {
        document.getElementById('left-wapper').getSVGDocument().getElementById('path30134').style.animation = '';
        document.getElementById('left-wapper').getSVGDocument().getElementById('path30535').style.animation = '';
        document.getElementById('left-wapper').getSVGDocument().getElementById('wetline').style.opacity = 1;
    }

    // check pump
    for (var i = 1; i < 15; i++) {
        if (db.pump[i] === 1) {
            document
                .getElementById('left-wapper')
                .getSVGDocument()
                .getElementById('pump_' + i).style.opacity = '0';
            document
                .getElementById('left-wapper')
                .getSVGDocument()
                .getElementById('pump' + i).style.fill = '#00ff37';
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
        } else {
            document
                .getElementById('left-wapper')
                .getSVGDocument()
                .getElementById('pump_' + i).style.opacity = '1';
            document
                .getElementById('left-wapper')
                .getSVGDocument()
                .getElementById('pump' + i).style.fill = '#ff0000';
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
        }
    }

    if (db.pump[1] === 1) {
        document.getElementById('left-wapper').getSVGDocument().getElementById('path64670').style.animation =
            ' animate 70s linear infinite';
    } else {
        document.getElementById('left-wapper').getSVGDocument().getElementById('path64670').style.animation = '';
    }

    if (db.pump[2] === 1) {
        document.getElementById('left-wapper').getSVGDocument().getElementById('path64672').style.animation =
            ' animate 70s linear infinite';
    } else {
        document.getElementById('left-wapper').getSVGDocument().getElementById('path64672').style.animation = '';
    }
    if (db.pump[3] === 1) {
        document.getElementById('left-wapper').getSVGDocument().getElementById('path66510').style.animation =
            ' animate 70s linear infinite';
    } else {
        document.getElementById('left-wapper').getSVGDocument().getElementById('path66510').style.animation = '';
    }
    if (db.pump[4] === 1) {
        document.getElementById('left-wapper').getSVGDocument().getElementById('path66495').style.animation =
            ' animate 70s linear infinite';
    } else {
        document.getElementById('left-wapper').getSVGDocument().getElementById('path66495').style.animation = '';
    }
    if (db.pump[5] === 1) {
        document.getElementById('left-wapper').getSVGDocument().getElementById('path61410').style.animation =
            ' animate 70s linear infinite';
    } else {
        document.getElementById('left-wapper').getSVGDocument().getElementById('path61410').style.animation = '';
    }
    if (db.pump[6] === 1) {
        document.getElementById('left-wapper').getSVGDocument().getElementById('path61412').style.animation =
            ' animate 70s linear infinite';
    } else {
        document.getElementById('left-wapper').getSVGDocument().getElementById('path61412').style.animation = '';
    }
    if (db.pump[7] === 1) {
        document.getElementById('left-wapper').getSVGDocument().getElementById('path113136').style.animation =
            ' animate 70s linear infinite';
    } else {
        document.getElementById('left-wapper').getSVGDocument().getElementById('path113136').style.animation = '';
    }
    if (db.pump[8] === 1) {
        document.getElementById('left-wapper').getSVGDocument().getElementById('path113138').style.animation =
            ' animate 70s linear infinite';
    } else {
        document.getElementById('left-wapper').getSVGDocument().getElementById('path113138').style.animation = '';
    }
    if (db.pump[9] === 1) {
        document.getElementById('left-wapper').getSVGDocument().getElementById('path113662').style.animation =
            ' animate 70s linear infinite';
    } else {
        document.getElementById('left-wapper').getSVGDocument().getElementById('path113662').style.animation = '';
    }
    if (db.pump[10] === 1) {
        document.getElementById('left-wapper').getSVGDocument().getElementById('path113664').style.animation =
            ' animate 70s linear infinite';
    } else {
        document.getElementById('left-wapper').getSVGDocument().getElementById('path113664').style.animation = '';
    }
    if (db.pump[11] === 1) {
        document.getElementById('left-wapper').getSVGDocument().getElementById('path86961').style.animation =
            ' animate 70s linear infinite';
    } else {
        document.getElementById('left-wapper').getSVGDocument().getElementById('path86961').style.animation = '';
    }
    if (db.pump[12] === 1) {
        document.getElementById('left-wapper').getSVGDocument().getElementById('path86959').style.animation =
            ' animate 70s linear infinite';
    } else {
        document.getElementById('left-wapper').getSVGDocument().getElementById('path86959').style.animation = '';
    }
    if (db.pump[13] === 1) {
        document.getElementById('left-wapper').getSVGDocument().getElementById('path113794').style.animation =
            ' animate 70s linear infinite';
    } else {
        document.getElementById('left-wapper').getSVGDocument().getElementById('path113794').style.animation = '';
    }
    if (db.pump[14] === 1) {
        document.getElementById('left-wapper').getSVGDocument().getElementById('path113796').style.animation =
            ' animate 70s linear infinite';
    } else {
        document.getElementById('left-wapper').getSVGDocument().getElementById('path113796').style.animation = '';
    }

    // check chiller
    // chiller4
    for (var i = 1; i < 3; i++) {
        if (db.chill.chill4.comp[i] === 1) {
            document
                .getElementById('left-wapper')
                .getSVGDocument()
                .getElementById('chiller4_comp_' + i).style.fill = '#00ff37';
            document
                .getElementById('left-wapper')
                .getSVGDocument()
                .getElementById('chiller4_comp_' + i).style.animation = 'fanRotate 0.7s linear infinite';
            document
                .getElementById('left-wapper')
                .getSVGDocument()
                .getElementById('chiller4_comp_' + i).style.transformOrigin = 'center';
            document
                .getElementById('left-wapper')
                .getSVGDocument()
                .getElementById('chiller4_comp_' + i).style.transformBox = 'fill-box';
        } else {
            document
                .getElementById('left-wapper')
                .getSVGDocument()
                .getElementById('chiller4_comp_' + i).style.fill = '#ff0000';
            document
                .getElementById('left-wapper')
                .getSVGDocument()
                .getElementById('chiller4_comp_' + i).style.animation = '';
        }
    }

    // chiller5
    for (var i = 1; i < 3; i++) {
        if (db.chill.chill5.comp[i] === 1) {
            document
                .getElementById('left-wapper')
                .getSVGDocument()
                .getElementById('chiller5_comp_' + i).style.fill = '#00ff37';
            document
                .getElementById('left-wapper')
                .getSVGDocument()
                .getElementById('chiller5_comp_' + i).style.animation = 'fanRotate 0.7s linear infinite';
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
                .getElementById('chiller5_comp_' + i).style.fill = '#ff0000';
            document
                .getElementById('left-wapper')
                .getSVGDocument()
                .getElementById('chiller5_comp_' + i).style.animation = '';
        }
    }

    // chiller6
    for (var i = 1; i < 4; i++) {
        if (db.chill.chill6.comp[i] === 1) {
            document
                .getElementById('left-wapper')
                .getSVGDocument()
                .getElementById('chiller6_comp_' + i).style.fill = '#00ff37';
            document
                .getElementById('left-wapper')
                .getSVGDocument()
                .getElementById('chiller6_comp_' + i).style.animation = 'fanRotate 0.7s linear infinite';
            document
                .getElementById('left-wapper')
                .getSVGDocument()
                .getElementById('chiller6_comp_' + i).style.transformOrigin = 'center';
            document
                .getElementById('left-wapper')
                .getSVGDocument()
                .getElementById('chiller6_comp_' + i).style.transformBox = 'fill-box';
        } else {
            document
                .getElementById('left-wapper')
                .getSVGDocument()
                .getElementById('chiller6_comp_' + i).style.fill = '#ff0000';
            document
                .getElementById('left-wapper')
                .getSVGDocument()
                .getElementById('chiller6_comp_' + i).style.animation = '';
        }
    }

    // chiller7
    for (var i = 1; i < 3; i++) {
        if (db.chill.chill7.comp[i] === 1) {
            document
                .getElementById('left-wapper')
                .getSVGDocument()
                .getElementById('chiller7_comp_' + i).style.fill = '#00ff37';
            document
                .getElementById('left-wapper')
                .getSVGDocument()
                .getElementById('chiller7_comp_' + i).style.animation = 'fanRotate 0.7s linear infinite';
            document
                .getElementById('left-wapper')
                .getSVGDocument()
                .getElementById('chiller7_comp_' + i).style.transformOrigin = 'center';
            document
                .getElementById('left-wapper')
                .getSVGDocument()
                .getElementById('chiller7_comp_' + i).style.transformBox = 'fill-box';
        } else {
            document
                .getElementById('left-wapper')
                .getSVGDocument()
                .getElementById('chiller7_comp_' + i).style.fill = '#ff0000';
            document
                .getElementById('left-wapper')
                .getSVGDocument()
                .getElementById('chiller7_comp_' + i).style.animation = '';
        }
    }

    // check fan
    // chiller4
    for (var i = 1; i < 5; i++) {
        if (db.chill.chill4.fan[i] === 1) {
            document
                .getElementById('left-wapper')
                .getSVGDocument()
                .getElementById('chiller4_fan_' + i).style.fill = '#00ff37';
        } else {
            document
                .getElementById('left-wapper')
                .getSVGDocument()
                .getElementById('chiller4_fan_' + i).style.fill = '#ff0000';
        }
    }

    // chiller5
    for (var i = 1; i < 5; i++) {
        if (db.chill.chill5.fan[i] === 1) {
            document
                .getElementById('left-wapper')
                .getSVGDocument()
                .getElementById('chiller5_fan_' + i).style.fill = '#00ff37';
        } else {
            document
                .getElementById('left-wapper')
                .getSVGDocument()
                .getElementById('chiller5_fan_' + i).style.fill = '#ff0000';
        }
    }

    // chiller6
    for (var i = 1; i < 7; i++) {
        if (db.chill.chill6.fan[i] === 1) {
            document
                .getElementById('left-wapper')
                .getSVGDocument()
                .getElementById('chiller6_fan_' + i).style.fill = '#00ff37';
        } else {
            document
                .getElementById('left-wapper')
                .getSVGDocument()
                .getElementById('chiller6_fan_' + i).style.fill = '#ff0000';
        }
    }

    // chiller7
    for (var i = 1; i < 5; i++) {
        if (db.chill.chill7.fan[i] === 1) {
            document
                .getElementById('left-wapper')
                .getSVGDocument()
                .getElementById('chiller7_fan_' + i).style.fill = '#00ff37';
        }
        if (db.chill.chill7.fan[i] === 0) {
            document
                .getElementById('left-wapper')
                .getSVGDocument()
                .getElementById('chiller7_fan_' + i).style.fill = '#ff0000';
        }
    }

    // check spec
    // wetline
    if (
        Object.values(db.nhiệt_độ.wetline)[Object.values(db.nhiệt_độ.wetline).length - 1] > 23 ||
        Object.values(db.nhiệt_độ.wetline)[Object.values(db.nhiệt_độ.wetline).length - 1] < 20
    ) {
        document.getElementById('left-wapper').getSVGDocument().getElementById('path57659').style.fill = '#d40000';
    } else {
        document.getElementById('left-wapper').getSVGDocument().getElementById('path57659').style.fill = '';
    }

    // hotpress
    if (
        Object.values(db.nhiệt_độ.hotpress)[Object.values(db.nhiệt_độ.hotpress).length - 1] > 23 ||
        Object.values(db.nhiệt_độ.hotpress)[Object.values(db.nhiệt_độ.hotpress).length - 1] < 20
    ) {
        document.getElementById('left-wapper').getSVGDocument().getElementById('path16430').style.fill = '#d40000';
    } else {
        document.getElementById('left-wapper').getSVGDocument().getElementById('path16430').style.fill = '';
    }

    // chiller4
    if (
        Object.values(db.nhiệt_độ.chiller4)[Object.values(db.nhiệt_độ.chiller4).length - 1] > 23 ||
        Object.values(db.nhiệt_độ.chiller4)[Object.values(db.nhiệt_độ.chiller4).length - 1] < 20
    ) {
        document.getElementById('left-wapper').getSVGDocument().getElementById('path22063-4').style.fill = '#d40000';
    } else {
        document.getElementById('left-wapper').getSVGDocument().getElementById('path22063-4').style.fill = '';
    }

    // chiller5
    if (
        Object.values(db.nhiệt_độ.chiller5)[Object.values(db.nhiệt_độ.chiller5).length - 1] > 23 ||
        Object.values(db.nhiệt_độ.chiller5)[Object.values(db.nhiệt_độ.chiller5).length - 1] < 20
    ) {
        document.getElementById('left-wapper').getSVGDocument().getElementById('path106790').style.fill = '#d40000';
    } else {
        document.getElementById('left-wapper').getSVGDocument().getElementById('path106790').style.fill = '';
    }

    // chiller6
    if (
        Object.values(db.nhiệt_độ.chiller6)[Object.values(db.nhiệt_độ.chiller6).length - 1] > 23 ||
        Object.values(db.nhiệt_độ.chiller6)[Object.values(db.nhiệt_độ.chiller6).length - 1] < 20
    ) {
        document.getElementById('left-wapper').getSVGDocument().getElementById('path113180').style.fill = '#d40000';
    } else {
        document.getElementById('left-wapper').getSVGDocument().getElementById('path113180').style.fill = '';
    }

    // chiller7
    if (
        Object.values(db.nhiệt_độ.chiller7)[Object.values(db.nhiệt_độ.chiller7).length - 1] > 23 ||
        Object.values(db.nhiệt_độ.chiller7)[Object.values(db.nhiệt_độ.chiller7).length - 1] < 20
    ) {
        document.getElementById('left-wapper').getSVGDocument().getElementById('path113418').style.fill = '#d40000';
    } else {
        document.getElementById('left-wapper').getSVGDocument().getElementById('path113418').style.fill = '';
    }

    // hotpress machine 1
    if (db.nhiệt_độ.nước_về.hotpress_machine_1 > 23 || db.nhiệt_độ.nước_về.hotpress_machine_1 < 20) {
        document.getElementById('left-wapper').getSVGDocument().getElementById('path106790-1').style.fill = '#d40000';
    } else {
        document.getElementById('left-wapper').getSVGDocument().getElementById('path106790-1').style.fill = '';
    }

    // hotpress machine 2
    if (db.nhiệt_độ.nước_về.hotpress_machine_2 > 23 || db.nhiệt_độ.nước_về.hotpress_machine_2 < 20) {
        document.getElementById('left-wapper').getSVGDocument().getElementById('rect43688').style.fill = '#d40000';
    } else {
        document.getElementById('left-wapper').getSVGDocument().getElementById('rect43688').style.fill = '';
    }

    // copper line 1
    if (db.nhiệt_độ.nước_về.copper_line_1 > 23 || db.nhiệt_độ.nước_về.copper_line_1 < 20) {
        document.getElementById('left-wapper').getSVGDocument().getElementById('rect313556').style.fill = '#d40000';
    } else {
        document.getElementById('left-wapper').getSVGDocument().getElementById('rect313556').style.fill = '';
    }

    // copper line 2
    if (db.nhiệt_độ.nước_về.copper_line_2 > 23 || db.nhiệt_độ.nước_về.copper_line_2 < 20) {
        document.getElementById('left-wapper').getSVGDocument().getElementById('rect119697').style.fill = '#d40000';
    } else {
        document.getElementById('left-wapper').getSVGDocument().getElementById('rect119697').style.fill = '';
    }
};
