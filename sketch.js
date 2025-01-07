let playerX, playerY; // موقع السيارة
let playerWidth, playerHeight; // حجم السيارة
let cars = []; // قائمة السيارات المعادية
let score = 0; // النقاط
let gameOver = false; // حالة نهاية اللعبة

let playerCarImg; // صورة سيارة اللاعب
let enemyCarImg; // صورة السيارة المعادية

function preload() {
    // تحميل الصور من الملفات المحلية
    playerCarImg = loadImage('playerCar.png'); // صورة سيارة اللاعب
    enemyCarImg = loadImage('enemyCar.png'); // صورة السيارة المعادية
}

function setup() {
    createCanvas(400, 600); // إنشاء لوحة الرسم
    playerX = width / 2; // وضع السيارة في المنتصف
    playerY = height - 100;
    playerWidth = 50; // حجم السيارة
    playerHeight = 80;
}

function draw() {
    if (gameOver) {
        background(0);
        fill(255);
        textSize(50);
        text("انتهت اللعبة!", width / 2 - 150, height / 2);
        text("النقاط: " + score, width / 2 - 100, height / 2 + 50);
        return;
    }

    background(30); // لون الخلفية

    // رسم سيارة اللاعب
    image(playerCarImg, playerX, playerY, playerWidth, playerHeight);

    // تحريك السيارة
    if (keyIsDown(LEFT_ARROW) && playerX > 0) {
        playerX -= 5;
    }
    if (keyIsDown(RIGHT_ARROW) && playerX + playerWidth < width) {
        playerX += 5;
    }

    // إنشاء سيارات معادية عشوائية
    if (frameCount % 60 === 0) { // كل ثانية
        cars.push({
            x: random(0, width - 50),
            y: 0,
            width: 50,
            height: 80
        });
    }

    // تحريك السيارات المعادية
    for (let i = cars.length - 1; i >= 0; i--) {
        cars[i].y += 5; // سرعة السيارات

        // رسم السيارات المعادية
        image(enemyCarImg, cars[i].x, cars[i].y, cars[i].width, cars[i].height);

        // كشف الاصطدام
        if (
            playerX < cars[i].x + cars[i].width &&
            playerX + playerWidth > cars[i].x &&
            playerY < cars[i].y + cars[i].height &&
            playerY + playerHeight > cars[i].y
        ) {
            gameOver = true; // نهاية اللعبة
        }

        // إزالة السيارات التي تخرج من الشاشة
        if (cars[i].y > height) {
            cars.splice(i, 1);
            score++; // زيادة النقاط
        }
    }

    // عرض النقاط
    fill(255); // لون النص
    textSize(20); // حجم النص
    text("النقاط: " + score, 20, 30); // عرض النقاط
}