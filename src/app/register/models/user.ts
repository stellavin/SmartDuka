

export class User  {

    id: number;
    email: string;
    first_name: string;
    last_name: string;
    is_staff: boolean;
    is_active: boolean;
    is_superuser: boolean;
    groups: any[];
    is_trainer: boolean;
    trainer_id: number;
    phone_number: string;
    trainees: any[];
    date_joined: string | Date;
    full_name: string;
    location: number;
    password: any;


    constructor (obj: Object) {
    }

    getName() {
        return this.first_name + ' ' + this.last_name;
    }

}
