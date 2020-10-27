import { Component, OnInit  } from '@angular/core';
import * as Chartist from 'chartist';
import { ChartType, ChartEvent } from "ng-chartist";
import ChartistTooltip from 'chartist-plugin-tooltips-updated';
import { Observable } from 'rxjs';
import { Farmersdata} from 'app/shared/data/farmersdata/farmersdata';
import { Product} from 'app/shared/data/product';
import { ProductService } from 'app/shared/services/product/product.service';
import { FarmersdataService } from 'app/shared/services/farmers/farmersdata.service';
import{TableColumn} from '../tables/TableColumn';
import {Sort} from "@angular/material/sort";
import { Router } from '@angular/router';
declare var require: any;

const data: any = require('../../shared/data/chartist.json');

export interface Chart {
  type: ChartType;
  data: Chartist.IChartistData;
  options?: any;
  responsiveOptions?: any;
  events?: ChartEvent;
  // plugins?: any;
}

@Component({
  selector: 'app-dashboard1',
  templateUrl: './dashboard1.component.html',
  styleUrls: ['./dashboard1.component.scss']
})

export class Dashboard1Component  implements OnInit  {
  id:number;
  farmers:boolean=false;
  products:boolean=false;
  farmersadd:boolean=false;
  productsadd:boolean=false;
  tablename:String;
  // farmersupdate: boolean=false;
  // productsupdate: boolean=false;
  farm(){
    console.log("clicked farmers");
    this.farmers=true;
    this.products=false;
	this.reloadData();
    this.tablename="Farmers Management";
  }
  prod(){
    console.log("clicked products");
    this.farmers=false;
    this.products=true;
    this.tablename="Product Management";
  }
 farmerrs:Farmersdata[];
 productts:Product[];
  farmersdata:Observable<Farmersdata[]>;
  productdata:Observable<Product[]>;
  farmersTableColumns: TableColumn[];
  productTableColumns: TableColumn[];
  constructor( private router: Router,private farmersService : FarmersdataService,private productService:ProductService) { }
  ngOnInit(): void {
   
    this.reloadData();
    this.reloadData1();
  this.initColumns();
  this.initColums();

  }
  
  initColums():void{
    this.farmersTableColumns=[
      {
        name: 'farmerId',
        dataKey: 'farmerId',
        isSortable: true
      },
      {
        name: 'fullName',
        dataKey: 'fullName',
        isSortable: true
      },
      {
        name: 'place',
        dataKey: 'place',
        isSortable: true
      },
      {
        name: 'landareasqft',
        dataKey: 'landareasqft',
        isSortable: true
      }
      
    ];
  }
  initColumns(): void {
    
    this.productTableColumns = [
      {
        name: 'productId',
        dataKey: 'productId',
        isSortable: true
      },
      {
        name: 'fullName',
        dataKey: 'fullName',
        isSortable: true
      },
      {
        name: 'seasonalmonth',
        dataKey: 'seasonalmonth',
        isSortable: true
      }
    ];
  }
  reloadData() {
  
    this.farmersService.getFarmersList().subscribe(data => {this.farmersdata= data;this.farmerrs=data; console.log(data)});
     
    }
    reloadData1() {
  
      this.productService.getProductList().subscribe(data => {this.productdata= data;this.productts=data; console.log(data)});
       
      }

farmersColumns=[
  {field:"farmerId",header:"Id"},
  {field:"closedorders",header:"closedorders"},
  {field:"place",header:"place"},
  {field:"address",header:"address"}

];

productColumns=[
  {field:"productId",header:"Id"},
  {field:"fullName",header:"fullName"},
  {field:"seasonalmonth",header:"seasonalmonth"},
  {field:"orderedQuantity",header:"orderedQuantity"},
  {field:"rating",header:"rating"}

];


sortData(sortParameters: Sort) {
  const keyName = sortParameters.active;
  if (sortParameters.direction === 'asc') {
    this.productts = this.productts.sort((a: Product, b: Product) => a[keyName].localeCompare(b[keyName]));
  } else if (sortParameters.direction === 'desc') {
    this.productts = this.productts.sort((a: Product, b: Product) => b[keyName].localeCompare(a[keyName]));
  } else {
    return this.productts;
  }
}
removeproducts(productts: Product) {
  this.productts = this.productts.filter(item => item.productId !== productts.productId)
}

sortDatas(sortParameters: Sort) {
  const keyName = sortParameters.active;
  if (sortParameters.direction === 'asc') {
    this.farmerrs = this.farmerrs.sort((a: Farmersdata, b: Farmersdata) => a[keyName].localeCompare(b[keyName]));
  } else if (sortParameters.direction === 'desc') {
    this.farmerrs = this.farmerrs.sort((a: Farmersdata, b: Farmersdata) => b[keyName].localeCompare(a[keyName]));
  } else {
    return this.farmerrs;
  }
}

rowAction(farmerrs: Farmersdata) {
  //this.farmerrs = this.farmerrs.filter(item => item.farmerId !== farmerrs.farmerId)
  console.log(farmerrs);
}

add(data:any){
  console.log(data);
  if(data==this.farmersTableColumns){
    console.log("adding farmersdata");
    this.farmersadd=true;
    this.farmers=false;
    this.id=null;
  
  }
  else if(data=="productdata"){
console.log("adding product");
this.productsadd=true;
this.products=false;
  }
}

updateData(data:any){

  this.id=data;
  console.log(this.id);
 // if(data==this.farmersTableColumns){
    console.log("updating farmersdata");
    this.farmers=false;
    this.farmersadd=true;
    this.reloadData();
 // }
}

invoke($event){
  this.farmers=true;
    this.farmersadd=false;
}
  // Line area chart configuration Starts
  lineArea: Chart = {
    type: 'Line',
    data: data['lineAreaDashboard'],
    options: {
      low: 0,
      showArea: true,
      fullWidth: true,
      onlyInteger: true,
      axisY: {
        low: 0,
        scaleMinSpace: 50,
      },
      plugins: [
        ChartistTooltip({
          appendToBody: true,
          pointClass: 'ct-point-regular'
        })
      ],
      axisX: {
        showGrid: false
      }
    },
    events: {
      created(data: any): void {
        var defs = data.svg.elem('defs');
        defs.elem('linearGradient', {
          id: 'gradient',
          x1: 0,
          y1: 1,
          x2: 1,
          y2: 0
        }).elem('stop', {
          offset: 0,
          'stop-color': 'rgba(0, 201, 255, 1)'
        }).parent().elem('stop', {
          offset: 1,
          'stop-color': 'rgba(146, 254, 157, 1)'
        });

        defs.elem('linearGradient', {
          id: 'gradient1',
          x1: 0,
          y1: 1,
          x2: 1,
          y2: 0
        }).elem('stop', {
          offset: 0,
          'stop-color': 'rgba(132, 60, 247, 1)'
        }).parent().elem('stop', {
          offset: 1,
          'stop-color': 'rgba(56, 184, 242, 1)'
        });
      },
      draw(data: any): void {
        if (data.type === 'point') {
          var circle = new Chartist.Svg('circle', {
            cx: data.x,
            cy: data.y,
            r: 4,
            'ct:value': data.value.y,
            'ct:meta': data.meta,
            style: 'pointer-events: all !important',
            class: 'ct-point-regular'
          });
          data.element.replace(circle);
        }
      }
    },
  };
  // Line area chart configuration Ends

  // Stacked Bar chart configuration Starts
  Stackbarchart: Chart = {
    type: 'Bar',
    data: data['Stackbarchart'],
    options: {
      stackBars: true,
      fullWidth: true,
      axisX: {
        showGrid: false,
      },
      axisY: {
        showGrid: false,
        showLabel: false,
        offset: 0
      },
      chartPadding: 30
    },
    events: {
      created(data: any): void {
        var defs = data.svg.elem('defs');
        defs.elem('linearGradient', {
          id: 'linear',
          x1: 0,
          y1: 1,
          x2: 0,
          y2: 0
        }).elem('stop', {
          offset: 0,
          'stop-color': '#7441DB'
        }).parent().elem('stop', {
          offset: 1,
          'stop-color': '#C89CFF'
        });
      },
      draw(data: any): void {
        if (data.type === 'bar') {
          data.element.attr({
            style: 'stroke-width: 5px',
            x1: data.x1 + 0.001
          });

        }
        else if (data.type === 'label') {
          data.element.attr({
            y: 270
          })
        }
      }
    },
  };
  // Stacked Bar chart configuration Ends

  // Line area chart 2 configuration Starts
  lineArea2: Chart = {
    type: 'Line',
    data: data['lineArea2'],
    options: {
      showArea: true,
      fullWidth: true,
      lineSmooth: Chartist.Interpolation.none(),
      axisX: {
        showGrid: false,
      },
      axisY: {
        low: 0,
        scaleMinSpace: 50
      },
      plugins: [
        ChartistTooltip({
          appendToBody: true,
          pointClass: 'ct-point-circle'
        })
      ],
    },
    responsiveOptions: [
      ['screen and (max-width: 640px) and (min-width: 381px)', {
        axisX: {
          labelInterpolationFnc: function (value, index) {
            return index % 2 === 0 ? value : null;
          }
        }
      }],
      ['screen and (max-width: 380px)', {
        axisX: {
          labelInterpolationFnc: function (value, index) {
            return index % 3 === 0 ? value : null;
          }
        }
      }]
    ],
    events: {
      created(data: any): void {
        var defs = data.svg.elem('defs');
        defs.elem('linearGradient', {
          id: 'gradient2',
          x1: 0,
          y1: 1,
          x2: 0,
          y2: 0
        }).elem('stop', {
          offset: 0,
          'stop-opacity': '0.2',
          'stop-color': 'transparent'
        }).parent().elem('stop', {
          offset: 1,
          'stop-opacity': '0.2',
          'stop-color': '#60AFF0'
        });

        defs.elem('linearGradient', {
          id: 'gradient3',
          x1: 0,
          y1: 1,
          x2: 0,
          y2: 0
        }).elem('stop', {
          offset: 0.3,
          'stop-opacity': '0.2',
          'stop-color': 'transparent'
        }).parent().elem('stop', {
          offset: 1,
          'stop-opacity': '0.2',
          'stop-color': '#6CD975'
        });
      },
      draw(data: any): void {
        var circleRadius = 4;
        if (data.type === 'point') {

          var circle = new Chartist.Svg('circle', {
            cx: data.x,
            cy: data.y,
            r: circleRadius,
            'ct:value': data.value.y,
            'ct:meta': data.meta,
            style: 'pointer-events: all !important',
            class: 'ct-point-circle'
          });
          data.element.replace(circle);
        }
        else if (data.type === 'label') {
          // adjust label position for rotation
          const dX = data.width / 2 + (30 - data.width)
          data.element.attr({ x: data.element.attr('x') - dX })
        }
      }
    },
  };
  // Line area chart 2 configuration Ends

  // Line chart configuration Starts
  lineChart: Chart = {
    type: 'Line', data: data['LineDashboard'],
    options: {
      axisX: {
        showGrid: false
      },
      axisY: {
        showGrid: false,
        showLabel: false,
        low: 0,
        high: 100,
        offset: 0,
      },
      plugins: [
        ChartistTooltip({
          appendToBody: true,
          currency: '$',
          pointClass: 'ct-point-circle'
        })
      ],
      fullWidth: true,
      offset: 0,
    },
    events: {
      draw(data: any): void {
        var circleRadius = 4;
        if (data.type === 'point') {
          var circle = new Chartist.Svg('circle', {
            cx: data.x,
            cy: data.y,
            r: circleRadius,
            'ct:value': data.value.y,
            'ct:meta': data.meta,
            style: 'pointer-events: all !important',
            class: 'ct-point-circle'
          });

          data.element.replace(circle);
        }
        else if (data.type === 'label') {
          // adjust label position for rotation
          const dX = data.width / 2 + (30 - data.width)
          data.element.attr({ x: data.element.attr('x') - dX })
        }
      }
    },

  };
  // Line chart configuration Ends

  // Donut chart configuration Starts
  DonutChart: Chart = {
    type: 'Pie',
    data: data['donutDashboard'],
    options: {
      donut: true,
      startAngle: 0,
      labelInterpolationFnc: function (value) {
        var total = data['donutDashboard'].series.reduce(function (prev, series) {
          return prev + series.value;
        }, 0);
        return total + '%';
      }
    },
    events: {
      draw(data: any): void {
        if (data.type === 'label') {
          if (data.index === 0) {
            data.element.attr({
              dx: data.element.root().width() / 2,
              dy: data.element.root().height() / 2
            });
          } else {
            data.element.remove();
          }
        }

      }
    }
  };
  // Donut chart configuration Ends

  //  Bar chart configuration Starts
  BarChart: Chart = {
    type: 'Bar', data: data['DashboardBar'], options: {
      axisX: {
        showGrid: false,
      },
      axisY: {
        showGrid: false,
        showLabel: false,
        offset: 0
      },
      low: 0,
      high: 60, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
    },
    responsiveOptions: [
      ['screen and (max-width: 640px)', {
        seriesBarDistance: 5,
        axisX: {
          labelInterpolationFnc: function (value) {
            return value[0];
          }
        }
      }]
    ],
    events: {
      created(data: any): void {
        var defs = data.svg.elem('defs');
        defs.elem('linearGradient', {
          id: 'gradient4',
          x1: 0,
          y1: 1,
          x2: 0,
          y2: 0
        }).elem('stop', {
          offset: 0,
          'stop-color': '#8E1A38'
        }).parent().elem('stop', {
          offset: 1,
          'stop-color': '#FAA750'
        });
        defs.elem('linearGradient', {
          id: 'gradient5',
          x1: 0,
          y1: 1,
          x2: 0,
          y2: 0
        }).elem('stop', {
          offset: 0,
          'stop-color': '#1750A5'
        }).parent().elem('stop', {
          offset: 1,
          'stop-color': '#40C057'
        });

        defs.elem('linearGradient', {
          id: 'gradient6',
          x1: 0,
          y1: 1,
          x2: 0,
          y2: 0
        }).elem('stop', {
          offset: 0,
          'stop-color': '#3B1C93'
        }).parent().elem('stop', {
          offset: 1,
          'stop-color': '#60AFF0'
        });
        defs.elem('linearGradient', {
          id: 'gradient7',
          x1: 0,
          y1: 1,
          x2: 0,
          y2: 0
        }).elem('stop', {
          offset: 0,
          'stop-color': '#562DB7'
        }).parent().elem('stop', {
          offset: 1,
          'stop-color': '#F55252'
        });

      },
      draw(data: any): void {
        var barHorizontalCenter, barVerticalCenter, label, value;
        if (data.type === 'bar') {

          data.element.attr({
            y1: 195,
            x1: data.x1 + 0.001
          });

        }
      }
    },

  };
  // Bar chart configuration Ends

  // line chart configuration Starts
  WidgetlineChart: Chart = {
    type: 'Line', data: data['Dashboard1_WidgetlineChart'],
    options: {
      axisX: {
        showGrid: false,
        showLabel: false,
        offset: 0
      },
      axisY: {
        showGrid: false,
        low: 40,
        showLabel: false,
        offset: 0
      },
      plugins: [
        ChartistTooltip({
          appendToBody: true,
          currency: '$',
          pointClass: 'ct-point-regular'
        })
      ],
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0
      }),
      fullWidth: true
    },
    events: {
      draw(data: any): void {
        if (data.type === 'point') {
          var circle = new Chartist.Svg('circle', {
            cx: data.x,
            cy: data.y,
            r: 4,
            'ct:value': data.value.y,
            'ct:meta': data.meta,
            style: 'pointer-events: all !important',
            class: 'ct-point-regular'
          });
          data.element.replace(circle);
        }
      }
    }
  };
  // Line chart configuration Ends

    // line chart configuration Starts
    WidgetlineChart1: Chart = {
      type: 'Line', data: data['Dashboard1_WidgetlineChart1'],
      options: {
        axisX: {
          showGrid: false,
          showLabel: false,
          offset: 0
        },
        axisY: {
          showGrid: false,
          low: 40,
          showLabel: false,
          offset: 0
        },
        plugins: [
          ChartistTooltip({
            appendToBody: true,
            currency: '$',
            pointClass: 'ct-point-regular'
          })
        ],
        lineSmooth: Chartist.Interpolation.cardinal({
          tension: 0
        }),
        fullWidth: true
      },
      events: {
        draw(data: any): void {
          if (data.type === 'point') {
            var circle = new Chartist.Svg('circle', {
              cx: data.x,
              cy: data.y,
              r: 4,
              'ct:value': data.value.y,
              'ct:meta': data.meta,
              style: 'pointer-events: all !important',
              class: 'ct-point-regular'
            });
            data.element.replace(circle);
          }
        }
      }
    };
    // Line chart configuration Ends

      // line chart configuration Starts
  WidgetlineChart2: Chart = {
    type: 'Line', data: data['Dashboard1_WidgetlineChart2'],
    options: {
      axisX: {
        showGrid: false,
        showLabel: false,
        offset: 0
      },
      axisY: {
        showGrid: false,
        low: 40,
        showLabel: false,
        offset: 0
      },
      plugins: [
        ChartistTooltip({
          appendToBody: true,
          currency: '$',
          pointClass: 'ct-point-regular'
        })
      ],
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0
      }),
      fullWidth: true
    },
    events: {
      draw(data: any): void {
        if (data.type === 'point') {
          var circle = new Chartist.Svg('circle', {
            cx: data.x,
            cy: data.y,
            r: 4,
            'ct:value': data.value.y,
            'ct:meta': data.meta,
            style: 'pointer-events: all !important',
            class: 'ct-point-regular'
          });
          data.element.replace(circle);
        }
      }
    }
  };
  // Line chart configuration Ends

    // line chart configuration Starts
    WidgetlineChart3: Chart = {
      type: 'Line', data: data['Dashboard1_WidgetlineChart3'],
      options: {
        axisX: {
          showGrid: false,
          showLabel: false,
          offset: 0
        },
        axisY: {
          showGrid: false,
          low: 40,
          showLabel: false,
          offset: 0
        },
        plugins: [
          ChartistTooltip({
            appendToBody: true,
            currency: '$',
            pointClass: 'ct-point-regular'
          })
        ],
        lineSmooth: Chartist.Interpolation.cardinal({
          tension: 0
        }),
        fullWidth: true
      },
      events: {
        draw(data: any): void {
          if (data.type === 'point') {
            var circle = new Chartist.Svg('circle', {
              cx: data.x,
              cy: data.y,
              r: 4,
              'ct:value': data.value.y,
              'ct:meta': data.meta,
              style: 'pointer-events: all !important',
              class: 'ct-point-regular'
            });
            data.element.replace(circle);
          }
        }
      }
    };
    // Line chart configuration Ends

  onResized(event: any) {
    setTimeout(() => {
      this.fireRefreshEventOnWindow();
    }, 300);
  }

  fireRefreshEventOnWindow = function () {
    var evt = document.createEvent("HTMLEvents");
    evt.initEvent("resize", true, false);
    window.dispatchEvent(evt);
  };

}
