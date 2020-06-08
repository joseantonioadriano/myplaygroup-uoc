import { DecimalPipe } from '@angular/common';

export default class Enrollment {
    constructor(public id: number = 0, public idStudent: number = 0, public idCourse: number = 0, public idSchool: number = 0, public fee: string, public namePicture: string, public idGroup: number) {}
}