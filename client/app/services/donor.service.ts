import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

@Injectable()
export class DonorService {
  socket: any;
  url: any = "http://localhost:3000";
  donors: any;

  constructor(public  http: Http) { }

  getRealtimeDonors() {

    let observable = new Observable(observer => {
      this.socket = io(this.url);
      //we initially get all donors from the rest api and subscribe
      this.getDonors()
        .subscribe((donors) => {
          //any time a socket event is gotten we perform the neccessary operation on the donors
          this.socket.on('donor_added', (data) => {
            console.log("socket data added: ", data);
            donors.push(data);
            observer.next(donors);
          });
          this.socket.on('donor_removed', (data) => {
            console.log("socket data removed: ", data);
            const donorIndex = donors.findIndex( donor => donor._id === data._id);
            donors.splice(donorIndex, 1);
            observer.next(donors);
          });
          this.socket.on('donor_updated', (data) => {
            console.log("socket data updated: ", data);
            const donorIndex = donors.findIndex( donor => donor._id === data._id);
            donors[donorIndex] = data;
            observer.next(donors);
          });
          observer.next(donors);
        });
      return () => {
        this.socket.disconnect();
      };
    })
    return observable;
  }

  /**
   * Get all donors and extract the data property from response
   */
  getDonors() {
    return this.http.get(`/api/donors`)
      .map(this.extractData);
  }

  /**
   * Get donor info from unique slug
   * @param slug
   */
  getDonor(slug) {
    return this.http.get(`/api/donors/${slug}`)
      .map(this.extractData);
  }

  /**
   * Create new donor
   * @param donor
   */
  createDonor(donor) {
    return this.http.post(`/api/donors`, donor)
      .map(this.extractData);
  }

  /**
   * Edit donor info
   * @param donor
   */
  editDonor(id, donor) {
    return this.http.post(`/api/donors/${id}`, donor)
      .map(this.extractData);
  }

  /**
   * Delete donor
   * @param id
   */
  deleteDonor(id) {
    return this.http.delete(`/api/donors/${id}`)
      .map(this.extractData);
  }

  extractData( response: Response) {
    const body = response.json();
    return body.data;
  }

}
