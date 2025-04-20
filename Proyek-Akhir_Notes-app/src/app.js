import './style.css';

// Custom Element Item Catatan
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
        <button class="delete-button">Hapus</button>
      </div>
    `;

    // Menangani penghapusan catatan
    this.shadowRoot.querySelector('.delete-button').addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('note-deleted', { detail: note.id, bubbles: true, composed: true }));
    });
  }
}
customElements.define('note-item', NoteItem);

// Custom Element Daftar Catatan
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

// Custom Element (Realtime Validation)
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

    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const title = titleInput.value;
      const body = bodyInput.value;
      const newNote = { title, body };

      // Tampilkan indikator loading sebelum request
      const loadingIndicator = document.createElement('loading-indicator');
      document.body.appendChild(loadingIndicator);

      // Kirim catatan baru ke API
      const response = await fetch('https://notes-api.dicoding.dev/v2/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newNote),
      });

      const data = await response.json();
      if (data.status === 'success') {
        this.dispatchEvent(new CustomEvent('note-added', { detail: data.data, bubbles: true, composed: true }));
      }

      // Hapus indikator loading setelah request selesai
      document.body.removeChild(loadingIndicator);

      form.reset();
      validateForm();
    });
  }
}
customElements.define('note-form', NoteForm);

// Fungsi untuk menghapus catatan
const deleteNote = async (noteId) => {
  const response = await fetch(`https://notes-api.dicoding.dev/v2/notes/${noteId}`, {
    method: 'DELETE',
  });

  const data = await response.json();
  if (data.status === 'success') {
    return true;
  }
  return false;
};

// mengambil catatan dari API
const getNotes = async () => {
  const loadingIndicator = document.createElement('loading-indicator');
  document.body.appendChild(loadingIndicator);

  const response = await fetch('https://notes-api.dicoding.dev/v2/notes');
  const data = await response.json();
  document.body.removeChild(loadingIndicator);

  return data.data; // Mengembalikan catatan yang belum diarsipkan
};

// mengambil catatan perorangan
const getSingleNote = async (noteId) => {
  const response = await fetch(`https://notes-api.dicoding.dev/v2/notes/${noteId}`);
  const data = await response.json();
  return data.data; // Mengembalikan detail catatan tertentu
};

// Render aplikasi
document.addEventListener('DOMContentLoaded', async () => {
  const notesList = document.querySelector('notes-list');
  const noteForm = document.querySelector('note-form');

  // Ambil data catatan dari API
  let notes = await getNotes();
  notesList.notes = notes;

  noteForm.addEventListener('note-added', (event) => {
    notes = [...notes, event.detail];
    notesList.notes = notes;
  });

  // Event listener untuk penghapusan catatan
  notesList.addEventListener('note-deleted', async (event) => {
    if (!Array.isArray(notesList.notes)) {
      notesList.notes = [];
    }

    const isDeleted = await deleteNote(event.detail);
    if (isDeleted) {
      notes = notes.filter((note) => note.id !== event.detail);
      notesList.notes = notes;
    }
  });
});
