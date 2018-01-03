import * as d3 from 'd3'

console.log('index.js')

const sum = (a,b) => {
    
    //console.log('sum function')
    return a + b
}



const tasks = 
    [
        {task:'Start project', date: new Date(2018, 0, 1)},
        {task:'Get to the first quarter', date: new Date(2018, 1, 5)},
        {task:'Halfway', date: new Date(2018, 2, 1)},
        {task:'Finish the project', date: new Date(2018, 3, 2)}
    ]

const startDate = new Date(2018,0,1)
const goalDate = new Date(2018,3,6)
const currentDate = new Date()
const finished = false


export const timeScale = d3.scaleTime()
    .domain([startDate, goalDate])
    .range([0,100])
    //.format("2f")

/*
d3.select('#app')
    .append('div')
        .html(d3.version)
*/
const format = d3.format(".2")


d3.select('#app')
    .append('div')
        .html(format(timeScale(currentDate)) + ' %')


const d3Tasks = d3.select('#app')
    .selectAll('p')
    .data(tasks)

d3Tasks.enter()
    .append('div')
    .text((d)=>{
        console.log('hhheeeeyyy')
        return '' + d.task + ' ' + format(timeScale(d.date)) + '%'
    })
//console.log('sum(1,2) = ', sum(1,2))
export default sum


