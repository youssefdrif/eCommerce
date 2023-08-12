import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userDataSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  user$: Observable<any> = this.userDataSubject.asObservable();

  setUser(user: any) {
    this.userDataSubject.next(user);
  }
}