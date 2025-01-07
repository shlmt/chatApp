import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'linkTag'
})
export class LinkTagPipe implements PipeTransform {

  transform(value: string): string {
    const regex = /https?:\/\/(?:www\.)?([a-zA-Z0-9.-]+(:[0-9]+)?)(\/[^\s]*)?/g

    return value.replace(regex, (match, group1, group2) => {
      const domain = group1 || group2;
      return `<a href="${match}" target="_blank">${domain}</a>`
    })
  }

}
