import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, from } from 'rxjs';
import { ClassroomsService } from "src/app/services/classrooms.service";
import { switchMap, map, catchError, withLatestFrom, throttleTime, debounceTime } from 'rxjs/operators';
import { loadClassroom, loadClassrooms, loadClassroomsFailure, loadClassroomsSuccess, 
addClassroomNote,
addClassroomNoteSuccess,
addClassroomNoteFailure,
deleteClassroomNote,
deleteClassroomNoteSuccess,
deleteClassroomNoteFailure, 
addClassroom,
addClassroomSuccess,
addClassroomFailure,
removeClassroom,
removeClassroomSuccess,
removeClassroomFailure} from './classrooms.actions';
import { loadStudent, loadStudentsInClassroom } from '../students/students.actions';





@Injectable()
export class ClassroomsEffects {

  constructor(
    private actions$: Actions,
    private classroomService: ClassroomsService
  ) {}

  // actions$ listens for actions being dispatched in the app,
  // ofType() narrows it down to the desired action we want to
  // listen for
  loadClassrooms$ = createEffect(
    ()=> this.actions$.pipe(
      ofType(loadClassrooms),
      throttleTime(5000),
      switchMap(()=> 
      from (this.classroomService.getClassrooms()).pipe(
        map((classrooms)=> 
        loadClassroomsSuccess({classrooms: classrooms})
        ),
        catchError((error) => of(loadClassroomsFailure({ error })))
      ))
    )
  )

  loadStudentsInClassroom$ = createEffect(
    ()=> this.actions$.pipe(
      ofType(loadClassroom),
      map((classroom)=>loadStudentsInClassroom(classroom)),
      ))
  
  addClassroom$ = createEffect(
    ()=> this.actions$.pipe(
      ofType(addClassroom),
      switchMap((action)=> {
        return this.classroomService.addClassroom(action.classroom).pipe(
          map(()=> addClassroomSuccess()),
          catchError((error)=> of(addClassroomFailure({error})))
        )
      })
    )
  )

  deleteClassroom$ = createEffect(
    ()=> this.actions$.pipe(
      ofType(removeClassroom),
      switchMap((action)=> {
        return this.classroomService.deleteClassroom(
          action._id
        ).pipe(
          map(()=> 
        removeClassroomSuccess()
        ),
        catchError((error) => of(removeClassroomFailure({ error })))
        )
      })
    )
  )
    
  
  addNote$ = createEffect(
        ()=> this.actions$.pipe(
          ofType(addClassroomNote),
          switchMap((action)=> {
            return this.classroomService.addNote(
              action._id,
              action.payload
            ).pipe(
              map(()=> 
            addClassroomNoteSuccess()
            ),
            catchError((error) => of(addClassroomNoteFailure({ error })))
            )
          })
        )
      )
      
  deleteNote$ = createEffect(
        ()=> this.actions$.pipe(
          ofType(deleteClassroomNote),
          switchMap((action)=> {
            return this.classroomService.deleteNote(
              action._id,
              action.itemId
            ).pipe(
              map(()=> 
            deleteClassroomNoteSuccess()
            ),
            catchError((error) => of(deleteClassroomNoteFailure({ error })))
            )
          })
        )
      )


     
      
      // switchMap(()=> 
      // from (this.classroomService.getClassrooms()).pipe(
      //   map((classrooms)=> 
      //   loadClassroomsSuccess({classrooms: classrooms})
      //   ),
      //   catchError((error) => of(loadClassroomsFailure({ error })))
      // ))
  

  

}