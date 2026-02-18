(function () {
  const STORAGE_KEY = "roleLens"; // "po" | "producer"

  function getRole() {
    return localStorage.getItem(STORAGE_KEY) || "po";
  }

  function setRole(role) {
    localStorage.setItem(STORAGE_KEY, role);
    applyRole(role);
    syncToggle(role);
  }

  function applyRole(role) {
    document.querySelectorAll("[data-lens]").forEach(el => {
      const lens = el.getAttribute("data-lens");
      el.style.display = (lens === role) ? "" : "none";
    });
  }

  function syncToggle(role) {
    const poBtn = document.querySelector("[data-role-btn='po']");
    const prodBtn = document.querySelector("[data-role-btn='producer']");
    if (!poBtn || !prodBtn) return;
    poBtn.classList.toggle("active", role === "po");
    prodBtn.classList.toggle("active", role === "producer");
  }

  function initToggle() {
    const poBtn = document.querySelector("[data-role-btn='po']");
    const prodBtn = document.querySelector("[data-role-btn='producer']");
    if (!poBtn || !prodBtn) return;

    poBtn.addEventListener("click", () => setRole("po"));
    prodBtn.addEventListener("click", () => setRole("producer"));

    const role = getRole();
    applyRole(role);
    syncToggle(role);
  }

  function highlightNav() {
    const path = (location.pathname.split("/").pop() || "index.html").toLowerCase();
    document.querySelectorAll(".navlinks a.pill").forEach(a => {
      const href = (a.getAttribute("href") || "").toLowerCase();
      if (href.endsWith(path)) a.classList.add("active");
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    initToggle();
    highlightNav();
    applyRole(getRole());
  });
})();
