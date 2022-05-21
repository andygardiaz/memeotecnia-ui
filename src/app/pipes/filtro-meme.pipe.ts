import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroMeme'
})
export class FiltroMemePipe implements PipeTransform {

  transform(memes: any[], filterBy: string): any[] {
    const filter = filterBy ? filterBy.toLocaleLowerCase() : null;
    if (filter) {
      return memes.filter(mem => mem.nombre.toLocaleLowerCase().includes(filter))
    }
    return memes;
  }
}
