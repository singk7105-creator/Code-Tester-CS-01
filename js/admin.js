document.addEventListener("DOMContentLoaded", () => {
  const DEMO_EMAIL = "demo@bckp.local";
  const DEMO_PASSWORD = "BCKP-DEMO-ONLY";
  const SESSION_KEY = "bckp_demo_admin_session";
  const UPDATES_KEY = "bckp_demo_updates";

  const loginForm = document.getElementById("adminLoginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", event => {
      event.preventDefault();
      const email = document.getElementById("adminEmail").value.trim();
      const password = document.getElementById("adminPassword").value;
      const message = document.getElementById("loginMessage");
      if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
        sessionStorage.setItem(SESSION_KEY, "demo");
        window.location.href = "dashboard.html";
      } else {
        message.textContent = "डेमो लॉगिन विवरण सही नहीं हैं।";
      }
    });
  }

  const dashboard = document.getElementById("updateForm");
  if (dashboard) {
    if (sessionStorage.getItem(SESSION_KEY) !== "demo") {
      window.location.href = "login.html";
      return;
    }

    const list = document.getElementById("adminUpdates");
    const readUpdates = () => {
      try { return JSON.parse(localStorage.getItem(UPDATES_KEY) || "[]"); }
      catch (_) { return []; }
    };
    const writeUpdates = data => localStorage.setItem(UPDATES_KEY, JSON.stringify(data));

    const render = () => {
      const updates = readUpdates();
      list.innerHTML = "";
      if (!updates.length) {
        list.innerHTML = '<p class="empty-admin">अभी कोई सूचना सेव नहीं है।</p>';
        return;
      }
      updates.forEach(item => {
        const article = document.createElement("article");
        article.className = "admin-update";
        const title = document.createElement("strong");
        title.textContent = item.title;
        const body = document.createElement("p");
        body.textContent = item.body;
        const remove = document.createElement("button");
        remove.className = "danger-btn";
        remove.type = "button";
        remove.textContent = "हटाएं";
        remove.addEventListener("click", () => {
          writeUpdates(readUpdates().filter(x => x.id !== item.id));
          render();
        });
        article.append(title, body, remove);
        list.appendChild(article);
      });
    };

    dashboard.addEventListener("submit", event => {
      event.preventDefault();
      const title = document.getElementById("updateTitle").value.trim();
      const body = document.getElementById("updateBody").value.trim();
      if (!title || !body) return;
      const updates = readUpdates();
      updates.unshift({ id: Date.now(), title, body, createdAt: new Date().toISOString() });
      writeUpdates(updates);
      dashboard.reset();
      render();
    });

    document.getElementById("clearUpdates").addEventListener("click", () => {
      if (confirm("क्या आप सभी डेमो सूचनाएं हटाना चाहते हैं?")) {
        writeUpdates([]);
        render();
      }
    });
    render();
  }

  const logout = document.getElementById("logoutBtn");
  if (logout) {
    logout.addEventListener("click", () => {
      sessionStorage.removeItem(SESSION_KEY);
      window.location.href = "login.html";
    });
  }
});
