const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());


//class location consist of latitude and longitude, that is used to store the location of the charger
class Location {
    constructor(latitude, longitude) {
        this.latitude = latitude;
        this.longitude = longitude;
    }
}


//class charger consist of id, name, location and charger is available or not
class Charger {
    constructor(id, name, latitude, longitude, available = true) {
        this.id = id;
        this.name = name;
        this.location = new Location(latitude, longitude);
        this.available = available;
    }
}


//class Booking consist of userId, chargerId, startTime, endTime, cost, initially endTime and cost we are keeping null because we dont know at starting
class Booking {
    constructor(userId, chargerId, startTime) {
        this.userId = userId;
        this.chargerId = chargerId;
        this.startTime = startTime;
        this.endTime = null;
        this.cost = null;
    }
}



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});