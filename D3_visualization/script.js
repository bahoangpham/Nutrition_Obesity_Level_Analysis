// For bundlers such as Vite and Webpack omit https://esm.sh/
import { csv, json } from 'https://esm.sh/d3-fetch';
import { select, selectAll } from 'https://esm.sh/d3-selection';
import 'https://esm.sh/d3-transition';

const data = await json("https://bahoangpham.github.io/Nutrition_Obesity_Level_Analysis/obesity_level.json");

// print out all received data
console.log(data);

const svg = select('svg');

// 1st column
// add text: category by Gender
svg.append('text')
  .attr('x', 20)
  .attr('y', 20)
  .attr('font-size', '20px')
  .text('Dataset categorized by Gender: Male & Female')
  .transition()
  .delay(1000)
  .style('fill', 'red');

// create circles for dataset
svg.selectAll('circle')
  .data(data)
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
  .data(data)
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
  
