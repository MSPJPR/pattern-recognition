const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 400;

const points = [];
const centroids = [{ x: 150, y: 150 }, { x: 450, y: 250 }];

// Draw points and centroids
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw points
    points.forEach(point => {
        ctx.fillStyle = point.cluster !== undefined ? ['red', 'blue'][point.cluster] : 'black';
        ctx.beginPath();
        ctx.arc(point.x, point.y, 5, 0, Math.PI * 2);
        ctx.fill();
    });

    // Draw centroids
    centroids.forEach((centroid, index) => {
        ctx.fillStyle = ['red', 'blue'][index];
        ctx.beginPath();
        ctx.arc(centroid.x, centroid.y, 8, 0, Math.PI * 2);
        ctx.fill();
    });
}

// Add point
canvas.addEventListener("click", (e) => {
    const rect = canvas.getBoundingClientRect();
    points.push({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        cluster: undefined,
    });
    draw();
});

// Classify points using minimum distance
function classifyPoints() {
    points.forEach(point => {
        let minDistance = Infinity;
        centroids.forEach((centroid, index) => {
            const distance = Math.sqrt(
                (point.x - centroid.x) ** 2 + (point.y - centroid.y) ** 2
            );
            if (distance < minDistance) {
                minDistance = distance;
                point.cluster = index;
            }
        });
    });
    draw();
}

// Train button action
document.getElementById("train").addEventListener("click", () => {
    alert("Training simulated: Centroids remain static in this example.");
    draw();
});

// Classify button action
document.getElementById("classify").addEventListener("click", classifyPoints);
