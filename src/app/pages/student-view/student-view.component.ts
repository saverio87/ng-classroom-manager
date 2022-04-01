import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Student } from 'src/app/models/student.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import {IAngularMyDpOptions, IMyDateModel} from 'angular-mydatepicker';


// Store

import { Store } from '@ngrx/store';


// Font Awesome

import {faMobileAlt, faEnvelope, faPen, faTrash, faAlignJustify, faPlus} from '@fortawesome/free-solid-svg-icons';


import { AppState } from 'src/app/app.state';
import { selectCurrentStudent, selectStatus } from 'src/app/state/students/students.selectors';
import { StudentsService } from 'src/app/services/students.service';
import { updateContactDetails, deleteContactDetails, addAbsence, deleteAbsence, deleteFeedback, addFeedback, loadStudent } from 'src/app/state/students/students.actions';
import { ModalService } from 'src/app/services/modal.service';

// Utils

import {formatDate} from '../../utils/formatDate'

@Component({
  selector: 'app-student-view',
  templateUrl: './student-view.component.html',
  styleUrls: ['./student-view.component.scss']
})
export class StudentViewComponent implements OnInit {

  constructor(
    private modalService: ModalService,
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
    ) {    
   }

  // INIT VARIABLES

  formatDate = formatDate

  // Pagination

  pageOfItems: Array<any>;

  // Forms

  public formGroup: FormGroup;

  type:string = '';
  comment:string = '';

   myDpOptions: IAngularMyDpOptions = {
    dateRange: false,
    dateFormat: 'yyyy-mm-dd',
    inline: true,
    selectorWidth: "100%"
  };


  tabs = ['info', 'absences', 'feedback']

  // Form input and variables

  inputValue: string = ''
  props: any;
  status: string;
  studentId:string;
  student:Student;

  tabView: 'info' | 'absences' | 'feedback';

  editThis: string = '';

  // Font Awesome
  
  faAlignJustify = faAlignJustify;
  faPlus = faPlus;
  faMobileAlt = faMobileAlt;
  faEnvelope = faEnvelope;
  faPen = faPen;
  faTrash = faTrash;



  // SELECTORS

  public currentStudent$ = this.store.select(selectCurrentStudent);
  public status$ = this.store.select(selectStatus);

  // METHODS

  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;

  }

  formatPayload = (obj:any) => {
    obj.date = obj.date.singleDate.formatted;
    return obj
  }

  // Modal open / close

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }


  // Contact details UPDATE / DELETE

  resetInputValue = () => {
    this.inputValue = ''
  }

  onUpdateEntry = (_id: string, itemId: string, payload: any) => {
    this.store.dispatch(updateContactDetails({_id, itemId, payload}))
    this.onToggleEdit(itemId);
    this.resetInputValue()
  }

  onDeleteEntry = (_id: string, itemId: string) => {
    this.store.dispatch(deleteContactDetails({ _id, itemId }))
  }
  
  // Absences ADD / DELETE

  onAddAbsence = (modalId: string, _id: string, payload: any) => {
    payload = this.formatPayload(payload);
    // console.log(_id, this.formatPayload(payload));
    this.store.dispatch(addAbsence({_id, payload}))
    this.formGroup.reset()
    this.closeModal(modalId)
  }

  onDeleteAbsence = (_id: string, itemId: string) => {
    this.store.dispatch(deleteAbsence({ _id, itemId }))
  }

  // Feedback ADD / DELETE 

  onAddFeedback = (modalId: string, _id: string, payload: any) => {
    payload = this.formatPayload(payload);
    // console.log(_id, this.formatPayload(payload));
    this.store.dispatch(addFeedback({_id, payload}))
    this.formGroup.reset()
    this.closeModal(modalId)
  }

  onDeleteFeedback = (_id: string, itemId: string) => {
    this.store.dispatch(deleteFeedback({ _id, itemId }))
  }

  onToggleEdit = (id:string) => {
    this.resetInputValue()
    if (this.editThis === id) {
      this.editThis = ''
    } else {
      this.editThis = id;
    }
  }


  findIcon = (icon: string) => {

    switch (icon) {
      case 'phone':
        return faMobileAlt;
      
        case 'email':
          return faEnvelope;
  
      default:
        return faTrash;
    }


  }

  onChangeTabView = (tabView: string) => {

    switch (tabView) {
      case 'info': 
       this.tabView = 'info'
       break
      case 'absences':
       this.tabView = 'absences'
       break
      case 'feedback':
       this.tabView = 'feedback'
       break
      default:
        this.tabView = 'info'
    }
  }

  

  ngOnInit(): void {

    // Fetch student ID from params and find student object to be
    // copied to 'current'

    this.route.params.subscribe((params: Params)=> {
      this.studentId = params['studentId'];
        })
    
    this.store.dispatch(loadStudent({studentId: this.studentId}))



    let date: IMyDateModel = {isRange: false, singleDate: {jsDate: new Date()}};

    this.formGroup = this.formBuilder.group({
      date: date.singleDate?.epoc,
      type: this.type,
      comment: this.comment
      // other controls are here...
    });

    this.tabView = 'info';

    this.status$.subscribe((data)=> {
      if(data) {
        this.status = data;
      }
    })

    this.currentStudent$.subscribe((data)=> {
      if (data) {
        this.student = data;
        
      }
    })
    
  }

}
