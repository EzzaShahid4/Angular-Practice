import { Injectable } from '@angular/core';
import { RepositoryService } from '../repository/repository.service';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NtitleServiceService {
  constructor(private repositoryService: RepositoryService) {}
  getClientListBySearch(id: any) {
    return this.repositoryService
      .get('Matter/get-matter-enquiry-ref-list/' + id, true)
      .pipe(
        map((data: any) => {
          return data;
        })
      );
  }
  getAllmatters() {
    return this.repositoryService
      .ntitlepost('Matter/get-matter-clientRef-propertyAddress-list', {}, true)
      .pipe(
        map((data: any) => {
          return data;
        })
      );
  }
  getReports(type: any, matterId: any) {
    let url = 'Matter/get-matter-enquiry-ref-list';
    if (type === 1) {
      url = 'Matter/get-matter-report-ref-list';
    }
    if (type === 2) {
      url = 'Matter/get-matter-snapShot-ref-list';
    }
    return this.repositoryService.ntitleget(url + '/' + matterId, true).pipe(
      map((data: any) => {
        return data;
      })
    );
  }
}
