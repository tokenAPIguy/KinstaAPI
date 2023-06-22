import {
  fetchSiteByID,
  fetchSiteList,
  clearKinstaCache,
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

const submitTokenButton = document.getElementById("submitToken");

////////////////////////////////////////////////////////////////
// Accept Token
////////////////////////////////////////////////////////////////
submitTokenButton.addEventListener("click", () => {
  const tokenValue = token.value;
  token.classList.remove("input");
  console.log(tokenValue.length);

  if (tokenValue.length === 64) {
    token.classList.remove("reject");
    token.classList.add("accept");
  } else {
    token.classList.remove("accept");
    token.classList.add("reject");
  }
});

////////////////////////////////////////////////////////////////
// Fetch Site List by Company ID
////////////////////////////////////////////////////////////////

// Create aynchronous event listener that waits for response from fetchSiteList()
companyIdButton.addEventListener("click", () => {
  const companyId = companyIdInput.value;
  fetchSiteList(companyId);
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
    console.log(data);

    // Output generic site details to DOM
    document.getElementById("site-details").textContent = "Details";
    document.getElementById(
      "company-id"
    ).textContent = `Company ID: ${company_id}`;
    document.getElementById("name-site").textContent = `Name: ${name}`;
    document.getElementById("status-site").textContent = `Status: ${status}`;

    // Create container for environments
    const environmentsContainer = document.getElementById("environments-site");
    environmentsContainer.innerHTML = "";

    // Destructure Environments Array
    environments.forEach((environment) => {
      const { display_name, name, id, is_blocked, is_premium } = environment;
      console.log(environment);

      // Creating Link
      const url = `https://my.kinsta.com/sites/details/${siteId}/${id}`;
      const link = `<a href="${url}" target="_blank" rel="noopener noreferrer">MyKinsta</a>`;

      // Output to DOM
      const paragraph = document.createElement("p");
      paragraph.innerHTML = `<br>Env Name: ${display_name}<br>
      
      &nbsp;&nbsp;&nbsp;&nbsp;ID: ${id}<br>
      &nbsp;&nbsp;&nbsp;&nbsp;${name[0].toUpperCase() + name.slice(1)}<br> 
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
      environmentsContainer.appendChild(restartPHPButton);
    });
  } catch (error) {
    console.error(error);
  }
});
