import { Component } from '@angular/core';
import { HeroComponent } from '../../components/hero/hero.component';
import { AboutComponent } from '../../components/about/about.component';
import { ServicesComponent } from '../../components/services/services.component';
import { ExperienceComponent } from '../../components/experience/experience.component';
import { TechStackComponent } from '../../components/tech-stack/tech-stack.component';
import { EducationComponent } from '../../components/education/education.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { FeaturedWorkComponent } from '../../components/featured-work/featured-work.component';
import { Ecosystem } from '../../components/ecosystem/ecosystem';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroComponent,
    AboutComponent,
    ServicesComponent,
    FeaturedWorkComponent,
    ExperienceComponent,
    TechStackComponent,
    Ecosystem,
    EducationComponent,
    FooterComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
