import notesAPI from "./NotesAPI.js";
import NotesView from "./NotesView.js";

const app = document.getElementById("app");

const view = new NotesView(app, {
    onNoteAdd() {
        console.log("note has been added");
    },
    onNoteEdit(newTitle, newBody) {
        console.log(newBody, newTitle);
    },
    onNoteSelect(noteId){
        console.log(noteId);
    },
    onNoteDelete(noteId){
        console.log(noteId);
    }
});
view.updateNoteList(notesAPI.getAllNotes());