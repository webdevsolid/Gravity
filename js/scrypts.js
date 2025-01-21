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
                this.dumping = 0.88;
                this.initSpeedY = 1;
                this.x = x;
                this.y = y;
                this.dy = y;
                this.radious = radious;
                this.color = color;
                this.distance = undefined;
            }
            draw(crc) {
                crc.beginPath();
                crc.arc(this.x, this.y, this.radious, 0, Math.PI * 2);
                crc.fillStyle = this.color;
                crc.fill();
            }
            update() {
                this.initSpeedY += this.gravity;
                this.y += this.initSpeedY;

                if(this.y + this.radious >= canvas.height){
                    this.y = canvas.height - this.radious;
                    this.initSpeedY *= -this.dumping;
                }

                // this.initSpeedY += this.gravity;
                // this.y += this.initSpeedY;
                

                // if (this.y + this.radious >= canvas.height) {
                //     this.initSpeedY = -this.initSpeedY * this.dumping;
                //     this.y = canvas.height - this.radious;
                   
                // }
            }
        }

        particles.push(new Particle(500, 500, 50, 'orange'));

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