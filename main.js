import { fetchSiteByID, clearKinstaCache, restartPHP } from "./fetchData.js";

////////////////////////////////////////////////////////////////
// DOM Elements
////////////////////////////////////////////////////////////////
const companyIdInput = document.getElementById("companyID");
const companyIdButton = document.getElementById("fetchCompany");

const siteIdInput = document.getElementById("siteID");
const siteIdButton = document.getElementById("fetchSite");

const envIdInput = document.getElementById("envID");

const restartPHPButton = document.getElementById("restartPHP");

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
    document.getElementById(
      "company-id"
    ).textContent = `Company ID: ${company_id}`;
    document.getElementById("name").textContent = `Name: ${name}`;
    document.getElementById("status").textContent = `Status: ${status}`;

    // Create container for environments
    const environmentsContainer = document.getElementById("environments");
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
      paragraph.innerHTML = `Env Name: ${display_name}<br>
      
      &nbsp;&nbsp;&nbsp;&nbsp;ID: ${id}<br> 
      &nbsp;&nbsp;&nbsp;&nbsp;${name[0].toUpperCase() + name.slice(1)}<br> 
      &nbsp;&nbsp;&nbsp;&nbsp;Status: ${
        is_blocked ? "Blocked" : "Not Blocked"
      }<br>
      &nbsp;&nbsp;&nbsp;&nbsp;${is_premium ? "Premium" : "Not Premium"}<br>
      &nbsp;&nbsp;&nbsp;&nbsp;${link}`;

      const clearCacheButton = document.createElement("button");
      clearCacheButton.textContent = "Clear Cache";
      clearCacheButton.addEventListener("click", () => {
        console.log(`Env: ${id}`);
        clearKinstaCache(id);
      });

      const restartPHPButton = document.createElement("button");
      restartPHPButton.textContent = "Restart PHP";
      restartPHPButton.addEventListener("click", () => {
        console.log(`Env: ${id}`);
        restartPHP(id);
      });

      // Append "Clear Cache" button to the environment container
      environmentsContainer.appendChild(paragraph);
      environmentsContainer.appendChild(clearCacheButton);
      environmentsContainer.appendChild(restartPHPButton);
    });
  } catch (error) {
    console.error(error);
  }
});

// Environment Actions
