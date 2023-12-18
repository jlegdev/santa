import { registerLocaleData } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import localeFr from '@angular/common/locales/fr';
import { APP_INITIALIZER, LOCALE_ID, NgModule, Provider } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainLayoutComponent } from './component/core/main-layout/main-layout.component';
import { NavbarModule } from './component/core/navbar/navbar.module';
import { EventModule } from './component/event/event.module';
import { HomeModule } from './component/home/home.module';
import { LoginModule } from './component/login/login.module';
import { RegisterModule } from './component/register/register.module';
import { FirebaseConfig } from './model/environment.model';
import { TradPipeModule } from './pipe/trad.module';
import { AuthService } from './service/api/auth.service';
import { EventService } from './service/api/event.service';
import { AuthMockService } from './service/api/mock/auth.mock.service';
import { EventMockService } from './service/api/mock/event.mock.service';
import { UserMockService } from './service/api/mock/user.mock.service';
import { UserService } from './service/api/user.service';
import { TradService } from './service/trad.service';
import { SpinnerModule } from './shared/components/ui/spinner/spinner/spinner.module';
// AoT requires an exported function for factories
export function createTranslateLoader(http: HttpClient) {
	// Ici on précise la localisation des fichier de trad(2eme arg), et la terminaison de ceux ci(3eme arg)
	return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export function translationInitializer(translationService: TradService) {
	return function () {
		return translationService.init();
	};
}

// the second parameter 'fr' is optional
registerLocaleData(localeFr, 'fr');

const AngularModules: any[] = [BrowserModule, AppRoutingModule, HttpClientModule, BrowserAnimationsModule, ReactiveFormsModule];
const MaterialModules: any[] = [MatCardModule, MatIconModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSnackBarModule];
const UIModules: any[] = [NavbarModule, SpinnerModule];
const InternalModules: any[] = [
	TradPipeModule,
	TranslateModule.forRoot({
		loader: {
			provide: TranslateLoader,
			useFactory: createTranslateLoader,
			deps: [HttpClient],
		},
		// Ici ne pas ajouter le langage par défaut car il y a une  dépendance cyclique entre TranslateModule et HttpInterceptor
		// Les deux dépendants de HttpClient. Translate Service initialise HttpClient qui initialise HttpClientError qui trigger L'HttpInterceptor
		// defaultLanguage: 'fr',
	}),
];
const LazyModules: any[] = [HomeModule, LoginModule, RegisterModule, EventModule];

const prodModules: any[] = [
	provideFirebaseApp(() => initializeApp(environment.firebase as FirebaseConfig)),
	provideFirestore(() => getFirestore()),
	provideAuth(() => getAuth()),
];
const providers: Provider[] = [
	{ provide: LOCALE_ID, useValue: 'fr' },
	// { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true },
	{
		provide: APP_INITIALIZER,
		useFactory: translationInitializer,
		deps: [TradService],
		multi: true,
	},
	{
		provide: AuthService,
		useClass: environment.isMock ? AuthMockService : AuthService,
	},
	{
		provide: EventService,
		useClass: environment.isMock ? EventMockService : EventService,
	},
	{
		provide: UserService,
		useClass: environment.isMock ? UserMockService : UserService,
	},
];
@NgModule({
	declarations: [AppComponent, MainLayoutComponent],
	imports: [AngularModules, InternalModules, MaterialModules, UIModules, prodModules, LazyModules],
	providers: [providers],
	exports: [TradPipeModule],
	bootstrap: [AppComponent],
})
export class AppModule {}
