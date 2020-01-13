import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import * as _ from 'lodash';

@Injectable({
    providedIn: 'root'
})
export class DataformattingService {

    constructor() { }
    calculateGeneration(dataObject) {
        /**
         * <15 = child
         * > 15 and < 25 = Tenager
         * > 25 and < 45 = Young
         * > 45 = Elder
         */
        const generationArray = [
          ];
        const childObj = {
              label: 'Child',
              count: '',
              bar: '<=15'
            };
        const teenageObj = {
                label: 'Teenage',
                count: '',
                bar: '> 15 and <= 25'
              };
        const youngObj = {
                label: 'Young',
                count: '',
                bar: '> 25 and <= 45'
              };
        const elderObj = {
                label: 'Elder',
                count: '',
                bar: '> 45'
              };
        let childCount = 0;
        let youngCount = 0;
        let teenageCount = 0;
        let elderCount = 0;
        _.forEach(dataObject, (value) => {
            if (parseInt(value.age) <= 15) {
                childCount = childCount + 1;
            } else if (parseInt(value.age) > 15 && parseInt(value.age) <= 25) {
                teenageCount = teenageCount + 1;
            } else if (parseInt(value.age) > 25 && parseInt(value.age) <= 45) {
                youngCount = youngCount + 1;
            } else if (parseInt(value.age) > 45 ) {
                elderCount = elderCount + 1;
            }
          });
        childObj.count = childCount.toString();
        teenageObj.count = teenageCount.toString();
        youngObj.count = youngCount.toString();
        elderObj.count = elderCount.toString();

        generationArray.push(childObj);
        generationArray.push(teenageObj);
        generationArray.push(youngObj);
        generationArray.push(elderObj);

        return generationArray;
    }
    calculateWeight(dataObject) {
        /**
         * <=30 = Slim
         * > 31 and <= 60 = Average
         * > 61 = Overweight
         */
        const weightArray = [
          ];
        const slimObj = {
              label: 'Slim',
              count: '',
              bar: '<= 30'
            };
        const averageObj = {
                label: 'Average',
                count: '',
                bar: '> 30 and <= 60'
              };
        const overweightObj = {
                label: 'Overweight',
                count: '',
                bar: '> 60'
              };
        let slimCount = 0;
        let averageCount = 0;
        let overweightCount = 0;

        _.forEach(dataObject, (value) => {
            if (parseInt(value.weight) <= 30) {
                slimCount = slimCount + 1;
            } else if (parseInt(value.weight) > 30 && parseInt(value.weight) <= 60) {
                averageCount = averageCount + 1;
            } else if (parseInt(value.weight) > 60) {
                overweightCount = overweightCount + 1;
            }
          });
        slimObj.count = slimCount.toString();
        averageObj.count = averageCount.toString();
        overweightObj.count = overweightCount.toString();


        weightArray.push(slimObj);
        weightArray.push(averageObj);
        weightArray.push(overweightObj);


        return weightArray;
    }
}
