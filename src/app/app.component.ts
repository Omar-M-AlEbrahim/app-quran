import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { QuranApiService } from './service-component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  
})
export class AppComponent {
  title = 'app-quran';
  chapters: number[] = [];//مصفوفة عدد السور
  verses: number[] = [];//مصوفة عدد الايات 
  tafsirData: any;// مصفوفة ارجاع كل البيانات 
  resultText:string[]=[];//مصفوفة تخزن بها نص شرح الاية و النص بالانكليزي والنص بالعربي 
  chapter: number=1;//تعيين قيمة اولية لرقم السورة 
  verse: number=1;//تعيين قيمة اولية لرقم الاية 
  isErrorModalOpen: boolean = false;//افتراض ان الاية موجودة 
  errorMessage: string = '';//رسالة نص الخطأ 
  constructor(private quranApiService: QuranApiService) //حقن السرفس
  {
    for (let i = 1; i <= 114; i++) {//تعبئة مصفوفة السور
      this.chapters.push(i);
    }
    for (let i = 1; i <= 280; i++) {//تعبئة مصفوفة الايات 
      this.verses.push(i);
    }
  }

  search() {//عند الضغط على الزر
    this.resultText=[];
    this.get_arabic_quran();
    this.get_Interpretation_of_the_Koran();
    this.get_English_Quran();
  }

  get_Interpretation_of_the_Koran() {
    return this.quranApiService.Interpretation_of_the_Koran(this.chapter, this.verse).subscribe({
      next: (data) => {
        this.tafsirData = data;
        this.resultText.push(data.text);
        console.log(data);
      },
      error: (error) => {
        this.errorMessage = error.message + 'هذه الاية غير موجودة';
        this.isErrorModalOpen = true;
        console.error(error);
      }
    });
  }

  get_arabic_quran() {
    return this.quranApiService.arabic_quran(this.chapter, this.verse).subscribe({
      next: (data) => {
        this.tafsirData = data;
        this.resultText.push(data.text);
        console.log(data);
      },
      error: (error) => {
        this.errorMessage = error.message + 'هذه الاية غير موجودة';
        this.isErrorModalOpen = true;
        console.error(error);
      
      }
    });
  }
  
  get_English_Quran() {
    return this.quranApiService.English_Quran(this.chapter, this.verse).subscribe({
      next: (data) => {
        this.tafsirData = data;
        this.resultText.push(data.text);
        console.log(data);
      },
      error: (error) => {
        this.errorMessage = error.message + 'هذه الاية غير موجودة';
        this.isErrorModalOpen = true;
        console.error(error);
      }
    });
  }

  closeErrorModal() {
    this.isErrorModalOpen = false;
  }
}