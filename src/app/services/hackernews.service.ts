import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

interface HNResponse {
  data?: number[];
}

@Injectable({
  providedIn: 'root'
})
export class HackernewsService {

  constructor(private http: HttpClient) {
  }

  getNewStories(): any {
    return this.http.get(environment.API_URL + '/topstories.json');
  }

  getItem(item: number): any {
    return this.http.get(`${environment.API_URL}/item/${item}.json`);
  }
}
