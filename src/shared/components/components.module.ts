import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputComponent } from './input/input.component';
import { TitlePassosComponent } from './title-passos/title-passos.component';
import { ValidacaoComponent } from './validacao/validacao.component';
import { MenuComponent } from './menu/menu.component';

@NgModule({
  declarations: [
    InputComponent,
    TitlePassosComponent,
    ValidacaoComponent,
    MenuComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports: [
    InputComponent,
    TitlePassosComponent,
    ValidacaoComponent,
    MenuComponent
  ],
  providers: [
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ComponentsModule {}
