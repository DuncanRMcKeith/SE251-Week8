class Box
{
    constructor()
    {
        this.x = c.width/2
        this.y = c.height/2
        this.w = 100
        this.h = 100
        this.fill = `#999999`
        this.stroke = `#000000`
        this.vx = 0
        this.vy = 0
        this.dir = 1;
        this.force = 1;
        this.canJump = false;
        this.score=0;
        this.highscore=0;
        return this;
    }

    setProps(obj={})
    {
        for(let i in obj)
        {
            if(this[i] !== undefined)
            {
                this[i] = obj[i]
            }
        }
        return this;
    }

    draw()
    {
        ctx.save()
            ctx.translate(this.x, this.y)
            ctx.fillStyle = this.fill
            ctx.strokeStyle = this.stroke
            ctx.fillRect(0-this.w/2, 0-this.h/2, this.w, this.h)
            ctx.strokeRect(0-this.w/2, 0-this.h/2, this.w, this.h)
        ctx.restore()
    }

    debug()
    {
        ctx.save()
            ctx.translate(this.x, this.y)
            ctx.fillStyle = this.stroke;
            ctx.strokeStyle = this.stroke;
            ctx.fillRect(-5, -5, 10, 10)
            ctx.beginPath();
            ctx.moveTo(-this.w/2, -this.h/6)
            ctx.lineTo(this.w/2, -this.h/6)
            ctx.closePath()
            ctx.stroke();
            ctx.moveTo(-this.w/2, this.h/6)
            ctx.lineTo(this.w/2, this.h/6)
            ctx.closePath()
            ctx.stroke();
        ctx.restore()
    }

    move()
    {
        this.x += this.vx;
        this.y += this.vy;
    }

    left(){return {x:this.x - this.w/2, y:this.y}}
    right(){return {x:this.x + this.w/2, y:this.y}}
    top(){return {x:this.x , y:this.y- this.h/2}}
    bottom(){return {x:this.x , y:this.y + this.h/2}}

    collide(obj)
    {
        if(
            this.right().x > obj.left().x &&
            this.left().x < obj.right().x &&
            this.bottom().y > obj.top().y &&
            this.top().y < obj.bottom().y
        )
        {
            return true
        }
        return false
    }
    collidePoint(obj)
    {
        if(
            this.right().x > obj.x &&
            this.left().x < obj.x &&
            this.bottom().y > obj.y &&
            this.top().y < obj.y
        )
        {
            return true
        }
        return false
    }

}