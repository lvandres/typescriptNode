import Director from "../../database/entity/Director";

export default class DirectorTestBuilder {

    private director: Director;

    constructor() {
        this.director = new Director();
    }

    public static newDirector(): DirectorTestBuilder {
        return new DirectorTestBuilder();
    }

    public withFirstName(firstName: string): DirectorTestBuilder {
        this.director.$firstName = firstName;
        return this;
    }
    public withLastName(lastName: string): DirectorTestBuilder {
        this.director.$lastName = lastName;
        return this;
    }
    public withBirthYear(birthYear: number): DirectorTestBuilder {
        this.director.$birthYear = birthYear;
        return this;
    }

    public withId(id: string): DirectorTestBuilder {
        this.director.$id = id;
        return this;
    }

    public withRandomId(): DirectorTestBuilder {
        this.director.$id = DirectorTestBuilder.generateUUID();
        return this;
    }

    public withDefaultValues(): DirectorTestBuilder {
        return this
            .withFirstName("John")
            .withLastName("Lasseter")
            .withBirthYear(1966);
    }

    public build(): Director {
        return this.director;
    }

    public static getListOfDefaultDirectors(length: number): Director[] {
        const result = [];
        for (let i = 0; i < length; i++) {
            result.push(DirectorTestBuilder.newDirector().withDefaultValues().build());
        }
        return result;
    }

    public static generateUUID(): string { // Public Domain/MIT
        var d = new Date().getTime();//Timestamp
        var d2 = (performance && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16;//random number between 0 and 16
            if(d > 0){//Use timestamp until depleted
                r = (d + r)%16 | 0;
                d = Math.floor(d/16);
            } else {//Use microseconds since page-load if supported
                r = (d2 + r)%16 | 0;
                d2 = Math.floor(d2/16);
            }
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
    }

}