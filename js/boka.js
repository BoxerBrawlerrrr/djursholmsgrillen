/* Boka — booking form with validation + confirmation */

function renderBooking() {
  const root = document.getElementById("booking");
  const today = new Date().toISOString().split("T")[0];

  root.innerHTML = `
    <div class="card">
      <div class="field-row">
        <div class="field"><label>Datum</label><input type="date" id="bDate" min="${today}" value="${today}" /></div>
        <div class="field"><label>Tid</label>
          <select id="bTime">
            ${["17:00","17:30","18:00","18:30","19:00","19:30","20:00","20:30"].map((t) => `<option>${t}</option>`).join("")}
          </select>
        </div>
      </div>
      <div class="field">
        <label>Antal gäster</label>
        <div class="pill-group" id="guests">
          ${[2,3,4,5,6,8].map((n, i) => `<div class="pill${i === 2 ? " selected" : ""}" data-g="${n}">${n}</div>`).join("")}
        </div>
      </div>
      <div class="field"><label>Namn</label><input id="bName" placeholder="Ditt namn" /></div>
      <div class="field"><label>Telefonnummer</label><input id="bPhone" inputmode="tel" placeholder="07x xxx xx xx" /></div>
      <button class="btn btn-primary" id="bSubmit" style="margin-top:6px;">Boka bord</button>
    </div>
  `;

  root.querySelector("#guests").addEventListener("click", (e) => {
    const p = e.target.closest(".pill");
    if (!p) return;
    root.querySelectorAll("#guests .pill").forEach((x) => x.classList.remove("selected"));
    p.classList.add("selected");
  });

  root.querySelector("#bSubmit").addEventListener("click", () => {
    const name = root.querySelector("#bName").value.trim();
    const phone = root.querySelector("#bPhone").value.trim();
    if (!name || !phone) { alert("Fyll i namn och telefonnummer."); return; }
    const date = root.querySelector("#bDate").value;
    const time = root.querySelector("#bTime").value;
    const guests = root.querySelector("#guests .pill.selected").dataset.g;
    root.innerHTML = `
      <div class="notice">
        <div class="icon">🎉</div>
        <h2>Bokning bekräftad!</h2>
        <p style="color:var(--neon-jade-soft);font-weight:600;margin:10px 0;">${date} kl ${time} · ${guests} gäster</p>
        <p class="muted" style="margin-bottom:22px;">Bekräftelse skickas till ${phone}. Vi ses, ${name}!</p>
        <a href="index.html" class="btn btn-primary">Till startsidan</a>
      </div>`;
  });
}

document.addEventListener("DOMContentLoaded", renderBooking);
