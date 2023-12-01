import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { CancelButtonComponent } from '../cancel-button.component';

const MaterialModules: any[] = [MatButtonModule];
@NgModule({
	declarations: [CancelButtonComponent],
	imports: [CommonModule, MaterialModules],
	exports: [CancelButtonComponent],
})
export class CancelButtonModule {}
