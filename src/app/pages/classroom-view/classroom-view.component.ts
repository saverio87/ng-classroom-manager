import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { Classroom } from 'src/app/models/classroom.model';
import { Student } from 'src/app/models/student.model';

import { FormBuilder, FormGroup } from '@angular/forms';
import {IAngularMyDpOptions, IMyDateModel} from 'angular-mydatepicker';

// Font Awesome

import {faArrowCircleRight, faTrash} from '@fortawesome/free-solid-svg-icons';

// Services
import { selectCurrentClassroom } from 'src/app/state/classrooms/classrooms.selectors';
import { loadStudent } from 'src/app/state/students/students.actions';
import { selectCurrentClassroomStudents } from 'src/app/state/students/students.selectors';
import { formatDate } from 'src/app/utils/formatDate';
import { ModalService } from 'src/app/services/modal.service';

// Store

import { addClassroomNote, deleteClassroomNote, addClassroomActivity, deleteClassroomActivity, loadClassroom } from 'src/app/state/classrooms/classrooms.actions';


@Component({
  selector: 'app-classroom-view',
  templateUrl: './classroom-view.component.html',
  styleUrls: ['./classroom-view.component.scss']
})
export class ClassroomViewComponent implements OnInit {

  constructor(
    private modalService: ModalService,
    private store:Store<AppState>,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
    ) { }

    // Forms

    public formGroup: FormGroup;

    title:string = '';
    content:string = '';

   myDpOptions: IAngularMyDpOptions = {
    dateRange: false,
    dateFormat: 'yyyy-mm-dd',
    inline: true,
    selectorWidth: "100%"
  };

  // Init Variables

  formatDate = formatDate

  currentItem: any;
  notes: Array<any>;

  isNoteMessageOpen:boolean = false;

  // Pagination

  pageOfNotes: Array<any>;
  pageOfStudents: Array<any>;
  // pageOfNotes: Array<any>;
  // pageOfGroups: Array<any>;
  // pageOfActivities: Array<any>

  // Types

  classroom: Classroom;
  students: any[];
  classroomId: string;
  tabView: 'students' | 'groups' | 'notes' | 'activities';

  faArrowCircleRight = faArrowCircleRight;
  faTrash = faTrash;
  
  // Selectors

  public currentClassroom$ = this.store.select(selectCurrentClassroom);
  public currentClassroomStudents$ = this.store.select(selectCurrentClassroomStudents);


  // Methods

  // Format Payload

  formatPayload = (obj:any) => {
    obj.date =  new Date(Date.now()).toISOString().split('T')[0]
    return obj
  }

  // Select item and show it in dialog / message

  toggleDialog = (dialog:string) => {
    switch (dialog) {
      case 'note':
        this.isNoteMessageOpen = !this.isNoteMessageOpen
        break;
      default:
        break;
    }
  }

  selectAndShow = (item:any, dialog:string) => {
    
    if (this.currentItem == item) {
      this.currentItem = undefined
    } else {
      this.currentItem = item;
    }

    this.toggleDialog(dialog)
    
  }

  // Modal open / close

  openModal(id: string) {
    this.modalService.open(id);
    }

    closeModal(id: string) {
    this.modalService.close(id);
    }

  // Notes ADD / DELETE

  onAddNote = (modalId: string, _id: string, payload: any) => {
    this.store.dispatch(addClassroomNote({_id, payload}))
    this.formGroup.reset()
    this.closeModal(modalId)
  }

  onDeleteNote = (_id: string, itemId: string) => {
    this.store.dispatch(deleteClassroomNote({ _id, itemId }))
  }

  // Activities ADD / DELETE

  // onAddActivity = (modalId: string, _id: string, payload: any) => {
  //   payload = this.formatPayload(payload);
  //   // console.log(_id, this.formatPayload(payload));
  //   this.store.dispatch(addActivity({_id, payload}))
  //   this.formGroup.reset()
  //   this.closeModal(modalId)
  // }

  // onDeleteActivity = (_id: string, itemId: string) => {
  //   this.store.dispatch(deleteActivity({ _id, itemId }))
  // }

  


  onChangePage(pageOfNotes: Array<any>) {
    // update current page of items
    this.pageOfNotes = pageOfNotes;
  }

  onChangeStudentPage(pageOfStudents: Array<any>) {
    // update current page of items
    this.pageOfStudents = pageOfStudents;
  }


  changeTabView = (tabView: string) => {

    switch (tabView) {
      case 'students': 
       this.tabView = 'students'
       break
      case 'groups':
       this.tabView = 'groups'
       break
      case 'notes':
       this.tabView = 'notes'
       break
       case 'activities':
       this.tabView = 'activities'
       break
       
    }
  }


  
  ngOnInit(): void {

    // Fetch classroom ID from params and find classroom object to be
    // copied to 'current'

    this.route.params.subscribe((params: Params)=> {
    this.classroomId = params['classroomId'];
    })

    this.store.dispatch(loadClassroom({classroomId: this.classroomId}))
 

    this.formGroup = this.formBuilder.group({
      title: this.title,
      content: this.content
      // other controls are here...
    });

    this.notes = Array(50).fill(0).map((x, i) => ({ id: (i + 1), name: `Item ${i + 1}`}));

    // Setting main tab view

    this.tabView = 'students'

    // Subscribe to observables

    this.currentClassroom$.subscribe(data =>
      {
        if(data) {
          this.classroom = data
        }
      })

      this.currentClassroomStudents$.subscribe(data =>
        {
          if(data) {
            console.log(data)
            this.students = data;
            this.students = this.students.map((student)=>{
              return {
                _id: student._id,
                name: student.name
              }
            })
            console.log(this.students);
            
          }
        })
  }

}


