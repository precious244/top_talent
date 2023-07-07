import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  baseApiUrl = 'https://toptalentapp.com:9091/api/v1/jobseeker/user/update/resume'

  constructor(private http: HttpClient) { }

  upload(body: any): Observable<any> {
    const formData = new FormData();
    formData.append("jobseekerId", body.jobseekerId);
    formData.append("jobseekerResume", body.jobseekerResume);
    return this.http.post('https://toptalentapp.com:9091/api/v1/jobseeker/user/update/resume', formData)
  }

  onUploadCv(body: any): Observable<any> {
    const formData = new FormData();
    formData.append("jobId", body.jobId);
    formData.append("jobseekerId", body.jobseekerId);
    formData.append("jobseekerResume", body.jobseekerResume);
    return this.http.post('https://toptalentapp.com:9091/api/v1/jobseeker/job/applies', formData)
  }

  public getApplyStatus(body: any, data: any): Observable<unknown> {
    const params = new HttpParams()
      .set("jobId", data.jobId)
      .set("jobseekerId", body.jobseekerId);
    return this.http.get('https://toptalentapp.com:9091/api/v1/jobseeker/job/applystatus', { params: params });
  }

  public getResumeStatus(body: any): Observable<unknown> {
    const params = new HttpParams()
      .set("jobseekerId", body.jobseekerId);
    return this.http.get('https://toptalentapp.com:9091/api/v1/jobseeker/jobseeker/resumestatus', { params: params });
  }

  deleteCv(body: any): Observable<any> {
    const formData = new FormData();
    formData.append("jobseekerId", body.jobseekerId);
    return this.http.patch('https://toptalentapp.com:9091/api/v1/jobseeker/delete/resume/', formData)
  }
}
