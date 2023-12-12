import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TradPipeModule } from 'src/app/pipe/trad.module';
import { ConfirmButtonModule } from 'src/app/shared/components/ui/button/confirm-button/confirm-button/confirm-button.module';
import { LoginContainerComponent } from './container/login-container.component';
import { LoginComponent } from './view/login.component';

const AngularModules: any[] = [CommonModule, ReactiveFormsModule];
const UIModules: any[] = [ConfirmButtonModule];
const InternalModules: any[] = [TradPipeModule];
const MaterialModules: any[] = [MatFormFieldModule, MatInputModule];
@NgModule({
	declarations: [LoginContainerComponent, LoginComponent],
	imports: [AngularModules, UIModules, InternalModules, MaterialModules],
})
export class LoginModule {}
