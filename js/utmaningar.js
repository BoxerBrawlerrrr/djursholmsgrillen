/* Utmaningar — two monthly challenges with done state */

function mKey() {
  const d = new Date();
  return d.getFullYear() + "-" + (d.getMonth() + 1);
}

function renderChallenges() {
  const root = document.getElementById("challenges");
  const done = DG.getState("challenge_" + mKey(), {});
  const monthName = new Date().toLocaleDateString("sv-SE", { month: "long" });

  root.innerHTML = `
    <p class="muted" style="margin-bottom:6px;">Utmaningar för ${monthName}:</p>
    ${DG.challenges
      .map((c) => {
        const isDone = !!done[c.id];
        return `<div class="card">
          <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:12px;">
            <h3 style="font-size:1.2rem;">${c.title}</h3>
            <span class="badge ${isDone ? "done" : "pending"}">${isDone ? "Gjord" : "Ej gjord"}</span>
          </div>
          <p class="muted" style="margin:10px 0 14px;">${c.desc}</p>
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <span class="pts">+${c.points} p</span>
            ${
              isDone
                ? `<button class="btn btn-secondary btn-sm" data-undo="${c.id}">Ångra</button>`
                : `<a href="claima.html" class="btn btn-primary btn-sm" style="text-decoration:none;">Claima</a>`
            }
          </div>
        </div>`;
      })
      .join("")}
  `;

  root.querySelectorAll("[data-undo]").forEach((b) =>
    b.addEventListener("click", () => {
      const store = DG.getState("challenge_" + mKey(), {});
      delete store[b.dataset.undo];
      DG.setState("challenge_" + mKey(), store);
      renderChallenges();
    })
  );
}

document.addEventListener("DOMContentLoaded", renderChallenges);
