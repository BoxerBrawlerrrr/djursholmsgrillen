/* Claima — submit proof to pending queue (localStorage, shared with /admin) */

function renderClaim() {
  const root = document.getElementById("claim");
  const pending = DG.getState("claims", []);

  root.innerHTML = `
    <div class="card">
      <div class="field">
        <label>Vad gäller det?</label>
        <select id="claimType">
          ${DG.earn.map((m) => `<option value="${m.id}">${m.label} (+${m.points} p)</option>`).join("")}
          ${DG.challenges.map((c) => `<option value="${c.id}">${c.title} (+${c.points} p)</option>`).join("")}
        </select>
      </div>
      <div class="field">
        <label>Länk till inlägget</label>
        <input id="claimLink" placeholder="https://..." inputmode="url" />
      </div>
      <div class="field">
        <label>Eller ladda upp skärmdump</label>
        <input id="claimFile" type="file" accept="image/*" />
      </div>
      <button class="btn btn-primary" id="submitClaim" style="margin-top:6px;">Skicka för granskning</button>
    </div>

    <h2 class="menu-cat-title">Dina claims</h2>
    <div class="card" id="myClaims">
      ${
        pending.length
          ? pending
              .map(
                (c) => `<div class="row">
                  <div class="row-main">
                    <div class="row-title">${c.label}</div>
                    <div class="row-sub">${c.when}</div>
                  </div>
                  <span class="badge ${c.status === "godkänd" ? "done" : "pending"}">${c.status}</span>
                </div>`
              )
              .join("")
          : '<p class="muted">Inga claims ännu.</p>'
      }
    </div>
  `;

  root.querySelector("#submitClaim").addEventListener("click", () => {
    const sel = root.querySelector("#claimType");
    const link = root.querySelector("#claimLink").value.trim();
    const file = root.querySelector("#claimFile").files[0];
    if (!link && !file) {
      alert("Lägg till en länk eller en skärmdump först.");
      return;
    }
    const list = DG.getState("claims", []);
    list.unshift({
      id: sel.value,
      label: sel.options[sel.selectedIndex].text,
      when: new Date().toLocaleString("sv-SE", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }),
      status: "väntar",
    });
    DG.setState("claims", list);
    root.innerHTML = `
      <div class="notice">
        <div class="icon">📨</div>
        <h2>Skickat för granskning!</h2>
        <p class="muted" style="margin:10px 0 22px;">Personalen godkänner så snart de kan. Poängen läggs till direkt vid godkännande.</p>
        <a href="tjana-poang.html" class="btn btn-primary">Tillbaka</a>
      </div>`;
  });
}

document.addEventListener("DOMContentLoaded", renderClaim);
