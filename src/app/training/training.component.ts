import { Component, OnInit } from '@angular/core';
import { TrainingService } from './training.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromRoot from '../app.reducer';

@Component({
    selector: 'app-training',
    templateUrl: './training.component.html',
    styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {
    ongoingTraining$: Observable<boolean>;

    constructor(
        private trainingService: TrainingService,
        private store: Store<fromRoot.State>
    ) { }

    ngOnInit() {
        this.ongoingTraining$ = this.store.select(fromRoot.getIsTraining);
    }
}
