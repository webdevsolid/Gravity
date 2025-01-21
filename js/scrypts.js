{
    const init = () => {
        const canvas = document.querySelector('canvas');
        const crc = canvas.getContext('2d');

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        let particles = []
        class Particle {
            constructor(x, y, radious, color) {
                this.gravity = 1;
                this.fractionGravity = 0.9;
                this.initSpeedY = 1;
                this.x = x;
                this.y = y;
                this.dy = y;
                this.radious = radious;
                this.color = color;
            }
            draw(crc) {
                crc.beginPath();
                crc.arc(this.x, this.y, this.radious, 0, Math.PI * 2);
                crc.fillStyle = this.color;
                crc.fill();
            }
            update() {
                if (this.y + this.radious >= canvas.height) {
                    this.initSpeedY = -this.initSpeedY * this.fractionGravity;
                    
                } else if (this.y + this.radious < canvas.height) {
                    this.initSpeedY += this.gravity;
                }
                    this.y += this.initSpeedY;
                    this.dy = this.y
            }
        }

        particles.push(new Particle(500, 700, 50, 'orange'));
        console.log(particles)

        const animate = () => {
            crc.clearRect(0, 0, canvas.width, canvas.height);

            particles[0].update();
            particles[0].draw(crc);

            requestAnimationFrame(animate)
        }
        animate();
    }

    init()
}