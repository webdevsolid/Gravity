{
    const init = () => {
        const canvas = document.querySelector('canvas');
        const crc = canvas.getContext('2d');

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        let particles = []
        class Particle {
            constructor(radious) {
                this.finish = false;
                this.gravity = 1;
                this.dumpingY = 0.7;
                this.dumpingX = 0.9;
                this.velocityY = Math.random() * 15 + 85;
                this.velocityX = Math.random() * 50 - 25;
                this.radious = radious;
                this.x = (Math.random() * (canvas.width - this.radious * 4)) + this.radious * 2;
                this.prevX = this.x;
                this.y = (Math.random() * (canvas.height / 2 - this.radious)) + this.radious;
                this.color = Math.floor(Math.random() * 16777215).toString(16);
            }
            draw(crc) {
                crc.beginPath();
                crc.arc(this.x, this.y, this.radious, 0, Math.PI * 2);
                crc.fillStyle = `#${this.color}`;
                crc.fill();
            }
            update() {
                this.prevX = this.x;
                this.velocityY += this.gravity;
                this.y += this.velocityY;
                this.x += this.velocityX;

                if ((this.y + this.radious >= canvas.height)) {
                    this.y = canvas.height - this.radious;
                    this.velocityY *= -this.dumpingY;
                    this.velocityX *= this.dumpingX;
                } else if(this.y - this.radious <= 0) {
                    this.y = 0 + this.radious;
                    this.velocityY = -this.velocityY;
                    this.velocityX *= this.dumpingX;
                }

                if (this.x + this.radious >= canvas.width) {
                    this.x = canvas.width - this.radious
                    this.velocityX *= -this.dumpingX
                } else if (this.x - this.radious <= 0) {
                    this.x = 0 + this.radious
                    this.velocityX *= -this.dumpingX
                }
            }
            finishUpdate() {
                if(this.x.toFixed(1) === this.prevX.toFixed(1)) {
                    console.log(true)
                    this.finish = +((this.velocityY).toFixed(2)) !== -0.41 ? false : true
                }
            }
        }
        for (let i = 0 ; i < 10 ; i++){
            particles.push(new Particle(20))
        }

        const fps = 1000 / 120;
        let time = 0;
        let prevTime = 0;

        canvas.addEventListener("click", () => {
            for(let particle of particles) {
                particle.y -= Math.random() * (canvas.height - particle.radious);
                particle.x = (Math.random() * (canvas.width - particle.radious * 4)) + particle.radious * 2
                particle.velocityX =  Math.random() * 50 - 25;
                particle.finish = false;
                particle.update();
            }
        })

        const animate = (timeStamp) => {
            const deltaTime = timeStamp - prevTime;
            prevTime = timeStamp;

            if (time >= fps) {
                //crc.fillStyle = 'rgba(255, 255, 255, 0.8)';
                //crc.fillRect(0, 0, canvas.width, canvas.height);
                crc.clearRect(0, 0, canvas.width, canvas.height);

                particles.forEach(particle => {
                    if (!particle.finish) {
                        particle.update();
                        particle.finishUpdate();
                    }
                    particle.draw(crc);
                });
                time = 0;
            }
            time += deltaTime;
            requestAnimationFrame(animate)
        }
        animate(0);
    }

    init()
}