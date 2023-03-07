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
    } catch {}
};


const connectAll = (db) => {
    const ctx = document.getElementById('myChart');
    var dt = new Date();
    var month = dt.getMonth() + 1;
    var year = dt.getFullYear();

    var daysInMonth = new Date(year, month, 0).getDate();
    const labels = [];

    for (let i = 1; i <= daysInMonth; ++i) {
        labels.push(i.toString());
    }

    // Mực nước
    const data = {
        labels: labels,
        datasets: [
            {
                label: 'PCW Tank Hot Press',
                data: db.mực_nước.hotpress,
                backgroundColor: ['rgba(255, 99, 132)'],
            },
            {
                label: 'PCW Tank Wet Line',
                data: db.mực_nước.wetline,
                backgroundColor: ['rgba(255, 159, 64)'],
            },
        ],
    };

    new Chart(ctx, {
        type: 'bar',
        data: data,
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                },
            },
        },
    });

    // Nhiệt độ nước
    const ctx1 = document.getElementById('myChart1');
    const data1 = {
        labels: labels,
        datasets: [
            {
                label: 'PCW Tank Hot Press',
                data: db.nhiệt_độ.hotpress,
                backgroundColor: ['rgb(255, 99, 132)'],
            },
            {
                label: 'PCW Tank Wet Line',
                data: db.nhiệt_độ.wetline,
                backgroundColor: ['rgb(255, 159, 64)'],
            },
        ],
    };

    new Chart(ctx1, {
        type: 'bar',
        data: data1,
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                },
            },
        },
    });
};

const readData = (db) => {
    document.getElementById('left-wapper').getSVGDocument().getElementById("hotpress_level").textContent = Object.values(db.mực_nước.hotpress)[Object.values(db.mực_nước.hotpress).length - 1];
    document.getElementById('left-wapper').getSVGDocument().getElementById("hotpress_temp").textContent = Object.values(db.nhiệt_độ.hotpress)[Object.values(db.nhiệt_độ.hotpress).length - 1];
    // document.getElementById('left-wapper').getSVGDocument().getElementById("chiller4").textContent = Object.values(db.nhiệt_độ.hotpress)[Object.values(db.nhiệt_độ.hotpress).length - 1];
    document.getElementById('left-wapper').getSVGDocument().getElementById("wetline_level").textContent = Object.values(db.mực_nước.wetline)[Object.values(db.mực_nước.wetline).length - 1];
    document.getElementById('left-wapper').getSVGDocument().getElementById("wetline_temp").textContent = Object.values(db.nhiệt_độ.wetline)[Object.values(db.nhiệt_độ.wetline).length - 1];
    // document.getElementById('left-wapper').getSVGDocument().getElementById("chiller5").textContent = Object.values(db.nhiệt_độ.wetline)[Object.values(db.nhiệt_độ.wetline).length - 1];

}



