let myLeads = []

// const can't be reassigned if possible use const as default, else let
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")

// local storage hr browser k apna hta h aur wo refresh krny pr bh nh jata h jb tk usy khud se delete na krden    // key value should be string
// localStorage.setItem(key, value)
// localStorage.getItem(key)
// localStorage.clear()

// localStorage.setItem("myLeads", "www.exampleleads.com")
// console.log(localStorage.getItem("myLeads"));
// localStorage.clear()
// localStorage sirf strings me kam krta h islye back to forth array strings krna hga qk push tu hum array me hi kr skty hn string me nh 
// JSON.parse(string)           // convert to array 
// JSON.stringify(array)        // convert to string 

// getting the leads from local storage and converting them to array
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))

if(leadsFromLocalStorage){
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

tabBtn.addEventListener("click", function(){    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads) )
        render(myLeads)
    })
})

function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        // bar bar html ko edit krny se bhtr hai ek hi bar krden 
        listItems += `
            <li>
                <a href="${leads[i]}" target="_blank">
                    ${leads[i]} 
                </a>
            </li>`
        // method 1
        // ulEl.innerHTML+="<li>" + myLeads[i] + "</li>"
        // method 2
        // const li = document.createElement("li")
        // li.textContent = myLeads[i]
        // ulEl.append(li)
    }
    ulEl.innerHTML = listItems
}
// falsy values in js
// false
// 0
// ""
// null         -> how you as a developer signalize emptiness
// undefined    -> how JavaScript signalizes emptiness
// NaN          -> Not a number

// to check if a value is truthy or falsy 
// Boolean(value)

// instead of using on-click attribute in html bhtr ye hia k event listener laden issy html sirf structure k lye hi use hga aur code cleaner rhega sari functionalities completely js me handle hngi
// wo element phir addEventListener phir paranthesis me phly jis event pr trigger hga wo aur phir wo event trigger hny pr function

deleteBtn.addEventListener("dblclick", function(){
    localStorage.clear()
    myLeads = []
    render(myLeads)
})

inputBtn.addEventListener("click", function () {
    // value => method to get or set value from input field
    const inputValue = inputEl.value
    myLeads.push(inputValue)
    inputEl.value = ""
    // storing array in local storage 
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)

    //console.log(localStorage.getItem("myLeads"))

})