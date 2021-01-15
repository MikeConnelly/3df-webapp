var axios = require('axios');

axios.post('http://localhost:3000/api/data', {
    roll: 90,
    pitch: 90,
    yaw: 90,
    yAxis: 10
});
