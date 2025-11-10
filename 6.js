// Navigation functionality
document.addEventListener('DOMContentLoaded', function () {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            // Remove active class from all links and sections
            navLinks.forEach(l => l.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));

            // Add active class to clicked link
            this.classList.add('active');

            // Show corresponding section
            const sectionId = this.getAttribute('data-section');
            document.getElementById(sectionId).classList.add('active');
        });
    });

    // Initialize signal strength animations
    setTimeout(() => {
        document.getElementById('signal1').style.width = '95%';
    }, 300);
    setTimeout(() => {
        document.getElementById('signal2').style.width = '87%';
    }, 600);
    setTimeout(() => {
        document.getElementById('signal3').style.width = '97%';
    }, 900);
    setTimeout(() => {
        document.getElementById('signal4').style.width = '90%';
    }, 1200);

    // Initialize all visualizations
    initNetworkVisualization();
    initTopologyVisualization();
    initPerformanceChart();
    initThreatGauge();
    initDataFlowVisualization();

    // Initialize real-time data connections
    initRealTimeData();

    // Populate initial data
    populateNodeList();
    populateSecurityEvents();
});

// Real-time data simulation
function initRealTimeData() {
    // Simulate real-time data updates
    setInterval(() => {
        updateConnectionStatus();
        updatePerformanceMetrics();
        updateDeviceCounts();
        updateSecurityStatus();
        updateAnalyticsData();
    }, 5000);

    // Initial update
    updateConnectionStatus();
    updatePerformanceMetrics();
    updateDeviceCounts();
    updateSecurityStatus();
    updateAnalyticsData();
}

function updateConnectionStatus() {
    const statusDot = document.getElementById('connectionStatus');
    const statusText = document.getElementById('connectionText');

    // Simulate connection status (95% chance of being connected)
    if (Math.random() > 0.05) {
        statusDot.classList.remove('offline');
        statusText.textContent = 'Connected to 6G Network';
    } else {
        statusDot.classList.add('offline');
        statusText.textContent = 'Connection Lost - Reconnecting...';
    }
}

function updatePerformanceMetrics() {
    // Simulate fluctuating performance metrics
    const downloadSpeed = (10 + Math.random() * 5).toFixed(1);
    const uploadSpeed = (7 + Math.random() * 3).toFixed(1);
    const dataUsage = (0.8 + Math.random() * 0.8).toFixed(1);

    document.getElementById('downloadSpeed').textContent = `${downloadSpeed} Gbps`;
    document.getElementById('uploadSpeed').textContent = `${uploadSpeed} Gbps`;
    document.getElementById('dataUsage').textContent = `${dataUsage} TB`;

    // Update progress bars
    document.getElementById('downloadProgress').style.width = `${(downloadSpeed / 15) * 100}%`;
    document.getElementById('uploadProgress').style.width = `${(uploadSpeed / 10) * 100}%`;
    document.getElementById('dataUsageProgress').style.width = `${(dataUsage / 2) * 100}%`;

    // Update performance section metrics
    document.getElementById('peakThroughput').textContent = `${(parseFloat(downloadSpeed) + 2).toFixed(1)} Gbps`;
    document.getElementById('avgLatency').textContent = `${(0.5 + Math.random() * 0.5).toFixed(1)} ms`;
    document.getElementById('packetLoss').textContent = `${(0.005 + Math.random() * 0.01).toFixed(2)}%`;
}

function updateDeviceCounts() {
    // Simulate fluctuating device counts
    const activeDevices = Math.floor(200 + Math.random() * 100);
    const iotSensors = Math.floor(1500 + Math.random() * 500);
    const aiNodes = Math.floor(50 + Math.random() * 20);

    document.getElementById('activeDevices').textContent = activeDevices;
    document.getElementById('iotSensors').textContent = iotSensors.toLocaleString();
    document.getElementById('aiNodes').textContent = aiNodes;

    // Update progress bars
    document.getElementById('activeDevicesProgress').style.width = `${(activeDevices / 300) * 100}%`;
    document.getElementById('iotSensorsProgress').style.width = `${(iotSensors / 2000) * 100}%`;
    document.getElementById('aiNodesProgress').style.width = `${(aiNodes / 70) * 100}%`;
}

function updateSecurityStatus() {
    // Simulate security status changes
    const threatLevels = ['LOW', 'MEDIUM', 'HIGH'];
    const statusMessages = [
        'All Systems Secure',
        'Minor Security Events Detected',
        'Elevated Threat Level - Monitoring'
    ];

    const randomIndex = Math.floor(Math.random() * 3);

    document.getElementById('threatValue').textContent = threatLevels[randomIndex];
    document.getElementById('threatStatus').textContent = statusMessages[randomIndex];

    // Update threat gauge
    updateThreatGauge(randomIndex);
}

function updateAnalyticsData() {
    // Simulate analytics data updates
    const dataProcessed = (20 + Math.random() * 10).toFixed(1);
    const aiDecisions = (1 + Math.random() * 0.5).toFixed(1);
    const predictiveAccuracy = (97 + Math.random() * 2).toFixed(1);
    const countriesConnected = Math.floor(180 + Math.random() * 10);

    document.getElementById('dataProcessed').textContent = `${dataProcessed} PB`;
    document.getElementById('aiDecisions').textContent = `${aiDecisions}M`;
    document.getElementById('predictiveAccuracy').textContent = `${predictiveAccuracy}%`;
    document.getElementById('countriesConnected').textContent = countriesConnected;
}

function updateThreatGauge(level) {
    const canvas = document.getElementById('threatGauge');
    const ctx = canvas.getContext('2d');

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    function drawGauge() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = Math.min(centerX, centerY) - 10;

        // Draw gauge background
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI, true);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.lineWidth = 20;
        ctx.stroke();

        // Draw threat level based on current level
        let endAngle;
        let color;

        switch (level) {
            case 0: // LOW
                endAngle = Math.PI * 0.3;
                color = 'rgba(0, 247, 255, 0.8)';
                break;
            case 1: // MEDIUM
                endAngle = Math.PI * 0.6;
                color = 'rgba(255, 165, 0, 0.8)';
                break;
            case 2: // HIGH
                endAngle = Math.PI * 0.9;
                color = 'rgba(255, 71, 87, 0.8)';
                break;
        }

        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, endAngle, false);
        ctx.strokeStyle = color;
        ctx.lineWidth = 20;
        ctx.stroke();

        // Draw needle
        const needleAngle = endAngle * 0.5; // Point to middle of threat level
        const needleLength = radius - 20;

        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(
            centerX + Math.cos(needleAngle) * needleLength,
            centerY + Math.sin(needleAngle) * needleLength
        );
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.lineWidth = 3;
        ctx.stroke();

        // Draw center circle
        ctx.beginPath();
        ctx.arc(centerX, centerY, 8, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.fill();
    }

    drawGauge();
}

function populateNodeList() {
    const nodeList = document.getElementById('nodeList');
    const nodes = [
        { name: "Core Router Alpha", latency: "0.4ms", uptime: "99.99%", status: "active" },
        { name: "Edge Node 42", latency: "0.8ms", uptime: "99.87%", status: "active" },
        { name: "Satellite Relay Gamma", latency: "2.1ms", uptime: "99.95%", status: "active" },
        { name: "Backup Node 7", latency: "N/A", uptime: "0%", status: "inactive" },
        { name: "AI Processing Unit", latency: "0.3ms", uptime: "100%", status: "active" },
        { name: "Quantum Encryption Node", latency: "0.5ms", uptime: "99.98%", status: "active" },
        { name: "Terahertz Transceiver", latency: "0.6ms", uptime: "99.92%", status: "active" }
    ];

    nodeList.innerHTML = '';

    nodes.forEach(node => {
        const nodeItem = document.createElement('div');
        nodeItem.className = 'node-item';

        nodeItem.innerHTML = `
                    <div class="node-status ${node.status}"></div>
                    <div class="node-info">
                        <div class="node-name">${node.name}</div>
                        <div class="node-details">Latency: ${node.latency} | Uptime: ${node.uptime}</div>
                    </div>
                `;

        nodeList.appendChild(nodeItem);
    });
}

function populateSecurityEvents() {
    const securityEvents = document.getElementById('securityEvents');
    const events = [
        { type: "info", title: "Quantum Encryption Activated", time: "2 minutes ago" },
        { type: "warning", title: "Unusual Data Pattern Detected", time: "15 minutes ago" },
        { type: "info", title: "AI Security Scan Completed", time: "1 hour ago" },
        { type: "critical", title: "DDoS Mitigation Activated", time: "3 hours ago" },
        { type: "info", title: "Firewall Rules Updated", time: "5 hours ago" },
        { type: "warning", title: "Suspicious Login Attempt", time: "6 hours ago" },
        { type: "info", title: "Security Certificate Renewed", time: "12 hours ago" }
    ];

    securityEvents.innerHTML = '';

    events.forEach(event => {
        const eventItem = document.createElement('div');
        eventItem.className = 'event-item';

        let icon;
        switch (event.type) {
            case "critical":
                icon = "🚨";
                break;
            case "warning":
                icon = "⚠️";
                break;
            case "info":
            default:
                icon = "ℹ️";
                break;
        }

        eventItem.innerHTML = `
                    <div class="event-icon ${event.type}">${icon}</div>
                    <div class="event-details">
                        <div class="event-title">${event.title}</div>
                        <div class="event-time">${event.time}</div>
                    </div>
                `;

        securityEvents.appendChild(eventItem);
    });
}

// Network Visualization for Dashboard
function initNetworkVisualization() {
    const canvas = document.getElementById('networkCanvas');
    const ctx = canvas.getContext('2d');

    // Set canvas dimensions
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Node class for network visualization
    class Node {
        constructor(x, y, radius, color, speed) {
            this.x = x;
            this.y = y;
            this.radius = radius;
            this.color = color;
            this.speed = speed;
            this.dx = (Math.random() - 0.5) * speed;
            this.dy = (Math.random() - 0.5) * speed;
            this.connections = [];
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();

            // Add glow effect
            ctx.shadowColor = this.color;
            ctx.shadowBlur = 15;
            ctx.fill();
            ctx.shadowBlur = 0;
        }

        update(nodes) {
            // Move node
            this.x += this.dx;
            this.y += this.dy;

            // Bounce off walls
            if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
                this.dx = -this.dx;
            }
            if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
                this.dy = -this.dy;
            }

            // Draw connections to nearby nodes
            this.connections = [];
            nodes.forEach(node => {
                if (node !== this) {
                    const distance = Math.sqrt(
                        Math.pow(this.x - node.x, 2) +
                        Math.pow(this.y - node.y, 2)
                    );

                    if (distance < 150) {
                        this.connections.push(node);

                        // Draw connection line
                        ctx.beginPath();
                        ctx.moveTo(this.x, this.y);
                        ctx.lineTo(node.x, node.y);
                        ctx.strokeStyle = `rgba(0, 247, 255, ${0.3 - distance / 500})`;
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                }
            });

            this.draw();
        }
    }

    // Create nodes
    const nodes = [];
    const nodeColors = [
        'rgba(0, 247, 255, 0.8)',
        'rgba(123, 0, 255, 0.8)',
        'rgba(255, 0, 200, 0.8)'
    ];

    for (let i = 0; i < 25; i++) {
        const radius = Math.random() * 5 + 3;
        const x = Math.random() * (canvas.width - radius * 2) + radius;
        const y = Math.random() * (canvas.height - radius * 2) + radius;
        const color = nodeColors[Math.floor(Math.random() * nodeColors.length)];
        const speed = Math.random() * 1 + 0.5;

        nodes.push(new Node(x, y, radius, color, speed));
    }

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw hexagon pattern in background
        drawHexagonPattern();

        // Update and draw nodes
        nodes.forEach(node => {
            node.update(nodes);
        });
    }

    // Draw hexagon background pattern
    function drawHexagonPattern() {
        const hexSize = 40;
        const hexWidth = Math.sqrt(3) * hexSize;
        const hexHeight = 2 * hexSize;

        for (let y = 0; y < canvas.height; y += hexHeight * 0.75) {
            for (let x = 0; x < canvas.width; x += hexWidth) {
                const offset = (y / (hexHeight * 0.75)) % 2 === 0 ? 0 : hexWidth / 2;

                ctx.beginPath();
                for (let i = 0; i < 6; i++) {
                    const angle = (Math.PI / 3) * i;
                    const hx = x + offset + hexSize * Math.cos(angle);
                    const hy = y + hexSize * Math.sin(angle);
                    if (i === 0) {
                        ctx.moveTo(hx, hy);
                    } else {
                        ctx.lineTo(hx, hy);
                    }
                }
                ctx.closePath();
                ctx.strokeStyle = 'rgba(0, 247, 255, 0.05)';
                ctx.lineWidth = 1;
                ctx.stroke();
            }
        }
    }

    // Start animation
    animate();

    // Handle window resize
    window.addEventListener('resize', function () {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    });
}

// Network Topology Visualization
function initTopologyVisualization() {
    const canvas = document.getElementById('topologyCanvas');
    const ctx = canvas.getContext('2d');

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Draw a hierarchical network topology
    function drawTopology() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Core nodes (center)
        const coreNodes = [
            { x: canvas.width / 2, y: canvas.height / 2, name: "Core", type: "core" }
        ];

        // Distribution nodes (middle ring)
        const distNodes = [];
        const distCount = 5;
        for (let i = 0; i < distCount; i++) {
            const angle = (i / distCount) * Math.PI * 2;
            const x = canvas.width / 2 + Math.cos(angle) * 150;
            const y = canvas.height / 2 + Math.sin(angle) * 150;
            distNodes.push({ x, y, name: `Dist ${i + 1}`, type: "distribution" });
        }

        // Access nodes (outer ring)
        const accessNodes = [];
        const accessPerDist = 3;
        distNodes.forEach(distNode => {
            for (let i = 0; i < accessPerDist; i++) {
                const angle = Math.random() * Math.PI * 2;
                const distance = 100 + Math.random() * 50;
                const x = distNode.x + Math.cos(angle) * distance;
                const y = distNode.y + Math.sin(angle) * distance;
                accessNodes.push({ x, y, name: `Access`, type: "access" });
            }
        });

        // Draw connections
        ctx.strokeStyle = 'rgba(0, 247, 255, 0.3)';
        ctx.lineWidth = 1;

        // Core to distribution
        distNodes.forEach(node => {
            ctx.beginPath();
            ctx.moveTo(coreNodes[0].x, coreNodes[0].y);
            ctx.lineTo(node.x, node.y);
            ctx.stroke();
        });

        // Distribution to access
        accessNodes.forEach(node => {
            // Find closest distribution node
            let closestDist = distNodes[0];
            let minDist = Number.MAX_VALUE;

            distNodes.forEach(distNode => {
                const dist = Math.sqrt(
                    Math.pow(node.x - distNode.x, 2) +
                    Math.pow(node.y - distNode.y, 2)
                );
                if (dist < minDist) {
                    minDist = dist;
                    closestDist = distNode;
                }
            });

            ctx.beginPath();
            ctx.moveTo(closestDist.x, closestDist.y);
            ctx.lineTo(node.x, node.y);
            ctx.stroke();
        });

        // Draw nodes
        function drawNode(x, y, type) {
            ctx.beginPath();
            ctx.arc(x, y, 8, 0, Math.PI * 2);

            if (type === "core") {
                ctx.fillStyle = 'rgba(255, 0, 200, 0.8)';
            } else if (type === "distribution") {
                ctx.fillStyle = 'rgba(0, 247, 255, 0.8)';
            } else {
                ctx.fillStyle = 'rgba(123, 0, 255, 0.8)';
            }

            ctx.fill();

            // Add glow
            ctx.shadowColor = ctx.fillStyle;
            ctx.shadowBlur = 15;
            ctx.fill();
            ctx.shadowBlur = 0;
        }

        // Draw all nodes
        drawNode(coreNodes[0].x, coreNodes[0].y, coreNodes[0].type);
        distNodes.forEach(node => drawNode(node.x, node.y, node.type));
        accessNodes.forEach(node => drawNode(node.x, node.y, node.type));
    }

    drawTopology();

    // Animate the topology
    setInterval(drawTopology, 2000);
}

// Performance Chart
function initPerformanceChart() {
    const canvas = document.getElementById('performanceChart');
    const ctx = canvas.getContext('2d');

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Generate random performance data
    const data = {
        labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'],
        throughput: [10.2, 8.7, 12.4, 14.8, 11.3, 9.5, 7.8],
        latency: [0.8, 0.9, 0.5, 0.4, 0.7, 1.2, 1.5]
    };

    // Draw the chart
    function drawChart() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const padding = 40;
        const chartWidth = canvas.width - padding * 2;
        const chartHeight = canvas.height - padding * 2;

        // Draw grid
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.lineWidth = 1;

        // Horizontal grid lines
        for (let i = 0; i <= 5; i++) {
            const y = padding + (i / 5) * chartHeight;
            ctx.beginPath();
            ctx.moveTo(padding, y);
            ctx.lineTo(canvas.width - padding, y);
            ctx.stroke();

            // Y-axis labels
            ctx.fillStyle = 'rgba(224, 248, 255, 0.7)';
            ctx.font = '12px Arial';
            ctx.textAlign = 'right';
            ctx.fillText((15 - i * 3).toFixed(1) + ' Gbps', padding - 10, y + 4);
        }

        // Vertical grid lines
        for (let i = 0; i < data.labels.length; i++) {
            const x = padding + (i / (data.labels.length - 1)) * chartWidth;
            ctx.beginPath();
            ctx.moveTo(x, padding);
            ctx.lineTo(x, canvas.height - padding);
            ctx.stroke();

            // X-axis labels
            ctx.fillStyle = 'rgba(224, 248, 255, 0.7)';
            ctx.font = '12px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(data.labels[i], x, canvas.height - padding + 20);
        }

        // Draw throughput line
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(0, 247, 255, 0.8)';
        ctx.lineWidth = 3;

        for (let i = 0; i < data.throughput.length; i++) {
            const x = padding + (i / (data.throughput.length - 1)) * chartWidth;
            const y = padding + ((15 - data.throughput[i]) / 15) * chartHeight;

            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }

        ctx.stroke();

        // Draw latency line (secondary axis)
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(255, 0, 200, 0.8)';
        ctx.lineWidth = 2;

        for (let i = 0; i < data.latency.length; i++) {
            const x = padding + (i / (data.latency.length - 1)) * chartWidth;
            const y = padding + (data.latency[i] / 2) * chartHeight;

            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }

        ctx.stroke();

        // Draw legend
        ctx.fillStyle = 'rgba(0, 247, 255, 0.8)';
        ctx.fillRect(canvas.width - 150, padding, 10, 10);
        ctx.fillStyle = 'rgba(224, 248, 255, 0.9)';
        ctx.font = '12px Arial';
        ctx.textAlign = 'left';
        ctx.fillText('Throughput (Gbps)', canvas.width - 135, padding + 9);

        ctx.fillStyle = 'rgba(255, 0, 200, 0.8)';
        ctx.fillRect(canvas.width - 150, padding + 20, 10, 10);
        ctx.fillStyle = 'rgba(224, 248, 255, 0.9)';
        ctx.fillText('Latency (ms)', canvas.width - 135, padding + 29);
    }

    drawChart();
}

// Threat Gauge
function initThreatGauge() {
    const canvas = document.getElementById('threatGauge');
    const ctx = canvas.getContext('2d');

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    function drawGauge() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = Math.min(centerX, centerY) - 10;

        // Draw gauge background
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI, true);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.lineWidth = 20;
        ctx.stroke();

        // Draw threat level (low - green)
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 0.3, false);
        ctx.strokeStyle = 'rgba(0, 247, 255, 0.8)';
        ctx.lineWidth = 20;
        ctx.stroke();

        // Draw needle
        const needleAngle = Math.PI * 0.15; // Point to low threat
        const needleLength = radius - 20;

        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(
            centerX + Math.cos(needleAngle) * needleLength,
            centerY + Math.sin(needleAngle) * needleLength
        );
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.lineWidth = 3;
        ctx.stroke();

        // Draw center circle
        ctx.beginPath();
        ctx.arc(centerX, centerY, 8, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.fill();
    }

    drawGauge();
}

// Data Flow Visualization
function initDataFlowVisualization() {
    const canvas = document.getElementById('dataFlowCanvas');
    const ctx = canvas.getContext('2d');

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Create data points
    const dataPoints = [];
    const pointCount = 50;

    for (let i = 0; i < pointCount; i++) {
        dataPoints.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 4 + 1,
            speed: Math.random() * 2 + 0.5,
            color: `rgba(0, 247, 255, ${Math.random() * 0.5 + 0.2})`
        });
    }

    function animateDataFlow() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw flowing data points
        dataPoints.forEach(point => {
            // Move point
            point.x += point.speed;
            if (point.x > canvas.width) {
                point.x = 0;
                point.y = Math.random() * canvas.height;
            }

            // Draw point
            ctx.beginPath();
            ctx.arc(point.x, point.y, point.size, 0, Math.PI * 2);
            ctx.fillStyle = point.color;
            ctx.fill();

            // Add glow
            ctx.shadowColor = point.color;
            ctx.shadowBlur = 10;
            ctx.fill();
            ctx.shadowBlur = 0;

            // Draw connection lines to nearby points
            dataPoints.forEach(otherPoint => {
                if (otherPoint !== point) {
                    const distance = Math.sqrt(
                        Math.pow(point.x - otherPoint.x, 2) +
                        Math.pow(point.y - otherPoint.y, 2)
                    );

                    if (distance < 100) {
                        ctx.beginPath();
                        ctx.moveTo(point.x, point.y);
                        ctx.lineTo(otherPoint.x, otherPoint.y);
                        ctx.strokeStyle = `rgba(0, 247, 255, ${0.2 - distance / 500})`;
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                }
            });
        });

        requestAnimationFrame(animateDataFlow);
    }

    animateDataFlow();
}

// API Integration for Real Data
function fetchActiveDevices() {
    // This would be replaced with actual API call
    // For demonstration, we'll use simulated data
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                activeDevices: Math.floor(200 + Math.random() * 100),
                iotSensors: Math.floor(1500 + Math.random() * 500),
                aiNodes: Math.floor(50 + Math.random() * 20)
            });
        }, 1000);
    });
}

// Initialize API data fetching
async function initAPIData() {
    try {
        const deviceData = await fetchActiveDevices();
        document.getElementById('activeDevices').textContent = deviceData.activeDevices;
        document.getElementById('iotSensors').textContent = deviceData.iotSensors.toLocaleString();
        document.getElementById('aiNodes').textContent = deviceData.aiNodes;
    } catch (error) {
        console.error('Error fetching device data:', error);
    }
}

// Call API initialization
document.addEventListener('DOMContentLoaded', function () {
    initAPIData();
});
