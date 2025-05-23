import './style.css';

// Custom Element Indikator Loading
class LoadingIndicator extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
      <style>
        .loading {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 20px;
          font-weight: bold;
          color: #333;
        }
        .spinner {
          border: 4px solid #f3f3f3;
          border-top: 4px solid #3498db;
          border-radius: 50%;
          width: 50px;
          height: 50px;
          animation: spin 2s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      </style>
      <div class="loading">
        <div class="spinner"></div>
        Loading...
      </div>
    `;
  }
}

customElements.define('loading-indicator', LoadingIndicator);

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
        .archived {
          background: #f0f0f0;
        }
      </style>
      <div class="note ${note.archived ? 'archived' : ''}">
        <h3>${note.title}</h3>
        <p>${note.body}</p>
        <small>${new Date(note.createdAt).toLocaleDateString()}</small>
        <button class="delete-button">Hapus</button>
        ${note.archived ? `<button class="unarchive-button">Kembalikan Arsip</button>` : `<button class="archive-button">Arsipkan</button>`}
      </div>
    `;

    // Menangani penghapusan catatan
    this.shadowRoot
      .querySelector('.delete-button')
      .addEventListener('click', () => {
        if (note.archived) {
          const confirmDelete = confirm(
            'Catatan ini sudah diarsipkan. Apakah Anda ingin mengembalikannya terlebih dahulu dan kemudian menghapusnya?'
          );
          if (confirmDelete) {
            // Jika user memilih untuk mengembalikan arsip dan menghapus
            this.dispatchEvent(
              new CustomEvent('note-unarchived', {
                detail: note.id,
                bubbles: true,
                composed: true,
              })
            );
            // Setelah unarchive, lanjutkan penghapusan
            this.dispatchEvent(
              new CustomEvent('note-deleted', {
                detail: note.id,
                bubbles: true,
                composed: true,
              })
            );
          }
        } else {
          // Jika catatan belum diarsipkan, langsung hapus
          const confirmDelete = confirm(
            'Apakah Anda yakin ingin menghapus catatan ini?'
          );
          if (confirmDelete) {
            this.dispatchEvent(
              new CustomEvent('note-deleted', {
                detail: note.id,
                bubbles: true,
                composed: true,
              })
            );
          }
        }
      });

    // Menangani pengarsipan atau pengembalian arsip
    this.shadowRoot
      .querySelector('.archive-button')
      ?.addEventListener('click', () => {
        this.dispatchEvent(
          new CustomEvent('note-archived', {
            detail: note.id,
            bubbles: true,
            composed: true,
          })
        );
      });

    this.shadowRoot
      .querySelector('.unarchive-button')
      ?.addEventListener('click', () => {
        this.dispatchEvent(
          new CustomEvent('note-unarchived', {
            detail: note.id,
            bubbles: true,
            composed: true,
          })
        );
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

      try {
        // Kirim catatan baru ke API
        const response = await fetch(
          'https://notes-api.dicoding.dev/v2/notes',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newNote),
          }
        );

        if (!response.ok) {
          throw new Error('Gagal menambahkan catatan');
        }

        const data = await response.json();
        if (data.status === 'success') {
          alert('Catatan berhasil ditambahkan!');
          this.dispatchEvent(
            new CustomEvent('note-added', {
              detail: data.data,
              bubbles: true,
              composed: true,
            })
          );
        }
      } catch (error) {
        alert(`Terjadi kesalahan: ${error.message}`);
      } finally {
        // Hapus indikator loading setelah request selesai
        document.body.removeChild(loadingIndicator);
        form.reset();
        validateForm();
      }
    });
  }
}
customElements.define('note-form', NoteForm);

// Fungsi untuk mengarsipkan catatan
const archiveNote = async (noteId) => {
  const loadingIndicator = document.createElement('loading-indicator');
  document.body.appendChild(loadingIndicator);

  try {
    const response = await fetch(
      `https://notes-api.dicoding.dev/v2/notes/${noteId}/archive`,
      {
        method: 'POST',
      }
    );
    if (!response.ok) {
      throw new Error('Gagal mengarsipkan catatan');
    }
    const data = await response.json();
    alert('Catatan berhasil diarsipkan!');

    // Update catatan menjadi arsip di UI
    return data.status === 'success';
  } catch (error) {
    alert(`Terjadi kesalahan: ${error.message}`);
    return false;
  } finally {
    document.body.removeChild(loadingIndicator);
  }
};

// Fungsi untuk mengembalikan catatan dari arsip (unarchive)
const unarchiveNote = async (noteId) => {
  const loadingIndicator = document.createElement('loading-indicator');
  document.body.appendChild(loadingIndicator);

  try {
    const response = await fetch(
      `https://notes-api.dicoding.dev/v2/notes/${noteId}/unarchive`,
      {
        method: 'POST',
      }
    );
    if (!response.ok) {
      throw new Error('Gagal mengembalikan arsip catatan');
    }
    const data = await response.json();
    alert('Catatan berhasil dikembalikan dari arsip!');
    return data.status === 'success';
  } catch (error) {
    alert(`Terjadi kesalahan: ${error.message}`);
    return false;
  } finally {
    document.body.removeChild(loadingIndicator);
  }
};

// Fungsi untuk menghapus catatan
const deleteNote = async (noteId) => {
  const loadingIndicator = document.createElement('loading-indicator');
  document.body.appendChild(loadingIndicator);

  try {
    const response = await fetch(
      `https://notes-api.dicoding.dev/v2/notes/${noteId}`,
      {
        method: 'DELETE',
      }
    );
    if (!response.ok) {
      throw new Error('Gagal menghapus catatan');
    }
    const data = await response.json();
    alert('Catatan berhasil dihapus!');
    return data.status === 'success';
  } catch (error) {
    alert(`Terjadi kesalahan: ${error.message}`);
    return false;
  } finally {
    document.body.removeChild(loadingIndicator);
  }
};

// Fungsi untuk mengambil catatan dari API
const getNotes = async () => {
  const loadingIndicator = document.createElement('loading-indicator');
  document.body.appendChild(loadingIndicator);

  try {
    const response = await fetch('https://notes-api.dicoding.dev/v2/notes');
    if (!response.ok) {
      throw new Error('Gagal memuat catatan');
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    alert(`Terjadi kesalahan: ${error.message}`);
    return []; // Mengembalikan array kosong jika terjadi error
  } finally {
    document.body.removeChild(loadingIndicator);
  }
};

// Render aplikasi
document.addEventListener('DOMContentLoaded', async () => {
  const activeNotesList = document.querySelector('#active-notes-list');
  const archivedNotesList = document.querySelector('#archived-notes-list');
  const noteForm = document.querySelector('note-form');

  // Ensure elements are selected before proceeding
  if (!activeNotesList || !archivedNotesList) {
    console.error('Failed to find note list elements.');
    return;
  }

  // Fetch notes data from API
  let notes = await getNotes();

  // Split notes into active and archived categories
  const activeNotes = notes.filter((note) => !note.archived);
  const archivedNotes = notes.filter((note) => note.archived);

  // Set the initial lists
  activeNotesList.notes = activeNotes;
  archivedNotesList.notes = archivedNotes;

  // Event listener when a new note is added
  noteForm.addEventListener('note-added', (event) => {
    notes = [...notes, event.detail];
    activeNotesList.notes = notes.filter((note) => !note.archived);
    archivedNotesList.notes = notes.filter((note) => note.archived);
  });

  // Event listener for deleting a note
  activeNotesList.addEventListener('note-deleted', async (event) => {
    const isDeleted = await deleteNote(event.detail);
    if (isDeleted) {
      notes = notes.filter((note) => note.id !== event.detail);
      activeNotesList.notes = notes.filter((note) => !note.archived);
      archivedNotesList.notes = notes.filter((note) => note.archived);
    }
  });

  // Event listener for archiving a note
  activeNotesList.addEventListener('note-archived', async (event) => {
    const isArchived = await archiveNote(event.detail);
    if (isArchived) {
      notes = notes.map((note) =>
        note.id === event.detail ? { ...note, archived: true } : note
      );
      activeNotesList.notes = notes.filter((note) => !note.archived);
      archivedNotesList.notes = notes.filter((note) => note.archived);
    }
  });

  // Event listener for unarchiving a note
  archivedNotesList.addEventListener('note-unarchived', async (event) => {
    const isUnarchived = await unarchiveNote(event.detail);
    if (isUnarchived) {
      notes = notes.map((note) =>
        note.id === event.detail ? { ...note, archived: false } : note
      );
      activeNotesList.notes = notes.filter((note) => !note.archived);
      archivedNotesList.notes = notes.filter((note) => note.archived);
    }
  });
});
