import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WorkshopEditorService {

  private matterDetails: WritableSignal<any> = signal<any>({} as any);


  getMatterDetails() {
    return this.matterDetails()
  }

  updateMatterDetails(value: any) {
    this.matterDetails.update(() => value);
  }
}
