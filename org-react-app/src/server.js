const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const port = process.env.PORT || 5000;

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST'],
  credentials: true
}));
app.use(bodyParser.json());

// In-memory data store
let organizationData = {
  name: "CEO",
  employees: [{ name: "John Doe" }],
  children: []
};

// WebSocket connection handler
wss.on('connection', (ws) => {
  console.log('Client connected');
  
  // Send the initial organization data to the client
  ws.send(JSON.stringify({ type: 'initial', data: organizationData }));

  ws.on('message', (message) => {
    const parsedMessage = JSON.parse(message);
    console.log('Received:', parsedMessage);
    // Handle different types of messages here
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

// Broadcast updates to all connected clients
function broadcastUpdate() {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({ type: 'update', data: organizationData }));
    }
  });
}

// Get organization hierarchy
app.get('/api/organization-hierarchy', (req, res) => {
  res.json(organizationData);
});

// Add designation
app.post('/api/add-designation', (req, res) => {
  const { name, parentDesignation } = req.body;
  
  const newDesignation = {
    name,
    employees: [],
    children: []
  };

  if (!parentDesignation) {
    organizationData.children.push(newDesignation);
  } else {
    // Find parent designation and add new designation as its child
    const addToChildren = (node) => {
      if (node.name === parentDesignation) {
        node.children.push(newDesignation);
        return true;
      }
      for (let child of node.children) {
        if (addToChildren(child)) return true;
      }
      return false;
    };

    if (!addToChildren(organizationData)) {
      return res.status(400).json({ error: "Parent designation not found" });
    }
  }

  broadcastUpdate();
  res.status(201).json(newDesignation);
});

// Add employee
app.post('/api/add-employee', (req, res) => {
  const { name, designation } = req.body;
  
  const newEmployee = { name };

  const addToDesignation = (node) => {
    if (node.name === designation) {
      node.employees.push(newEmployee);
      return true;
    }
    for (let child of node.children) {
      if (addToDesignation(child)) return true;
    }
    return false;
  };

  if (!addToDesignation(organizationData)) {
    return res.status(400).json({ error: "Designation not found" });
  }

  broadcastUpdate();
  res.status(201).json(newEmployee);
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

server.on('error', (error) => {
  console.error('Server error:', error);
});

