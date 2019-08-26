export class Model {
    user;
    items;
    admin;
	lrg_reports;
    constructor() {
        this.user = 'Suhail';
        this.admin = 'Admin';
        this.items = [new TodoItem('Buy Flowers', false),
        new TodoItem('Get Shoes', false),
        new TodoItem('Collect Tickets', false),
        new TodoItem('Call Joe', false)];
		this.lrg_reports =[];
		
    }
}
export class TodoItem {
    action;
    done;
    constructor(action, done) {
        this.action = action;
        this.done = done;
    }
}

export class LRGReport{
	date;
	reportLink;
	release;
	constructor(release,date,reportLink){
		this.release = release;
		this.date = date;
		this.reportLink = reportLink;
	}
	
	
	
}
