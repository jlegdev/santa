import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TradPipeModule } from 'src/app/pipe/trad.module';
import { ConfirmButtonModule } from 'src/app/shared/components/ui/button/confirm-button/confirm-button/confirm-button.module';
import { RegisterContainerComponent } from './container/register-container.component';
import { RegisterComponent } from './view/register.component';

const AngularModules: any[] = [CommonModule, ReactiveFormsModule];
const UIModules: any[] = [ConfirmButtonModule];
const InternalModules: any[] = [TradPipeModule];
const MaterialModules: any[] = [MatFormFieldModule, MatInputModule];
@NgModule({
	declarations: [RegisterContainerComponent, RegisterComponent],
	imports: [AngularModules, UIModules, InternalModules, MaterialModules],
})
export class RegisterModule {}
