import { User } from './user.model'
import { Room } from './room.model'

export class Message {
    date: Date;
    user: User;
    room: Room;
    message: string;

    public toString() {
        const msg = {
            "message": this.message,
            "user": this.user._id
        };
        return JSON.stringify(msg);
    }
}
