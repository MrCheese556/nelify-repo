const letters = "abcdefghijklmnopqrstuvwxyz‡₤€";//©°‽⁇꛷ຯ꘏꘍।⳾ΦΣ
const dotlets = "·⸪⸬⁘⁛⁘⸬⸪·";//©°‽⁇꛷ຯ꘏꘍।⳾ΦΣ
const element = document.getElementById("title");
const dots = document.getElementById("dots");
inmotion = false;

    if(inmotion === false) {
        let iterations = 0;
        inmotion = true;
        const interval = setInterval(() => {
            element.innerHTML = element.innerHTML.split("")
            .map((letter, index) => {

                if(index < iterations)
                {
                    return element.dataset.value[index];
                }

            return letters[Math.floor(Math.random() * letters.length)];
            }) 
            .join("");
            
            if(iterations >= element.dataset.value.length - 6/9){
                element.style.color = "#0d8228";
                element.style.fontWeight = "lighter";
                clearInterval(interval);
                inmotion = false;
            } 
            iterations+= 1/9;
        }, 50);
        
    }


    // const its = setInterval(() => {
    //     let iterations = 0;
    //     const it = setInterval(() => {
    //         dots.innerHTML = dotlets[iterations];
    //         iterations++;
    //         if(iterations == dotlets.length){
    //             clearInterval(it);
    //         }
    //     }, 150);
        
    // }, dotlets.length*150);
        
        
    

    const blob = document.getElementById("blob");
document.body.onpointermove = event => {
    const {clientX, clientY} = event;
    blob.animate({
        left: `${clientX}px`,
        top: `${clientY}px`
    }, {duration: 3000, fill: "forwards"})   
}
