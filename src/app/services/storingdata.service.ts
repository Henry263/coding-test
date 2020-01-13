import { Injectable } from '@angular/core';
import { Observable, throwError, BehaviorSubject} from 'rxjs';
import { DataModel } from '../data/data.model';
import { HttpClient } from '@angular/common/http';
import * as _ from 'lodash';
import { parseSelectorToR3Selector } from '@angular/compiler/src/core';

@Injectable({
    providedIn: 'root'
})
export class StoringdataService {

    sessionDataAvaialble = false;
    private getDataSubject = new BehaviorSubject('');
    subGetData = this.getDataSubject.asObservable();

    constructor(private http: HttpClient) { }

    public storeRecords(key: string, value: any) {
        sessionStorage.setItem(key, JSON.stringify(value));
    }
    public getRecords(key: string) {
        return sessionStorage.getItem(key);
    }

    public setSessionDataFlag(flagVal: boolean) {
        this.sessionDataAvaialble = flagVal;
    }

    public getSessionDataFlag(flagVal: boolean) {
        return this.sessionDataAvaialble;
    }

    getJsonData(): Observable<DataModel> {
        return this.http.get<DataModel>('../../assets/data.json');
    }

    public setBulkData(key: string, value: any) {
        sessionStorage.setItem(key, JSON.stringify(value));
    }

}
