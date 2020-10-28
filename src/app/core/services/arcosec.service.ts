import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
// import { Challenge } from 'src/app/core/models/challengeModel';
import { Observable, BehaviorSubject} from 'rxjs';
import { map, share, publishReplay, refCount, retry } from 'rxjs/operators';
// import { DateWG } from '../models/datesModel';
// import { Profile } from '../models/profileModel';

@Injectable({
  providedIn: 'root'
})
export class ArcosecService {
  // private challenges$ = new BehaviorSubject<Challenge[]>([]);
  // private dates$ = new BehaviorSubject<DateWG[]>([]);
  // private profile$ = new BehaviorSubject<Profile[]>([]);

  constructor(private httpClient: HttpClient) { }

  // public get Challenges() {
  //   return this.challenges$.value;
  // }

  // public get DateWGF() {
  //   return this.dates$.value;
  // }

  // public get ProfileData() {
  //   return this.profile$.value;
  // }

  signup(signupData) {
    return this.httpClient.post(`${environment.host}/user/signup`, signupData);
  }

  sendVerification() {
    return this.httpClient.post(`${environment.host}/user/requestVerificationCode`, {});
  }

  verifyCode(otp) {
    return this.httpClient.post(`${environment.host}/user/verify`, otp);
  }

  forgetPassword(data) {
    return this.httpClient.post(`${environment.host}/user/forgetPassword`, {email: data});
  }

  resetPassword(data) {
    return this.httpClient.post(`${environment.host}/user/resetPassword`, {password: data});
  }

  updatePassword(oldPassword, newPassword) {
    return this.httpClient.post(`${environment.host}/user/updatePassword`, {oldPassword, newPassword});
  }

  updateTeamName(teamNameValue) {
    return this.httpClient.post(`${environment.host}/user/update-name`, {name: teamNameValue});
  }

  getProfile() {
    return this.httpClient.post(`${environment.host}/user/profile`, {});
  }
  // getProfile(): Observable<Profile[]> {
  //   return this.httpClient.post(`${environment.host}/user/profile`, {},
  //   { observe: 'body' })
  //   .pipe(
  //     map((profile: Profile[]) => {
  //       this.profile$.next(profile);
  //       return profile;
  //     })
  //   );
  // }

  getOtherProfiles(teamId) {
    return this.httpClient.post(`${environment.host}/user/team-profile/${teamId}`, {});
  }


  // getAllChallenges() {
  //   return this.httpClient.post(`${environment.host}/challenge/all-challenge`, {});
  // }

  // getAllChallenges(): Observable<Challenge[]> {
  //     return this.httpClient.post(`${environment.host}/challenge/all-challenge`, {},
  //     { observe: 'body' })
  //     .pipe(
  //       map((challenges: Challenge[]) => {
  //         this.challenges$.next(challenges);
  //         return challenges;
  //       })
  //     );
  // }

  // the time which competition start
  // getStartTime() {
  //   return this.httpClient.post(`${environment.host}/time/get-time`, {});
  // }

  // getStartTime(): Observable<DateWG[]> {
  //   return this.httpClient.post(`${environment.host}/time/get-time`, {},
  //   { observe: 'body' })
  //   .pipe(
  //     map((dates: DateWG[]) => {
  //       this.dates$.next(dates);
  //       return dates;
  //     })
  //   );
  // }


  // getChallenge(challengeId) {
  //   return this.httpClient.post<Challenge[]>(`${environment.host}/challenge/${challengeId}`, {});
  // }


  setTeams() {
    return this.httpClient.post(`${environment.host}/user/getTeams`, {});
  }
}
