import { computed, effect } from "@angular/core";
import { patchState, signalStore, watchState, withComputed, withHooks, withMethods, withState } from "@ngrx/signals";  
const initialCounterState = 0;
export const FavStore = signalStore(
  // param1
  { providedIn: 'root' },
  // param2
  withState({
      counter: initialCounterState
  }),
    //   param3
//     withComputed((state) => {
      
//   })

);