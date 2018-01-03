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

const widthWindow = document.getElementById('app').clientWidth
const heightWindow = document.getElementById('app').clientHeight
console.log('widthWindow = ', widthWindow)
console.log('heightWindow = ', heightWindow)
const xScale = d3.scaleLinear()
    // Make domain dynamic    
    .domain([0, 100])
    // Make range responsive
    .range([heightWindow,widthWindow])

const xAxis = d3.axisBottom(xScale).ticks(10)


const format = d3.format(".2")

d3.select('#app')
    .append('div')
        .html('Time Used: ' + format(timeScale(currentDate)) + '%')

const d3Tasks = d3.select('#app')
    .append('svg')
    .attr("viewBox", "0 0 " + widthWindow + " " + document.getElementsByName('body').clientHeight )
    //.attr("perserveAspectRatio", "xMinYMid")
    //.append('g')
    .call(xAxis)
        .style('overflow', 'visible')
        .style('background-color', 'tan')
        .style('width','100%')
        .style('height', '100%')
        //.call(responsivefy)
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
    .style('fill', 'teal')
    .style('filter','drop-shadow(12px 12px 7px rgba(255,155,155,0.5))')
    
d3Tasks
    .append('text')
        .text((d)=>{
        console.log('d3Tasks.enter d = ', d )
        return '' + d.task + ' start: ' + moment(startDate).format('MMMM Do YYYY, h:mm:ss a') + '  end: ' + moment(d.goalDate).format('MMMM Do YYYY, h:mm:ss a') + '   ' + format(timeScale(d.goalDate)) + '%'
    })
    .attr('x', d => d.progress * 1000)
    .attr('y', d => d.progress * 1000)
    .style('fill','black')
    //.style('stroke-width', '1px')
    
//console.log('sum(1,2) = ', sum(1,2))

function responsivefy(svg) {
    // get container + svg aspect ratio
    var container = d3.select(svg.node().parentNode),
        width = parseInt(svg.style("width")),
        height = parseInt(svg.style("height")),
        aspect = width / height;

        console.log('container = ', container)
        console.log('width = ', width)
    // add viewBox and preserveAspectRatio properties,
    // and call resize so that svg resizes on inital page load
    svg.attr("viewBox", "0 0 " + width + " " + height)
        .attr("perserveAspectRatio", "xMinYMid")
        .call(resize);

    // to register multiple listeners for same event type, 
    // you need to add namespace, i.e., 'click.foo'
    // necessary if you call invoke this function for multiple svgs
    // api docs: https://github.com/mbostock/d3/wiki/Selections#on
    d3.select(window).on("resize." + container.attr("id"), resize);

    // get width of container and resize svg to fit it
    function resize() {
        var targetWidth = parseInt(container.style("width"));
        svg.attr("width", targetWidth);
        svg.attr("height", Math.round(targetWidth / aspect));
    }
}




export default sum


