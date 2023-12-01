import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { SpinnerModule } from 'src/app/shared/components/ui/spinner/spinner/spinner.module';
import { TradPipeModule } from 'src/app/shared/trad.module';
import { MenuLanguageComponent } from './menu/menu-language/menu-language.component';
import { MenuUserComponent } from './menu/menu-user/menu-user.component';
import { NavbarComponent } from './navbar.component';

// const MaterialModules: any[] = [MatToolbarModule, MatIconModule, MatMenuModule, MatButtonModule];

const MaterialModules: any[] = [
	MatCardModule,
	MatIconModule,
	MatButtonModule,
	MatToolbarModule,
	MatFormFieldModule,
	MatInputModule,
	MatDialogModule,
	MatMenuModule,
	SpinnerModule,
];
@NgModule({
	declarations: [NavbarComponent, MenuLanguageComponent, MenuUserComponent],
	exports: [NavbarComponent, MenuLanguageComponent, MenuUserComponent],
	imports: [CommonModule, MaterialModules, TradPipeModule, RouterModule],
})
export class NavbarModule {}
