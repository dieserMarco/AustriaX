const members = [
  {
    name: "Lisa Huber",
    role: "Kommandantin",
    phone: "+43 664 123 456",
    email: "lisa.huber@feuerwehr.at",
    lastDeployment: "2024-08-18",
    status: "aktiv",
    skills: "Einsatzleitung, Atemschutz",
  },
  {
    name: "Jonas Leitner",
    role: "Maschinist",
    phone: "+43 650 987 654",
    email: "jonas.leitner@feuerwehr.at",
    lastDeployment: "2024-07-29",
    status: "urlaub",
    skills: "Maschinist, Führerschein C",
  },
  {
    name: "Theresa Gruber",
    role: "Sanitäterin",
    phone: "+43 676 555 221",
    email: "theresa.gruber@feuerwehr.at",
    lastDeployment: "2024-08-04",
    status: "aktiv",
    skills: "Erste Hilfe, Sanitätsdienst",
  },
  {
    name: "Markus Fuchs",
    role: "Atemschutzträger",
    phone: "+43 699 432 888",
    email: "markus.fuchs@feuerwehr.at",
    lastDeployment: "2024-06-10",
    status: "krank",
    skills: "Atemschutz, Technische Rettung",
  },
  {
    name: "Sarah Berger",
    role: "Jugendbetreuerin",
    phone: "+43 677 441 990",
    email: "sarah.berger@feuerwehr.at",
    lastDeployment: "2024-05-21",
    status: "inaktiv",
    skills: "Jugend, Öffentlichkeitsarbeit",
  },
];

const memberTable = document.getElementById("memberTable");
const memberCount = document.getElementById("memberCount");
const activeCount = document.getElementById("activeCount");
const statusFilter = document.getElementById("statusFilter");
const searchInput = document.getElementById("searchInput");
const memberForm = document.getElementById("memberForm");

function formatDate(dateString) {
  if (!dateString) return "-";
  const date = new Date(dateString);
  return date.toLocaleDateString("de-AT", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function statusBadge(status) {
  const labelMap = {
    aktiv: "Aktiv",
    inaktiv: "Inaktiv",
    krank: "Krank",
    urlaub: "Urlaub",
  };
  return `<span class="badge badge--${status}">${labelMap[status] ?? status}</span>`;
}

function updateStats(data) {
  memberCount.textContent = data.length.toString();
  activeCount.textContent = data.filter((member) => member.status === "aktiv").length.toString();
}

function renderTable(data) {
  memberTable.innerHTML = data
    .map(
      (member) => `
        <tr>
          <td>${member.name}</td>
          <td>${member.role}</td>
          <td>
            <div class="contact">
              <span>${member.phone}</span>
              <a href="mailto:${member.email}">${member.email}</a>
            </div>
          </td>
          <td>${member.skills || "-"}</td>
          <td>${formatDate(member.lastDeployment)}</td>
          <td>${statusBadge(member.status)}</td>
        </tr>
      `,
    )
    .join("");
  updateStats(data);
}

function applyFilters() {
  const status = statusFilter.value;
  const search = searchInput.value.toLowerCase();
  const filtered = members.filter((member) => {
    const matchesStatus = status === "alle" || member.status === status;
    const matchesSearch =
      member.name.toLowerCase().includes(search) ||
      member.role.toLowerCase().includes(search);
    return matchesStatus && matchesSearch;
  });

  renderTable(filtered);
}

memberForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(memberForm);
  const newMember = {
    name: formData.get("name").toString(),
    role: formData.get("role").toString(),
    phone: formData.get("phone").toString(),
    email: formData.get("email").toString(),
    lastDeployment: formData.get("lastDeployment").toString(),
    status: formData.get("status").toString(),
    skills: formData.get("skills").toString(),
  };
  members.unshift(newMember);
  memberForm.reset();
  applyFilters();
});

statusFilter.addEventListener("change", applyFilters);
searchInput.addEventListener("input", applyFilters);

applyFilters();
