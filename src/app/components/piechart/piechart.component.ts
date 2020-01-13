import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Input, OnChanges } from '@angular/core';
import * as d3 from 'd3';
import { DataModel } from '../../data/data.model';

@Component({
  selector: 'app-piechart',
  templateUrl: './piechart.component.html',
  styleUrls: ['./piechart.component.scss']
})
export class PieChartComponent implements OnInit, OnChanges {
  @ViewChild('chartContainer') private chartContainer: ElementRef;

  @Input() data: DataModel[];
  @Input() title: string;
  dataset = [
    { label: 'Child', count: '0' },
    { label: 'Teenage', count: '2' },
    { label: 'Young', count: '7' },
    { label: 'Elder', count: '4' }
  ];
  svg;
  constructor() {}
 
  ngOnChanges(): void {
    if (!this.data) {
      return ;
    } else {
      this.chartContainer.nativeElement.innerHTML = '';
      this.renderPiechart(this.data);
    }
  }

  onResize = () => {

    // this.renderPiechart(this.dataset);
  }

  renderPiechart(dataset) {

    const width = 560;
    const height = 360;
    const radius: number = Math.min(width, height) / 2;
    const color =  d3.scaleOrdinal(d3.schemeCategory10);
    const element: any = this.chartContainer.nativeElement;

    // Create element
    this.svg = d3.select(element)
                .append('svg')
                .attr('width', width)
                .attr('height', height)
                .append('g')
                .attr('transform', `translate(${width / 2}, ${height / 2})`);

    // Define the radius
    const arc = d3.arc()
                .innerRadius(radius - 120)
                .outerRadius(radius - 50);

    const outerArc = d3.arc()
                .innerRadius(radius * 0.8)
                .outerRadius(radius * 0.8);
    // Define start and end angles of the segments
    const pie = d3.pie()
                .value((d) => {
                  return d['count'];
                })
                .sort(null);

    // Render the chart
    const path = this.svg.selectAll('path')
                  .data(pie(dataset))
                  .enter().append('path')
                  .attr('d', arc)
                  .attr('fill', (d, i) => {
                    return color(i);
                  });

    const text = this.svg.selectAll('text')
                .data(pie(dataset))
                .enter()
                .append('text')
                .text((d) => {
                  return d.data.label + "(" + d.data.count + ")";
                  })
                  .attr('transform', (d) => {
                    const pos = outerArc.centroid(d);
                    pos[0] = radius * ((d.startAngle + (d.endAngle - d.startAngle) / 2) < Math.PI ? 1 : -1);
                    pos[0] = (pos[0] > 0) ? pos[0] + 20 : pos[0] - 20;
                    return 'translate(' + pos + ')';
                  })
                  .style('text-anchor', 'middle')
                  .style('font-size', 17)
                  .style('fill', '#3a3a3ad9');

    const g = this.svg.selectAll('.outerArc')
      .data(pie(dataset))
      .enter().append('g').append('text')
      .attr('text-anchor', 'middle')
      .style('fill', '#3a3a3ad9')
      .attr('font-size', '1em')
      .attr('y', 10)
      .text(this.title);

    const polyline = this.svg.selectAll('polyline')
                  .data(pie(dataset))
                  .enter()
                  .append('polyline')
                  .attr('points', function(d) {
                    const pos = outerArc.centroid(d);
                    pos[0] = radius * 0.95 * ((d.startAngle + (d.endAngle - d.startAngle) / 2) < Math.PI ? 1 : -1);
                    return [arc.centroid(d), outerArc.centroid(d), pos];
                  })
                  .style('fill', 'none')
                  .style('stroke', '#212020d9')
                  .style('stroke-width', '1px');
  }

  ngOnInit(): void {
  }


}
