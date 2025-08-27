import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.service';
@Injectable({
  providedIn: 'root',
})
export class RepositoryService {
  constructor(private http: HttpClient) {}

  public get = (route: string, isauth: boolean) => {
    if (!isauth) {
      return this.http.get(
        this.createCompleteRoute(route, environment.apiUrl),
        this.generateHeaders()
      );
    } else {
      return this.http.get(
        this.createCompleteRoute(route, environment.apiUrl),
        this.generateHeadersWithAuth()
      );
    }
  };
  public getFarm = (route: string, isauth: boolean) => {
    if (!isauth) {
      return this.http.get(
        this.createCompleteRoute(route, environment.sfApiUrl),
        this.generateHeaders()
      );
    } else {
      return this.http.get(
        this.createCompleteRoute(route, environment.sfApiUrl),
        this.generateHeadersWithAuth()
      );
    }
  };
  public post = (route: string, body: any, isauth: boolean) => {
    if (!isauth) {
      return this.http.post(
        this.createCompleteRoute(route, environment.apiUrl),
        body,
        this.generateHeaders()
      );
    } else {
      return this.http.post(
        this.createCompleteRoute(route, environment.apiUrl),
        body,
        this.generateHeadersWithAuth()
      );
    }
  };
  public postWithFile = (route: string, body: any) => {
    return this.http.post(
      this.createCompleteRoute(route, environment.apiUrl),
      body,
      this.generateHeadersForFile()
    );
  };
  public putWithOutFile = (route: string, body: any) => {
    return this.http.put(
      this.createCompleteRoute(route, environment.apiUrl),
      body,
      this.generateHeadersWithAuth()
    );
  };
  public put = (route: string, body: any) => {
    return this.http.put(
      this.createCompleteRoute(route, environment.apiUrl),
      body,
      this.generateHeadersForFile()
    );
  };

  public delete = (route: string) => {
    return this.http.delete(
      this.createCompleteRoute(route, environment.apiUrl),
      this.generateHeadersWithAuth()
    );
  };

  private createCompleteRoute = (route: string, envAddress: string) => {
    return `${envAddress}/${route}`;
  };

  private generateHeaders = () => {
    return {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
  };
  private generateHeadersWithAuth = () => {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'bearer ' + localStorage.getItem('sandbox_Access_token'),
      }),
    };
  };
  private generateHeadersForFile = () => {
    return {
      headers: new HttpHeaders({
        Authorization: 'bearer ' + localStorage.getItem('sandbox_Access_token'),
      }),
    };
  };

  //b2b
  public b2bget = (route: string, isauth: boolean) => {
    if (!isauth) {
      return this.http.get(
        this.b2bCreateCompleteRoute(route, environment.b2bapiUrl),
        this.b2bGenerateHeaders()
      );
    } else {
      return this.http.get(
        this.b2bCreateCompleteRoute(route, environment.b2bapiUrl),
        this.b2bGenerateHeadersWithAuth()
      );
    }
  };

  public b2bpost = (route: string, body: any, isauth: boolean) => {
    if (!isauth) {
      return this.http.post(
        this.b2bCreateCompleteRoute(route, environment.b2bapiUrl),
        body,
        this.b2bGenerateHeaders()
      );
    } else {
      return this.http.post(
        this.b2bCreateCompleteRoute(route, environment.b2bapiUrl),
        body,
        this.b2bGenerateHeadersWithAuth()
      );
    }
  };

  public b2bpostWithFile = (route: string, body: any) => {
    return this.http.post(
      this.b2bCreateCompleteRoute(route, environment.b2bapiUrl),
      body,
      this.b2bGenerateHeadersForFile()
    );
  };

  public b2bputWithOutFile = (route: string, body: any) => {
    return this.http.put(
      this.b2bCreateCompleteRoute(route, environment.b2bapiUrl),
      body,
      this.b2bGenerateHeadersWithAuth()
    );
  };
  public b2bput = (route: string, body: any) => {
    return this.http.put(
      this.b2bCreateCompleteRoute(route, environment.b2bapiUrl),
      body,
      this.b2bGenerateHeadersForFile()
    );
  };
  private b2bCreateCompleteRoute = (route: string, envAddress: string) => {
    return `${envAddress}/${route}`;
  };

  private b2bGenerateHeaders = () => {
    return {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
  };
  private b2bGenerateHeadersWithAuth = () => {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'bearer ' + localStorage.getItem('sandbox_b2b_token'),
      }),
    };
  };
  private b2bGenerateHeadersForFile = () => {
    return {
      headers: new HttpHeaders({
        Authorization: 'bearer ' + localStorage.getItem('sandbox_b2b_token'),
      }),
    };
  };

  //ntitle
  public ntitleget = (route: string, isauth: boolean) => {
    if (!isauth) {
      return this.http.get(
        this.ntitleCreateCompleteRoute(route, environment.ntitleapiUrl),
        this.ntitleGenerateHeaders()
      );
    } else {
      return this.http.get(
        this.ntitleCreateCompleteRoute(route, environment.ntitleapiUrl),
        this.ntitleGenerateHeadersWithAuth()
      );
    }
  };

  public ntitlepost = (route: string, body: any, isauth: boolean) => {
    if (!isauth) {
      return this.http.post(
        this.ntitleCreateCompleteRoute(route, environment.ntitleapiUrl),
        body,
        this.ntitleGenerateHeaders()
      );
    } else {
      return this.http.post(
        this.ntitleCreateCompleteRoute(route, environment.ntitleapiUrl),
        body,
        this.ntitleGenerateHeadersWithAuth()
      );
    }
  };

  public ntitlepostWithFile = (route: string, body: any) => {
    return this.http.post(
      this.ntitleCreateCompleteRoute(route, environment.ntitleapiUrl),
      body,
      this.ntitleGenerateHeadersForFile()
    );
  };

  public ntitleputWithOutFile = (route: string, body: any) => {
    return this.http.put(
      this.ntitleCreateCompleteRoute(route, environment.ntitleapiUrl),
      body,
      this.ntitleGenerateHeadersWithAuth()
    );
  };
  public ntitlebput = (route: string, body: any) => {
    return this.http.put(
      this.ntitleCreateCompleteRoute(route, environment.ntitleapiUrl),
      body,
      this.ntitleGenerateHeadersForFile()
    );
  };
  private ntitleCreateCompleteRoute = (route: string, envAddress: string) => {
    return `${envAddress}/${route}`;
  };

  private ntitleGenerateHeaders = () => {
    return {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
  };
  private ntitleGenerateHeadersWithAuth = () => {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'bearer ' + localStorage.getItem('sandbox_ntitle_token'),
      }),
    };
  };
  private ntitleGenerateHeadersForFile = () => {
    return {
      headers: new HttpHeaders({
        Authorization: 'bearer ' + localStorage.getItem('sandbox_ntitle_token'),
      }),
    };
  };
}
