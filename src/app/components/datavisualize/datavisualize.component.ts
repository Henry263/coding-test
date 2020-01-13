import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { StoringdataService } from '../../services/storingdata.service';
import { DataformattingService } from '../../services/dataformatting.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import * as _ from 'lodash';

@Component({
    selector: 'app-datavisualize',
    templateUrl: './datavisualize.component.html',
    styleUrls: ['./datavisualize.component.scss']
})
export class DataVisualizeComponent implements OnInit {
    length: number;
    datamodel: any;
    isTooltipEnable = true;
    isRadioDisabled = true;
    storageIndicationText = true;
    generationdata;
    weightdata;
    generationgraphtitle = 'Generation';
    healthgraphtitle = 'Health';
    displayedColumns: string[] = ['name', 'friends', 'age', 'weight', 'registrationdate'];
    dataSource = new MatTableDataSource(); // = new MatTableDataSource<DataModel>(this.ELEMENT_DATA);


    @ViewChild(MatPaginator) paginator: MatPaginator;

    datamode = 'false';

    public storagemode = [
        { name: 'Browser', value: 'true' },
        { name: 'jsonfile', value: 'false' }
    ];

    constructor(private http: HttpClient,
                private storingdataservice: StoringdataService,
                private dataformattingservice: DataformattingService) {

    }

    ngOnInit() {
        this.getLocastorageData();
    }

    getLocastorageData() {

        const existingStorageValue = JSON.parse(this.storingdataservice.getRecords('storagedata'));
        if (_.isEmpty(existingStorageValue)) {
            this.toggleFlagValues(true);
            this.getJsonData();
        } else {
            this.toggleFlagValues(false);
            this.dataAssignment(existingStorageValue);
        }
    }
    toggleFlagValues(togglrFlag) {
        if (togglrFlag) {
            this.storingdataservice.setSessionDataFlag(false);
            this.datamode = 'false';
            this.isTooltipEnable = true;
            this.isRadioDisabled = true;
            this.storageIndicationText = true;
        } else {
            this.storingdataservice.setSessionDataFlag(true);
            this.datamode = 'true';
            this.isTooltipEnable = false;
            this.isRadioDisabled = false;
            this.storageIndicationText = false;
        }
    }

    onChangeRadio(evt) {
        this.getLocastorageData();
        if (evt.value === 'false') {
            // Load Json data
            this.storageIndicationText = true;
            this.getJsonData();
        } else {
            // Load browser data
            this.storageIndicationText = false;
            this.getLocastorageData();
        }
    }

    getJsonData() {
        this.storingdataservice.getJsonData().subscribe((userdata) => {
            this.dataAssignment(userdata);
        });
    }

    dataAssignment(userData) {
        this.datamodel = userData;
        this.dataSource.data = this.datamodel;
        this.dataSource.paginator = this.paginator;
        this.length = this.datamodel.length;

        const chartData = this.dataformattingservice.calculateGeneration(userData);
        this.generationdata = chartData;
        const weightData = this.dataformattingservice.calculateWeight(userData);
        this.weightdata = weightData;
    }

    setBulkData() {
        this.storingdataservice.setBulkData(
            'storagedata', 
            [
                {'name':'jjjj', "age": "24",'weight': "63", "friends": false,'registrationdate':'Jan 11, 2020'}, 
                {'name': "Harshil",'age': "35", "weight": "34",'friends': true, "registrationdate": "Jan 11, 2020"}, 
                {'name': "lllll", "age": "24",'weight': "53",'friends': false, "registrationdate":'Jan 11, 2020'}, 
                {'name': "eee",'age':'13', "weight": "34", "friends": false,'registrationdate': "Jan 11, 2020"}, 
                {'name':'Harshilfaf', "age": "324", "weight":'234','friends': true, "registrationdate":'Jan 11, 2020'}, 
                {'name': "wwww", "age":'43', "weight":'24', "friends": true,'registrationdate': "Jan 11, 2020"}, 
                {'name':'nnnnn','age':'89', "weight": "67",'friends': false,'registrationdate': "Jan 11, 2020"}
            ]);
    }
}


