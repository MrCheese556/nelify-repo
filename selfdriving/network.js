//good one: {"levels":[{"inputs":[0.7500124908045854,0.5505480995083754,0,0.12192927188017821,0.5385086420019976],"outputs":[0,0,0,0,1,0],"biases":[0.31886029988962716,0.2139422585018921,0.17354916899051703,0.2352815548629658,-0.06028310880614658,-0.16655527081260543],"weights":[[-0.22310372650175606,0.1948502919630512,-0.007663934241944847,0.22402040073669216,-0.06633038229753722,-0.13071082671301787],[0.053131997303120224,-0.2991686003364932,-0.2980536305649797,-0.0875044621397596,-0.12203361581705229,-0.0973681087946752],[0.161267946052652,-0.15113152911183336,0.1856916935827564,-0.15011974990417815,-0.066522124661556,-0.278554434115618],[0.23337207719470315,-0.24169277343844803,0.4381435767648597,0.1668114752519293,0.16807146235315,-0.5782366143129785],[-0.13303065548391957,0.23129166991476613,0.20644402169848725,-0.19716009072265203,0.4546226877585258,0.08185834994818184]]},{"inputs":[0,0,0,0,1,0],"outputs":[1,1,0,0],"biases":[-0.24534603643990516,0.10838168819961849,-0.06217319261277404,-0.2718286811542566],"weights":[[-0.08298636799457912,0.008805492448869218,-0.16361898341740777,-0.19754961442371996],[0.013904956408277658,0.1024455098618385,0.0775349732550279,0.09740565517474928],[0.31506319012466394,0.20309057351219872,-0.11924068147998286,0.31873355168984513],[-0.2309444275219659,0.03078123536772972,-0.08037626713661283,-0.32200213773265396],[0.18534209103788493,0.11991287475706669,-0.07598009777300949,-0.2970878871742706],[0.09024533482746742,-0.07106651054364113,0.1482879072016475,-0.48963789686451326]]}]}
class NeuralNetwork{
    constructor(neuronCounts){
        this.levels = [];
        for(let i = 0; i < neuronCounts.length - 1; i++)
        {
            this.levels.push(new Level(neuronCounts[i], neuronCounts[i+1]));
        }
    }

    static feedForward(givenInputs, network) {
       // console.log(givenInputs);
        let outputs = Level.feedForward(givenInputs, network.levels[0]);
       // console.log(givenInputs);
        for(let i = 1; i < network.levels.length; i++)
        {
            outputs = Level.feedForward(outputs, network.levels[i]);
        }
        return outputs;
    }

    static mutate(network, amount=0.1)
    {
        network.levels.forEach(level => {
            for(let i = 0; i < level.biases.length; i++)
            {
                level.biases[i]=lerp(
                    level.biases[i],
                    Math.random()*2 -1,
                    amount
                )
            }
            for(let i = 0; i< level.weights.length; i++)
            {
                for(let j = 0; j < level.weights[i].length; j++)
                {
                    level.weights[i][j] = lerp(
                        level.weights[i][j],
                        Math.random()*2 - 1,
                        amount
                    )
                }
            }
        })
    }
}
class Level{
    constructor(inputCount, outputCount){
        this.inputs = new Array(inputCount);
        this.outputs = new Array(outputCount);
        this.biases = new Array(outputCount);

        this.weights = [];
        for(let i = 0; i < inputCount; i++)
        {
            this.weights[i] = new Array(outputCount);
        }
        Level.#randomize(this);
    }
    static #randomize(level) {
        for(let i = 0; i<level.inputs.length; i++){
            for(let j = 0; j<level.outputs.length; j++){
                level.weights[i][j] = Math.random()*2 -1;
            }
        }
        for(let i = 0; i<level.biases.length; i++){
            level.biases[i] = Math.random()*2 - 1;
        }
    }
    static feedForward(givenInputs, level)
    {
        for(let i = 0; i < level.inputs.length; i++)
        {
            level.inputs[i] = givenInputs[i];
          // console.log(givenInputs);
        }
        for(let i = 0; i < level.outputs.length; i++)
        {
            let sum = 0;
            for(let j = 0; j < level.inputs.length; j++){
                sum += level.inputs[j]*level.weights[j][i];
            }

            if(sum > level.biases[i]){
                level.outputs[i] = 1;

            } else {
                level.outputs[i] =0;
            }
        }
        return level.outputs;
    }
}