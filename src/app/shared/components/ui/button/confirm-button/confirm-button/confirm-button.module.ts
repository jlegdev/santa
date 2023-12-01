import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ConfirmButtonComponent } from '../confirm-button.component';

const MaterialModules: any[] = [MatButtonModule];
@NgModule({
	declarations: [ConfirmButtonComponent],
	imports: [CommonModule, MaterialModules],
	exports: [ConfirmButtonComponent],
})
export class ConfirmButtonModule {}
