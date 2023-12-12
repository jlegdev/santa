import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { TradPipe } from './trad.pipe';

@NgModule({
	declarations: [TradPipe],
	exports: [TradPipe, TranslateModule],
	imports: [CommonModule],
})
export class TradPipeModule {}
