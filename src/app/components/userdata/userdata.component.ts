import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StoringdataService } from '../../services/storingdata.service';
import * as moment from 'moment';
import * as _ from 'lodash';

@Component({
    selector: 'app-userdata',
    templateUrl: './userdata.component.html',
    styleUrls: ['./userdata.component.scss']
})
export class UserDataComponent implements OnInit {

    successflag = false;
    failflag = false;

    friendsObj = [
        { code: true, name: 'Yes' },
        { code: false, name: 'No' },
        { code: null, name: 'Do not want to share' }
    ];

    userentryform: FormGroup;
    submitted = false;
    friendsVal = true;
    existingStorageValue: any;

    textvalid = new FormControl('', [Validators.required]);
    constructor(private formbuilder: FormBuilder,
                private storingdataservice: StoringdataService) { }


    ngOnInit(): void {
        this.existingStorageValue = this.storingdataservice.getRecords('storagedata');

        this.userentryform = this.formbuilder.group({
            name: ['', [Validators.required]],
            age: ['', [Validators.required]],
            weight: ['', [Validators.required]],
        });
    }
    get f() {
        return this.userentryform.controls;
    }
    getErrorMessage() {
        return this.textvalid.hasError('required') ? 'You must enter a value' :
            this.textvalid.hasError('textvalid') ? 'Not a valid value' :
                '';
    }
    friendsValue(val) {
        this.friendsVal = val;
    }
    onSubmit() {
        this.submitted = true;
        try {
            if (this.userentryform.invalid) {
                return;
            } else {
                const existingStorageValue = JSON.parse(this.storingdataservice.getRecords('storagedata'));
                this.existingStorageValue = existingStorageValue;

                const buildUserObj = this.userentryform.value;
                buildUserObj.friends = '';
                buildUserObj.friends = this.friendsVal;

                buildUserObj.registrationdate = '';
                buildUserObj.registrationdate = moment().format('ll');

                let age = buildUserObj.age;
                age = age.toString();
                buildUserObj.age = age;

                let weight = buildUserObj.weight;
                weight = weight.toString();
                buildUserObj.weight = weight;
                const newUserArray = [];
                newUserArray.push(buildUserObj);

                if (existingStorageValue && existingStorageValue.length > 0) {
                    const updatedUserArray = _.union(existingStorageValue, newUserArray);
                    this.storingdataservice.storeRecords('storagedata', updatedUserArray);
                } else {
                    this.storingdataservice.storeRecords('storagedata', newUserArray);
                }
                this.userentryform.controls.name.setValue('');
                this.userentryform.controls.age.setValue('');
                this.userentryform.controls.weight.setValue('');
                this.successflag = true;
                setTimeout(() => {
                    this.successflag = false;
                 }, 4000);

            }
        } catch (e) {
            this.failflag = true;
            setTimeout(() => {
                this.failflag = false;
             }, 4000);
        }




    }

}
