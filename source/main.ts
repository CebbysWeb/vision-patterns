const CANVAS = vitterns.getCanvas();
CANVAS.resize();

class VitternsEvent {
    public start: number = 0;
    public end: number = 0;
    public match: boolean = false;
    constructor(public text: string) {}
}

const dictionary = [
    "Duane", "Potts", "Markus", "Zhang", "Gaston", "Serrano", "Ashley", "Mason", "Meagan",
    "Dougherty", "Ramona", "Russo", "Vincent", "Cruz", "Frederick", "Warren", "Maricela",
    "Allen", "Dan", "Webster", "Brendon", "Singh", "Luisa", "King", "Milagros", "Vincent",
    "Melinda", "Jordan", "Ola", "Hinton", "Patricia", "Valdez", "Forest", "Nolan",
    "Harley", "Banks", "Vernon", "Abbott", "Chrystal", "Ali", "Damon", "Fritz", "Barbara",
    "Brock", "Jefferey", "Atkins", "Vanessa", "Levine", "Sonja", "Zuniga", "Elma",
    "Brown", "Lara", "Garrett", "Mathew", "Bridges", "Nicholas", "Brooks", "Judith", "Mcbride"
];

const results:VitternsEvent[] = []

const ctx = CANVAS.canvas.getContext('2d') as CanvasRenderingContext2D;


// Function to clear canvas and display a random digit
function displayRandomDigit() {
    const randomDigit = Math.floor(Math.random() * 10); // Generate a random digit (0-9)
    ctx.clearRect(0, 0, CANVAS.canvas.width, CANVAS.canvas.height); // Clear canvas
    ctx.font = '100px Arial';
    ctx.fillStyle = '#000';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(randomDigit.toString(10), CANVAS.canvas.width / 2, CANVAS.canvas.height / 2); // Display digit in the center
}

// Event listeners for buttons
vitterns.getButtonById('start-button').addEventListener('click', () => {
    CANVAS.fill(Color.rgb8(50, 50, 50));
    const name = dictionary[Math.floor(Math.random() * dictionary.length)];
    const event = new VitternsEvent(name);
    setTimeout(() => {
        console.log('Pushing text to canvas');
        CANVAS.text(name, CANVAS.size().scale(0.5), 50, Color.rgb8(255, 0, 0));
        event.start = window.performance.now();
    }, 1500);
    setTimeout(() => {
        console.log('Clearing canvas');
        CANVAS.clear();
        event.end = window.performance.now();
    }, 1600);
    setTimeout(() => {
        const result =  prompt("Ko tu redzēji uz ekrāna?");
        event.match = (result && event.text.toLowerCase() === result?.toLowerCase()) as boolean;
        results.push(event);
        if (results.length === 10) {
            console.log('All events have been processed');
            var correct = results.filter((event) => event.match).length;
            alert(`Jūs atbildējāt pareizi uz '${correct}' no 10 jautājumiem`);
            console.log(JSON.stringify(results));
        }
    }, 2000);
});

vitterns.getButtonById('button2').addEventListener('click', () => {
    ctx.clearRect(0, 0, CANVAS.canvas.width, CANVAS.canvas.height);
    ctx.beginPath();
    ctx.arc(400, 300, 100, 0, Math.PI * 2, true);
    ctx.fillStyle = '#28a745';
    ctx.fill();
});

vitterns.getButtonById('button3').addEventListener('click', () => {
    ctx.clearRect(0, 0, CANVAS.canvas.width, CANVAS.canvas.height);
    ctx.font = '30px Arial';
    ctx.fillStyle = '#dc3545';
    ctx.fillText('Hello Canvas!', 300, 300);
});

// Event listener for key press
document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') { // Check if the spacebar is pressed
        displayRandomDigit();
    }
});