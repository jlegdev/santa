import { Component, Input, OnInit } from '@angular/core';
import { DrawResult, DrawResultTrad } from 'src/app/model/draw.model';

@Component({
	selector: 'app-draw-detail',
	templateUrl: './draw-detail.component.html',
	styleUrls: ['./draw-detail.component.scss'],
})
export class DrawDetailComponent implements OnInit {
	@Input() public draw!: DrawResult;
	public readonly i18nDraw = DrawResultTrad;
	constructor() {}

	ngOnInit(): void {}
}
