setInterval(() => {
    read();
}, 1000);

var connect = document.getElementById('connect');
const read = async () => {
    try {
        const response = await axios.get('./data.json');
        connect.classList.add('green');
        connectAll(response.data);
        readData(response.data);
        check(response.data);
    } catch {}
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
                label: 'Mực nước Tank Hot Press',
                data: db.mực_nước.hotpress,
                backgroundColor: 'rgba(255, 99, 132)',
            },
            {
                label: 'Mực nước Tank Wet Line',
                data: db.mực_nước.wetline,
                backgroundColor: 'rgba(255, 159, 64)',
            },
        ],
    };

    new Chart(ctx, {
        type: 'bar',
        data: data,
    });

    // Nhiệt độ nước
    const ctx1 = document.getElementById('myChart1');
    const data1 = {
        datasets: [
            {
                label: 'Nhiệt độ Tank Hot Press',
                borderWidth: 1, // độ dày
                borderColor: 'rgb(255, 99, 132)', // màu line
                pointRadius: 0, // điển chấm data trên line
                tension: 0.5, //độ uốn của line
                backgroundColor: 'rgb(255, 99, 132)',
            },
            {
                label: 'Nhiệt độ Tank Wet Line',
                borderWidth: 1, // độ dày
                borderColor: 'rgb(255, 159, 64)', // màu line
                pointRadius: 0, // điển chấm data trên line
                tension: 0.5, //độ uốn của line,
                backgroundColor: 'rgb(255, 159, 64)',
            },
        ],
    };

    setInterval(() => {
        data1.datasets[0].data.push({
            x: Date.now(),
            // y: Object.values(db.nhiệt_độ.hotpress)[Object.values(db.nhiệt_độ.hotpress).length - 1],
            y: Math.floor(Math.random() * 20) + 10,
        });
        data1.datasets[1].data.push({
            x: Date.now(),
            y: Object.values(db.nhiệt_độ.wetline)[Object.values(db.nhiệt_độ.wetline).length - 1],
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
};

const check = (db) => {
    for (var i = 1; i < 10; i++) {
        if (db) {
            document
                .getElementById('left-wapper')
                .getSVGDocument()
                .getElementById('chill' + i).style.opacity = 0;
        }
    }
    for (var i = 1; i < 15; i++) {
        if (db) {
            document
                .getElementById('left-wapper')
                .getSVGDocument()
                .getElementById('pump' + i).style.opacity = 0;
        }
    }
    if (db) {
        document
            .getElementById('left-wapper')
            .getSVGDocument()
            .getElementById('style1190')
            .append('@import url(../css/styleSvg.css)');
        document.getElementById('left-wapper').getSVGDocument().getElementById('path801').style.fill = '#00ff37';
        document.getElementById('left-wapper').getSVGDocument().getElementById('path803').style.fill = '#00ff37';
        document.getElementById('left-wapper').getSVGDocument().getElementById('path801').style.animation =
            'fanRotate 1s linear infinite';
        document.getElementById('left-wapper').getSVGDocument().getElementById('path801').style.transformOrigin =
            'center';
        document.getElementById('left-wapper').getSVGDocument().getElementById('path801').style.transformBox =
            'fill-box';

    }
};
