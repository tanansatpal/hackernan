import {Component, OnInit} from '@angular/core';
import {HackernewsService} from './services/hackernews.service';
import {forkJoin} from 'rxjs';

interface Story {
  by: string;
  descendants: number;
  id: number;
  kids: string[];
  score: number;
  time: number;
  title: string;
  type: string;
  url: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [HackernewsService]
})
export class AppComponent implements OnInit {
  stories: Story[];

  constructor(private hnService: HackernewsService) {
  }

  ngOnInit(): any {
    this.hnService.getNewStories().subscribe(data => {
      const observables = data.slice(0, 20).map(item => this.hnService.getItem(item));
      forkJoin(...observables).subscribe(results => {
        this.stories = results;
      });
    });

  }
}
