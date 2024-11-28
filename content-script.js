const timer = ms => new Promise(res => setTimeout(res, ms));

async function gamble(provideEstimateEl) {
    const allBtnDivs = provideEstimateEl.querySelectorAll("form>div>div:has(button)");
    const randomNumber = Math.floor(Math.random() * allBtnDivs.length * 10);

    for (const div of allBtnDivs){
        div.className = div.className.replace("selected", "")
        const btn = div.querySelector("button")
        btn.style.transition = "background-color 0.2s ease,color 0.2s ease"
    }

    for (let i = 0; i <= randomNumber; i++){
        const actualNum = i % (allBtnDivs.length)
        let lastNum = actualNum === 0 ? allBtnDivs.length - 1 : actualNum - 1

        allBtnDivs[lastNum].className = allBtnDivs[lastNum].className.replace("selected", "")
        allBtnDivs[actualNum].className = allBtnDivs[actualNum].className + " selected"

        if (i === randomNumber){
            allBtnDivs[actualNum].querySelector("button").click()
        }
        else {
            await timer(50)
        }
    }

    for (const div of allBtnDivs){
        const btn = div.querySelector("button")
        btn.style.removeProperty("transition")
    }
}

function createAndAddChildElement(childTagName, parent, childOptions) {
    const childEl = document.createElement(childTagName)
    for (const [key, value] of Object.entries(childOptions)) {
        if (key === "innerHTML") {
            childEl.innerHTML = value
        } else {
            childEl.setAttribute(key, value)
        }
    }
    if (parent) parent.appendChild(childEl)
    return childEl
}

const gambleBtnOutsideSpan = createAndAddChildElement("span", undefined, {
    class: "emphasize ng-star-inserted"
})
const gambleBtn = createAndAddChildElement("button", gambleBtnOutsideSpan, {
    class: "transition-button mdc-button mdc-button--raised mat-mdc-raised-button mat-unthemed mat-mdc-button-base"
})
createAndAddChildElement("span", gambleBtn, {
    class: "mat-mdc-button-persistent-ripple mdc-button__ripple"
})
createAndAddChildElement("span", gambleBtn, {
    class: "mdc-button__label",
    innerHTML: "Gamble"
})
createAndAddChildElement("span", gambleBtn, {
    class: "mat-mdc-focus-indicator"
})
createAndAddChildElement("span", gambleBtn, {
    class: "mat-mdc-button-touch-target"
})
createAndAddChildElement("span", gambleBtn, {
    class: "mat-ripple mat-mdc-button-ripple"
})

const observer = new MutationObserver(mutations => {
    const provideEstimateEl = document.querySelector("provide-estimate")
    if (provideEstimateEl) {
        observer.disconnect();
        const submitHeaderEl = provideEstimateEl.querySelector(".big-screen>.submit-header")
        submitHeaderEl.insertBefore(gambleBtnOutsideSpan, submitHeaderEl.firstChild)
        gambleBtn.addEventListener("click", () => {
            gamble(provideEstimateEl)
        })
    }
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});
