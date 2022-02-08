'use strict';

(() => {

    function Student(firstName, lastName, yearOfBirth) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.yearOfBirth = yearOfBirth;
        this.age = this.getAge();
        this.attendance = new Array(10);
        this.marks = new Array(10);
        this.overagePoints = {
            mark: null,
            attendance: null
        };
        this.teacherComment = null;


        for(const arg of arguments) {
            if(typeof arg !== 'string' || !arg.trim()) {
                throw new Error('Argument(s) data type is not a string or empty.');
            };
        };

        if(

            this.yearOfBirth.length !== 4 || 
            !Number.isInteger(+this.yearOfBirth) || 
            this.yearOfBirth < 0

        )   throw new Error('The last argument must contain four-digit positive integer: "YYYY".');

        if(this.yearOfBirth > new Date().getFullYear()) throw new Error('Not valid data.');
        
    }

    const studentPrototype = {

        constructor: Student.prototype.constructor,
        
        getAge() {
            return new Date().getFullYear() - this.yearOfBirth;
        },

        findEmptyElIndex(arr) {
            return arr.findIndex(item => {
                if (item === undefined) return true;
            });
        },

        checkVisits(boolean) {
            const emptyElIndex = this.findEmptyElIndex(this.attendance);
            if(emptyElIndex >= 0) this.attendance[emptyElIndex] = boolean;
        },

        present() {
            this.checkVisits(true);
            return this;
        },

        absent() {
            this.checkVisits(false);
            return this;
        },

        isNumber(num) {
            if(typeof num === 'number' || !isNaN(num)) return true;
            return false;
        },

        mark(num) {
            if(!this.isNumber(num)) throw new Error('The argument is not a number.');
            if(num < 0 || num > 10) throw new Error('The max value of mark cannot exceed 10.');
            const emptyElIndex = this.findEmptyElIndex(this.marks);
            if(emptyElIndex >= 0) this.marks[emptyElIndex] = num;
            return this;
        },

        overageValue(arr) {
            let emptyElIndex = this.findEmptyElIndex(arr);
            if(emptyElIndex === -1) emptyElIndex = 10;
            return arr.reduce((a, b) => (a + b)) / emptyElIndex;
        },

        overageMark() {
            this.overagePoints.mark = Math.round(this.overageValue(this.marks));
        },

        overageAttendance() {
            this.overagePoints.attendance = +this.overageValue(this.attendance).toFixed(1);
        },

        summary() {
            if(this.findEmptyElIndex(this.marks) === 0 || this.findEmptyElIndex(this.attendance) === 0) return;
            this.overageMark();
            this.overageAttendance();
            if(this.overagePoints.mark >= 9 && this.overagePoints.attendance >= 0.9){
                this.teacherComment = 'Ути какой молодчинка!';
            } else if (this.overagePoints.mark < 9 && this.overagePoints.attendance < 0.9 ) {
                this.teacherComment = 'Редиска!';
            } else if(this.overagePoints.mark < 9 || this.overagePoints.attendance < 0.9) {
                this.teacherComment = 'Норм, но можно лучше';
            };
            return this;
        }
    }

    
    Student.prototype = {
        ...studentPrototype,
    }
    
    Object.defineProperty(studentPrototype, constructor, {enumerable: false})
    console.log(Object.getOwnPropertyDescriptors(studentPrototype));   // Дескриптор так и не изменил значение

    const alex = new Student ('Alex', 'Turner', '1986');
    const yurii = new Student('Yurii','Shutkin', '1996');
    const vova = new Student('Vladimir', 'Shaitan', '1997');
    const noname = new Student('Unknown', 'Unknown', '0000');

    alex.summary();
    yurii.present().present().present().present().present().present().present().present().present().present().present().mark(10).mark(10).mark(10).mark(10).mark(10).mark(10).mark(10).mark(10).mark(10).mark(10).summary();
    vova.absent().mark(1).present().mark(0).summary();
    noname.present().present().absent().present().absent().present().present().mark(10).mark(10).mark(10).mark(8).mark(7).mark(9).mark(10).summary();

    console.log(alex);
    console.log(yurii);
    console.log(vova);
    console.log(noname);

})();