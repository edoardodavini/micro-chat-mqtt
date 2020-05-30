export class Room {
    _id: string;
    name: string;
    mqttPath: string;

    constructor(name: string) {
        this.name = name;
    }
}
