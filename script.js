let currentTheme = 'light';
let notesCache = [];
let filteredNotes = [];
let isLoading = false;
let searchTimeout;

// Performance optimizations
const debounce = (func, wait) => {
let timeout;
return function executedFunction(...args) {
    const later = () => {
    clearTimeout(timeout);
    func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
};
};

// Simple theme toggle - no animations for performance
function toggleTheme() {
currentTheme = currentTheme === 'light' ? 'dark' : 'light';
document.body.classList.toggle('dark');
}

// Optimized content switching
function showContent(section) {
const contentAreas = document.querySelectorAll('.content-section');
const navItems = document.querySelectorAll('.nav-item');

contentAreas.forEach(sec => {
    sec.classList.remove('visible');
    sec.classList.add('hidden');
});

navItems.forEach(item => item.classList.remove('active'));

const target = document.getElementById(`${section}-section`);
if (target) {
    target.classList.remove('hidden');
    // Small delay for smooth transition
    setTimeout(() => target.classList.add('visible'), 10);
}

const activeNav = document.querySelector(`.nav-item[onclick="showContent('${section}')"]`);
if (activeNav) {
    activeNav.classList.add('active');
}

// Load notes only when needed
if (section === 'notes' && notesCache.length === 0) {
    loadNotes();
}
}

// Throttled scroll handler
const updateProgressBar = debounce(() => {
const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
const progress = Math.min((scrollTop / scrollHeight) * 100, 100);
document.querySelector('.progress-bar').style.width = progress + '%';
}, 10);

// Countdown functionality
const countdownDates = [
{ label: "The Day We Met", date: "2025-06-14" },
{ label: "Your Birthday", date: "2025-09-06" },
{ label: "Our Next Meetup", date: "3000-30-30" }
];

function updateClock() {
const timeElement = document.getElementById("current-time");
if (timeElement) {
    timeElement.textContent = new Date().toLocaleTimeString();
}
}

function updateCountdowns() {
const list = document.getElementById("countdown-list");
if (!list) return;

const now = new Date();
list.innerHTML = '';

countdownDates.forEach(item => {
    const target = new Date(item.date);
    const diffTime = target - now;
    const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    const li = document.createElement('li');
    let message = '';
    
    if (days > 0) {
    message = `<span style="font-weight: bold;">${days}</span> day(s) left`;
    } else if (days === 0) {
    message = `<span style="font-weight: bold;">Today!</span>`;
    } else {
    message = `<span style="font-weight: bold;">${Math.abs(days)}</span> day(s) ago`;
    }

    li.innerHTML = `📌 <strong>${item.label}</strong> — ${message}`;
    list.appendChild(li);
});
}

// Gallery functionality - simplified
function initializeGallery() {
const images = document.querySelectorAll('.gallery-photo');
if (images.length === 0) return;

const overlay = document.createElement('div');
overlay.className = 'fullscreen-overlay';
overlay.innerHTML = `
    <span class="overlay-nav left">‹</span>
    <img src="" alt="Fullscreen Image" />
    <span class="overlay-nav right">›</span>
`;
document.body.appendChild(overlay);

const overlayImg = overlay.querySelector('img');
let currentIndex = 0;
const imageArray = Array.from(images);

function showImage(index) {
    if (index < 0 || index >= imageArray.length) return;
    overlayImg.src = imageArray[index].src;
    currentIndex = index;
    overlay.classList.add('show');
}

imageArray.forEach((img, index) => {
    img.addEventListener('click', () => showImage(index));
});

overlay.addEventListener('click', (e) => {
    if (e.target === overlay || e.target === overlayImg) {
    overlay.classList.remove('show');
    }
});

overlay.querySelector('.left').addEventListener('click', (e) => {
    e.stopPropagation();
    showImage((currentIndex - 1 + imageArray.length) % imageArray.length);
});

overlay.querySelector('.right').addEventListener('click', (e) => {
    e.stopPropagation();
    showImage((currentIndex + 1) % imageArray.length);
});
}

// Optimized search functionality
function searchNotes(query) {
const searchTerm = query.toLowerCase().trim();

if (!searchTerm) {
    filteredNotes = [...notesCache];
} else {
    filteredNotes = notesCache.filter(note => 
    note.title.toLowerCase().includes(searchTerm) ||
    note.body.toLowerCase().includes(searchTerm) ||
    note.author.toLowerCase().includes(searchTerm)
    );
}

renderNotes();
updateNotesStats();
}

// Debounced search input handler
const debouncedSearch = debounce((query) => {
searchNotes(query);
}, 300);

function updateNotesStats() {
const statsElement = document.getElementById('notes-stats');
if (!statsElement) return;

const total = notesCache.length;
const showing = filteredNotes.length;

if (total === 0) {
    statsElement.textContent = '📊 No notes yet';
} else if (showing === total) {
    statsElement.textContent = `📊 ${total} ${total === 1 ? 'story' : 'stories'}`;
} else {
    statsElement.textContent = `📊 Showing ${showing} of ${total} ${total === 1 ? 'story' : 'stories'}`;
}
}

// Generate random cover emoji for notes - removed, no longer needed

// Utility function to truncate text
function truncateText(text, maxLength) {
if (text.length <= maxLength) return text;
return text.substring(0, maxLength) + '...';
}

// Optimized note loading
async function loadNotes() {
if (isLoading) return;
isLoading = true;

const display = document.getElementById("note-display");
if (!display) return;

display.innerHTML = "<div class='loading'>Loading your stories...</div>";

try {
    const supabase = window.supabase.createClient(
    'https://gkmcklsoaeasqymnxxjo.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdrbWNrbHNvYWVhc3F5bW54eGpvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE3MDg4NzQsImV4cCI6MjA2NzI4NDg3NH0.k6nLlftIHb_eKvyS9NPmeKVvJ73HFyjEUFpxPbmO8OQ'
    );

    const { data: notes, error } = await supabase
    .from('notes')
    .select('*')
    .order('created_at', { ascending: false });

    if (error) throw error;

    notesCache = notes || [];
    filteredNotes = [...notesCache];
    
    renderNotes();
    updateNotesStats();
    
} catch (err) {
    display.innerHTML = `
    <div class="empty-state">
        <div class="empty-state-icon">❌</div>
        <p>Failed to load notes. Please refresh and try again.</p>
    </div>`;
} finally {
    isLoading = false;
}
}

// Render notes with clean cards
function renderNotes() {
const display = document.getElementById("note-display");
if (!display) return;

if (filteredNotes.length === 0) {
    const isEmpty = notesCache.length === 0;
    display.innerHTML = `
    <div class="empty-state">
        <div class="empty-state-icon">${isEmpty ? '📚' : '🔍'}</div>
        <p>${isEmpty ? 'No stories yet. Create your first one!' : 'No stories match your search.'}</p>
    </div>`;
    return;
}

// Use DocumentFragment for better performance
const fragment = document.createDocumentFragment();

filteredNotes.forEach(note => {
    const card = document.createElement("div");
    card.className = "note-card";
    
    const preview = truncateText(note.body, 120);
    
    card.innerHTML = `
    <div class="note-content">
        <h3 class="note-title">${escapeHtml(note.title)}</h3>
        <p class="note-preview">${escapeHtml(preview)}</p>
        <div class="note-meta">
        <span class="note-author">by ${escapeHtml(note.author)}</span>
        <div class="note-actions">
            <button class="note-btn edit" onclick="event.stopPropagation(); editNote('${note.id}', \`${escapeHtml(note.title)}\`, \`${escapeHtml(note.body)}\`, \`${escapeHtml(note.author)}\`)" title="Edit">
            ✏️
            </button>
            <button class="note-btn delete" onclick="event.stopPropagation(); deleteNote('${note.id}')" title="Delete">
            🗑️
            </button>
        </div>
        </div>
    </div>
    `;
    
    // Add click event to open note reader
    card.addEventListener('click', () => openNoteReader(note));
    
    fragment.appendChild(card);
});

display.innerHTML = '';
display.appendChild(fragment);
}

// Open note in reading view
function openNoteReader(note) {
const overlay = document.createElement('div');
overlay.className = 'note-reader-overlay';

overlay.innerHTML = `
    <div class="note-reader-content">
    <button class="note-reader-close">×</button>
    <div class="note-reader-header">
        <h2 class="note-reader-title">${escapeHtml(note.title)}</h2>
        <div class="note-reader-meta">
        <span class="note-reader-author">by ${escapeHtml(note.author)}</span>
        <span>${new Date(note.created_at).toLocaleDateString()}</span>
        </div>
    </div>
    <div class="note-reader-body">${escapeHtml(note.body)}</div>
    <div class="note-reader-actions">
        <button class="reader-btn edit" onclick="closeNoteReader(); editNote('${note.id}', \`${escapeHtml(note.title)}\`, \`${escapeHtml(note.body)}\`, \`${escapeHtml(note.author)}\`)">
        ✏️ Edit
        </button>
        <button class="reader-btn delete" onclick="closeNoteReader(); deleteNote('${note.id}')">
        🗑️ Delete
        </button>
    </div>
    </div>
`;

document.body.appendChild(overlay);

// Close functionality
const closeBtn = overlay.querySelector('.note-reader-close');
closeBtn.addEventListener('click', () => closeNoteReader());

overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
    closeNoteReader();
    }
});

// ESC key to close
const handleEscape = (e) => {
    if (e.key === 'Escape') {
    closeNoteReader();
    }
};
document.addEventListener('keydown', handleEscape);

// Store cleanup function
overlay.cleanup = () => {
    document.removeEventListener('keydown', handleEscape);
};
}

// Close note reader
function closeNoteReader() {
const overlay = document.querySelector('.note-reader-overlay');
if (overlay) {
    if (overlay.cleanup) overlay.cleanup();
    overlay.remove();
}
}

// Make closeNoteReader global
window.closeNoteReader = closeNoteReader;

// Utility function to escape HTML
function escapeHtml(text) {
const div = document.createElement('div');
div.textContent = text;
return div.innerHTML;
}

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
document.body.classList.add('dark');
currentTheme = 'dark';

showContent('about');
initializeGallery();

updateClock();
updateCountdowns();
setInterval(updateClock, 1000);
setInterval(updateCountdowns, 60000);

// Search functionality
const searchInput = document.getElementById('search-notes');
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
    debouncedSearch(e.target.value);
    });
}

// Supabase setup
const supabase = window.supabase.createClient(
    'https://gkmcklsoaeasqymnxxjo.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdrbWNrbHNvYWVhc3F5bW54eGpvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE3MDg4NzQsImV4cCI6MjA2NzI4NDg3NH0.k6nLlftIHb_eKvyS9NPmeKVvJ73HFyjEUFpxPbmO8OQ'
);

let currentNoteId = null;

// Form submission handler
document.getElementById("note-form").addEventListener("submit", async function (e) {
    e.preventDefault();
    
    const title = document.getElementById("note-title").value.trim();
    const body = document.getElementById("note-body").value.trim();
    const author = document.getElementById("note-author").value.trim();
    
    if (!title || !body || !author) {
    alert("Please fill in all fields!");
    return;
    }

    const submitBtn = e.target.querySelector('.modal-btn.confirm');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Saving...';
    submitBtn.disabled = true;

    try {
    if (currentNoteId) {
        await supabase.from("notes").update({ title, body, author }).eq("id", currentNoteId);
        currentNoteId = null;
    } else {
        await supabase.from("notes").insert([{ title, body, author }]);
    }

    this.reset();
    document.getElementById("note-modal").classList.add("hidden");
    await loadNotes();
    } catch (error) {
    alert("Failed to save note. Please try again.");
    } finally {
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
    }
});

// Global functions for note actions
window.editNote = function (id, title, body, author) {
    document.getElementById("note-title").value = title;
    document.getElementById("note-body").value = body;
    document.getElementById("note-author").value = author;
    currentNoteId = id;
    document.getElementById("note-modal").classList.remove("hidden");
};

window.deleteNote = async function (id) {
    if (confirm("Are you sure you want to delete this story? This action cannot be undone.")) {
    try {
        await supabase.from("notes").delete().eq("id", id);
        await loadNotes();
    } catch (error) {
        alert("Failed to delete note. Please try again.");
    }
    }
};

// Modal handlers
document.getElementById("show-note-form").addEventListener("click", () => {
    document.getElementById("note-modal").classList.remove("hidden");
    setTimeout(() => document.getElementById("note-title").focus(), 100);
});

document.getElementById("close-note-modal").addEventListener("click", () => {
    document.getElementById("note-form").reset();
    document.getElementById("note-modal").classList.add("hidden");
    currentNoteId = null;
});

// Close modal on overlay click
document.getElementById("note-modal").addEventListener("click", (e) => {
    if (e.target.classList.contains("modal-overlay")) {
    document.getElementById("note-form").reset();
    document.getElementById("note-modal").classList.add("hidden");
    currentNoteId = null;
    }
});

// Real-time subscription
supabase
    .channel('realtime-notes')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'notes' }, () => {
    if (document.getElementById('notes-section').classList.contains('visible')) {
        loadNotes();
    }
    })
    .subscribe();
});

// Event listeners
window.addEventListener('scroll', updateProgressBar);