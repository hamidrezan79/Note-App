export default class NotesView {
    constructor(root, handlers) {
        this.root = root;
        const {
            onNoteAdd,
            onNoteEdit,
            onNoteSelect,
            onNoteDelete
        } = handlers;
        this.onNoteAdd = onNoteAdd;
        this.onNoteEdit = onNoteEdit;
        this.onNoteSelect = onNoteSelect;
        this.onNoteDelete = onNoteDelete;
        this.root.innerHTML = `<div class="notes__sidebar">
        <div class="notes__logo">NOTE APP</div>
        <div class="notes__list">
          <div class="notes__list-item"></div>
        </div>
        <button class="notes__add">ADD NOTE</button>
      </div>
      <div class="notes__preview">
        <input type="text" class="notes__title" placeholder="note title ..." />
        <textarea name="" class="notes__body">Take some note ...</textarea>
      </div>`;



        const addNotesBtn = this.root.querySelector(".notes__add");
        const inputTitle = this.root.querySelector(".notes__title");
        const inputBody = this.root.querySelector(".notes__body");


        addNotesBtn.addEventListener("click", () => {
            this.onNoteAdd();
        });
        [inputBody, inputTitle].forEach(inputField => {
            inputField.addEventListener("blur", () => {
                const newBody = inputBody.value.trim();
                const newTitle = inputTitle.value.trim();
                this.onNoteEdit(newBody, newTitle);
            })
        });
    }

    _createListItemHTML(id, body, title, updated) {
        const maxBodyLength = 50;
        return `<div class="notes__list-item" data-note-id="${id}">
        <div class="notes__item-header">
        <div class="notes__small-title">${title}</div>
        <span class="notes__list-trash" data-note-id="${id}"><i class="fa-solid fa-trash-alt"></i></span>
        </div> 
        <div class="notes__samall-body">
        ${body.substring(0,maxBodyLength)};
        ${body.length>maxBodyLength ? "..." : ""}
        </div>
        <div class="notes__samll-updated">
        ${new Date(updated).toLocaleString("en",{
            dateStyle:"full" ,
            timeStyle:"short"}
            )}
        </div>
        </div>`
    }


    updateNoteList(notes) {
        const notesContainer = this.root.querySelector(".notes__list");
        // empty ntoe list
        notesContainer.innerHTML = "";
        let noteList = "";
        for (const note of notes) {
            const {
                id,
                body,
                title,
                updated
            } = note;
            const html = this._createListItemHTML(id, body, title, updated);
            noteList += html;
        }
        notesContainer.innerHTML = noteList;

        notesContainer.querySelectorAll(".notes__list-item").forEach(noteItem => {
            noteItem.addEventListener("click", () => {
                this.onNoteSelect(noteItem.dataset.noteId)
            })
        })
        notesContainer.querySelectorAll(".notes__list-trash").forEach(noteItem => {
            noteItem.addEventListener("click", (e) => {
                this.onNoteDelete(noteItem.dataset.noteId)
                e.stopPropagation();
            })
        });
    }
}