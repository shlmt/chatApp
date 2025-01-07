import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterNonEmptyReactions'
})
export class FilterReactionsPipe implements PipeTransform {

  transform(reactionsObj: { [emoji: string]: string[] }): { [emoji: string]: string[] } {
    if (!reactionsObj) {
      return {}
    }
    const filteredObj: { [emoji: string]: string[] } = {}
    Object.keys(reactionsObj).forEach(key => {
      if (reactionsObj[key].length > 0)
        filteredObj[key] = reactionsObj[key]
    })
    return filteredObj
  }
}
