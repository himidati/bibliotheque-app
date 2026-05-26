import { Component,input, InputSignal, output } from '@angular/core';
import { FormGroup,ReactiveFormsModule } from '@angular/forms';
import { InputText } from 'primeng/inputtext';
import { Textarea } from 'primeng/textarea';
import { Button } from 'primeng/button';
import { InputNumber } from 'primeng/inputnumber';
import { ToggleButton } from 'primeng/togglebutton';

@Component({
  selector: 'app-book-form',
  imports: [ReactiveFormsModule, InputText, Textarea, Button, InputNumber, ToggleButton],
  templateUrl: './book-form.page.html',
  styleUrl: './book-form.page.css',
})export class BookFormPage {
  // L'input qui reçoit le formulaire du parent (C'est un signal !)
  bookForm: InputSignal<FormGroup> = input.required<FormGroup>();

  // Événements de sortie
  save = output<void>(); // On passe à void car le parent a déjà accès à la donnée via son 'bookForm'
  cancel = output<boolean>();

  submitForm() {
    // On récupère le formulaire parent contenu dans le signal
    const parentForm = this.bookForm();

    parentForm.markAllAsTouched();

    if (parentForm.valid) {
      // Si le formulaire est valide, on prévient le parent qu'il peut exécuter onSave()
      this.save.emit();
    } else {
      console.log("Des champs obligatoires sont manquants dans le formulaire.");
    }
  }

  onCancel() {
    this.cancel.emit(false);
  }
}
