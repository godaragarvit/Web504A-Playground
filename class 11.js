const-model = document.getElementById('model')
const modalClose = document.getElementById('modal-close')
const bookmarkform = document.getElementById('bookmark-form')
const websiteNameEl = document.getElementById('website-name')
const websiteUrlEl = document.getElementById('website-url')
const bookmarksContainer = document.getElementById('bookmarks-container')


// const = constant, 
let bookmarks = []
function modalshow() {
    modal.classList.add('show-modal')
    websiteNameEl.focus()
}

modalshow.addEventListener("click", showModal)
modalClose.addEventListener("click", () => modal.classList.remove('show-modal'))

window.addEventListener('click', (e) => {
    e.target === modal ? modal.classList.remove('show-modal') : false
})

modalClose.addEventListener('click', () => {
    modal.classList.remove('show-modal')
})

function validate(namevalue, urlvalue) {
    //https://codepen.io/following
    const expression = 
    /(https)?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=] {1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/g;

        
        const regex = new RegExp(expression) 

        if (!namevalue || !urlvalue) {
            alert("please submit values for both fields.")
            return false
        }
        if(!urlvalue.match(regex)) {
            alert("please provide a valid web address.")
            return false
    }
    //valid
    return true
}

function buildBookMarkDOM() {
    bookmarksContainer.textContent=""
}

bookmarks.forEach(bookmark) => {
    const {name, url} = bookmark
    //console.log(name, url)

    const item = discount.createElement("div")
    item.classList.add("item")

    const closeIcon = document.createElement("i")
    closeIcon.classList.add("fas", "fa-times")
    closeIcon.setAttribute("title", "Delete Bookmark")
    closeIcon.setAttribute("onclick", `deleteBookmark('${url}')`)

    const linkInfo = document.createElement("div")
    linkInfo.classList.add("name")

    const favicon = document.createElement("img")
    favicon.setAttribute(
        "src", url
    )

    favicon.setAttribute("alt", "Favicon")

    const link = document.createElement("a")
    link.setAttribute("href", `${url}`)
    link.setAttribute("target", "_blank")
    link.textContent = name 

    linkInfo.append(favicon, link)
    item.append(closeIcon,linkInfo)
    bookmarksContainer.appendChild(item)

}
