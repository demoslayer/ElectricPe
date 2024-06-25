const express=require('express');
const bodyParser=require('body-parser');

const app=express();

app.use(bodyParser.json());


//class location consist of latitude and longitude, that is used to store the location of the charger
class Location {
    constructor(latitude,longitude) {
        this.latitude=latitude;
        this.longitude=longitude;
    }
}


//class charger consist of id, name, location and charger is available or not
class Charger {
    constructor(id,name,latitude,longitude,available=true) {
        this.id=id;
        this.name=name;
        this.location=new Location(latitude,longitude);
        this.available=available;
    }
}


//class Booking consist of userId, chargerId, startTime, endTime, cost, initially endTime and cost we are keeping null because we dont know at starting
class Booking {
    constructor(userId,chargerId,startTime) {
        this.userId=userId;
        this.chargerId=chargerId;
        this.startTime=startTime;
        this.endTime=null;
        this.cost=null;
    }
}

//Taking mannuallly some chargers location with their id, name, latitude and longitude
const chargers=[
    new Charger(1,'Maharajganj',37.7749,-122.4194),
    new Charger(2, 'Gorakhpur',34.0522,-118.2437),
    new Charger(3, 'Deoria',40.7128,-74.0060),
    new Charger(4, 'Basti',51.5074,-0.1278),
    new Charger(5, 'Ghaziabad',48.8566,2.3522),
];

const bookings = [];

//Function to calculate the distance between two locations using Euclidean distance formula
function calculateDistance(loc1, loc2) {
    return Math.sqrt((loc1.latitude - loc2.latitude) ** 2 + (loc1.longitude - loc2.longitude) ** 2);
}

app.get('/chargers/nearest', (req, res) => {
    const {latitude,longitude}=req.query;
    if (!latitude||!longitude) {
        return res.status(400).json({ message:'Latitude and longitude are required'});
    }

    const userLocation = { latitude:parseFloat(latitude),longitude:parseFloat(longitude)};
    let nearestCharger=null;
    let minDistance=Infinity;

    chargers.forEach(charger => {
        const distance= calculateDistance(userLocation,charger.location);
        if (distance<minDistance) {
            nearestCharger=charger;
            minDistance=distance;
        }
    });

    if (!nearestCharger) {
        return res.status(404).json({ message:'No chargers found' });
    }

    res.json(nearestCharger);
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});