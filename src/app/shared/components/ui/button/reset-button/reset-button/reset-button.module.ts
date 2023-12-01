import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ResetButtonComponent } from '../reset-button.component';

const MaterialsModules: any[] = [MatIconModule, MatButtonModule];
@NgModule({
	declarations: [ResetButtonComponent],
	imports: [CommonModule, MaterialsModules],
	exports: [ResetButtonComponent],
})
export class ResetButtonModule {}
