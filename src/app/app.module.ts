import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Route, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AppComponent } from './app.component';
import { CopyrightBarComponent } from './copyright-bar/copyright-bar.component';
import { CrearMemeComponent } from './crear-meme/crear-meme.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { KitPrensaComponent } from './kit-prensa/kit-prensa.component';
import { MemesComponent } from './memes/memes.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ParallaxComponent } from './parallax/parallax.component';
import { SectionAFuncionamientoComponent } from './section-a-funcionamiento/section-a-funcionamiento.component';
import { SectionAboutComponent } from './section-about/section-about.component';
import { TopbarComponent } from './topbar/topbar.component';
import { ColorChromeModule } from "ngx-color/chrome";
import { HttpClientModule } from '@angular/common/http';
import { FiltroMemePipe } from './pipes/filtro-meme.pipe';
import { ContactoComponent } from './contacto/contacto.component';
import { MemeComponent } from './meme/meme.component';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { DenunciaComponent } from './denuncia/denuncia.component';
const APP_ROUTES: Route[] = [
  { path: '', component: HomeComponent },
  { path: 'crear-meme', component:CrearMemeComponent},
  { path: 'acerca-de-memeotecnia', component:AboutComponent},
  { path: 'kit-prensa', component:KitPrensaComponent},
  { path: 'contacto', component:ContactoComponent},
  { path: 'meme/:id', component:MemeComponent},
  { path: 'denuncia/:id', component:DenunciaComponent},
  { path: 'memes-recientes', component:MemesComponent},
  { path: '**', redirectTo: '/', pathMatch: 'full' },
]



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    TopbarComponent,
    ParallaxComponent,
    SectionAboutComponent,
    SectionAFuncionamientoComponent,
    FooterComponent,
    CopyrightBarComponent,
    MemesComponent,
    CrearMemeComponent,
    HomeComponent,
    AboutComponent,
    KitPrensaComponent,
    FiltroMemePipe,
    ContactoComponent,
    MemeComponent,
    DenunciaComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(APP_ROUTES),
    FormsModule,
    ColorChromeModule,
    HttpClientModule,
    ShareIconsModule,
    ShareButtonsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
