import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from "@angular/common";

import { DashboardRoutingModule } from "./dashboard-routing.module";
import { ChartistModule } from 'ng-chartist';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularResizedEventModule } from 'angular-resize-event';
import { MatchHeightModule } from "../shared/directives/match-height.directive";
import { Dashboard1Component } from "./dashboard1/dashboard1.component";
import { Dashboard2Component } from "./dashboard2/dashboard2.component";
import { TablesComponent } from './tables/tables.component';
import { FarmersdataService } from '../shared/services/farmers/farmersdata.service';
import {MaterialModule} from '../shared/material/material.module';
import {DataPropertyGetterPipePipe} from './tables/data-property-getter-pipe.pipe';
import { FarmersUpdateComponent } from './farmers-update/farmers-update.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {FlexLayoutModule } from '@angular/flex-layout';
import { NgSelectModule } from '@ng-select/ng-select';
import { FarmersAddComponent } from './farmers-add/farmers-add.component';
@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        NgSelectModule,
        DashboardRoutingModule,
        ChartistModule,
        NgbModule,
        MatchHeightModule,
        NgApexchartsModule,
        AngularResizedEventModule
    ],
    exports: [],
    declarations: [
        Dashboard1Component,
        Dashboard2Component,
        TablesComponent,
        DataPropertyGetterPipePipe,
        FarmersUpdateComponent,
        FarmersAddComponent
       
      
    ],
    providers: [FarmersdataService],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class DashboardModule { }
