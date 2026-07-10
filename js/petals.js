/**
 * 花瓣飘落特效 - Sakura Petals
 */
(function() {
    var canvas = document.getElementById('petalsCanvas');
    if (!canvas) return;

    var ctx = canvas.getContext('2d');
    var petals = [];
    var MAX_PETALS = 35;
    var COLORS = [
        'rgba(255,183,197,', // 浅粉
        'rgba(255,150,170,', // 粉色
        'rgba(255,200,210,', // 淡粉
        'rgba(255,160,180,', // 中粉
        'rgba(255,210,220,', // 极淡粉
    ];

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    // Petal class
    function Petal() {
        this.reset();
    }

    Petal.prototype.reset = function() {
        this.x = Math.random() * canvas.width;
        this.y = -20 - Math.random() * canvas.height;
        this.size = 8 + Math.random() * 12;
        this.speedY = 0.5 + Math.random() * 2;
        this.speedX = -0.5 + Math.random() * 1;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotSpeed = (Math.random() - 0.5) * 0.05;
        this.opacity = 0.3 + Math.random() * 0.7;
        this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
        this.swing = Math.random() * 3;
        this.swingSpeed = 0.01 + Math.random() * 0.03;
        this.swingOffset = Math.random() * Math.PI * 2;
    };

    Petal.prototype.update = function() {
        this.y += this.speedY;
        this.swingOffset += this.swingSpeed;
        this.x += this.speedX + Math.sin(this.swingOffset) * this.swing * 0.3;
        this.rotation += this.rotSpeed;

        if (this.y > canvas.height + 30) {
            this.reset();
            this.y = -30;
        }
        if (this.x > canvas.width + 30) this.x = -30;
        if (this.x < -30) this.x = canvas.width + 30;
    };

    Petal.prototype.draw = function(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.globalAlpha = this.opacity;

        // Draw petal shape (ellipse)
        ctx.beginPath();
        ctx.fillStyle = this.color + this.opacity + ')';
        ctx.ellipse(0, 0, this.size * 0.6, this.size * 0.25, 0, 0, Math.PI * 2);
        ctx.fill();

        // Petal highlight
        ctx.beginPath();
        ctx.fillStyle = 'rgba(255,255,255,0.3)';
        ctx.ellipse(-this.size * 0.1, -this.size * 0.05, this.size * 0.15, this.size * 0.1, 0.3, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
    };

    // Create petals
    for (var i = 0; i < MAX_PETALS; i++) {
        var p = new Petal();
        p.y = Math.random() * canvas.height; // Start scattered
        petals.push(p);
    }

    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (var i = 0; i < petals.length; i++) {
            petals[i].update();
            petals[i].draw(ctx);
        }
        requestAnimationFrame(animate);
    }

    animate();
})();
