document.addEventListener("DOMContentLoaded", () => {
let select = document.querySelector("select")
let url =""
let form = document.createElement("form")
let titleof = ""

    const fetchData = async(callback) => {
        try{
            let res = await axios.get(`https://ghibliapi.herokuapp.com/films/${url}`)
            let movies = res.data
           callback(movies)
            // debugger
        }
        catch(err){
            console.log(err)
        }
    }

    const makeTitle = (movies) => {
        movies.forEach(element => {
            let option = document.createElement("option")
            option.innerText = element.title
            option.value = element.id
            select.appendChild(option)
        });
    }

    const CreateForm = () => {
        form.innerHTML = ""
        let input = document.createElement("input")
        let submit = document.createElement("button")
        let content = document.querySelector("#content")
        submit.innerText = "Submit review"
        form.appendChild(input)
        form.appendChild(submit)
        content.appendChild(form)
    }


   select.addEventListener("change", (e) => {
       let content = document.querySelector("#content")
       content.innerHTML = ""
       url = e.target.value
       fetchData(createContent)
       
   })

   const createContent = (title) => {
    let h3 = document.createElement("h3")
    let year = document.createElement("p")
    let des = document.createElement("p")
    let content = document.querySelector("#content")
    titleof = title.title
   h3.innerText = title.title
   year.innerText = title.release_date
   des.innerText = title.description
    content.appendChild(h3)
    content.appendChild(year)
    content.appendChild(des)
    CreateForm()

   }

    form.addEventListener("submit",(e) => {
        e.preventDefault()
        let content = document.querySelector("#content")
        let input = document.querySelector("input")
        let ul = document.createElement("ul")
        let li = document.createElement("li")
        li.innerText = `${titleof}: ${input.value}`

        ul.appendChild(li)
        content.appendChild(ul)
        input.value = ""
    })



    fetchData(makeTitle)
})