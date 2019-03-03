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
import { AccordionComponent } from './accordion/consultorios/accordion.component';
import { NgxMaskModule } from 'ngx-mask';
import { AccordionAgendarComponent } from './accordion/agendar-consulta/accordion-agendar.component';

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
    AccordionComponent,
    AccordionAgendarComponent
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
    AccordionComponent,
    AccordionAgendarComponent
  ],
  providers: [
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ComponentsModule {}
