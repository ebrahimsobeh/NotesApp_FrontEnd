const saveButton=document.querySelector('#btnSave');
const deleteButton=document.querySelector('#btnDelete');
const titleInput=document.querySelector('#title');
const descriptionInput=document.querySelector('#description');
const notesContainer=document.querySelector('#notes_container');


function clearForm(){
    titleInput.value='';
    descriptionInput.value='';
    deleteButton.classList.add('hidden');
    saveButton.setAttribute('data-id','');


}
function displatNoteForm(note){
    titleInput.value=note.title;
    descriptionInput.value=note.description;

    deleteButton.classList.remove('hidden');
    deleteButton.setAttribute('data-id',note.id);
    saveButton.setAttribute('data-id',note.id);


}
function getNoteById(id){
    fetch(`https://localhost:7204/api/Note/${id}`)
    .then(data=>data.json())
    .then(response=>{
        displatNoteForm(response);
    });
}

function papulatForm(id){
getNoteById(id);

}


function displayNotes(notes){
    let allnotes=' ';
    notes.forEach(note => {
        const noteElement=`
    
                            <dev class="note" data-id=${note.id}>
                                <h3>${note.title}</h3>
                                <p>${note.description}</p>
                            </dev>
                        `;
    allnotes+=noteElement;
    }
    );
    notesContainer.innerHTML=allnotes;

    //add event lisener to all of notes
    document.querySelectorAll('.note').forEach(note=>{
        note.addEventListener('click',function(){
            papulatForm(note.dataset.id);
        })
    })
   
}
function addNote(title,description){
    const body={
        title:title,
        description:description,
        isVisible:true
    };

    fetch('https://localhost:7204/api/Note',{
        method:'POST',
        body:JSON.stringify(body),
        headers:{
            "content-type":"application/json"
        }
    })
    .then(data=>data.json())
    .then(response=>{
        clearForm();
        getAllNotes();
    });


}

function getAllNotes(title,description){
     

    fetch('https://localhost:7204/api/note')
    .then(data=>data.json())
    .then(response=>displayNotes(response));
}
getAllNotes();

function updateNote(id,title,description){
    const body={
        title:title,
        description:description,
        isVisible:true
    };

    fetch(`https://localhost:7204/api/Note/${id}`,{
        method:'PUT',
        body:JSON.stringify(body),
        headers:{
            "content-type":"application/json"
        }
    })
    .then(data=>data.json())
    .then(response=>{
        clearForm();
        getAllNotes();
    });


}
saveButton.addEventListener('click',function(){
    const id=saveButton.dataset.id;
    if(id){
        updateNote(id,titleInput.value,descriptionInput.value)

    }else{
        addNote(titleInput.value,descriptionInput.value);
    }
});
function deleteNote(id){
    fetch(`https://localhost:7204/api/Note/${id}`,{
        method:'DELETE',
        headers:{
            "content-type":"application/json"
        }
    })
    .then(response=>{
        clearForm();
        getAllNotes();
    }
    )
}

deleteButton.addEventListener('click',function(){
    const id=deleteButton.dataset.id;
    deleteNote(id);
});


