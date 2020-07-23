import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MaterialModule } from "../material/material.module";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

@NgModule({
  declarations: [],
  imports: [CommonModule, FlexLayoutModule, MaterialModule, FontAwesomeModule],
  exports: [CommonModule, FlexLayoutModule, MaterialModule, FontAwesomeModule],
})
export class SharedModule {}
