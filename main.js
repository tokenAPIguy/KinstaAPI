import {
  fetchSiteByID,
  fetchSiteList,
  clearKinstaCache,
  clearEdge,
  restartPHP,
  token,
} from "./fetchData.js";

////////////////////////////////////////////////////////////////
// DOM Elements
////////////////////////////////////////////////////////////////
const companyIdInput = document.getElementById("companyID");
const companyIdButton = document.getElementById("fetchCompany");

const siteIdInput = document.getElementById("siteID");
const siteIdButton = document.getElementById("fetchSite");

const tokenInput = document.getElementById("token");
const submitTokenButton = document.getElementById("submitToken");

////////////////////////////////////////////////////////////////
// Accept Token
////////////////////////////////////////////////////////////////
submitTokenButton.addEventListener("click", () => {
  const tokenValue = token.value;
  token.classList.remove("input");

  if (tokenValue.length === 64) {
    token.classList.remove("reject");
    token.classList.add("accept");
  } else {
    token.classList.remove("accept");
    token.classList.add("reject");
  }
});

showHide.addEventListener("click", () => {
  if (tokenInput.type === "text") {
    tokenInput.type = "password";
  } else {
    tokenInput.type = "text";
  }
});
////////////////////////////////////////////////////////////////
// Fetch Site List by Company ID
////////////////////////////////////////////////////////////////

// Create aynchronous event listener that waits for response from fetchSiteList()
companyIdButton.addEventListener("click", async () => {
  const companyId = companyIdInput.value;
  try {
    const data = await fetchSiteList(companyId);
    const { sites } = data.company;
    document.getElementById("company-details").textContent = "Details";

    // Create container for environments
    const environmentsContainer = document.getElementById(
      "environments-company"
    );
    environmentsContainer.innerHTML = "";

    // Destructure Sites Array
    sites.forEach((site) => {
      const { display_name, name, id } = site;
      console.log(site);

      // Creating Link
      const url = `https://my.kinsta.com/sites?idCompany=${companyId}`;
      const link = `<a href="${url}" target="_blank" rel="noopener noreferrer">MyKinsta</a>`;

      // Output to DOM
      const paragraph = document.createElement("p");
      paragraph.innerHTML = `<br>${display_name}<br>
      &nbsp;&nbsp;&nbsp;&nbsp;Site name: ${name}<br>
      &nbsp;&nbsp;&nbsp;&nbsp;Site ID: ${id}<br>
      &nbsp;&nbsp;&nbsp;&nbsp;${link}
      `;

      environmentsContainer.appendChild(paragraph);
    });
  } catch (error) {
    console.error(error);
  }
});

////////////////////////////////////////////////////////////////
// Fetch Site by ID
////////////////////////////////////////////////////////////////

// Create aynchronous event listener that waits for response from fetchSiteByID()
siteIdButton.addEventListener("click", async () => {
  const siteId = siteIdInput.value;
  try {
    const data = await fetchSiteByID(siteId);
    const { company_id, name, status, environments } = data.site;

    // Output generic site details to DOM
    document.getElementById("site-details").textContent = "Details";

    document.getElementById(
      "company-id"
    ).innerHTML = `<br>Company ID: ${company_id}`;
    document.getElementById("name-site").textContent = `Name: ${name}`;
    document.getElementById("status-site").textContent = `Status: ${status}`;

    // Create container for environments
    const environmentsContainer = document.getElementById("environments-site");
    environmentsContainer.innerHTML = "";

    // Destructure Environments Array
    environments.forEach((environment) => {
      const {
        display_name,
        primaryDomain: { name: domain },
        name: environmentName,
        id,
        is_blocked,
        is_premium,
      } = environment;
      console.log(environment);

      // Creating Link
      const url = `https://my.kinsta.com/sites/details/${siteId}/${id}`;
      const link = `<a href="${url}" target="_blank" rel="noopener noreferrer">MyKinsta</a>`;

      // Output to DOM
      const paragraph = document.createElement("p");
      paragraph.innerHTML = `<br>Env Name: ${display_name}<br>
      &nbsp;&nbsp;&nbsp;&nbsp;Primary Domain: <a href =https://${domain}>${domain}</a><br>
      &nbsp;&nbsp;&nbsp;&nbsp;ID: ${id}<br>
      &nbsp;&nbsp;&nbsp;&nbsp;${
        environmentName[0].toUpperCase() + environmentName.slice(1)
      }<br> 
      &nbsp;&nbsp;&nbsp;&nbsp;Status: ${
        is_blocked ? "Blocked" : "Not Blocked"
      }<br>
      &nbsp;&nbsp;&nbsp;&nbsp;${is_premium ? "Premium" : "Not Premium"}<br>
      &nbsp;&nbsp;&nbsp;&nbsp;${link}`;

      // Create Clear Cache Button
      const clearCacheButton = document.createElement("button");
      clearCacheButton.classList.add("button", "env-action");
      clearCacheButton.textContent = "Clear Cache";

      clearCacheButton.addEventListener("click", async () => {
        try {
          const data = await clearKinstaCache(id);
          const { status, message, operation_id } = data;
          console.log(data);
          alert(
            `HTTP ${status}\n\n${message}\n\nOperation ID: ${operation_id}`
          );
        } catch (error) {
          console.error(error);
        }
      });

      // Create Clear Edge Button
      const clearEdgeButton = document.createElement("button");
      clearEdgeButton.classList.add("button", "env-action");
      clearEdgeButton.textContent = "Clear Edge";

      clearEdgeButton.addEventListener("click", async () => {
        try {
          const data = await clearEdge(id);
          const { status, message, operation_id } = data;
          console.log(data);
          alert(
            `HTTP ${status}\n\n${message}\n\nOperation ID: ${operation_id}`
          );
        } catch (error) {
          console.error(error);
        }
      });

      // Create Restart PHP Button
      const restartPHPButton = document.createElement("button");
      restartPHPButton.classList.add("button", "env-action");
      restartPHPButton.textContent = "Restart PHP";

      restartPHPButton.addEventListener("click", async () => {
        try {
          const data = await restartPHP(id);
          const { status, message, operation_id } = data;
          console.log(data);
          alert(
            `HTTP ${status}\n\n${message}\n\nOperation ID: ${operation_id}`
          );
        } catch (error) {
          console.error(error);
        }
      });

      // Append elements to the environment container
      environmentsContainer.appendChild(paragraph);
      environmentsContainer.appendChild(clearCacheButton);
      environmentsContainer.appendChild(clearEdgeButton);
      environmentsContainer.appendChild(restartPHPButton);
    });
  } catch (error) {
    console.error(error);
  }
});

window.addEventListener("DOMContentLoaded", () => {
  // Clear fetchCompany input field
  companyIdInput.value = "";

  // Clear fetchSite input field
  siteIdInput.value = "";
});
