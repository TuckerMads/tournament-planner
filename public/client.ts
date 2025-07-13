
document.getElementById('create-new-tournament')?.addEventListener('click', () => {
  window.location.href = '/createTournament'; // ✅ correct
});

document.addEventListener('DOMContentLoaded', () => {
  const joinForm = document.getElementById('join-form') as HTMLFormElement;
  const joinStatus = document.getElementById('join-status') as HTMLParagraphElement;

  joinForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const passcode = (document.getElementById('join-passcode') as HTMLInputElement).value;

    const response = await fetch(`/api/tournaments/by-passcode/${encodeURIComponent(passcode)}`);
    if (response.ok) {
      const tournament = await response.json();
      window.location.href = `/joinTournament/${tournament.id}`;
    } else {
      joinStatus.textContent = '❌ Invalid passcode';
      joinStatus.style.color = 'red';
    }
  });
});
