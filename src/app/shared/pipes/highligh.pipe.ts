import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlight',
  standalone: true
})
export class HighlightPipe implements PipeTransform {
  transform(value: string | undefined, search: string | null): string {
    if (!value) return '';
    if (!search) return value;

    // Échapper les caractères spéciaux de la recherche pour la Regex
    const escapedSearch = search.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    const regex = new RegExp(`(${escapedSearch})`, 'gi');

    // On remplace le texte qui match par lui-même entouré de la balise <mark>
    return value.replace(regex, '<mark class="bg-yellow">$1</mark>');
  }
}
