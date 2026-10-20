// For bundlers such as Vite and Webpack omit https://esm.sh/
alert("script loaded");

import { csv, json } from 'https://esm.sh/d3-fetch';
import { select, selectAll } from 'https://esm.sh/d3-selection';
import 'https://esm.sh/d3-transition';

const myData = await json("https://bahoangpham.github.io/Nutrition_Obesity_Level_Analysis/obesity_level.json");

// print out all received data
console.log(myData);

const svg = select('svg');

// Part I
// 1st column
// add text: category by Gender
svg.append('text')
  .attr('x', 30)
  .attr('y', 20)
  .attr('font-size', '20px')
  .attr('font-weight', 'bold')
  .text('Dataset categorized by Gender: Male & Female')
  .transition()
  .delay(1000)
  .style('fill', 'blue');

// create circles for dataset
svg.selectAll('circle')
  .data(myData)
  .join('circle')
  .attr('cx', (d, i) => i * 50 + 30)
  .attr('cy', 50)
  .attr('r', 20)
  .style('fill', d => 
  d.Gender === 'Male' ? 'Blue' : 'Pink');
        
// create a button to change color
select('#color_button').on('click', function() {
  selectAll('circle')
    .transition()
    .style('fill', d =>
    d.Gender === 'Male' ? 'green' : 'purple')
})

// 2nd column
svg.selectAll('.text_age')
  .data(myData)
  .join('text')
  .attr('class', 'text_age')
  .attr('x', 0)
  .attr('y', 0)
  .style('font-size', '5px')
  .text(d => Math.round(d.Age));;

select('#age_button').on('click', function(){
  selectAll('.text_age')
    .attr('x', 0)
    .attr('y', 0)
    .transition()
    .attr('x', (d,i) => i * 50 + 25)
    .attr('y', 90)
    .style('font-size', '15px')
    .text(d => Math.round(d.Age));
})
  
// Part II
// count the amount of each obesity level
const counts = {};
myData.forEach(d => {
  const level = d.Obesity_Level;
  
  if(!counts[level]) {
    counts[level] = 0
  }
  counts[level] += 1;
  
})
// print the sum of the amounts of each obesity level
console.log(counts); 

// convert objects to array
const obesityCounts = Object.entries(counts).map(function(d) {
  return {
    level: d[0], count: d[1]
  }; 
});

console.log(obesityCounts);

svg.append('text')
.attr('x', 30)
.attr('y', 100)
.style('font-size', '20px')
.style('font-weight', 'bold')
.style('fill', 'blue')
.text('Number of People by Obesity Level')

// create bar graph for obesity level column
// sort the obesity level in decreasing order
obesityCounts.sort((a,b) => b.count - a.count)

svg.selectAll('rect')
.data(obesityCounts)
.join('rect')
.attr('x', 30)
.attr('y', (d,i) => i * 50 + 130)
.attr('width', d => d.count/10)
.attr('height', 20 )
.style('fill', 'green');

svg.selectAll('.label')
.data(obesityCounts)
.join('text')
.attr('class', 'label')
.attr('x', 50)
.attr('y', (d,i) => i *50 +125)
.text(d => d.level +": " + d.count)
