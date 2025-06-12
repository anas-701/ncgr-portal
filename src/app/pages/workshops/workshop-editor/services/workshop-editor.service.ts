import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WorkshopEditorService {

  private workShop: WritableSignal<any> = signal<any>({} as any);
  private workShopFormData: WritableSignal<any> = signal<any>({} as any);


  getWorkShop() {
    return this.workShop()
  }

  updateWorkShop(value: any) {
    this.workShop.update(() => value);
  }
  getWorkShopFormData() {
    return this.workShopFormData()
  }

  updateWorkShopFormData(value: any) {
    this.workShopFormData.update(() => value);
  }
}
