import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { CancelButtonModule } from '../../button/cancel-button/cancel-button/cancel-button.module';
import { ConfirmButtonModule } from '../../button/confirm-button/confirm-button/confirm-button.module';
import { ConfirmDeleteComponent } from '../confirm-delete.component';

const MaterialModules: any[] = [MatDialogModule, MatButtonModule];
@NgModule({
	declarations: [ConfirmDeleteComponent],
	imports: [CommonModule, MaterialModules, CancelButtonModule, ConfirmButtonModule],
	exports: [ConfirmDeleteComponent],
})
export class ConfirmDeleteModule {}
