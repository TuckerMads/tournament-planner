window.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('tournament-form');
  const status = document.getElementById('status-message');

  form?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('tournament-name').value;
    const organizer = document.getElementById('org-name').value;
    const passcode = document.getElementById('passcode').value;
    const description = document.getElementById('description').value;
    const maxTeams = document.getElementById('max-teams').value;

    const response = await fetch('/api/tournaments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, organizer, passcode, description, maxTeams })
    });

    if (response.ok) {
      status.textContent = '✅ Tournament created successfully!';
      status.style.color = 'green';
      form.reset();
    } else {
      status.textContent = '❌ Failed to create tournament.';
      status.style.color = 'red';
    }
  });
});
