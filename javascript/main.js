const rangeSelector = document.getElementById("range-selector");
const showRangeValue = document.getElementById("show-range-value");
const canvas = document.querySelector(".canvas");
const colorSelector = document.getElementById("color-selector");
const eraserBTN = document.getElementById("eraser");
const colorModeBTN = document.getElementById("color");
const pureColorModeBTN = document.getElementById("pure-color");


// switch for logic
let mousePressed = false;
let pureColor = false;


// display initial value
showRangeValue.textContent = rangeSelector.value + " x " + rangeSelector.value;
createDivCanvas(rangeSelector.value);
let colorValue = colorSelector.value;


//function

    // create canvas resolution
    function createDivCanvas(number) {
        for(let i = 0; i < number * number; i++){
            let div = document.createElement("div");
            div.setAttribute("class", "grid-element");

            canvas.style.cssText=`
                background-color: #fff;
                height: 34em;
                width: 34em;
                display: grid;
                grid-template-columns: repeat(${number}, 1fr);
                grid-template-rows: repeat(${number}, 1fr);
                box-shadow: 20px 20px 40px #CDCDCD;
            `;

            document.querySelector(".canvas").prepend(div);
        }
    }


    // update color value and cancel color class
    function updateColorValue(color) {
        colorValue = color;
        document.querySelectorAll(".grid-element").forEach((element) => {
            element.classList.remove("color1");
            element.classList.remove("color2");
            element.classList.remove("color3");
            element.classList.remove("pure-colored");
        })
    }


    // set color attribute on target
    function colorDiv(events) {
        if(mousePressed === true){
            if(pureColor === true){
                events.target.classList.add("pure-colored");
                events.target.style.cssText = `
                background-color: ${colorValue};
                opacity: 1;
            `
                return;
            }
            if(events.target.classList.contains("color1")){
                if(events.target.classList.contains("color2")){
                    events.target.classList.add("color3");
                    events.target.style.cssText = `
                        background-color: ${colorValue};
                        opacity: 1;
                    `;
                    return
                }
                events.target.classList.add("color2");
                events.target.style.cssText = `
                        background-color: ${colorValue};
                        opacity: 0.66;
                `;
            }else{
                events.target.classList.add("color1");
                events.target.style.cssText = 
                    `
                    background-color: ${colorValue};
                    opacity: 0.33;
                `;
            }
        }
    }


    //clear canvas 
    function clearCanvas() {
        document.querySelectorAll(".grid-element").forEach((element) => {
            element.style.cssText = ` `;
            element.classList.remove("color1");
            element.classList.remove("color2");
            element.classList.remove("color3");
            element.classList.remove("pure-colored");
        })
    }





// events

    // display resolution
    rangeSelector.addEventListener("mousemove", () => {
        showRangeValue.textContent = rangeSelector.value + " x " + rangeSelector.value;
    })

    // change canvas resolution
    rangeSelector.onchange = () => {createDivCanvas(rangeSelector.value)};

    // activate drowing while mouse is pressed
    document.addEventListener("mousedown", (events) => {
        if(events.target === rangeSelector){

        }else{
            mousePressed = true;
            events.preventDefault();
        }
    })

    // deactivate drowing when mouse is realised
    document.addEventListener("mouseup", () => {mousePressed = false;})

    // color div target
    canvas.addEventListener("mouseover", colorDiv);

    // clear canvas
    document.getElementById("clear-canvas").addEventListener("click", clearCanvas);

    // change color for drawing and reset class
    colorSelector.onchange = () => {
        updateColorValue(colorSelector.value);
        if(pureColor === false){
            colorModeBTN.classList.add("active");
            eraserBTN.classList.remove("active");
            pureColorModeBTN.classList.remove("active");
        }else {
            pureColorModeBTN.classList.add("active");
            eraserBTN.classList.remove("active");
            colorModeBTN.classList.remove("active");
        }
    };

    // select eraser
    eraserBTN.addEventListener("click", () => {
        updateColorValue("none");
        eraserBTN.classList.add("active");
        colorModeBTN.classList.remove("active");
        pureColorModeBTN.classList.remove("active");
    });

    // return to drawing 
    colorModeBTN.addEventListener("click", () => {
        pureColor = false;
        updateColorValue(colorSelector.value);
        colorModeBTN.classList.add("active");
        eraserBTN.classList.remove("active");
        pureColorModeBTN.classList.remove("active");
    }); 

    // select pure color mode 
    pureColorModeBTN.addEventListener("click", () => {
        pureColor = true;
        updateColorValue(colorSelector.value);
        pureColorModeBTN.classList.add("active");
        eraserBTN.classList.remove("active");
        colorModeBTN.classList.remove("active");
    });


