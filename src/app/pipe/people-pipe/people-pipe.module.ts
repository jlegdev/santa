import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PeoplePipe } from './people.pipe';

@NgModule({
	declarations: [PeoplePipe],
	imports: [CommonModule],
	exports: [PeoplePipe],
})
export class PeoplePipeModule {}
