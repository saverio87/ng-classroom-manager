import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, from } from 'rxjs';
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import { addStudent,
  addStudents,
  addStudentFailure,
  addStudentSuccess,
  loadStudents,
  loadStudentsFailure,
  loadStudentsSuccess,
  updateContactDetails,
  updateContactDetailsFailure,
  updateContactDetailsSuccess,
  deleteContactDetails,
  deleteContactDetailsSuccess,
  deleteContactDetailsFailure,
  addAbsence,
  addAbsenceSuccess,
  addAbsenceFailure,
  deleteAbsence,
  deleteAbsenceSuccess,
  deleteAbsenceFailure,
  addFeedback,
  addFeedbackSuccess,
  addFeedbackFailure,
  deleteFeedback,
  deleteFeedbackSuccess,
  deleteFeedbackFailure



} from './students.actions';
import { StudentsService } from 'src/app/services/students.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';

import {selectCurrentStudent} from './students.selectors';




@Injectable()
export class StudentsEffects {

  constructor(
    private actions$: Actions,
    private studentService: StudentsService,
    private store:Store<AppState>
  ) {}

  // Selectors

  public currentStudent$ = this.store.select(selectCurrentStudent);




  // actions$ listens for actions being dispatched in the app,
  // ofType() narrows it down to the desired action we want to
  // listen for
  loadStudents$ = createEffect(
    ()=> this.actions$.pipe(
      ofType(loadStudents),
      switchMap(()=> 
      from (this.studentService.getStudents()).pipe(
        map((students)=> 
        loadStudentsSuccess({students: students})
        )
        ,
        catchError((error) => of(loadStudentsFailure({ error })))
      ))
    )
  )

    // Add single student

    addStudent$ = createEffect(
      ()=> this.actions$.pipe(
        ofType(addStudent),
        switchMap((action)=> {
          return this.studentService.addStudent(
            action.student
          ).pipe(
            map((data)=> addStudentSuccess()),
          catchError((error) => of(addStudentFailure({ error })))
          )
        }))
    )

  // Add multiple students

  addStudents$ = createEffect(
    ()=> this.actions$.pipe(
      ofType(addStudents),
      switchMap((action)=> {
         return this.studentService.addStudents(action.students).pipe(
           map((data)=>loadStudentsSuccess(data)),
           catchError((error)=> of(loadStudentsFailure({error})))
         )
      })
      )
    )
  
  

// CONTACT DETAILS - Update / Delete
    
  updateContactDetails$ = createEffect(
    ()=> this.actions$.pipe(
      ofType(updateContactDetails),
      switchMap((action)=> {
        return this.studentService.updateContactDetails(
          action._id,
          action.itemId,
          action.payload
        ).pipe(
          map(()=> 
        updateContactDetailsSuccess()
        ),
        catchError((error) => of(updateContactDetailsFailure({ error })))
        )
      })
    )
  )

  deleteContactDetails$ = createEffect(
    ()=> this.actions$.pipe(
      ofType(deleteContactDetails),
      switchMap((action)=> {
        return this.studentService.deleteContactDetails(
          action._id,
          action.itemId
        ).pipe(
          map(()=> 
        deleteContactDetailsSuccess()
        ),
        catchError((error) => of(deleteContactDetailsFailure({ error })))
        )
      })
    )
  )

// ABSENCES - Add / delete

addAbsence$ = createEffect(
  ()=> this.actions$.pipe(
    ofType(addAbsence),
    switchMap((action)=> {
      return this.studentService.addAbsence(
        action._id,
        action.payload
      ).pipe(
        map(()=> 
      addAbsenceSuccess()
      ),
      catchError((error) => of(addAbsenceFailure({ error })))
      )
    })
  )
)

deleteAbsence$ = createEffect(
  ()=> this.actions$.pipe(
    ofType(deleteAbsence),
    switchMap((action)=> {
      return this.studentService.deleteAbsence(
        action._id,
        action.itemId
      ).pipe(
        map(()=> 
      deleteAbsenceSuccess()
      ),
      catchError((error) => of(deleteAbsenceFailure({ error })))
      )
    })
  )
)

// FEEDBACK - Add / delete

addFeedback$ = createEffect(
  ()=> this.actions$.pipe(
    ofType(addFeedback),
    switchMap((action)=> {
      return this.studentService.addFeedback(
        action._id,
        action.payload
      ).pipe(
        map(()=> 
      addFeedbackSuccess()
      ),
      catchError((error) => of(addFeedbackFailure({ error })))
      )
    })
  )
)

deleteFeedback$ = createEffect(
  ()=> this.actions$.pipe(
    ofType(deleteFeedback),
    switchMap((action)=> {
      return this.studentService.deleteFeedback(
        action._id,
        action.itemId
      ).pipe(
        map(()=> 
      deleteFeedbackSuccess()
      ),
      catchError((error) => of(deleteFeedbackFailure({ error })))
      )
    })
  )
)


}