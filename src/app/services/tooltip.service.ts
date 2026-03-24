import { Injectable, signal } from '@angular/core';

export interface TooltipData {
  name: string;
  extendedDesc: string;
}

@Injectable({
  providedIn: 'root'
})
export class TooltipService {
  private hoveredToolSignal = signal<TooltipData | null>(null);
  hoveredTool = this.hoveredToolSignal.asReadonly();

  show(tool: TooltipData) {
    this.hoveredToolSignal.set(tool);
  }

  hide() {
    this.hoveredToolSignal.set(null);
  }
}
