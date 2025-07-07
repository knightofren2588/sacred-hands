window.onload = () => {
    const canvas = document.getElementById("bubbleCanvas");
    const ctx = canvas.getContext("2d");
  
    let bubbles = [];
    const numBubbles = 30;
  
    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
  
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
  
    class Bubble {
      constructor() {
        this.reset();
      }
  
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + Math.random() * canvas.height;
        this.radius = 10 + Math.random() * 20;
        this.speed = 0.5 + Math.random() * 1.5;
        this.alpha = 0.05 + Math.random() * 0.1;
      }
  
      update() {
        this.y -= this.speed;
        if (this.y + this.radius < 0) this.reset();
      }
  
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(92, 158, 173, ${this.alpha})`;
        ctx.fill();
      }
    }
  
    for (let i = 0; i < numBubbles; i++) {
      bubbles.push(new Bubble());
    }
  
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      bubbles.forEach(bubble => {
        bubble.update();
        bubble.draw();
      });
      requestAnimationFrame(animate);
    }
  
    animate();
  };