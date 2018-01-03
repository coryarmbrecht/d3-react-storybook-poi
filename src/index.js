import * as d3 from 'd3'
import moment from 'moment'

console.log('index.js')

const sum = (a,b) => {
    
    //console.log('sum function')
    return a + b
}


const tasks = 
    [
        {task:'Start project', goalDate: new Date(2018, 0, 1), startDate: '', createdDate: '', progress:.2},
        {task:'Get to the first quarter', goalDate: new Date(2018, 0, 28), startDate: '', createdDate: '', progress:.15},
        {task:'Halfway', goalDate: new Date(2018, 2, 1), startDate: '', createdDate: '', progress:.07},
        {task:'Finish the project', goalDate: new Date(2018, 3, 2), startDate: '', createdDate: '', progress:.04}
    ]

const startDate = new Date(2018,0,1)
const goalDate = new Date(2018,3,6)
const currentDate = new Date()
const progress = 0

export const timeScale = d3.scaleTime()
    .domain([startDate, goalDate])
    .range([0,100])
    //.format("2f")

/*
d3.select('#app')
    .append('div')
        .html(d3.version)
*/

const xScale = d3.scaleLinear()
    .domain([0, 100])
    .range([300,0])

const xAxis = d3.axisBottom(xScale)


const format = d3.format(".2")

d3.select('#app')
    .append('div')
        .html('Time Used: ' + format(timeScale(currentDate)) + '%')

const d3Tasks = d3.select('#app')
    .append('svg').call(xAxis)
        .style('overflow', 'visible')
        .style('width','100%')
        .style('height', '100%')
        .append('g')
    .selectAll('g')
    
        .data(tasks)
        .enter()
        .append('g')
        .attr('transform', d => 'translate('+ d.progress * 1000 +','+ d.progress * 100 +')')

//d3Tasks

d3Tasks
    .append('rect')
    .style('width', d => d.progress * 1000)
    .style('height', d => d.progress * 1000)
    .style('fill', 'pink')
    
d3Tasks
    .append('text')
        .text((d)=>{
        console.log('d3Tasks.enter d = ', d )
        return '' + d.task + ' start: ' + moment(startDate).format('MMMM Do YYYY, h:mm:ss a') + '  end: ' + moment(goalDate).format('MMMM Do YYYY, h:mm:ss a') + '   ' + format(timeScale(d.goalDate)) + '%'
    })
    .attr('x', d => d.progress * 1000)
    .attr('y', d => d.progress * 1000)
    .style('fill','black')
    //.style('stroke-width', '1px')
    
//console.log('sum(1,2) = ', sum(1,2))






export default sum


