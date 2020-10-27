import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {TableColumn} from "./TableColumn";
import {MatSort, Sort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import { Farmersdata } from 'app/shared/data/farmersdata/farmersdata';
import { forEach } from 'core-js/fn/array';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {

 
  // @Input() GridData:any;
  // @Input() ColData:any;
  
  // @Input( )dataSource = new MatTableDataSource();
  // @Input() displayedColumns:any;
  id:any;
  @Input() tableName:any;
  
  public tableDataSource = new MatTableDataSource([]);
  public displayedColumns: string[];
  @ViewChild(MatPaginator, {static: false}) matPaginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) matSort: MatSort;

  @Input() isPageable = false;
  @Input() isSortable = false;
  @Input() isFilterable = false;
  @Input() tableColumns: TableColumn[];
  @Input() rowActionIcon: string;
  @Input() paginationSizes: number[] = [5, 10, 15];
  @Input() defaultPageSize = this.paginationSizes[1];

  @Output() sort: EventEmitter<Sort> = new EventEmitter();
  @Output() rowAction: EventEmitter<any> = new EventEmitter<any>();
  @Output() add: EventEmitter<any> = new EventEmitter<any>();
  @Output() update: EventEmitter<any> = new EventEmitter<any>();

  // this property needs to have a setter, to dynamically get changes from parent component
  @Input() set tableData(data: any[]) {
    this.setTableDataSource(data);
  }

  constructor() {
  }

  ngOnInit(): void {
    
    const columnNames = this.tableColumns.map((tableColumn: TableColumn) => tableColumn.name);
    if (this.rowActionIcon) {
      this.displayedColumns = [this.rowActionIcon, ...columnNames]
    } else {
      this.displayedColumns = columnNames;
    }
  }

  // we need this, in order to make pagination work with *ngIf
  ngAfterViewInit(): void {
    this.tableDataSource.paginator = this.matPaginator;
  }


  setTableDataSource(data: any) {
    this.tableDataSource = new MatTableDataSource<any>(data);
    this.tableDataSource.paginator = this.matPaginator;
    this.tableDataSource.sort = this.matSort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.tableDataSource.filter = filterValue.trim().toLowerCase();
  }

  sortTable(sortParameters: Sort) {
    // defining name of data property, to sort by, instead of column name
    sortParameters.active = this.tableColumns.find(column => column.name === sortParameters.active).dataKey;
    this.sort.emit(sortParameters);
  }

  emitRowAction(row: any) {
    this.rowAction.emit(row);
  }
  callUpdate(data:any){
    
    console.log("Update clicked");
   
    if(this.tableColumns[0].dataKey=="farmerId")
    {
    this.id=data.farmerId;
    console.log(this.id);
    this.update.emit(this.id);
    }
    else if(this.tableColumns[0].dataKey=="productId"){
      this.id=data.productId;
      console.log(this.id);
      this.update.emit(this.id);  
    }
    
  }
callAdd(){
  console.log("Add clicked");
  console.log(this.tableColumns);
  
  this.add.emit(this.tableColumns);
  
  
}
//   @Output("onAction") emitter = new EventEmitter();
// @Input("data") dataSource =  new MatTableDataSource([]);
// @Input("cols") tableCols = [];
// // We will need this getter to exctract keys from tableCols
// get keys() { return this.tableCols.map(({ key }) => key); }
// // this function will return a value from column configuration
// // depending on the value that element holds
// showBooleanValue(elt, column) {
// return column.config.values[`${elt[column.key]}`];
// }
// ngOnInit(): void {
// }
}