import {Injectable, OnInit} from '@angular/core';
import {TvShow} from "../../model/tv-show";
import {HttpClient} from "@angular/common/http";
import {Endpoint, ENDPOINT_BASE, EndpointPaths} from "../../model/endpoint";
import {v4} from "uuid";

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  private selectedContent?: TvShow;
  private contentList: TvShow[] = [];

  constructor(private httpClient: HttpClient) {
    console.log('Loading content: ' + ENDPOINT_BASE + EndpointPaths.get(Endpoint.TV_SHOWS));

    // Later revision add error handling with observables from rxjs
    this.httpClient.get<TvShow[]>(ENDPOINT_BASE + EndpointPaths.get(Endpoint.TV_SHOWS))
      .subscribe(resp => {
        this.contentList = resp;
        console.log('Response: ' + JSON.stringify(resp))
      });
  }

  addContent(addedContent: TvShow) {
    addedContent.id = v4();
    // Would be a post call here to create it on the backend
    this.contentList.push(addedContent);
  }

  updateContent(contentEvent: TvShow) {
    let idx: number = this.findIdxForContent(contentEvent);

    if (idx !== -1) {
      // Would be a put call here to update the existing content on the backend
      this.contentList[idx].name = contentEvent.name;
      this.contentList[idx].genre = contentEvent.genre;
      this.contentList[idx].rating = contentEvent.rating;
      this.contentList[idx].seasons = contentEvent.seasons;
      this.contentList[idx].score = contentEvent.score;
    } else {
      this.addContent(contentEvent)
    }
    this.resetSelectedContent();
  }

  deleteContent(deletedContent: TvShow) {
    let idx: number = this.findIdxForContent(deletedContent);

    if (idx !== -1) {
      // Would be a delete call here to delete it from the backend
      this.contentList.splice(idx, 1);
    }

    if (this.selectedContent && deletedContent.id === this.selectedContent.id) {
      this.selectedContent = undefined;
    }
  }

  getAllContent() : TvShow[] {
    return this.contentList;
  }

  selectContent(contentEvent: TvShow) {
    this.selectedContent = contentEvent;
  }
  getSelectedContent() : TvShow | undefined {
    return this.selectedContent;
  }
  resetSelectedContent() {
    this.selectedContent = undefined;
  }

  private findIdxForContent(searchContent: TvShow) : number {
    return this.contentList.findIndex(content => content.id === searchContent.id);
  }
}
