import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Hero } from './hero';
import { HeroService } from './hero.service';





@Component({
  selector: 'app-heroes',
  templateUrl: './app.component.html',
  template: `
  <h2>My Heroes</h2>
    <ul class="heroes">
      <li *ngFor="let hero of heroes" (click)="onSelect(hero)" [class.selected]="hero === selectedHero">
        <span class="badge">{{hero.id}}</span> {{hero.name}}
      </li>
    </ul>
    <div *ngIf="selectedHero">
      <h2>
        {{selectedHero.name | uppercase}} is my hero
      </h2>
      <button (click)="gotoDetail()">View Details</button>
    </div>
    `,
  styleUrls: ['./app.component.css'],
  providers: [HeroService]
})

export class HeroesComponent implements OnInit {
  selectedHero: Hero;

  heroes: Hero[];

  constructor(private heroService: HeroService, private router: Router) { }

  hero: Hero = {
    id: 1,
    name: 'Windstorm'
  };

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  getHeroes(): void {
    // this.heroService.getHeroes().then(heroes => this.heroes = heroes);
    this.heroService.getHeroesSlowly().then(heroes => this.heroes = heroes);
  }

  gotoDetail() {
    this.router.navigate(['/detail', this.selectedHero.id]);
  }

  ngOnInit(): void {
    this.getHeroes();
  }
}

