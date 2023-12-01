import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmCancelComponent } from './confirm-cancel.component';

const MaterialModules: any[] = [MatDialogModule];
@NgModule({
	declarations: [ConfirmCancelComponent],
	imports: [CommonModule, MaterialModules],
	exports: [ConfirmCancelComponent],
})
export class ConfirmCancelModule {}
