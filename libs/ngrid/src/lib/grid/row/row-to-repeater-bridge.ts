import { EmbeddedViewRef } from '@angular/core';
import { _ViewRepeaterItemInsertArgs } from '@angular/cdk/collections';
import { PblRowContext } from '../context/row';
import { PblNgridRowComponent } from './row.component';

let currentItemArgs: _ViewRepeaterItemInsertArgs<PblRowContext<any>>;
let currentRow: PblNgridRowComponent;

class RowToRepeaterBridge {

  bridgeRow(row: PblNgridRowComponent): Omit<_ViewRepeaterItemInsertArgs<PblRowContext<any>>, 'templateRef'> {
    const itemArgs = currentItemArgs;
    currentItemArgs = undefined;
    currentRow = row;
    return itemArgs;
  }

  bridgeContext<C extends PblRowContext<any>>(itemArgs: _ViewRepeaterItemInsertArgs<PblRowContext<any>>, createView: () => EmbeddedViewRef<C>): EmbeddedViewRef<C> {
    currentRow = undefined;
    currentItemArgs = itemArgs;
    const view = createView();
    if(!currentRow.context){
      currentRow.context = itemArgs.context;
    }
    if (view.rootNodes[0] !== currentRow.elementRef.nativeElement) {
      if (typeof ngDevMode === 'undefined' || ngDevMode) {
        throw new Error(`Invalid view state, current row element is not the current rendered element!`);
      }
    }
    currentRow = currentItemArgs = undefined;
    return view;
  }
}

export const rowContextBridge = new RowToRepeaterBridge();
