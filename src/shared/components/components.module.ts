import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputComponent } from './input/input.component';
import { TitlePassosComponent } from './title-passos/title-passos.component';
import { ValidacaoComponent } from './validacao/validacao.component';
import { MenuComponent } from './menu/menu.component';
import { ItemAgendaComponent } from './item-agenda/item-agenda.component';
import { TabsComponent } from './tabs/tabs.component';
import { ButtonComponent } from './button/button.component';
import { ItemComponent } from './item/item.component';
import { AccordionComponent } from './accordion/accordion.component';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  declarations: [
    InputComponent,
    TitlePassosComponent,
    ValidacaoComponent,
    MenuComponent,
    ItemAgendaComponent,
    TabsComponent,
    ButtonComponent,
    ItemComponent,
    AccordionComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgxMaskModule,
  ],
  exports: [
    InputComponent,
    TitlePassosComponent,
    ValidacaoComponent,
    MenuComponent,
    ItemAgendaComponent,
    TabsComponent,
    ItemComponent,
    ButtonComponent,
    AccordionComponent
  ],
  providers: [
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ComponentsModule {}
