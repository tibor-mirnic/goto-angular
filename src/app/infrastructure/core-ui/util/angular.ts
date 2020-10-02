import { ChangeDetectorRef, ViewRef } from '@angular/core';

export const safeDetectChanges = (cDR: ChangeDetectorRef): void => {
  const vr = cDR as ViewRef;

  if (!vr.destroyed) {
    vr.detectChanges();
  }
};
