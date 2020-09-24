export class Contact{
    public id: string;
    public name: string;
    public email: string;
    public phonenumber: string;
    public imageUrl: string;
    public group: Contact[];

    constructor(id, name, email, phonenumber, imageUrl, group) {
        this.id = id; 
        this.name = name; 
        this.email = email; 
        this.phonenumber = phonenumber;
        this.imageUrl = imageUrl; 
        this.group = group;
        }
}