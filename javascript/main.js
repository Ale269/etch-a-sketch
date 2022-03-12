const rangeValue = document.getElementById("range-selector");
const showRangeValue = document.getElementById("show-range-value");
const canvas = document.querySelector(".canvas"); 
showRangeValue.textContent = rangeValue.value + " x " + rangeValue.value;


rangeValue.addEventListener("mousemove", () => {
    showRangeValue.textContent = rangeValue.value + " x " + rangeValue.value;
    createDivCanvas(rangeValue.value);
})

function createDivCanvas(number) {
    for(let i = 0; i < number * number; i++){
        let div = document.createElement("div");
        div.setAttribute("class", "grid-element");

        canvas.style.cssText=`width: 45%;
            background-color: #fff;
            height: 34em;
            width: 34em;
            display: grid;
            grid-template-columns: repeat(${number}, 1fr);
            grid-template-rows: repeat(${number}, 1fr);
        `;

        document.querySelector(".canvas").prepend(div);
    }
}

createDivCanvas(16)

