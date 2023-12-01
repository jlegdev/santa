import { Component, OnInit } from '@angular/core';
import { MaterialService } from './service/utils/material.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
	constructor(private materialService: MaterialService) {}

	ngOnInit(): void {
		this.materialService.init();
	}
}
