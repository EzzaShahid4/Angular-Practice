import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AccountService } from '../../../services/accounts/account.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ms-word',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ms-word.component.html',
  styleUrl: './ms-word.component.scss',
})
export class MsWordComponent {
  InspectionId: string | undefined;
  exportingDoc: boolean | undefined;
  // http: any;
  ReportName: any;
  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private http: HttpClient
  ) {}

  AddWordTagEditor!: FormGroup;
  errorMessage: any = '';
  errorMessage2: any = '';
  AddLoading: boolean = false;
  WordTagEditorData: FormData = new FormData();

  selectedFile: File | null = null;

  ngOnInit(): void {
    this.initializeForm();
  }

  // Initialize FormGroup
  private initializeForm(): void {
    this.AddWordTagEditor = this.formBuilder.group({
      FirstFromWord: ['', [Validators.required]],
      FirstToWord: ['', [Validators.required]],
      SecondFromWord: [''],
      SecondToWord: [''],
      ThirdFromWord: [''],
      ThirdToWord: [''],
      ForthFromWord: [''],
      ForthToWord: [''],
      FifthFromWord: [''],
      FifthToWord: [''],
    });
  }
  // Handle file selection
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];

      // Ensure FormData is initialized before appending
      this.WordTagEditorData = new FormData();
      this.WordTagEditorData.append(
        'file',
        this.selectedFile,
        this.selectedFile.name
      );
      this.errorMessage = '';
      console.log('Selected document:', this.selectedFile.name);
    }
  }

  GenerateDocument() {
    if (!window.navigator.onLine) {
      console.error('No internet connection!');
      this.errorMessage2 = 'No internet connection!';
      return;
    }

    if (this.AddWordTagEditor.invalid) {
      console.error('Form is invalid:', this.AddWordTagEditor.value);
      this.errorMessage2 = 'Form is invalid!';
      return;
    }

    if (!this.selectedFile) {
      console.error('No file selected!');
      this.errorMessage = 'No file selected!';
      return;
    }
    this.errorMessage2 = '';
    // Append form fields
    Object.keys(this.AddWordTagEditor.controls).forEach((key) => {
      this.WordTagEditorData.append(key, this.AddWordTagEditor.get(key)!.value);
    });

    const baseUrl = environment.apiUrl;
    let route = '/WordTagEditor/replace-text-in-word';
    const token = this.accountService.getToken();
    this.exportingDoc = true;

    // Only add Authorization header (remove Content-Type)
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);

    this.http
      .post(baseUrl + route, this.WordTagEditorData, {
        headers,
        responseType: 'blob' as 'json',
      })
      .subscribe(
        (response: any) => {
          let dataType = response.type;
          let binaryData = [response];
          let downloadLink = document.createElement('a');
          downloadLink.href = window.URL.createObjectURL(
            new Blob(binaryData, { type: dataType })
          );
          downloadLink.setAttribute('download', `Document.docx`);
          document.body.appendChild(downloadLink);
          downloadLink.click();
          this.WordTagEditorData = new FormData(); // Reset FormData after upload
          this.exportingDoc = false;
          this.selectedFile = null;
          this.AddWordTagEditor.reset();
        },
        (error) => {
          this.exportingDoc = false;
          if (error.error instanceof Blob) {
            let reader = new FileReader();
            reader.onload = () => {
              this.errorMessage2 = 'Server Error';
              console.error('Server Error:', reader.result);
            };
            reader.readAsText(error.error);
          } else {
            this.errorMessage2 = 'Error generating document';
            console.error('Error generating report:', error);
          }
        }
      );
  }
}
