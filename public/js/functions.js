function addToCart(url, amount, button) {

    axios
        .post(url, { amount })
        .then(() => {
            button.classList.remove("btn-dark")
            button.classList.add("btn-success")
        })
        .catch(() => {
            button.classList.remove("btn-dark")
            button.classList.add("btn-danger")
        })
}

document.querySelectorAll(".addProduct").forEach(elem => {
    elem.addEventListener("submit", (e) => {
        e.preventDefault()
        let button = elem.querySelector("button")
        let amount = elem.querySelector("input").value
        let url = elem.action
        addToCart(url, amount, button)
    })

})