const names = []
const ratings = []
const summaries = []
let  count = 0
let countParagraph = document.getElementById('count')

async function getData(){
    const response = await fetch('shows.csv')
    const data = await response.text()
    const rows = data.split('\n').slice(1)
    rows.forEach(e => {
        const [name,rating] = e.split(',')
        const summary = e.substring(e.indexOf('"'))
        names.push(name)
        ratings.push(rating)
        summaries.push(summary)
        console.log(summary)
    })
}



async function chartIt(){
    await getData()
    await makeTags()
    await setTitleAtt()
    const ctx = document.getElementById('chart').getContext('2d');
const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: names,
        datasets: [{
            label: 'Best TV Series',
            data: ratings,
            backgroundColor: [
                'black',
                "gray"
            ],
            
            borderWidth: 1,
            barThickness: 5,
            barPercentage: 0.3
            
            
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        },
        
    }
});
}

chartIt()

async function makeTags(){
    let tags = document.querySelectorAll('.tag')
    let text = ""

  tags.forEach((e,i) => {
    const p = document.createElement('p')
    text =  `${names[i]}     
    ${ratings[i]}`
    p.textContent = text
    e.append(p)
    })

   

   tags.forEach(e => {
       e.addEventListener("click", ()=> {
           e.classList.toggle('bg')
           count = Array.from(tags).filter(e => e.classList.contains('bg')).length
           countParagraph.textContent = `Count: ${count}`
        })       
   })  
}

async function setTitleAtt(){
    let tags = document.querySelectorAll('.tag')
    tags.forEach((e,i)=> {
        e.setAttribute("title", summaries[i])
    })
}

