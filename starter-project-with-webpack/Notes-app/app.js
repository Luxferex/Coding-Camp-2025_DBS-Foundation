// Custom Element untuk Item Catatan
class NoteItem extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  set note(note) {
    this.shadowRoot.innerHTML = `
              <style>
                  .note {
                      border: 1px solid #ddd;
                      padding: 10px;
                      margin: 5px;
                      border-radius: 5px;
                      background: #fff;
                  }
              </style>
              <div class="note">
                  <h3>${note.title}</h3>
                  <p>${note.body}</p>
                  <small>${new Date(note.createdAt).toLocaleDateString()}</small>
              </div>
          `;
  }
}
customElements.define('note-item', NoteItem);

// Custom Element untuk Daftar Catatan
class NotesList extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  set notes(notes) {
    this.shadowRoot.innerHTML = `
              <style>
                  .grid {
                      display: grid;
                      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
                      gap: 10px;
                  }
              </style>
              <div class="grid">
                  ${notes.map((note) => `<note-item></note-item>`).join('')}
              </div>
          `;

    const noteElements = this.shadowRoot.querySelectorAll('note-item');
    notes.forEach((note, index) => (noteElements[index].note = note));
  }
}
customElements.define('notes-list', NotesList);

// Custom Element untuk Formulir Tambah Catatan (Realtime Validation)
class NoteForm extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
              <style>
                  form {
                      display: flex;
                      flex-direction: column;
                      gap: 10px;
                  }
                  .error {
                      color: red;
                      font-size: 0.8rem;
                  }
                  button:disabled {
                      background: #ccc;
                      cursor: not-allowed;
                  }
              </style>
              <form>
                  <input type="text" id="title" placeholder="Judul Catatan" required>
                  <span class="error" id="title-error"></span>
                  <textarea id="body" placeholder="Isi Catatan" required></textarea>
                  <span class="error" id="body-error"></span>
                  <button type="submit" disabled>Tambah Catatan</button>
              </form>
          `;

    const form = this.shadowRoot.querySelector('form');
    const titleInput = this.shadowRoot.querySelector('#title');
    const bodyInput = this.shadowRoot.querySelector('#body');
    const titleError = this.shadowRoot.querySelector('#title-error');
    const bodyError = this.shadowRoot.querySelector('#body-error');
    const submitButton = this.shadowRoot.querySelector('button');

    const validateForm = () => {
      let isValid = true;

      if (titleInput.value.length < 3) {
        titleError.textContent = 'Judul minimal 3 karakter';
        isValid = false;
      } else {
        titleError.textContent = '';
      }

      if (bodyInput.value.length < 5) {
        bodyError.textContent = 'Isi catatan minimal 5 karakter';
        isValid = false;
      } else {
        bodyError.textContent = '';
      }

      submitButton.disabled = !isValid;
    };

    titleInput.addEventListener('input', validateForm);
    bodyInput.addEventListener('input', validateForm);

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const title = titleInput.value;
      const body = bodyInput.value;
      const newNote = { id: `notes-${Date.now()}`, title, body, createdAt: new Date().toISOString(), archived: false };
      this.dispatchEvent(new CustomEvent('note-added', { detail: newNote, bubbles: true, composed: true }));
      form.reset();
      validateForm();
    });
  }
}
customElements.define('note-form', NoteForm);

// Data Dummy
const notesData = [
  {
    id: 'notes-jT-jjsyz61J8XKiI',
    title: 'Welcome to Notes, Dimas!',
    body: 'Welcome to Notes! This is your first note. You can archive it, delete it, or create new ones.',
    createdAt: '2022-07-28T10:03:12.594Z',
    archived: false,
  },
  {
    id: 'notes-aB-cdefg12345',
    title: 'Meeting Agenda',
    body: 'Discuss project updates and assign tasks for the upcoming week.',
    createdAt: '2022-08-05T15:30:00.000Z',
    archived: false,
  },
  {
    id: 'notes-XyZ-789012345',
    title: 'Shopping List',
    body: 'Milk, eggs, bread, fruits, and vegetables.',
    createdAt: '2022-08-10T08:45:23.120Z',
    archived: false,
  },
  {
    id: 'notes-1a-2b3c4d5e6f',
    title: 'Personal Goals',
    body: 'Read two books per month, exercise three times a week, learn a new language.',
    createdAt: '2022-08-15T18:12:55.789Z',
    archived: false,
  },
  {
    id: 'notes-LMN-456789',
    title: 'Recipe: Spaghetti Bolognese',
    body: 'Ingredients: ground beef, tomatoes, onions, garlic, pasta. Steps:...',
    createdAt: '2022-08-20T12:30:40.200Z',
    archived: false,
  },
  {
    id: 'notes-QwErTyUiOp',
    title: 'Workout Routine',
    body: 'Monday: Cardio, Tuesday: Upper body, Wednesday: Rest, Thursday: Lower body, Friday: Cardio.',
    createdAt: '2022-08-25T09:15:17.890Z',
    archived: false,
  },
  {
    id: 'notes-abcdef-987654',
    title: 'Book Recommendations',
    body: "1. 'The Alchemist' by Paulo Coelho\n2. '1984' by George Orwell\n3. 'To Kill a Mockingbird' by Harper Lee",
    createdAt: '2022-09-01T14:20:05.321Z',
    archived: false,
  },
  {
    id: 'notes-zyxwv-54321',
    title: 'Daily Reflections',
    body: 'Write down three positive things that happened today and one thing to improve tomorrow.',
    createdAt: '2022-09-07T20:40:30.150Z',
    archived: false,
  },
  {
    id: 'notes-poiuyt-987654',
    title: 'Travel Bucket List',
    body: '1. Paris, France\n2. Kyoto, Japan\n3. Santorini, Greece\n4. New York City, USA',
    createdAt: '2022-09-15T11:55:44.678Z',
    archived: false,
  },
  {
    id: 'notes-asdfgh-123456',
    title: 'Coding Projects',
    body: '1. Build a personal website\n2. Create a mobile app\n3. Contribute to an open-source project',
    createdAt: '2022-09-20T17:10:12.987Z',
    archived: false,
  },
  {
    id: 'notes-5678-abcd-efgh',
    title: 'Project Deadline',
    body: 'Complete project tasks by the deadline on October 1st.',
    createdAt: '2022-09-28T14:00:00.000Z',
    archived: false,
  },
  {
    id: 'notes-9876-wxyz-1234',
    title: 'Health Checkup',
    body: 'Schedule a routine health checkup with the doctor.',
    createdAt: '2022-10-05T09:30:45.600Z',
    archived: false,
  },
  {
    id: 'notes-qwerty-8765-4321',
    title: 'Financial Goals',
    body: '1. Create a monthly budget\n2. Save 20% of income\n3. Invest in a retirement fund.',
    createdAt: '2022-10-12T12:15:30.890Z',
    archived: false,
  },
  {
    id: 'notes-98765-54321-12345',
    title: 'Holiday Plans',
    body: 'Research and plan for the upcoming holiday destination.',
    createdAt: '2022-10-20T16:45:00.000Z',
    archived: false,
  },
  {
    id: 'notes-1234-abcd-5678',
    title: 'Language Learning',
    body: 'Practice Spanish vocabulary for 30 minutes every day.',
    createdAt: '2022-10-28T08:00:20.120Z',
    archived: false,
  },
];

console.log(notesData);

// Render Aplikasi
document.addEventListener('DOMContentLoaded', () => {
  const notesList = document.querySelector('notes-list');
  const noteForm = document.querySelector('note-form');

  notesList.notes = notesData;

  noteForm.addEventListener('note-added', (event) => {
    notesData.push(event.detail);
    notesList.notes = notesData;
  });
});
