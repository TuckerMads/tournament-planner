
document.getElementById('create-new-tournament')?.addEventListener('click', () => {
  window.location.href = '/createTournament'
});

document.addEventListener('DOMContentLoaded', () => {
  const joinForm = document.getElementById('join-form') as HTMLFormElement;
  const joinStatus = document.getElementById('join-status') as HTMLParagraphElement;

  joinForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = (document.getElementById('join-name') as HTMLInputElement).value;
    const passcode = (document.getElementById('join-passcode') as HTMLInputElement).value;
    const response = await fetch(`/api/tournaments/by-passcode?name=${encodeURIComponent(name)}&passcode=${encodeURIComponent(passcode)}`);
    if (response.ok) {
      const tournament = await response.json();
      window.location.href = `/joinTournament/${tournament.id}`;
    } else {
      joinStatus.textContent = 'Invalid passcode';
      joinStatus.style.color = 'red';
    }
  });
});
