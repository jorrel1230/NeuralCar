class Network {
    constructor(neuronCounts) {
        this.layers = [];

        for (let i = 0; i < neuronCounts.length-1; i++) {
            this.layers.push(new Layer(neuronCounts[i], neuronCounts[i+1]));
        }
    }

    static feedForward(givenInputs, network) {
        let outputs = Layer.feedForward(
            givenInputs, network.layers[0]
        );
        // Forward Hidden Layers with ReLu
        for (let i = 1; i < network.layers.length-1; i++) {
            outputs = Layer.feedForward(outputs, network.layers[i]).map(this.#Relu);
        }
        // Forward Output Layer
        outputs = Layer.feedForward(outputs, network.layers[network.layers.length-1]).map(this.#BinarySigmoid);
        return outputs;
    }

    static #Relu(n) {
        return Math.max(0, n);
    }

    static #BinarySigmoid(n) {
        return (1 / (1+Math.exp(-n)) > 0.5);
    }

}


class Layer {
    constructor(n_inputs, n_outputs) {
        this.inputs = new Array(n_inputs);
        this.outputs = new Array(n_outputs);
        this.biases = new Array(n_outputs);

        this.weights = [];

        for (let i = 0; i < n_inputs; i++) {
            this.weights.push(new Array(n_outputs));
        }

        Layer.#randomize(this);
    }

    static #randomize(layer) {
        for (let i = 0; i < layer.inputs.length; i++) {
            for (let j = 0; j < layer.outputs.length; j++) {
                layer.weights[i][j] = Math.random() * 2 - 1;
            }
        }

        for (let i = 0; i < layer.biases.length; i++) {
            layer.biases[i] = Math.random() * 2 - 1;
        }
    }

    static feedForward(givenInputs, layer) {
        for (let i = 0; i < layer.inputs.length; i++) {
            layer.inputs[i] = givenInputs[i];
        }

        for (let i = 0; i < layer.outputs.length; i++) {
            let weightedSum = layer.biases[i];
            for (let j = 0; j < layer.inputs.length; j++) {
                weightedSum += layer.weights[j][i] * layer.inputs[j]
            }
            layer.outputs[i] = weightedSum;
        }        

        return layer.outputs;
    }
}




export default Network;