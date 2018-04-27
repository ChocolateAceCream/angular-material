import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import * as fromRoot from '../../app.reducer';

@Component({
    selector: 'app-past-training',
    templateUrl: './past-training.component.html',
    styleUrls: ['./past-training.component.css']
})
export class PastTrainingComponent implements OnInit, AfterViewInit {
    displayedColumns = ['date','name','duration','calories', 'state'];
    dataSource = new MatTableDataSource<Exercise>();

    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(
        private trainingService: TrainingService,
        private store: Store<fromRoot.State>
    ) { }

    ngOnInit() {
        this.store.select(fromRoot.getFinishedExercises).subscribe(
            ex => {
                this.dataSource.data = ex;
        });
        this.trainingService.getDataFromDatabase();
    }

    //execute after view rendering and initilazing
    ngAfterViewInit() {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
    }

    doFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }
}
