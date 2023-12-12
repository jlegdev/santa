import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmActionComponent } from './confirm-action.component';

const MaterialModules: any[] = [MatDialogModule];
@NgModule({
	declarations: [ConfirmActionComponent],
	imports: [CommonModule, MaterialModules],
	exports: [ConfirmActionComponent],
})
export class ConfirmActionModule {}
