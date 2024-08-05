import utils from "../Engine2D/utils";

class Visualizer{
    static drawNetwork(ctx,network){
        const margin=50;
        const left=margin;
        const top=margin;
        const width=ctx.canvas.width-margin*2;
        const height=ctx.canvas.height-margin*2;

        const levelHeight=height/network.layers.length;

        for(let i=network.layers.length-1;i>=0;i--){
            const levelTop=top+
                utils.lerp(
                    height-levelHeight,
                    0,
                    network.layers.length==1
                        ?0.5
                        :i/(network.layers.length-1)
                );

            Visualizer.drawLevel(ctx,network.layers[i],
                left,levelTop,
                width,levelHeight,
                i==network.layers.length-1
                    ?['🠉','🠈','🠋', '🠊']
                    :[]
            );
        }
    }

    static #getRGBA(n) {
        if (n < -0.7) return "#ff0000";
        else if (n < -0.3) return "#aa0000";
        else if (n < 0) return "#550000";
        else if (n < 0.3) return "#000055";
        else if (n < 0.7) return "#0000aa";
        else return "#0000ff";
    }

    static #getActivationRGBA(n) {
        if (n <= 0) return "#191b1c";
        else if (n <= 0.2) return "#3C4142";
        else if (n <= 0.4) return "#7e8182";
        else if (n <= 0.6) return "#a1a3a4";
        else if (n <= 0.8) return "#d4d6d7";
        else return "#ffffff";
    }

    static drawLevel(ctx,level,left,top,width,height,outputLabels){
        const right=left+width;
        const bottom=top+height;

        const {inputs,outputs,weights,biases}=level;

        for(let i=0;i<inputs.length;i++){
            for(let j=0;j<outputs.length;j++){
                ctx.beginPath();
                ctx.moveTo(
                    Visualizer.#getNodeX(inputs,i,left,right),
                    bottom
                );
                ctx.lineTo(
                    Visualizer.#getNodeX(outputs,j,left,right),
                    top
                );
                ctx.lineWidth=2;
                ctx.strokeStyle=Visualizer.#getRGBA(weights[i][j]);
                ctx.stroke();
            }
        }

        const nodeRadius=18;
        for(let i=0;i<inputs.length;i++){
            const x=Visualizer.#getNodeX(inputs,i,left,right);
            ctx.beginPath();
            ctx.arc(x,bottom,nodeRadius,0,Math.PI*2);
            ctx.fillStyle="black";
            ctx.fill();
            ctx.beginPath();
            ctx.arc(x,bottom,nodeRadius*0.6,0,Math.PI*2);
            ctx.fillStyle=Visualizer.#getActivationRGBA(inputs[i]);
            ctx.fill();
        }
        
        for(let i=0;i<outputs.length;i++){
            const x=Visualizer.#getNodeX(outputs,i,left,right);
            ctx.beginPath();
            ctx.arc(x,top,nodeRadius,0,Math.PI*2);
            ctx.fillStyle="black";
            ctx.fill();
            ctx.beginPath();
            ctx.arc(x,top,nodeRadius*0.6,0,Math.PI*2);
            ctx.fillStyle=Visualizer.#getActivationRGBA(outputs[i]);
            ctx.fill();

            ctx.beginPath();
            ctx.lineWidth=2;
            ctx.arc(x,top,nodeRadius*0.8,0,Math.PI*2);
            ctx.strokeStyle=Visualizer.#getRGBA(biases[i]);
            ctx.setLineDash([3,3]);
            ctx.stroke();
            ctx.setLineDash([]);

            if(outputLabels[i]){
                ctx.beginPath();
                ctx.textAlign="center";
                ctx.textBaseline="middle";
                ctx.fillStyle="black";
                ctx.strokeStyle="white";
                ctx.font=(nodeRadius*1.5)+"px Arial";
                ctx.fillText(outputLabels[i],x,top+nodeRadius*0.1);
                ctx.lineWidth=0.5;
                ctx.strokeText(outputLabels[i],x,top+nodeRadius*0.1);
            }
        }
    }

    static #getNodeX(nodes,index,left,right){
        return utils.lerp(
            left,
            right,
            nodes.length==1
                ?0.5
                :index/(nodes.length-1)
        );
    }
}

export default Visualizer;