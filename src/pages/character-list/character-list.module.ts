import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { CharactersPage } from "./character-list";

@NgModule({
  declarations: [CharactersPage],
  imports: [IonicPageModule.forChild(CharactersPage)]
})
export class CharactersPageModule {}
