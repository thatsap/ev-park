// src/server.ts
import express from "express";
import cors from "cors";
import { EvCase } from "./cases/EvCases";
import { evInfo } from "./constant";
import { EvWorkerManager } from "./state/EvManager";

const app = express();
const port = 3000;

// Enable CORS for cross-origin requests from your frontend (e.g., Vite on port 5173)
app.use(cors());
app.use(express.json());

// Mock data for each status
const evData = {
  charging: {
    status: "Charging",
    battery_level: 75,
    time_remaining: "1h 45m",
    station_name: "Downtown EV Station",
    power_output: "50 kW",
  },
  progress: {
    trip_distance: "150 km",
    energy_used: "25 kWh",
    avg_speed: "60 km/h",
    estimated_range: "180 km",
  },
  hazard_control: {
    warnings: [
      {
        type: "Low Battery",
        severity: "Medium",
        message: "Battery below 20%, charge soon.",
      },
      {
        type: "Overheating",
        severity: "Low",
        message: "Motor temperature slightly elevated.",
      },
    ],
    active: true,
  },
  tire_pressure: {
    front_left: 2.5,
    front_right: 2.4,
    rear_left: 2.6,
    rear_right: 2.3,
    unit: "bar",
    status: "Normal",
  },
  penalty: {
    active_penalties: [
      {
        id: "PEN123",
        reason: "Overstayed parking",
        amount: 50.0,
        currency: "USD",
        due_date: "2025-04-01",
      },
    ],
    total_outstanding: 50.0,
  },
  needs_service: {
    status: "Pending",
    last_service: "2025-01-15",
    issues: [
      {
        component: "Brake Pads",
        description: "Worn, needs replacement",
        urgency: "High",
      },
      {
        component: "Battery Check",
        description: "Routine maintenance",
        urgency: "Low",
      },
    ],
  },
  inform_service_centers: {
    centers_notified: [
      {
        name: "EV Service Hub",
        location: "123 Main St, City",
        contact: "+1-555-123-4567",
        notified_at: "2025-03-22T10:00:00Z",
      },
    ],
    status: "Notified",
  },
  parking: {
    available_spots: 3,
    location: { name: "Central Parking Lot", lat: 40.7128, lng: -74.006 },
    time_limit: "2 hours",
    status: "Occupied",
  },
  map: {
    gps_tracking: {
      current_location: { lat: 40.73061, lng: -73.935242 },
      speed: "45 km/h",
      heading: "North",
    },
    nearest_service_centers: [
      { name: "EV Service Hub", distance: "2.5 km", lat: 40.735, lng: -73.94 },
      {
        name: "Quick Charge Station",
        distance: "4.1 km",
        lat: 40.72,
        lng: -73.95,
      },
    ],
    designated_parking_zones: [
      { name: "Zone A", lat: 40.728, lng: -73.93, spots_available: 5 },
    ],
  },
  auth: {
    user: {
      id: "USR123",
      username: "ev_user",
      email: "user@example.com",
      status: "Logged In",
      last_login: "2025-03-22T12:30:00Z",
    },
    signup_pending: false,
  },
  payment: {
    transactions: [
      {
        id: "TXN001",
        type: "Charging Fee",
        amount: 15.99,
        currency: "USD",
        date: "2025-03-20T14:00:00Z",
        status: "Completed",
      },
      {
        id: "TXN002",
        type: "Penalty Payment",
        amount: 50.0,
        currency: "USD",
        date: "2025-03-22T09:00:00Z",
        status: "Pending",
      },
    ],
    balance_due: 50.0,
  },
};

export const evWorkerManager = EvWorkerManager.getInstance();

// Individual API endpoints for each status
app.get("/api/charging", (req, res) => res.json(evData.charging));
app.get("/api/progress", (req, res) => res.json(evData.progress));
app.get("/api/hazard_control", (req, res) => res.json(evData.hazard_control));
app.get("/api/tire_pressure", (req, res) => res.json(evData.tire_pressure));
app.get("/api/penalty", (req, res) => res.json(evData.penalty));
app.get("/api/needs_service", (req, res) => res.json(evData.needs_service));
app.get("/api/inform_service_centers", (req, res) =>
  res.json(evData.inform_service_centers)
);
app.get("/api/parking", (req, res) => res.json(evData.parking));
app.get("/api/map", (req, res) => res.json(evData.map));
app.get("/api/auth", (req, res) => res.json(evData.auth));
app.get("/api/payment", (req, res) => res.json(evData.payment));

// API endpoint to get all EVs
app.get("/api/evs", (req, res) => res.json(evWorkerManager.getEvs()));

// add worker api
app.post("/api/add-worker", (req, res) => {
  const { id, evId, timeRideStarted } = req.body;
  const evCase = evWorkerManager.getEvCase(evId) as EvCase;
  evWorkerManager.addWorker(id, evCase, timeRideStarted);
  res.sendStatus(200);
});

// remove worker api
app.post("/api/remove-worker", (req, res) => {
  const { id } = req.body;
  evWorkerManager.removeWorker(id);
  res.sendStatus(200);
});

// update worker distance api
app.post("/api/update-worker-distance", (req, res) => {
  const { id, distance } = req.body;
  const worker = evWorkerManager.getWorker(id);
  if (worker) worker.addDistanceTravelled(distance);
  res.sendStatus(200);
});

//update idle time api
app.post("/api/update-worker-idle-time", (req, res) => {
  const { id, idleTime } = req.body;
  const worker = evWorkerManager.getWorker(id);
  if (worker) worker.addIdleTime(idleTime);
  res.sendStatus(200);
});

//get billing details api
app.post("/api/get-billing-details", (req, res) => {
  const { id } = req.body;
  const worker = evWorkerManager.getWorker(id);
  if (worker) {
    res.json(worker.billingDetails);
  } else {
    res.sendStatus(404);
  }
});

//get worker details api
app.post("/api/get-worker-details", (req, res) => {
  const { id } = req.body;
  const worker = evWorkerManager.getWorker(id);
  if (worker) res.json(worker.workerDetails);
  res.sendStatus(200);
});

// run a loop at every 30 seconds and trigger increase charge in all evs
setInterval(() => {
  evWorkerManager.increaseChargeInAllEvs();
}, 30000);

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
