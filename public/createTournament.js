window.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('tournament-form');
  if (!form) return;

  let status = document.getElementById('status');
  if (!status) {
    status = document.createElement('p');
    status.id = 'status';
    form.appendChild(status);
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('tournament-name')?.value.trim() || '';
    const organizer = document.getElementById('org-name')?.value.trim() || '';
    const passcode = document.getElementById('passcode')?.value.trim() || '';
    const description = document.getElementById('description')?.value.trim() || '';
    const maxTeamsValue = document.getElementById('max-teams')?.value || '0';
    const maxPlayerCount = parseInt(maxTeamsValue, 10);

    try {
      const checkRes = await fetch(
        `/api/tournaments/exists?name=${encodeURIComponent(name)}&passcode=${encodeURIComponent(passcode)}`
      );
      const existsResult = await checkRes.json();

      if (existsResult.exists) {
        status.textContent = 'A tournament with that name and passcode already exists.';
        status.style.color = 'red';
        return;
      }

      const response = await fetch('/api/tournaments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, organizer, passcode, description, maxPlayerCount })
      });

      if (response.ok) {
        status.textContent = 'Tournament created successfully!';
        status.style.color = 'green';
        form.reset();
      } else {
        const error = await response.json();
        status.textContent = `Failed to create tournament: ${error.message || 'Unknown error'}`;
        status.style.color = 'red';
      }
    } catch (err) {
      console.error('Network or server error:', err);
      status.textContent = 'Error contacting server.';
      status.style.color = 'red';
    }
  });
});
