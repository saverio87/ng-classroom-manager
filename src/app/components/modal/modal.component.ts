import { Component, ViewEncapsulation, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';

import { ModalService } from '../../services/modal.service';

// Store

import { Store } from '@ngrx/store';


// Font Awesome

import {faMobileAlt, faEnvelope, faPen, faEdit, faTrash} from '@fortawesome/free-solid-svg-icons';
import { AppState } from 'src/app/app.state';
import { selectCurrentStudent, selectStatus } from '../../state/students/students.selectors';
import { StudentsService } from 'src/app/services/students.service';
import { updateContactDetails, deleteContactDetails } from 'src/app/state/students/students.actions';
import { Student } from 'src/app/models/student.model';

// Utils

import { formatDate } from 'src/app/utils/formatDate';


import {IAngularMyDpOptions, IMyDateModel} from 'angular-mydatepicker';


@Component({ 
  selector: 'app-modal', 
  templateUrl: 'modal.component.html', 
  styleUrls: ['modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ModalComponent implements OnInit, OnDestroy {
  
  @Input() id: string;
  @Input() modalName: string;

  private element: any;

  formatDate = formatDate;

  constructor(private store: Store<AppState> ,private modalService: ModalService, private el: ElementRef) {
      this.element = el.nativeElement;
  }

  ngOnInit(): void {
    // ensure id attribute exists
    if (!this.id) {
        console.error('modal must have an id');
        return;
    }

    // move element to bottom of page (just before </body>) so it can be displayed above everything else
    document.body.appendChild(this.element);

    // close modal on background click
    this.element.addEventListener('click', (el: { target: { className: string; }; }) => {
        if (el.target.className === 'modal-background') {
            this.close();
        }
    });

    // add self (this modal instance) to the modal service so it's accessible from controllers
    this.modalService.add(this);
}

// remove self from modal service when component is destroyed
ngOnDestroy(): void {
    this.modalService.remove(this.id);
    this.element.remove();
    console.log("Modal ", this.id, " destroyed");
    
}

// open modal
open(): void {
    // this.element.style.display = 'block';
    this.element.firstChild.classList.add('is-active');
     
}

// close modal
close(): void {
    // this.element.style.display = 'none';
    this.element.firstChild.classList.remove('is-active');
}

   // SELECTORS

   public currentStudent$ = this.store.select(selectCurrentStudent);
   public status$ = this.store.select(selectStatus);



}

