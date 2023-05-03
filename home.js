const blob = document.getElementById("blob");
document.body.onpointermove = event => {
    const {clientX, clientY} = event;
    blob.animate({
        left: `${clientX}px`,
        top: `${clientY}px`
    }, {duration: 3000, fill: "forwards"})   
}

const letters = "abcdefghijklmnopqrstuvwxyz‡₤€";//©°‽⁇꛷ຯ꘏꘍।⳾ΦΣ
var inmotion = false;
document.querySelectorAll("h2").forEach(element => {
    element.onmouseover = event => {
    if(inmotion === false) {
        let iterations = 0;
        inmotion = true;

        const interval = setInterval(() => {
        event.target.innerHTML = event.target.innerHTML.split("")
        .map((letter, index) => {

            if(index < iterations)
            {
                return event.target.dataset.value[index];
            }

        return letters[Math.floor(Math.random() * letters.length)];
        }) 
        .join("");
        
        if(iterations >= event.target.dataset.value.length){
            clearInterval(interval);
            inmotion = false;
        } 
        iterations+= 1/3;
        }, 30);
    }
}
});
document.getElementsByClassName("magic")[0].onmouseover = event => {
    if(inmotion === false) {
        let iterations = 0;
        inmotion = true;

        const interval = setInterval(() => {
        event.target.innerHTML = event.target.innerHTML.split("")
        .map((letter, index) => {

            if(index < iterations)
            {
                return event.target.dataset.value[index];
            }

        return letters[Math.floor(Math.random() * letters.length)];
        }) 
        .join("");
        
        if(iterations >= event.target.dataset.value.length){
            clearInterval(interval);
            inmotion = false;
        } 
        iterations+= 1/3;
        }, 30);
    }
}
document.getElementsByClassName("magic")[1].onmouseover = event => {
    if(inmotion === false) {
        let iterations = 0;
        inmotion = true;

        const interval = setInterval(() => {
        event.target.innerHTML = event.target.innerHTML.split("")
        .map((letter, index) => {

            if(index < iterations)
            {
                return event.target.dataset.value[index];
            }

        return letters[Math.floor(Math.random() * letters.length)];
        }) 
        .join("");
        
        if(iterations >= event.target.dataset.value.length){
            clearInterval(interval);
            inmotion = false;
        } 
        iterations+= 1/3;
        }, 30);
    }
}